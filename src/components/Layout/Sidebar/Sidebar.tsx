"use client"

import Link from "next/link";
import tw from "tailwind-styled-components";

const SidebarWrapper = tw.div`
  w-[200px] flex flex-col gap-4
  bg-black bg-opacity-50 h-[100vh] sticky top-[1px]  
`;

const CustomLink = tw(Link)`
  text-white
`;

const Sidebar = () => {

  return (
    <SidebarWrapper>
      <div className="shadow-md p-4">
        <h3 className="text-white">Ecommerce Platform</h3>
      </div>
      <nav className="p-4">
        <ul className="flex flex-col gap-3">
          <li>
            <CustomLink href="/dashboard">Dashboard</CustomLink>
          </li>
          <li>
            <CustomLink href="/manage-products">Manage Products</CustomLink>
          </li>
          <li>
            <CustomLink href="/manage-orders">Manage Orders</CustomLink>
          </li>
          <li>
            <CustomLink href="/settings">Settings</CustomLink>
          </li>
        </ul>
      </nav>
    </SidebarWrapper>
  );

}

export default Sidebar;