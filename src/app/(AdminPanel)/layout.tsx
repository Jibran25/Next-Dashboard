import Header from "@/components/Layout/Header/Header";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";

export default function AdminPanelLayout({ children }: {children: React.ReactNode}){
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
