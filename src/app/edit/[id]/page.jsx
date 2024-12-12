"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getProductDetailsById, updateProduct } from "../../../services/productService";

export default function EditProduct() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState({
    ProductName: "",
    ProductCode: "",
    Qty: 0,
    UnitPrice: 0,
    TotalPrice: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const fetchProductDetails = async () => {
    const response = await getProductDetailsById(id);
    if (response && response.data) {
      setProduct({
        ProductName: response.data[0].ProductName || "",
        ProductCode: response.data[0].ProductCode || "",
        Qty: response.data[0].Qty || 0,
        UnitPrice: response.data[0].UnitPrice || 0,
        TotalPrice: response.data[0].TotalPrice || 0,
      });
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      TotalPrice: product.Qty * product.UnitPrice,
    };
    await updateProduct(id, updatedProduct);
    router.push("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Product</h1>
      <form onSubmit={handleUpdateProduct} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="ProductName"
            value={product.ProductName || ""}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Product Code</label>
          <input
            type="text"
            name="ProductCode"
            value={product.ProductCode || ""}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Quantity</label>
          <input
            type="number"
            name="Qty"
            value={product.Qty || 0}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Unit Price</label>
          <input
            type="number"
            name="UnitPrice"
            value={product.UnitPrice || 0}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
