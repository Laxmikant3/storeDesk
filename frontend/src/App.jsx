import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import Landing from './components/Landing';
import Footer from './components/footer';

function App() {
  const [activeTab, setActiveTab] = useState('landing');

  const renderContent = () => {
    switch (activeTab) {
      case 'form':
        return <ProductForm />;
      case 'list':
        return <ProductList />;
      default:
        // Pass onAddProductClick handler as prop to Landing
        return <Landing onAddProductClick={() => setActiveTab('form')} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#232F3E] text-white relative flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-10 bg-[#131921]/80 backdrop-blur shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1
            className="text-2xl font-bold text-amber-500 cursor-pointer"
            onClick={() => setActiveTab('landing')}
          >
            StoreDesk
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === 'form' ? 'bg-amber-600' : 'hover:bg-amber-500'
              }`}
            >
              Add Product
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === 'list' ? 'bg-amber-600' : 'hover:bg-amber-500'
              }`}
            >
              View Products
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer for navbar height */}
      <div className="h-16" />

      {/* Main content */}
      <main className="flex-grow">{renderContent()}</main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
