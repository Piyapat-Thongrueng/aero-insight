import "./App.css";
import HeroSection from "./components/layout/HeroSection";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
      </div>
    </>
  );
}

export default App;
