import React from 'react';
import ReactDOM from 'react-dom/client';
import RatingsAndReviews from './components/RatingsAndReviews/RatingsAndReviews.jsx';
import App_RelatedAndOutfit from "./components/relatedItems/index.jsx";

const App = () => {
  return (
    <div>
      <h1>Testing</h1>
      <RatingsAndReviews />
      <App_RelatedAndOutfit />
    </div>
  );
};

export default App;

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
