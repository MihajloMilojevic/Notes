import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {ErrorPage, LoginPage, LandingPage, HomePage, Note} from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route exact path="/register" element={<Component text="register"/>}/>
        <Route exact path="/login" element={<LoginPage/>}/>
        <Route exact path="/home" element={<HomePage/>}/>
        <Route exact path="/note/:id" element={<Note/>}/>
        <Route exact path="/note/create" element={<Component text="create"/>}/>
        <Route exact path="*" element={<ErrorPage/>}/>
      </Routes>
    </Router>
  );
}

function Component({text})
{
  return (<h1>{text}</h1>)
}

export default App;
