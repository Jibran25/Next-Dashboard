"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import initialProducts from '@/data/products';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const storedProducts = localStorage.getItem('products');
      return storedProducts ? JSON.parse(storedProducts) : initialProducts;
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts(prevProducts => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
