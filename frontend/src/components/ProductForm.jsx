import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { useProductContext } from '../context/productContext';

function ProductForm() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { addProduct } = useProductContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await addProduct({
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      image_url: form.image_url,
    });

    if (result.success) {
      toast.success('Product submitted!');
      setForm({ name: '', price: '', description: '', image_url: '' });
    } else {
      toast.error('Error submitting product');
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn px-4 mt-10">
      <div className="bg-[#232F3E] p-8 rounded-xl shadow-lg border border-[#37475A]">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
          <Plus size={22} className="mr-2 text-amber-500" />
          Add New Product
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-300 mb-1">Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-[#37475A] bg-[#131921] p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Price (₹)</label>
              <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="w-full border border-[#37475A] bg-[#131921] p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-[#37475A] bg-[#131921] p-3 rounded-md text-white h-24 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-1">Image URL</label>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-[#37475A] bg-[#131921] p-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-lg font-medium flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          >
            {submitting && (
              <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
            )}
            {submitting ? 'Submitting...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
