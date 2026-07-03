import React from 'react'
import ReactDOM from 'react-dom/client'
import Game, { PackingList, PackingList2 } from '../React2.jsx'
import '../index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="app-layout">
      <Game />
      <PackingList />
      <PackingList2 />
    </div>
  </React.StrictMode>,
)
