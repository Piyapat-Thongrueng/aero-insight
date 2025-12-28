import "./App.css";
import ArticleSection from "./components/layout/ArticleSection";
import HeroSection from "./components/layout/HeroSection";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen bg-white">
        <Navbar />
        <HeroSection />
        <ArticleSection />
      </div>
    </>
  );
}

export default App;
