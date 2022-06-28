import React from "react";
import ReactDOM from "react-dom/client";
import App_RelatedAndOutfit from "./components/relatedItems/index.jsx";

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Testing</h1>
        <App_RelatedAndOutfit />
      </div>
    );
  }
}

export default App;

ReactDOM.createRoot(document.getElementById('app')).render(<App />);


