import {useState} from 'react'

export default function Contador() {
    const [contador, setContador] = useState(0);

    function handleclick() {
        setContador(contador + 1);
    }

    return (
        <button onClick={handleclick}>
            Me apertou {contador} vezes aiaiaiai
        </button>
    );
}