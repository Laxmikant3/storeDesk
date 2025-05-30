import { ShoppingBag } from 'lucide-react';
import cartImg from '../assets/image2.png';

const Landing = ({ onAddProductClick }) => {
  return (
    <div className="min-h-[calc(50vh-4rem)] flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto mt-7 px-4 text-center md:text-left">
     
      <div className="flex-1">
        <ShoppingBag size={64} className="text-amber-500 mb-6 mx-auto md:mx-0" />
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Welcome to <span className="text-white">Store</span>
          <span className="text-amber-500">Desk</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Easily manage your product listings with our intuitive interface.
        </p>
        <button
          onClick={onAddProductClick}
          className="bg-amber-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-amber-600 transition duration-200"
        >
          Add Product
        </button>
      </div>

      <div className="flex-1 mt-10 md:mt-0">
        <img
          src={cartImg}
          alt="Shopping Cart"
          className="w-full max-w-md mx-auto"
          style={{ mixBlendMode: 'screen', opacity: 0.85 }}
        />
      </div>
    </div>
  );
};

export default Landing;
