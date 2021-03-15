import './App.css';
import Usage from "./components"
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Usage />
      <ToastContainer  />
    </div>
  );
}

export default App;
