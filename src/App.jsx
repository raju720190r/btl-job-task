
import "./App.css";
import Footer from "./components/Footer";

import Home from "./components/Home";

function App() {
  

  return (
    <div>
      <Home></Home>
      <div className="fixed w-full bottom-0">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
