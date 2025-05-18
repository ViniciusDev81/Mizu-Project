import { useState } from 'react';
import NavigationButtons from '../../components/NavigationButtons';
import './style.css';

function ConfirmacaoCadastro() {
  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState('');
  const [usuario, setUsuario] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('Usuario'));
    } catch {
      return null;
    }
  });

  const handleConfirmacao = async () => {
    if (!codigo) {
      setErro('Por favor, insira o código de verificação.');
      return;
    }

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/backend/confirmar_codigo.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo }),
      });

      const dados = await resposta.json();

      if (resposta.ok && dados.confirmado) {
        window.location.href = '/homepage';
      } else {
        setErro(dados.erro || 'Código inválido.');
      }
    } catch (error) {
      setErro('Erro ao confirmar o código.');
    }
  };

  return (
    <div className="confirmacao-cadastro-container">
      <h1>Confirmação de Cadastro</h1>
      <input
        type="text"
        placeholder="Código de Verificação"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      {erro && <p className="error-message">{erro}</p>}
      <button onClick={handleConfirmacao}>Confirmar</button>

      <NavigationButtons usuario={usuario} onLogout={() => {
        localStorage.removeItem('Usuario');
        window.location.href = '/login';
      }} />
    </div>
  );
}

export default ConfirmacaoCadastro;
