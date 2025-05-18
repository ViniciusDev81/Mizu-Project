<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

// Salva os dados de entrada para debug
file_put_contents(__DIR__ . '/input_debug.txt', file_get_contents('php://input'));

require_once __DIR__ . '/../config/conexao.php';
require_once __DIR__ . '/../funcoes.php';

try {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        throw new Exception('Dados inválidos.');
    }

    $nome = $input['nome'] ?? null;
    $sobrenome = $input['sobrenome'] ?? null;
    $email = $input['email'] ?? null;
    $numero = $input['numero'] ?? null;
    $senha = $input['senha'] ?? null;

    // Verifica se todos os campos foram preenchidos
    if (!$nome || !$sobrenome || !$email || !$numero || !$senha) {
        throw new Exception('Todos os campos são obrigatórios.');
    }

    // Chama a função de cadastro
    $resultado = cadastrarUsuario($nome, $sobrenome, $email, $numero, $senha);

    if (!$resultado['sucesso']) {
        throw new Exception($resultado['erro'] ?? 'Erro desconhecido.');
    }

    // Retorna sucesso
    echo json_encode([
        'sucesso' => true,
        'mensagem' => 'Cadastro realizado com sucesso. Código de verificação enviado por e-mail.'
    ]);
} catch (Exception $e) {
    // Retorna erro com a mensagem
    echo json_encode([
        'sucesso' => false,
        'erro' => $e->getMessage()
    ]);
}