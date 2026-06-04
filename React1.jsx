import React, { useState, useEffect } from "react";

// Sub-component to demonstrate Props
function StudentCard({ name, topic, level, onComplete }) {
  return (
    <div className="card student-card">
      <h3>Props Demonstration 🤝</h3>
      <p className="props-desc">
        This card is a reusable child component receiving data via <strong>props</strong>.
      </p>
      <div className="student-info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Topic:</strong> {topic}</p>
        <p><strong>Level:</strong> <span className={`badge ${level.toLowerCase()}`}>{level}</span></p>
      </div>
      <button className="btn btn-secondary" onClick={() => onComplete(topic)}>
        Mark {topic} as Studied
      </button>
    </div>
  );
}

export default function React1() {
  // State definitions
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("exercise");
  const [studiedTopics, setStudiedTopics] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);

  // Helper to add mock logs in the UI so the student can visualize lifecycle events
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prevLogs) => [{ id: Date.now() + Math.random(), timestamp, message }, ...prevLogs].slice(0, 10));
  };

  // Effect 1: Logs every single render
  addLog("🟢 Component rendered (render phase)");

  // Effect 2: Run only once on mount (empty dependency array)
  useEffect(() => {
    addLog("⚡ Effect: Component mounted! This runs ONLY ONCE.");
    return () => {
      addLog("🧹 Cleanup: Component unmounted!");
    };
  }, []);

  // Effect 3: Run when 'count' changes (dependency array with [count])
  useEffect(() => {
    if (count !== 0) {
      addLog(`🔄 Effect: 'count' updated to ${count}`);
    }
  }, [count]);

  // Effect 4: Running a timer (demonstrating cleanup function)
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      addLog("⏱️ Effect: Started interval timer.");
      intervalId = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        addLog("🧹 Cleanup: Cleared interval timer to prevent memory leaks.");
      }
    };
  }, [isRunning]);

  const handleCompleteTopic = (topic) => {
    if (!studiedTopics.includes(topic)) {
      setStudiedTopics([...studiedTopics, topic]);
      addLog(`🎓 State update: Marked "${topic}" as studied!`);
    } else {
      addLog(`ℹ️ Info: "${topic}" is already studied.`);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">React Interactive Study Guide 🚀</h1>
        <p className="subtitle">
          Interact with the tabs below, test the features, and watch the live console logs to understand how React manages state and lifecycles under the hood.
        </p>
      </header>

      <main className="main-content">
        {/* Navigation Tabs */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === "exercise" ? "active" : ""}`}
            onClick={() => setActiveTab("exercise")}
          >
            1. Original Exercise
          </button>
          <button 
            className={`tab-btn ${activeTab === "hooks" ? "active" : ""}`}
            onClick={() => setActiveTab("hooks")}
          >
            2. Hooks Playground (State & Effects)
          </button>
          <button 
            className={`tab-btn ${activeTab === "props" ? "active" : ""}`}
            onClick={() => setActiveTab("props")}
          >
            3. Components & Props
          </button>
        </div>

        {/* Tab content wrapper */}
        <div className="tab-pane">
          
          {/* TAB 1: Original Exercise */}
          {activeTab === "exercise" && (
            <div className="section-grid animate-fade">
              <div className="demo-box">
                <h2>Live Sandbox 🧪</h2>
                <p className="desc-text">This is the exact functional logic of your original exercise, styled beautifully:</p>
                
                <div className="exercise-sandbox">
                  <h3>Contador: <span className="counter-value">{count}</span></h3>
                  <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
                      Aumentar
                    </button>
                    <button className="btn btn-danger" onClick={() => setCount(count - 1)}>
                      Diminuir
                    </button>
                  </div>

                  <hr className="divider" />

                  <h3>Digite seu nome:</h3>
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      addLog(`✍️ State update: 'name' -> "${e.target.value}"`);
                    }}
                    placeholder="Seu nome aqui"
                  />

                  {name && (
                    <div className="greeting-box animate-pop">
                      <p>Olá, <strong>{name}</strong>! 👋</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="explanation-box">
                <h2>Concept Explanation 📚</h2>
                <div className="explanations">
                  <div className="explanation-item">
                    <h4>State Management (`useState`)</h4>
                    <p>
                      <code>const [count, setCount] = useState(0);</code> declares a state variable.
                      When you call <code>setCount</code>, React schedules a re-render of the component
                      with the new count value, updating the UI automatically.
                    </p>
                  </div>
                  <div className="explanation-item">
                    <h4>Controlled Inputs</h4>
                    <p>
                      The text field is a <em>controlled input</em> because its value is bound directly to the <code>name</code> state variable.
                      The <code>onChange</code> handler updates the state, which in turn updates the input value.
                    </p>
                  </div>
                  <div className="explanation-item">
                    <h4>Conditional Rendering</h4>
                    <p>
                      The greeting uses logical AND (<code>name && ...</code>) to render the greeting box
                      only when the <code>name</code> string is not empty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Hooks Playground */}
          {activeTab === "hooks" && (
            <div className="section-grid animate-fade">
              <div className="demo-box">
                <h2>Effects Demo (Timer) ⏱️</h2>
                <p className="desc-text">
                  This demo demonstrates how side effects and cleanup functions are executed inside <code>useEffect</code>.
                </p>

                <div className="timer-sandbox">
                  <div className="timer-display">
                    <span className="timer-time">{timer}</span>
                    <span className="timer-label">seconds</span>
                  </div>

                  <div className="btn-group">
                    <button 
                      className={`btn ${isRunning ? "btn-warning" : "btn-primary"}`}
                      onClick={() => setIsRunning(!isRunning)}
                    >
                      {isRunning ? "Pause Timer" : "Start Timer"}
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => {
                        setTimer(0);
                        addLog("⏱️ Reset timer.");
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              <div className="explanation-box">
                <h2>Understanding `useEffect` 🔄</h2>
                <div className="explanations">
                  <div className="explanation-item">
                    <h4>How this Timer Works:</h4>
                    <p>
                      When you click <strong>Start Timer</strong>, an effect with the dependency <code>[isRunning]</code> activates.
                      It sets up a <code>setInterval</code> that runs every second.
                    </p>
                  </div>
                  <div className="explanation-item">
                    <h4>The Importance of Cleanup:</h4>
                    <p>
                      When you click <strong>Pause Timer</strong> or when the component unmounts, the returned cleanup function calls <code>clearInterval</code>.
                      Failing to clear intervals causes memory leaks and bug clusters.
                    </p>
                  </div>
                  <div className="explanation-item">
                    <h4>Dependency Arrays:</h4>
                    <ul>
                      <li><code>useEffect(fn, [])</code>: Runs only once when mounting.</li>
                      <li><code>useEffect(fn, [var])</code>: Runs when <code>var</code> changes.</li>
                      <li><code>useEffect(fn)</code>: Runs on <em>every single render</em>.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Components & Props */}
          {activeTab === "props" && (
            <div className="section-grid animate-fade">
              <div className="demo-box">
                <h2>Dynamic Props Setup 👥</h2>
                <p className="desc-text">
                  Here we pass data down from this parent component to a child component, and trigger callbacks back upwards.
                </p>

                <div className="props-sandbox">
                  <StudentCard 
                    name={name || "Guest Student"} 
                    topic="React Fundamentals" 
                    level="Beginner" 
                    onComplete={handleCompleteTopic}
                  />

                  <div className="studied-list">
                    <h4>Studied Topics Log ({studiedTopics.length})</h4>
                    {studiedTopics.length === 0 ? (
                      <p className="empty-text">No topics studied yet. Click the button in the card above!</p>
                    ) : (
                      <ul>
                        {studiedTopics.map((topic, index) => (
                          <li key={index} className="studied-item animate-pop">
                            ✅ {topic}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="explanation-box">
                <h2>Data Flow in React 🌊</h2>
                <div className="explanations">
                  <div className="explanation-item">
                    <h4>Props are Read-Only (Immutable)</h4>
                    <p>
                      A component must never modify its own props. They are read-only properties passed down by parent elements.
                    </p>
                  </div>
                  <div className="explanation-item">
                    <h4>Lifting State Up (Callbacks)</h4>
                    <p>
                      To notify a parent component about events in a child, we pass a callback function as a prop (e.g. <code>onComplete</code>).
                      When the child calls it, it updates the parent's state.
                    </p>
                  </div>
                  <div className="explanation-item">
                    <h4>List Keys</h4>
                    <p>
                      When rendering lists (like the studied topics), always provide a unique <code>key</code> prop to each element so React can track and update it efficiently.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Live Console Output Visualizer */}
      <footer className="console-visualizer">
        <div className="console-header">
          <h3>Visual Console Log (Under the Hood) 🛡️</h3>
          <button className="console-clear" onClick={() => setLogs([])}>Clear Log</button>
        </div>
        <div className="console-body">
          {logs.length === 0 ? (
            <p className="console-placeholder">Perform actions above to view lifecycle events and state mutations...</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="console-line">
                <span className="console-time">[{log.timestamp}]</span>{" "}
                <span className="console-msg">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </footer>
    </div>
  );
}
