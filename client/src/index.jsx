import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductOverview from './components/overview/ProductOverview.jsx';

const App = () => {
  return (
    <div>
      <h1>Testing</h1>
      <ProductOverview />
    </div>
  );
}

export default App;


ReactDOM.createRoot(document.getElementById('app')).render(<App />);

