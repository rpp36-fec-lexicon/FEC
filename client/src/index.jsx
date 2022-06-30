import React from "react";
import ReactDOM from "react-dom/client";
import RelatedAndOutfit from "./components/relatedItems/index.jsx";

const App = () => {
  return (
    <div>
      <h1>Testing</h1>
      <RelatedAndOutfit />
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
