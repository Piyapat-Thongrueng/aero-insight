import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ViewPostSection from "@/components/sections/ViewPostSection";

const ViewPostPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ViewPostSection />
      <Footer />
    </div>
  );
};

export default ViewPostPage;
