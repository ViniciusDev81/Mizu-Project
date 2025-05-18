# 🍣 Mizu – Sistema de Gerenciamento de Pedidos

**Mizu** é um sistema web desenvolvido para otimizar o processo de atendimento da temakeria **Restaurante Mizu**, oferecendo uma solução completa para o gerenciamento de **pedidos**, **cadastro de produtos**, e **controle de clientes**.

Projetado para uso interno por atendentes e gerentes, o sistema possibilita uma gestão mais eficiente e organizada dos pedidos no salão, balcão ou delivery.

---

## 🧾 Funcionalidades

### 👤 Módulo de Clientes
- Cadastro e edição de clientes
- Histórico de pedidos por cliente
- Busca rápida por telefone ou nome

### 🍱 Módulo de Produtos
- Cadastro de temakis, combinados, bebidas e outros itens
- Edição de preços e descrições
- Controle de disponibilidade de produtos

### 🧾 Módulo de Pedidos
- Criação de pedidos com múltiplos itens
- Associação de pedidos a clientes
- Cálculo automático do valor total
- Atualização de status: *Aguardando*, *Em preparo*, *Pronto*, *Entregue*
- Visualização em tempo real para cozinha/produção

### 📊 Dashboard Administrativo *(opcional/avançado)*
- Relatórios de vendas
- Produtos mais vendidos
- Pedidos por dia, mês ou cliente

---

## 💻 Tecnologias Utilizadas

- **Frontend**: [React.js](https://reactjs.org)  
  Interface moderna e responsiva para o gerenciamento dos pedidos e cadastros.

- **Backend**: PHP (Laravel ou puro PHP)  
  Responsável por processar as requisições, autenticação e lógica de negócio.

- **Banco de Dados**: MySQL ou MariaDB  
  Armazena informações dos produtos, pedidos e clientes.

---

## 🎯 Objetivos

- Automatizar o fluxo de atendimento da Temakeria Mizu  
- Eliminar registros manuais e reduzir erros de pedidos  
- Oferecer uma base sólida para evoluir em direção a sistemas com delivery online ou aplicativos móveis

---

## 🚀 Possibilidades de Expansão

- Integração com sistemas de pagamento online
- Versão para clientes realizarem pedidos diretamente via celular
- Impressão de pedidos para cozinha (com integração a impressoras térmicas)
- Gestão de estoque de ingredientes

---

## 🛠️ Como Executar o Projeto

### Backend (PHP + MySQL)

1. Configure um ambiente com Apache (ou use XAMPP/Laragon)
2. Clone o repositório backend
3. Configure o arquivo `.env` com os dados do banco de dados
4. Execute as migrações e inicie o servidor local

### Frontend (React)

1. Clone o repositório frontend
2. Instale as dependências:
   ```bash
   npm install

Inicie o projeto:

bash
npm start
Certifique-se de que o frontend esteja apontando para o backend (via .env ou config)

📄 Licença
Este projeto está licenciado sob a MIT License.
Você pode usar, modificar e distribuir à vontade com os devidos créditos.

🙌 Contribuições
Contribuições são bem-vindas!
Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias, correções ou sugestões.
