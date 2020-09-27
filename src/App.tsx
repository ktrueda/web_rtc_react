import React from "react";
import logo, { ReactComponent } from "./logo.svg";
import "./App.css";
import TransmitterComponent from "./TransmitterComponent";
import ReceiverComponent from "./ReceiverComponent";
import "./another-stylesheet.css";

export type Mode = "Transmitter" | "Receiver" | null;

class App extends React.Component<{}, { mode: Mode }> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: null,
    };
  }

  modeSelector = (
    <div>
      <select
        onChange={(e) => {
          const newMode = e.target.value;
          if (newMode === "Transmitter" || newMode === "Receiver") {
            this.setState({
              mode: newMode as Mode,
            });
          } else {
            this.setState({
              mode: null,
            });
          }
        }}
      >
        <option value="Null">Mode Select</option>
        <option value="Transmitter">Transmitter</option>
        <option value="Receiver">Receiver</option>
      </select>
    </div>
  );
  render() {
    return (
      <div className="App">
        <h1>WebRTC Sample Project using React.js (Mode:{this.state.mode})</h1>

        {this.state.mode === "Transmitter" ? (
          <TransmitterComponent />
        ) : this.state.mode === "Receiver" ? (
          <ReceiverComponent />
        ) : (
          this.modeSelector
        )}
      </div>
    );
  }
}

export default App;
