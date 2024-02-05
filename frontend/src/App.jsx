import {BrowserRouter, Routes, Route} from 'react-router-dom';

import { SignUp } from "./pages/Signup";
import { SignIn } from "./pages/Signin";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
