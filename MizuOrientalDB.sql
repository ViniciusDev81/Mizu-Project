CREATE DATABASE IF NOT EXISTS MizuOriental;
USE MizuOriental;

-- Tabela de clientes (cadastro)
CREATE TABLE cadastro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    numero VARCHAR(20) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    pontos_fidelidade INT DEFAULT 0,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de cliente (dados complementares ao cadastro)
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cadastro_id INT NOT NULL,
    data_nascimento DATE,
    genero ENUM('masculino', 'feminino', 'outro'),
    FOREIGN KEY (cadastro_id) REFERENCES cadastro(id)
);

-- Cardápio (base do cardápio) com quantidade
CREATE TABLE cardapio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    categoria ENUM('entrada', 'prato principal', 'sobremesa', 'bebida', 'combo') NOT NULL,
    preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    quantidade INT NOT NULL DEFAULT 0,
    disponivel BOOLEAN DEFAULT TRUE,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Administradores do sistema
CREATE TABLE administrador (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nivel_acesso ENUM('gerente', 'supervisor', 'atendente') DEFAULT 'atendente',
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Pedidos com múltiplos itens
CREATE TABLE pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_pedido VARCHAR(50) UNIQUE NOT NULL,
    cadastro_id INT NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT,
    FOREIGN KEY (cadastro_id) REFERENCES cadastro(id)
);

CREATE TABLE pedido_item (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    produto_id INT NOT NULL,
    quantidade INT NOT NULL CHECK (quantidade > 0),
    preco_unitario DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_pedido FOREIGN KEY (pedido_id) REFERENCES pedido(id),
    CONSTRAINT fk_produto FOREIGN KEY (produto_id) REFERENCES cardapio(id)
);

INSERT INTO cardapio (nome, descricao, categoria, preco, quantidade, disponivel)
VALUES
('Sol do Oriente', '2 Niguiri de Salmão, 2 Niguiri de Kani, 2 Niguiri de Skin, 10 Cariocas de Salmão', 'combo', 26.90, 100, TRUE),
('Brisa do Mar', '10 Uramaki de Kani, 10 Cariocas de Salmão', 'combo', 27.90, 100, TRUE),
('Tradição Japonesa', '5 Uramaki de Camarão, 10 Cariocas de Salmão', 'combo', 34.90, 100, TRUE),
('Maré Vermelha', 'Temaki de Camarão Empanado, Refrigerante Lata (Coca-Cola)', 'combo', 32.00, 100, TRUE),
('Pérola Imperial', '5 Uramaki de Kani, 10 Cariocas de Salmão', 'combo', 28.90, 100, TRUE),
('Samurai do Mizu', '10 Uramaki de Salmão, 10 Uramaki de Kani', 'combo', 39.90, 100, TRUE),
('Mar Profundo', '10 Cariocas de Camarão, Temaki de Camarão Empanado, Refrigerante Lata (Pepsi)', 'combo', 34.90, 100, TRUE),
('Lâminas do Chef', '4 Bastões de Salmão, 10 Cariocas de Salmão', 'combo', 28.90, 100, TRUE),
('Tempestade Imperial', 'Tempurá de Camarão, 10 Uramaki de Salmão', 'combo', 34.90, 100, TRUE);

-- Inserir na tabela de cadastro
INSERT INTO cadastro (nome, sobrenome, email, numero, senha)
VALUES (
  'Vinicius',
  'Tavares',
  'viniciustv14@gmail.com',
  '81993555711',
  '$2y$10$89305813ExemploHashSimuladoSenha'
);


-- Inserir dados complementares do cliente
INSERT INTO cliente (cadastro_id, data_nascimento, genero)
VALUES (1, '2006-02-16', 'masculino');

CREATE USER 'mizudb'@'localhost' IDENTIFIED BY 'dbmizuadm1';
GRANT ALL PRIVILEGES ON mizu.* TO 'mizudb'@'localhost';
FLUSH PRIVILEGES;


