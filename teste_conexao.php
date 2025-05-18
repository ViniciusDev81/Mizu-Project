<?php
try {
    require_once __DIR__ . '/config/conexao.php';
    // Test the connection by running a simple query
    $stmt = $pdo->query('SELECT 1');
    $stmt->fetch();

    echo json_encode(['sucesso' => true, 'mensagem' => 'Conexão com o banco de dados bem-sucedida!']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro na conexão com o banco de dados.', 'erro' => $e->getMessage()]);
    exit;
}
?>
