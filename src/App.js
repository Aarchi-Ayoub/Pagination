import React from "react";
import Provider from "./data/Context";
import Home from "./components/pagination/Home";
import Scroll from "./components/scroll/Scroll";

const App = () => {
  return (
    <Provider>
      {/*<Home />*/}

      <Scroll />
    </Provider>
  );
};

export default App;
