import BotLogin from './Components/BotLogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import Chat from "./Components/Chat";
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<BotLogin/>} />
        <Route exact path="/Chat" element={<Chat/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
