// import './App.scss';
import React, { useState, useEffect } from 'react';

import './index.css';
import AppRoutes from './routes/Routes';
import Notification from './notification';

function App() {
  return (
    <div className="ed-app">
      <AppRoutes />
      {/* <Notification /> */}
    </div>
  );
}

export default App;
