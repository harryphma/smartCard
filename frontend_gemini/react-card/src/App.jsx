import { useState } from 'react';
import './App.css';
import Deck from './components/Deck.jsx';
import TopSection from './components/TopSection.jsx';
import SideBar from './components/SideBar.jsx';
import NoDeckSelected from './components/NoDeckSelected.jsx';



function App() {
  const [count, setCount] = useState(0);

  //set state of deck only contain ID for now
  const [deckState, setDeckState] = useState(null);

  function handleSelectDeck(index){
    setDeckState(index);
  };

  let content = <NoDeckSelected></NoDeckSelected>;
  if (deckState !== null){
    content = <Deck></Deck>;
  }
  
  return (
    <>
      <TopSection></TopSection>
      <SideBar activeDeck={deckState} onSelectDeck={handleSelectDeck}></SideBar>
      {content}
    </>
  )
}

export default App;
