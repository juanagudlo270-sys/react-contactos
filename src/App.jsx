import { useState } from "react";
import "./App.css";

function App() {

    const [nombre, setNombre] = useState("");
    const [saludo, setSaludo] = useState("");

    const saludar = (e) => {
        e.preventDefault();

        setSaludo(`Hola ${nombre}, bienvenido a React.`);
    };

    return (
        <div className="contenedor">

            <div className="tarjeta">

                <h1>Trabajo 1 - React</h1>

                <form onSubmit={saludar}>

                    <label>Ingresa tu nombre:</label>

                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Escribe tu nombre"
                    />

                    <button type="submit">
                        Saludar
                    </button>

                </form>

                {saludo && <h2>{saludo}</h2>}

            </div>

        </div>
    );
}

export default App;