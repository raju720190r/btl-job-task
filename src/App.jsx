
import "./App.css";
import Footer from "./components/Footer";

import Home from "./components/Home";

function App() {
  

  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <Home></Home>
      </div>
      <div className="mt-auto">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
