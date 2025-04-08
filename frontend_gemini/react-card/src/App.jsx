import { useState } from 'react';
import './App.css';
import TopSection from './components/TopSection.jsx';
import SideBar from './components/SideBar.jsx';
import NoDeckSelected from './components/NoDeckSelected.jsx';
import DeckSelected from './components/DeckSelected.jsx';



function App(){
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

  function handleAddDeck(name){
    setDeckState(prevState => {
      const deckId = Math.random();
      const newDeck = {
        id: deckId,
        name: name,
        type: 0  // Always set type to 0 (Your Decks) when creating a new deck
      };

      return {
        ...prevState,
        selectedDeckType: 0,  // Automatically select "Your Decks" category
        decks: [...prevState.decks, newDeck]
      };
    })
  }

  let content = <NoDeckSelected onAddDeck={handleAddDeck}></NoDeckSelected>;
  let showButton = false;
  if (deckState.selectedDeckType !== null){
    if (deckState.selectedDeckType === 0){
      showButton = true;
    }
    else{
      showButton = false;
    }
    content = <DeckSelected 
      showButton={showButton}
      selectedDeckType={deckState.selectedDeckType}
      decks={deckState.decks.filter(deck => deck.type === deckState.selectedDeckType)}
      onAddDeck={handleAddDeck}
    />;
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

