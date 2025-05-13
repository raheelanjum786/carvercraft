import { useState } from "react";
import { Grid } from "antd";
import SideBar from "../components/Admin/SideBar";
import AdminHome from "../components/Admin/AdminHome";
const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  return (
    <>
      <div className="flex">
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
        {/* <div className="flex-1 "isOpen && !isMobile ? "ml-[256px]" : "ml-[84px]"> */}
        <div
          className={`min-h-screen bg-[#131313] p-6 flex-1 ${
            isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
          }`}
        >
          <AdminHome />
        </div>
      </div>
    </>
  );
};
export default AdminPage;
