//NestedRouteSolution.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';

function ErrorBoundary({ children }) {
  const [error, setError] = React.useState(null);

  function handleClick(e) {
    e.preventDefault();
    setError(null);
  }

  const resetError = () => {
    setError(null);
  };

  function onError(error) {
    setError(error);
  }

  if (error) {
    return (
      <div role="alert">
        <h1>Oops! There's been an error.</h1>
        <details>
          <summary>Details</summary>
          <pre>{error.stack}</pre>
        </details>
        <button onClick={handleClick}>Try again</button>
      </div>
    );
  }

  return <>{children}</>;
}

function ChildRoute() {
  const { childId } = useParams();
  if (childId === 'invalid') {
    throw new Error('Invalid child ID');
  }
  return <div>Child Route: {childId}</div>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/nested/:parentId/child/:childId" element={<ChildRoute />} />
        <Route
          path="*"
          element={<div>Not found</div>}
        />
        <Route path="/error" element={<div>Error</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;