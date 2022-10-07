import React from 'react';
import './App.less'
import Header from "./Components/Header/Header";
import AppRouter from "./Router/Router";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Header/>
              <AppRouter/>
          </div>
      </BrowserRouter>
  );
}

export default App;
