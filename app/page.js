"use client"
import Header from "@/components/Header";
import { useState , useEffect } from "react";

export default function Home() {
  const [productForm, setProductForm] = useState({})
  const [products, setProducts] = useState([])
 
useEffect(() => {
  const fetchproducts=async()=>{
    const response = await fetch('/api/product')
    let rjson= await response.json();
    setProducts(rjson.product)
    
  }
  fetchproducts()
  
},[]) 

  const addProduct = async (data) => {
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("data inserted successfully")
      }else{

        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Failed to add product:', error);
      throw error;
    }
   
  };

  const handleChange = (e)=>{
    setProductForm({...productForm, [e.target.name]: e.target.value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const result =await addProduct(productForm);
      console.log('Product added:', result);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  
  return (
    <>
      <Header />
      <div className="container m-auto  p-4">
        <h1 className="text-xl font-bold mb-4">Search a Product</h1>
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Select Product</label>
          <input type="text" id="name" name="name" required className="mt-1  w-11/12 p-2 border border-gray-300 rounded-md" />


          <select id="search" name="search" className="mt-1  p-2 border border-gray-300 rounded-md">
           
          </select>
          <h1 className="text-xl font-bold mb-4">Add a Product</h1>
          <form onSubmit={handleSubmit}  className="mb-4">
            <div className="mb-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
              <input   onChange={handleChange} type="text" id="name" name="product" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-2">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
              <input onChange={handleChange} type="number" id="quantity" name="quantity" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="mb-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input  onChange={handleChange} type="number"  name="price" required  className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <button  type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Add Product</button>
          </form>


        </div>

        <h1 className="text-xl font-bold mb-4">Display Current Stock</h1>
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(products) && products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item._id}>
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.product}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.price || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
