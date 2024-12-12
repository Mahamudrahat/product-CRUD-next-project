import { useEffect, useState } from "react";
import { getProductList, deleteProduct } from "../services/productService";

export default function Home() {
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Code</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.ProductName}</td>
              <td>{product.ProductCode}</td>
              <td>{product.Qty}</td>
              <td>{product.UnitPrice}</td>
              <td>{product.TotalPrice}</td>
              <td>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
                <a href={`/edit/${product._id}`}>Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
