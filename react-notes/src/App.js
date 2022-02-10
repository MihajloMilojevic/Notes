import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Component text="landing"/>}/>
        <Route exact path="/register" element={<Component text="register"/>}/>
        <Route exact path="/login" element={<Component text="login"/>}/>
        <Route exact path="/home" element={<Component text="home"/>}/>
        <Route exact path="/note/:id" element={<Component text="one"/>}/>
        <Route exact path="/note/create" element={<Component text="create"/>}/>
        <Route exact path="/note/edit/:id" element={<Component text="edit"/>}/>
        <Route exact path="*" element={<Component text="404"/>}/>
      </Routes>
    </Router>
  );
}

function Component({text})
{
  return (<h1>{text}</h1>)
}

export default App;
