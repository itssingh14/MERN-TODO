import Header from "./components/Header/Header";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from "./screens/LandingPage/LandingPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import ProfilePage from "./screens/ProfilePage/ProfilePage";
import TaskPage from "./screens/TaskPage/TaskPage";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/tasks" element={<TaskPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
