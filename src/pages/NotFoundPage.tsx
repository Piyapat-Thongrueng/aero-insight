import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content - ใช้ flex-1 เพื่อให้เต็มพื้นที่ระหว่าง Navbar กับ Footer */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md w-full">
          {/* Icon - เครื่องหมายตกใจ (!) ในวงกลม */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-brown-600 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 md:w-14 md:h-14 text-brown-600" />
            </div>
          </div>

          {/* Page Not Found Text */}
          <h1 className="text-headline-2 text-2xl md:text-3xl lg:text-4xl font-bold text-brown-600 mb-8">
            Page Not Found
          </h1>

          {/* Go To Homepage Button */}
          <Button
            onClick={handleGoHome}
            className="w-full sm:w-auto px-6 py-6 md:px-6 md:py-8 md:text-lg"
          >
            Go To Homepage
          </Button>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFoundPage;
