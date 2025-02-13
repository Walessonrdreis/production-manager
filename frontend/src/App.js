import React, { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Faz uma requisição para o endpoint PHP que retorna os usuários
    fetch('http://localhost/api') // ajuste a URL conforme necessário
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setUsuarios(data.data);
        }
      })
      .catch(error => console.error('Erro:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {usuarios.length > 0 ? (
        <ul>
          {usuarios.map(usuario => (
            <li key={usuario.id}>{usuario.nome} - {usuario.email}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}

export default App; 