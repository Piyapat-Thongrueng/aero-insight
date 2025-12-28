import "./App.css";
import Navbar from "./components/layout/Navbar";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
