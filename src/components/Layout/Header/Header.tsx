"use client"

import Button from "@/components/Shared/Button/Button";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import tw from "tailwind-styled-components";

const HeaderWrapper = tw.header`
  w-full p-2 shadow-md flex justify-between items-center
`;

const Header = () => {

  const { user, logout } = useAuth();
  const router = useRouter();


  if(!user) {
    return null;
  } 

  const logoutUser = () => {
    logout();
    router.push("/login");
  }

  return (
    <HeaderWrapper>
      <h2>Welcome {user.name}</h2>
      <Button onClick={logoutUser} variant="dark">Logout</Button>
    </HeaderWrapper>
  );
}

export default Header;