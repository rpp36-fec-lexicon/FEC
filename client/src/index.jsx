import React from 'react';
import ReactDOM from 'react-dom/client';
import RatingsAndReviews from './components/RatingsAndReviews/RatingsAndReviews.jsx';

const App = () => {
  return (
    <div>
      <h1>Testing</h1>
      <RatingsAndReviews />
    </div>
  );
}

export default App;


ReactDOM.createRoot(document.getElementById('app')).render(<App />);

