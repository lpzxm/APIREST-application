import { useState, useEffect } from 'react';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('https://tu-backend-en-render.com/api/usuarios')
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  const agregarUsuario = () => {
    fetch('https://tu-backend-en-render.com/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email }),
    })
      .then((res) => res.json())
      .then((data) => setUsuarios([...usuarios, data]));
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Usuarios:</h1>
      <ul>
        {usuarios.map((user, index) => (
          <li key={index}>{user.nombre} - {user.email}</li>
        ))}
      </ul>
      <div className="mt-5">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={agregarUsuario}
          className="bg-blue-500 text-white p-2 ml-2"
        >
          Agregar Usuario
        </button>
      </div>
    </div>
  );
}

export default App;
