import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function BotRecuperarSenha() {
  const [etapa, setEtapa] = useState(1);
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleEnviarEmail = async () => {
    if (!email.trim()) {
      setMensagem('Por favor, digite um e-mail válido.');
      return;
    }

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/backend/gerar_codigo.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });


      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem(dados.mensagem || 'Código enviado com sucesso!');
        setEtapa(2);
      } else {
        setMensagem(dados.erro || 'Erro ao enviar código.');
      }
    } catch (error) {
      console.error('Erro ao chamar o backend:', error);
      setMensagem('Erro na comunicação com o servidor.');
    }
  };

  const handleVerificarCodigo = async () => {
    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/backend/verificar_codigo.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, codigo }),
      });


      const dados = await resposta.json();

      if (resposta.ok && dados.verificado) {
        setMensagem('');
        setEtapa(3);
      } else {
        setMensagem(dados.erro || 'Código inválido. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      setMensagem('Erro ao verificar o código.');
    }
  };

  const handleRedefinirSenha = async () => {
    if (!novaSenha.trim()) {
      setMensagem('Digite uma nova senha válida.');
      return;
    }

    try {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/backend/redefinir_senha.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, novaSenha }),
      });


      const dados = await resposta.json();

      if (resposta.ok) {
        setMensagem('Senha redefinida com sucesso!');
        setEtapa(4);
      } else {
        setMensagem(dados.erro || 'Erro ao redefinir senha.');
      }
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      setMensagem('Erro na comunicação com o servidor.');
    }
  };

  return (
    <div className="container-login">
      <h1>Recuperação de Senha</h1>

      {etapa === 1 && (
        <>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleEnviarEmail}>Enviar Código</button>
        </>
      )}

      {etapa === 2 && (
        <>
          <input
            type="text"
            placeholder="Digite o código recebido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <button onClick={handleVerificarCodigo}>Verificar Código</button>
        </>
      )}

      {etapa === 3 && (
        <>
          <input
            type="password"
            placeholder="Digite a nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <button onClick={handleRedefinirSenha}>Redefinir Senha</button>
        </>
      )}

      {etapa === 4 && (
        <>
          <p>Senha atualizada com sucesso!</p>
          <button onClick={() => navigate('/')}>Voltar ao login</button>
        </>
      )}

      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default BotRecuperarSenha;