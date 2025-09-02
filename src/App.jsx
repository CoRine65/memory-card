import { use, useState } from 'react'

import './App.css'

function App() {
  //holds the Pokémon cards we fetched
  const [card, setCards] = useState([]);
  //tracks which cards the user has clicked by id
  const [clicked, setClicked] = useState([]);
  //current score
  const [score, setScore] = useState(0);

  return (
    <main>
      {/*score board will go here later*/}
    </main>
  )
}

export default App
