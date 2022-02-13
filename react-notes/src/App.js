import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {ErrorPage, LoginPage, RegisterPage, LandingPage, HomePage, Note, CreateNote} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/register" element={<RegisterPage/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/home" element={<HomePage/>}/>
        <Route exact path="/note/:id" element={<Note/>}/>
        <Route exact path="/note/create" element={<CreateNote/>}/>
        <Route exact path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
