import { useState } from "react";



const Saludo = () => {
  // Definimos dos estados usando el hook useState
  const [hora, setHora] = useState(''); // Para almacenar la hora ingresada por el usuario
  const [saludo, setSaludo] = useState(''); // Para almacenar el saludo correspondiente

  // Función que se ejecuta cuando cambia el valor del input de la hora
  const handleChange = (event) => {
    setHora(event.target.value); // Actualiza el estado 'hora' con el valor del input
  };

  // Función para determinar el saludo según la hora ingresada
  const obtenerSaludo = () => {
    const horaNum = parseInt(hora); // Convertimos la hora (string) a número entero. Investigar la forma de hacer que esto solo admita valores de 24horas Date??
    if (horaNum >= 6 && horaNum < 12) {
      setSaludo("Buenos días");
    } else if (horaNum >= 13 && horaNum < 20) {
      setSaludo("Buenas tardes");
    } else {
      setSaludo("Buenas noches");
    }
  };

  // Renderizamos el componente Saludo
  return (
    <div>
      <input
        type="number"
        value={hora}
        onChange={handleChange} // tipo de evento para definir acciones a ejecutar cuando algo cambia. En este caso, setHora
        placeholder="Ingrese la hora"
      />
      <button onClick={obtenerSaludo}>Obtener Saludo</button>
      <h4>{saludo}</h4>
    </div>
  );
}

export default Saludo;
