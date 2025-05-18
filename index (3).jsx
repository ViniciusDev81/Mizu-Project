import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Pedidos() {
  const navigate = useNavigate();
  const [, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [erro, setErro] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Para controlar o estado de carregamento.

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('usuario'));
    // Removed redirect to login if user is already logged in
    if (dados) {
      setUsuario(dados);
      fetch(`http://localhost:3306/pedidos?usuarioId=${dados.id}`)
        .then((res) => res.json())
        .then((data) => {
          setPedidos(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Erro ao buscar pedidos:', err);
          setErro('Erro ao carregar pedidos.');
          setIsLoading(false);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const irParaHome = () => {
    navigate('/');
  };

  const pedidosAtivos = pedidos.filter((p) => p.status === 'ativo');
  const historicoPedidos = pedidos.filter((p) => p.status !== 'ativo');

  return (
    <div className="container-perfil">
      <h1>Meus Pedidos 📦</h1>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {isLoading && <p>Carregando seus pedidos...</p>}

      <div className="info-usuario">
        <h2>Pedidos Ativos</h2>
        {pedidosAtivos.length === 0 ? (
          <p>Você não tem pedidos ativos no momento.</p>
        ) : (
          <ul>
            {pedidosAtivos.map((pedido) => (
              <li key={pedido.id}>
                <strong>{pedido.produto}</strong> - {pedido.data}
              </li>
            ))}
          </ul>
        )}

        <h2>Histórico de Pedidos</h2>
        {historicoPedidos.length === 0 ? (
          <p>Você ainda não fez nenhum pedido.</p>
        ) : (
          <ul>
            {historicoPedidos.map((pedido) => (
              <li key={pedido.id}>
                <strong>{pedido.produto}</strong> - {pedido.data}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="botoes-perfil">
        <button onClick={irParaHome}>Voltar para Home</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Pedidos;