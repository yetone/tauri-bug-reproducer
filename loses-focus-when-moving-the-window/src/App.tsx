import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { getCurrent } from '@tauri-apps/api/webviewWindow'
import { invoke } from "@tauri-apps/api/core";
import "./app.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const appWindow = getCurrent()
    let unlisten: (() => void) | undefined = undefined
    appWindow
    .onFocusChanged(({ payload: focused }) => {
      setIsFocused(focused)
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

      {isFocused ? (
        <h1>Is focused</h1>
        ) : (
          <h1 style={{
            color: 'red',
          }}>Is not focused</h1>
        )}

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
