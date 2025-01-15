import { useState } from 'react';
import './App.css';
import Deck from './components/Deck.jsx';
import TopSection from './components/TopSection.jsx';
import SideBar from './components/SideBar.jsx';
import NoDeckSelected from './components/NoDeckSelected.jsx';



function App() {
  const [count, setCount] = useState(0);

  //set state of deck only contain ID for now
  const [deckState, setDeckState] = useState({
    selectedDeckType: null, //id of the selected deck
    decks: []
  });

  function handleSelectDeckType(index){
    setDeckState(prevState => {
      return {
        ...prevState,
        selectedDeckType: index
      }
    });
  };

  // function handleAddDeck()

  let content = <NoDeckSelected></NoDeckSelected>;
  let showButton = false;
  if (deckState.selectedDeckType !== null){
    if (deckState.selectedDeckType === 0){
      showButton = true;
    }
    else{
      showButton = false;
    }
    content = <Deck showButton={showButton}></Deck>;
  }
  
  return (
    <>
      <TopSection></TopSection>
      <SideBar activeDeckType={deckState.selectedDeckType} onSelectDeckType={handleSelectDeckType} ></SideBar>
      {content}
    </>
  )
}

export default App;
