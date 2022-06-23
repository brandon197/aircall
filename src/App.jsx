import React from "react";
import ReactDOM from "react-dom";

import Header from "./Header.jsx";
import CallList from "./CallList.jsx";

const App = () => {
  
  return (
    <div className="container">
      <Header />
      <div className="main">
        <CallList />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
