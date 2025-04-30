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
  const damageTaken = sampleRun.damage_taken;

  return (
      <div className="container mt-4">
          <div className="row">
              {/* Deck Composition Column */}
              <div className="col-md-6">
                  <h3>Deck Composition</h3>
                  <ul className="list-group">
                      {[...deckMap.entries()].map(([card, count]) => (
                          <li key={card} className="list-group-item d-flex justify-content-between align-items-center">
                              {card}
                              <span className="badge bg-primary rounded-pill">{count}</span>
                          </li>
                      ))}
                  </ul>
              </div>

              {/* Fight Summary Column */}
              <div className="col-md-6">
                  <h3>Fights Summary</h3>
                  <ul className="list-group">
                      {damageTaken.map((fight, index) => (
                          <li key={index} className="list-group-item">
                              <strong>Floor {fight.floor}:</strong> {fight.enemies} — <em>{fight.damage} dmg</em>
                          </li>
                      ))}
                  </ul>
              </div>
          </div>
      </div>
  );
}

export default App;
