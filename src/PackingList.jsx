import React from 'react';

function Item({ name, isPacked }) {
  return (
    <li>
      {name} {isPacked ? '✔' : 'X'}
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Packing List</h1>
      <ul>
        <Item isPacked={true} name="102% pace" />
        <Item isPacked={true} name="big D" />
        <Item isPacked={false} name="Brain" />
      </ul>
    </section>
  );
}
