<?php
$host = getenv('DB_HOST') ?: 'localhost';
$db   = getenv('DB_NAME') ?: 'Default_';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: 'dbmizuadm1';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // Mostra exceções detalhadas
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    // echo "Conexão bem-sucedida!";
} catch (PDOException $e) {
    error_log("Erro de conexão com o banco de dados: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'sucesso' => false,
        'erro' => 'Falha ao conectar ao banco de dados.',
        'mensagem' => $e->getMessage() // Somente em desenvolvimento
    ]);
    exit;
}
