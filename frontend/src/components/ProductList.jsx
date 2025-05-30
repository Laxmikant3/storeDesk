import { useEffect, useState } from 'react';
import { Search, Trash2, Edit, Save, X } from 'lucide-react';
import { useProductContext } from '../context/productContext';
import toast, { Toaster } from 'react-hot-toast';

function ProductList() {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '', description: '', image_url: '' });
  const { products, fetchProducts, deleteProduct, editProduct, loading } = useProductContext();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const result = await deleteProduct(id);
    if (!result.success) {
      alert('Error deleting product');
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image_url: product.image_url
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    const payload = {
      name: editForm.name,
      price: editForm.price,
      description: editForm.description,
      image_url: editForm.image_url,
    };

    const result = await editProduct(id, payload);
    if (result.success) {
      setEditingId(null);
      toast.success('Product updated successfully!');
      fetchProducts();
    } else {
      toast.error('Error updating product');
    }
  };

  const parseSmartSearch = (query) => {
    const lower = query.toLowerCase();
    let priceFilter = null;

    if (lower.includes('under')) {
      const match = lower.match(/under\s+(\d+)/);
      if (match) priceFilter = { type: 'under', value: parseFloat(match[1]) };
    } else if (lower.includes('above')) {
      const match = lower.match(/above\s+(\d+)/);
      if (match) priceFilter = { type: 'above', value: parseFloat(match[1]) };
    }

    const cleanedKeyword = lower.replace(/(under|above)\s+\d+/gi, '').trim();
    return { keyword: cleanedKeyword, priceFilter };
  };

  const { keyword, priceFilter } = parseSmartSearch(search);

  const filteredProducts = products.filter((product) => {
    const matchesKeyword =
      product.name?.toLowerCase().includes(keyword) ||
      product.description?.toLowerCase().includes(keyword);

    const matchesPrice =
      !priceFilter ||
      (priceFilter.type === 'under' && product.price <= priceFilter.value) ||
      (priceFilter.type === 'above' && product.price >= priceFilter.value);

    return matchesKeyword && matchesPrice;
  });

  return (
    <div className="max-w-7xl mx-auto mt-4 px-4">
      {/* Add the Toaster component */}
      <Toaster position="top-right" />

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-3 text-gray-500" size={18} />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center my-10">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-4 flex flex-col relative">
                {editingId === product.id ? (
                  <>
                    <input
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="mb-2 p-2 w-full border rounded bg-white text-gray-900"
                      placeholder="Name"
                    />
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      value={editForm.price}
                      onChange={handleEditChange}
                      className="mb-2 p-2 w-full border rounded bg-white text-gray-900"
                      placeholder="Price"
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="mb-2 p-2 w-full border rounded bg-white text-gray-900"
                      placeholder="Description"
                    />
                    <input
                      name="image_url"
                      value={editForm.image_url}
                      onChange={handleEditChange}
                      className="mb-2 p-2 w-full border rounded bg-white text-gray-900"
                      placeholder="Image URL"
                    />
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={() => handleEditSave(product.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                      >
                        <Save size={16} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={product.image_url || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="w-full h-48 object-contain mb-3"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <h2 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h2>
                    <p className="text-gray-600 text-xs mb-2 line-clamp-2">{product.description}</p>
                    <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products found. Try a different search or add some products.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
