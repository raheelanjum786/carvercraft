import SideBar from "../../../../cravy/FrontEnd/src/components/Admin/SideBar";
import AdminHome from "../../../../cravy/FrontEnd/src/components/Admin/AdminHome";
import AdminSettings from "../../../../cravy/FrontEnd/src/components/Admin/AdminSettings";
import { useState } from "react";
import { Grid } from "antd";
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
          className={`min-h-screen bg-gradient-to-br from-[#310A0B] to-[#491B1D] p-6 flex-1 ${
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
