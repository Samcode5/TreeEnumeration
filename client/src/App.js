
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js"
import Welcome from './components/Welcome/Welcome.js'
import About from './components/About/About.js'
// import ServicesSection from './components/ServicesSection/ServicesSection'
import Footer from "./components/Footer/Footer.js"
import './index.css'
import TreeCount from './pages/TreeCount.jsx';
import OptimalPath from './pages/OptimalPath.jsx';
import GreenSpace from './pages/GreenSpace.jsx';
import Sameer from "./pages/Sameer.jsx";
import HistoricalData from "./pages/HistoricalData.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar/>
        <Routes >
          <Route exact path="/" element={<div><Welcome /><About /></div>} />
          <Route path="/treecount" element={<TreeCount />} />
          <Route path="/greenspace" element={<GreenSpace/>} />
          <Route path="/optimalpath" element={<OptimalPath />} />
          <Route path="/historicaldata" element={<HistoricalData />} />
        </Routes>
        {/* <Footer /> */}
        {/* <ServicesSection/> */}
      </div>
    </Router>
  );
}

export default App;
