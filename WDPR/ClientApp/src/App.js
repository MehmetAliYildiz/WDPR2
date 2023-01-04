import Login from "./components/Login/Login"
import {Routes, Route} from 'react-router-dom'
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
  integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
  crossorigin="anonymous"
/>


function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Login/>}/>

      </Routes>
    </div>

  );
}

export default App;
