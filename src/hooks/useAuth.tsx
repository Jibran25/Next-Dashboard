"use client"

import UsersData from "@/data/users";
import { User } from "@/types/User";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
    
  }, []);

  const signup = (userData: User) => {
    const users = UsersData;
    users.push(userData);
    login(userData);
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
    user
  };
}

export default useAuth;
