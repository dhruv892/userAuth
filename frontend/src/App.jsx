import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { SignUp } from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import { Home } from "./pages/Home";
// import './App.css';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    
  )
}

export default App
