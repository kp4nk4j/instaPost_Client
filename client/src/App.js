import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './pages/Welcome';
import PostForm from './form/PostForm';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/create" element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
