"use client";
import { useEffect, useState } from "react";
import { getProductList, deleteProduct, createProduct } from "../services/productService";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    ProductName: "",
    ProductCode: "",
    Qty: "",
    UnitPrice: "",
    TotalPrice: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("ProductList");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProductList();
    setProducts(data.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const product = { ...newProduct, TotalPrice: newProduct.Qty * newProduct.UnitPrice };
    await createProduct(product);
    setNewProduct({ ProductName: "", ProductCode: "", Qty: "", UnitPrice: "", TotalPrice: "" });
    fetchProducts();
    setShowModal(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 mb-6 text-white flex justify-between items-center">
        <div>
          <button
            className={`mr-4 ${activeTab === "ProductList" ? "font-bold" : ""}`}
            onClick={() => setActiveTab("ProductList")}
          >
            Product List
          </button>
          <button
            className={`mr-4 ${activeTab === "CreateProduct" ? "font-bold" : ""}`}
            onClick={() => setShowModal(true)}
          >
            Create Product
          </button>
        </div>
      </nav>

      {/* Main Content */}
      {activeTab === "ProductList" && (
        <div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Product List</h1>
          <table className="min-w-full table-auto border-collapse border border-gray-200 shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Product Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Code</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Unit Price</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-600">Total Price</th>
                <th className="border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white hover:bg-gray-50 transition duration-150"
                >
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{product.ProductName}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{product.ProductCode}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{product.Qty}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{product.UnitPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{product.TotalPrice}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded-md text-sm hover:bg-red-600 transition duration-150"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                    <a
                      href={`/edit/${product._id}`}
                      className="ml-3 bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600 transition duration-150"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Product</h2>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <input
                  type="text"
                  name="ProductName"
                  value={newProduct.ProductName}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="ProductCode"
                  value={newProduct.ProductCode}
                  onChange={handleInputChange}
                  placeholder="Product Code"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  name="Qty"
                  value={newProduct.Qty}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  name="UnitPrice"
                  value={newProduct.UnitPrice}
                  onChange={handleInputChange}
                  placeholder="Unit Price"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
