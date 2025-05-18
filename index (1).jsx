import React, { useEffect, useState } from 'react';
import NavigationButtons from '../../components/NavigationButtons';
import './style.css';

function Cardapio() {
  const [sushis, setSushis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('Usuario'));
    } catch (e) {
      console.error('Erro ao carregar usuário do localStorage', e);
      return null;
    }
  });

  useEffect(() => {
    // Removed redirect to login if user is already logged in
    // User authentication should be handled elsewhere or allow access

    const carregarCardapio = async () => {
      try {
        const resposta = await fetch(`${import.meta.env.VITE_API_URL}/cardapio.php`);
        if (!resposta.ok) {
          throw new Error(`Erro ao buscar cardápio: ${resposta.status}`);
        }

        const data = await resposta.json();
        setSushis(data);
      } catch (err) {
        console.error(err);
        setErro(err.message || 'Erro inesperado ao carregar cardápio');
      } finally {
        setLoading(false);
      }
    };

    carregarCardapio();
  }, [usuario]);

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('Usuario');
      setUsuario(null);
      window.location.href = '/login';
    }
  };

  return (
    <div className="container-cardapio">
      <h1>Mizu Cardápio 🍣</h1>

      <NavigationButtons usuario={usuario} onLogout={handleLogout} />

      {loading ? (
        <p className="error-message">Carregando cardápio...</p>
      ) : erro ? (
        <p className="error-message">Erro: {erro}</p>
      ) : sushis.length === 0 ? (
        <p>Nenhum item encontrado no cardápio.</p>
      ) : (
        <div className="lista-sushis">
          {sushis.map((item, index) => (
            <div key={index} className="sushi-item">
              <h3>{item.nome}</h3>
              <p>{item.descricao}</p>
              <strong>R$ {Number(item.preco).toFixed(2)}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cardapio;
