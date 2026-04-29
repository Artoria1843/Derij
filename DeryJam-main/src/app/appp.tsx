import { useEffect, useState } from "react";

interface Usuario {
  id: number;
  nombre: string;
  departamento_codigo: string;
  email: string;
}

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
        .then(res => res.json())
        .then((data) => {
        console.log("DATOS:", data); // 👈 IMPORTANTE
        setUsuarios(data);
        })
        .catch(err => console.error(err));
    }, []);

  return (
    <div>
      <h1>Lista de usuarios</h1>

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.departamento_codigo}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;