import React from 'react';

function Item2({ name, importance }) {
  return (
    <li className="item">
      {name}
      {importance > 0 && ' '}
      {importance > 0 && <i style={{ color: '#f5b50a' }}>★</i>}
    </li>
  );
}

export default function PackingList2() {
  return (
    <section>
      <h1>Lista</h1>
      <ul>
        <Item2 importance={3} name="pokebola" />
        <Item2 importance={0} name="macaco" />
        <Item2 importance={8} name="sports car" />
      </ul>
    </section>
  );
}
