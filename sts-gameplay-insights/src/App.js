import './App.css';
import {useState} from "react";

const sampleRun = require('./sampleRun.json');

function deckCounter(deck){
  const cardCountMap = new Map();
  for (const card of deck)
  {cardCountMap.set(card, (cardCountMap.get(card) || 0) + 1)} // if the card is already in the map, increment its count, otherwise set it to 1
  return cardCountMap;
}


function App() {
  const [runData, setRunData] = useState(null);

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
          try {
              const parsed = JSON.parse(e.target.result);
              setRunData(parsed);
              }
          catch (err) {
            console.error('Error parsing JSON:', err);
            alert('Invalid JSON file!');
            }
        };
        reader.readAsText(file);
    };
    // if these things exist, set them, if not, keep them empty
    const deckMap = runData ? deckCounter(runData.master_deck) : null;
    const damageTaken = runData?.damage_taken || [];



  return  (
      <div className="container mt-4">
          <h2 className="mb-3">Slay the Spire Run Viewer</h2>

          {/* File Input */}
          <div className="mb-4">
              <label htmlFor="runFile" className="form-label">Upload a `.run` file:</label>
              <input type="file" accept=".json,.run" className="form-control" onChange={handleFileChange} />
          </div>

          {/* Display content only if runData is loaded */}
          {runData && (
              <div className="row">
                  <div className="col-md-6">
                      <h4>Deck Composition</h4>
                      <ul className="list-group">
                          {[...deckMap.entries()].map(([card, count]) => (
                              <li key={card} className="list-group-item d-flex justify-content-between align-items-center">
                                  {card}
                                  <span className="badge bg-primary rounded-pill">{count}</span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  <div className="col-md-6">
                      <h4>Fights Summary</h4>
                      <ul className="list-group">
                          {damageTaken.map((fight, index) => (
                              <li key={index} className="list-group-item">
                                  <strong>Floor {fight.floor}:</strong> {fight.enemies} — <em>{fight.damage} dmg</em>
                              </li>
                          ))}
                      </ul>
                  </div>
              </div>
          )}
      </div>
  );
}

export default App;
