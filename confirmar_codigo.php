<?php
require_once __DIR__ . '/../config/conexao.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header('Content-Type: application/json');

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

try {
    if (!isset($pdo)) {
        throw new Exception('Conexão com banco de dados não estabelecida.');
    }

    $dados = json_decode(file_get_contents('php://input'), true);

    if (!isset($dados['codigo'])) {
        http_response_code(400);
        echo json_encode(['confirmado' => false, 'erro' => 'Código de verificação é obrigatório.']);
        exit;
    }

    $codigo = trim($dados['codigo']);

    // Example: Check the code in a verification_codes table (adjust as per your schema)
    $stmt = $pdo->prepare("SELECT id FROM verification_codes WHERE codigo = ? AND usado = 0 LIMIT 1");
    $stmt->execute([$codigo]);
    $registro = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($registro) {
        // Mark code as used
        $stmtUpdate = $pdo->prepare("UPDATE verification_codes SET usado = 1 WHERE id = ?");
        $stmtUpdate->execute([$registro['id']]);

        echo json_encode(['confirmado' => true]);
    } else {
        http_response_code(400);
        echo json_encode(['confirmado' => false, 'erro' => 'Código inválido ou já utilizado.']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['confirmado' => false, 'erro' => 'Erro interno no servidor.', 'mensagem' => $e->getMessage()]);
}
?>
