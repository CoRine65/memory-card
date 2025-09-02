import { useEffect, useState } from 'react'
import Card from './card';
import './App.css'

function App() {
  //holds the Pokémon cards we fetched
  const [cards, setCards] = useState([]);
  //tracks which cards the user has clicked by id
  const [clicked, setClicked] = useState([]);
  //current score
  const [score, setScore] = useState(0);
  //best score
  const [bestScore, setBestScore] = useState(0);

  //fetching pokemon
  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=6");
      const data = await res.json();
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const pokeRes = await fetch(p.url);
          const pokeData = await pokeRes.json();
          return { id: pokeData.id, name: pokeData.name, img: pokeData.sprites.front_default};
        })
      );//end detailed
      console.log(detailed)
      setCards(detailed)
    };//end of fetch
    fetchPokemon();
  }, [])//end

//handle card click
const handleClick = (id) => {
  if (clicked.includes(id)){
    //click duplicate end game
    setScore(0);
    setClicked([]);
  } else {
    //new click
    const newScore = score + 1;
    setScore(newScore);
    setClicked([...clicked, id]);

    if (newScore > bestScore){
      setBestScore(newScore)
    }
    //shuffle cards
    setCards([...cards].sort(() => Math.random() - 0.5));

  } //end else
}//end click

  return (
    <div className='grid-container'>
      {cards.map((card) => (
        <Card key={card.id} 
        name={card.name} 
        img={card.img} 
        onClick={() => handleClick(card.id)}
        />
      ))}
    </div>
  )
}

export default App
