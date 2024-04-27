import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { invoke } from "@tauri-apps/api/core";
import "./app.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [focusedHistory, setFocusedHistory] = useState<[Date, boolean][]>([])

  useEffect(() => {
    const appWindow = getCurrent()
    let unlisten: (() => void) | undefined = undefined
    appWindow
    .onFocusChanged(({ payload: focused }) => {
      setFocusedHistory((prev) => {
        if (prev[0]?.[1] !== focused) {
          const newFocusedHistory = prev.slice()
          if (newFocusedHistory.length > 10) {
            newFocusedHistory.pop()
          }
          return [[new Date(), focused], ...newFocusedHistory]
        }
        return prev
      })
    })
    .then((cb) => {
      unlisten = cb
    })
    return () => {
      unlisten?.()
    }
  }, [])


  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div>
      <div style={{
        height: '100px',
        width: '100%',
        backgroundColor: 'grey',
      }} data-tauri-drag-region>
        Drag me
      </div>

      <div className="container">

      <h1>Focused History</h1>
      <ul>
        {focusedHistory.map(([date, isFocused], idx) => isFocused ? (
          <li key={idx}>[{date.toISOString()}] {idx === 0 ? 'Current: ' : ''}Is focused</li>
          ) : (
            <li key={idx} style={{
              color: 'red',
            }}>[{date.toISOString()}] Is not focused</li>
          ))}
      </ul>

        <h1>Welcome to Tauri!</h1>

        <div className="row">
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo vite" alt="Vite logo" />
          </a>
          <a href="https://tauri.app" target="_blank">
            <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <p>
          Click on the Tauri, Vite, and React logos to learn more about each
          framework.
        </p>

        <div className="row">
          <div>
            <input
              id="greet-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter a name..."
            />
            <button type="button" onClick={() => greet()}>
              Greet
            </button>
          </div>
        </div>
        <p>{greetMsg}</p>
      </div>
    </div>
  );
}

export default App;
