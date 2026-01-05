import "./App.css";
import ArticleSection from "./components/sections/ArticleSection";
import HeroSection from "./components/sections/HeroSection";
import Navbar from "./components/layout/Navbar";
import {Footer} from "./components/layout/Footer";

function App() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <ArticleSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
