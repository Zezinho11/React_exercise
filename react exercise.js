import React, { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");

    return (
        <div style={{ fontFamily: "Arial", padding: "20px" }}>
            <h1>Teste React 🚀</h1>

            <h2>Contador: {count}</h2>
            <button onClick={() => setCount(count + 1)}>
                Aumentar
            </button>
            <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
                Diminuir
            </button>

            <hr />

            <h2>Digite seu nome:</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome aqui"
            />

            {name && <p>Olá, {name}! 👋</p>}
        </div>
    );



}