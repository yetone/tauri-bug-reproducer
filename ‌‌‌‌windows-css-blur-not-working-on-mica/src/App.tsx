import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { Effect } from '@tauri-apps/api/window';
import { getCurrent } from '@tauri-apps/api/webviewWindow';
import "./app.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const appWindow = getCurrent();
    appWindow.setEffects({ effects: [Effect.Mica] });
  }, [])

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <div className="background">I am Background</div>
      <div className="overlay" />
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

      <p style={{ position: 'relative', zIndex: 1 }}>
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
      <p>When an element has an opaque background, the upper layer's `backdrop-filter: blur(3px);` will take effect, otherwise the element remains clearly visible.</p>
    </div>
  );
}

export default App;
