"use client"

import UsersData from "@/data/users";
import ProductsData from "@/data/products";
import { User } from "@/types/User";
import { Product } from "@/types/Product";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(ProductsData);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const productData = localStorage.getItem("products");
    
    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
    
    if (productData) {
      setProducts(JSON.parse(productData) as Product[]);
    }
  }, []);

  const signup = (userData: User) => {
    const users = UsersData;
    users.push(userData);
    login(userData);
  };

  const addProduct = (productData: Product) => {
    const products = ProductsData;
    console.log(products);
    products.push(productData);
  };

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    login,
    logout,
    signup,
    addProduct,
    user
  };
}

export default useAuth;
