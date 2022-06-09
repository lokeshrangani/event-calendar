import {
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/Auth/Auth";
import PageNotFound from './pages/PageNotFound';
import CreatSchedule from "./pages/Schedule/CreatSchedule";
import ViewSchedule from "./pages/Schedule/ViewSchedule";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Login />} />
        <Route exact path="/schedule" element={<CreatSchedule />} />
        <Route exact path="/home" element={<ViewSchedule />} />
      </Routes>
    </div>
  );
}

export default App;
