import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Jion from "./component/Jion/Jion.js";
import Chat from "./component/Chat/Chat.js"; // Import Chat component
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route   exact path="/" element={<Jion />} /> {/* Main route */}
          <Route path="/chat" element={<Chat />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
