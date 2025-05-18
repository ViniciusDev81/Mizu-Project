import { useNavigate } from 'react-router-dom';
import './NavigationButtons.css';

function NavigationButtons({ usuario, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      onLogout();
    }
  };

  return (
    <div className="navigation-buttons">
      <button onClick={() => navigate('/homepage')}>Início</button>
      <button onClick={() => navigate('/cardapio')}>Cardápio</button>
      <button onClick={() => navigate('/perfil')}>Perfil</button>
      <button onClick={() => navigate('/pedidos')}>Pedidos</button>

      {!usuario ? (
        <button onClick={() => navigate('/login')}>Entrar</button>
      ) : (
        <button onClick={handleLogout} className="logout-button">
          Sair
        </button>
      )}
    </div>
  );
}

export default NavigationButtons;
