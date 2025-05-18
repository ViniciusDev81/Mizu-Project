<?php
require_once __DIR__ . '/config/conexao.php';

function cadastrarUsuario($nome, $sobrenome, $email, $numero, $senha) {
    global $pdo;

    // Basic input validation
    if (empty($nome) || empty($sobrenome) || empty($email) || empty($numero) || empty($senha)) {
        return ['sucesso' => false, 'erro' => 'Todos os campos são obrigatórios.'];
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['sucesso' => false, 'erro' => 'Formato de email inválido.'];
    }
    if (strlen($senha) < 6) {
        return ['sucesso' => false, 'erro' => 'Senha deve ter pelo menos 6 caracteres.'];
    }

    $stmt = $pdo->prepare("SELECT id_usuario FROM Usuario WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->rowCount() > 0) {
        return ['sucesso' => false, 'erro' => 'E-mail já cadastrado.'];
    }
    $stmt = $pdo->prepare("INSERT INTO Usuario (nome, sobrenome, email, celular, senha) VALUES (?, ?, ?, ?, ?)");
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);
    $success = $stmt->execute([$nome, $sobrenome, $email, $numero, $senhaHash]);

    if (!$success) {
        return ['sucesso' => false, 'erro' => 'Erro ao inserir no banco de dados.'];
    }

   
    $codigoVerificacao = generateVerificationCode();

   
    if (!enviarCodigoVerificacao($email, $codigoVerificacao)) {
        return ['sucesso' => false, 'erro' => 'Erro ao enviar o código de verificação.'];
    }

    return ['sucesso' => true];
}

function generateVerificationCode() {
    return str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT);
}

function enviarCodigoVerificacao($email, $codigo) {
    require_once __DIR__ . '/PHPMailer/PHPMailerAutoload.php';

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'rafaelassis.dev@gmail.com';
    $mail->Password = getenv('EMAIL_PASSWORD') ?: ''; 
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('rafaelassis.dev@gmail.com', 'Seu Nome ou Empresa');
    $mail->addAddress($email);
    $mail->isHTML(true);
    $mail->Subject = 'Código de Verificação';
    $mail->Body = "Seu código de verificação é: <strong>$codigo</strong>";

    return $mail->send();
}
function loginUsuario($email, $senha) {
    global $pdo;

    // Busca usuário pelo e-mail
    $stmt = $pdo->prepare("SELECT id_usuario, nome, email, senha FROM Usuario WHERE email = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$usuario) {
        return ['sucesso' => false, 'erro' => 'E-mail ou senha inválidos.'];
    }

    if (!password_verify($senha, $usuario['senha'])) {
        return ['sucesso' => false, 'erro' => 'E-mail ou senha inválidos.'];
    }

    return [
        'sucesso' => true,
        'usuario' => [
            'id_usuario' => $usuario['id_usuario'],
            'nome' => $usuario['nome'],
            'email' => $usuario['email']
        ]
    ];
}