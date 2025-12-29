import "./App.css";
import ArticleSection from "./components/layout/ArticleSection";
import HeroSection from "./components/layout/HeroSection";
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
