import React, { useState, useEffect } from "react";

const Home = () => {
  // Estados declarados
  const [tarea, setTarea] = useState(""); // Estado para almacenar la tarea actual
  const [list, setList] = useState([]); // Estado para almacenar la lista de tareas

  // Función para crear un usuario en la API
  async function crearUsuario() {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/klgs1234', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify([]),
      });
      const data = await response.json();
      console.log(data.msg);
      // Si el usuario existe, obtiene las tareas
      if (data.msg === "The user exist") {
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Función para obtener las tareas desde la API
  async function obtenerTareas() {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/klgs1234');
      const data = await response.json();
      setList(data); // Actualiza el estado con las tareas obtenidas
    } catch (error) {
      console.log(error);
    }
  }

  // Función para actualizar las tareas en la API
  async function actualizarTarea(updatedList) {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/klgs1234', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedList), // Envía la lista actualizada 
      });
      if (response.status === 200) {
        obtenerTareas(); // Si la actualización fue exitosa, obtiene las tareas actualizadas
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  // Se ejecuta al cargar el componente
  useEffect(() => {
    crearUsuario(); // Crea el usuario al cargar la página
  }, []);

  // Añade una tarea al presionar Enter
  const añadeTareas = (e) =>  {
    if (e.key === "Enter") {
      const newTask = { label: tarea, done: false };
      const updatedList = [...list, newTask]; // Crea una nueva lista con la tarea añadida
      setList(updatedList); // Actualiza el estado de la lista
      setTarea(""); // Limpia el campo de entrada
      actualizarTarea(updatedList); // Actualiza las tareas en la API
    }
  };

  // Maneja la eliminación de tareas
  const handleDelete = (index) => {
    const updatedList = list.filter((_, currentIndex) => index !== currentIndex);
    setList(updatedList); // Actualiza el estado de la lista
    actualizarTarea(updatedList); // Actualiza las tareas en la API
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-white bg-dark mt-4">todos</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setTarea(e.target.value)}
          value={tarea}
          onKeyPress={añadeTareas} // Llama a añadeTareas al presionar Enter
          placeholder="What do you need to do?"
        />
      </div>
      <ul className="list-group">
        {list.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {item.label}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => handleDelete(index)} // Llama a handleDelete al hacer clic en el botón
            ></button>
          </li>
        ))}
      </ul>
      <div className="mt-3">{list.length} item left</div>
    </div>
  );
};

export default Home;
