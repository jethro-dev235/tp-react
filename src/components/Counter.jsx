import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h3>🔢 Compteur</h3>
      
      <div className="counter-display">
        <span style={{ color: count === 10 ? "red" : count === 0 ? "gray" : "#667eea" }}>
          {count}
        </span>
      </div>

      {count === 10 && (
        <p className="counter-limit">⚠️ Limite maximale atteinte !</p>
      )}

      <div className="counter-buttons">
        <button 
          className="counter-btn decrement"
          onClick={() => setCount(count - 1)}
          disabled={count === 0}
        >
          ➖
        </button>

        <button 
          className="counter-btn reset"
          onClick={() => setCount(0)}
        >
          🔄 Reset
        </button>

        <button 
          className="counter-btn increment"
          onClick={() => setCount(count + 1)}
          disabled={count === 10}
        >
          ➕
        </button>
      </div>
    </div>
  );
}

export default Counter;