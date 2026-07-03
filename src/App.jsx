import React, { useState, useEffect } from 'react';
import Game from './Game.jsx';
import PackingList from './PackingList.jsx';
import PackingList2 from './PackingList2.jsx';
import Contador from './Contador.jsx';
import MyInput from './textBox.jsx';
import CheckBox from './CheckBox.jsx';
import '../index.css';

function NavLink({ to, children }) {
  return (
    <a href={`#${to}`} className="nav-link" style={{ marginRight: '1rem' }}>
      {children}
    </a>
  );
}

export default function App() {
  const initial = (location.hash && location.hash.replace('#', '')) || 'game';
  const [route, setRoute] = useState(initial);

  useEffect(() => {
    const onHash = () => setRoute((location.hash && location.hash.replace('#', '')) || 'game');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  let page;
  if (route === '/game' || route === 'game') page = <Game />;
  else if (route === '/list' || route === 'list') page = <PackingList />;
  else if (route === '/list2' || route === 'list2') page = <PackingList2 />;
  else if (route === '/contador' || route === 'contador') page = <Contador />;
  else if (route === '/myinput' || route === 'myinput') page = <MyInput />;
  else if (route === '/checkbox' || route === 'checkbox') page = <CheckBox />;
  else page = <Game />;

  return (
    <div className="app-container">
      <nav style={{ marginBottom: '1rem' }}>
        <NavLink to="/game">Game</NavLink>
        <NavLink to="/list">PackingList</NavLink>
        <NavLink to="/list2">PackingList2</NavLink>
        <NavLink to="/contador">Contador</NavLink>
        <NavLink to="/myinput">MyInput</NavLink>
        <NavLink to="/checkbox">CheckBox</NavLink>
      </nav>
      <main>{page}</main>
    </div>
  );
}
