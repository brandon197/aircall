import React from "react";
import ReactDOM from "react-dom";

import Header from "./Components/Header.jsx";
import CallList from "./Components/CallList.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <CallList />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
