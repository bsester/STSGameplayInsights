import logo from './logo.svg';
import './App.css';

const sampleRun = require('./sampleRun.json');

function deckCounter(deck){
  const cardCountMap = new Map();
  for (const card of deck)
  {cardCountMap.set(card, (cardCountMap.get(card) || 0) + 1)} // if the card is already in the map, increment its count, otherwise set it to 1
  return cardCountMap;
}
function App() {
  const deckMap = deckCounter(sampleRun.master_deck); // build current map
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
            Deck Composition:
        </p>
        <ul>
          {[...deckMap.entries()].map(([card, count]) => <li key={card}>{card}: {count}</li>)}
        </ul>
      </header>
    </div>
  );
}

export default App;
