create database Default_;
use Default_; 

create table Usuario(
 id_usuario int auto_increment primary key,
 nome varchar(255) not null,
sobrenome varchar(255) not null,
email varchar(254)unique not null,
celular varchar (20)unique not null,
senha varchar (60) not null);

CREATE TABLE cardapio (
    id_cardapio INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    categoria ENUM('Entrada','Prato Principal','Sobremesa','Bebida') NOT NULL,
    preco DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    quantidade INT NOT NULL DEFAULT 0,
    disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE pedidos (
    id_pedidos INT AUTO_INCREMENT PRIMARY KEY,
    id_cardapio INT NOT NULL,
    quantidade_produto INT NOT NULL,
    preco_produto DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (id_cardapio) REFERENCES cardapio(id_cardapio)
);

ALTER TABLE cardapio MODIFY categoria ENUM('Entrada', 'Prato Principal', 'Sobremesa', 'Bebida', 'Combo') NOT NULL;

INSERT INTO cardapio (nome, descricao, categoria, preco, quantidade, disponivel)
VALUES
('Sol do Oriente', '2 Niguiri de Salmão, 2 Niguiri de Kani, 2 Niguiri de Skin, 10 Cariocas de Salmão', 'Combo', 26.90, 100, TRUE),
('Brisa do Mar', '10 Uramaki de Kani, 10 Cariocas de Salmão', 'Combo', 27.90, 100, TRUE),
('Tradição Japonesa', '5 Uramaki de Camarão, 10 Cariocas de Salmão', 'Combo', 34.90, 100, TRUE),
('Maré Vermelha', 'Temaki de Camarão Empanado, Refrigerante Lata (Coca-Cola)', 'Combo', 32.00, 100, TRUE),
('Pérola Imperial', '5 Uramaki de Kani, 10 Cariocas de Salmão', 'Combo', 28.90, 100, TRUE),
('Samurai do Mizu', '10 Uramaki de Salmão, 10 Uramaki de Kani', 'Combo', 39.90, 100, TRUE),
('Mar Profundo', '10 Cariocas de Camarão, Temaki de Camarão Empanado, Refrigerante Lata (Pepsi)', 'Combo', 34.90, 100, TRUE),
('Lâminas do Chef', '4 Bastões de Salmão, 10 Cariocas de Salmão', 'Combo', 28.90, 100, TRUE),
('Tempestade Imperial', 'Tempurá de Camarão, 10 Uramaki de Salmão', 'Combo', 34.90, 100, TRUE);

INSERT INTO Usuario (nome, sobrenome, email, celular, senha)
VALUES (
    'Vinicius',
    'Tavares',
    'viniciustv14@gmail.com',
    '81993555711',
    '$2y$10$89305813ExemploHashSimuladoSenha'
);
use default_;


ALTER TABLE pedidos
ADD COLUMN id_usuario INT NOT NULL,
ADD CONSTRAINT id_usuario 
FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario); 

