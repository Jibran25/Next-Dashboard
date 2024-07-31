"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Shared/Button/Button";
import { Product } from "@/types/Product";
import { useProductContext } from "@/hooks/ProductContext";

export default function AddProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addProduct } = useProductContext();

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    quantity: 0
  });

  useEffect(() => {
    const query = searchParams.get('edit');
    if (query) {
      try {
        const parsedProduct = JSON.parse(decodeURIComponent(query)) as Product;
        setProduct(parsedProduct);
      } catch (error) {
        console.error("Error parsing product data:", error);
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { ...product, id: Date.now() };
    addProduct(newProduct);
    router.push('/manage-products');
  };

  return (
    <div className="flex flex-col gap-4">
      <h3>Add New Product</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label><b>Name</b></label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <label><b>Price</b></label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <label><b>Quantity</b></label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          required
          className="border rounded p-2"
        />
        <div className="flex gap-2">
          <Button type="submit" variant="dark">Add Product</Button>
          <Button type="button" variant="outline" onClick={() => router.push('/manage-products')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
