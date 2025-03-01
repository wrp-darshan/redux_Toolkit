import React from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { openPopup } from "../../Store/Reducer/PopUpSlice";
import { clearEditingUser } from "../../Store/Reducer/UserSlice";

function Header() {
  const dispatch = useDispatch();

  const handleAddUser = () => {
    dispatch(clearEditingUser()); 
    dispatch(openPopup()); 
  };

  return (
    <div className="bg-header-gradient sticky top-0 left-0 right-0 z-30">
      <div className="container">
        <div className="flex justify-between items-center py-3">
          <h1 className="font-bold text-xl">Redux-Toolkit</h1>
          <Button
            onClick={handleAddUser}
            variant="contained"
            className="!shadow-none !font-[syne] flex items-center !bg-orange-500 !text-base text-white !font-semibold !capitalize !rounded-full !py-3 !px-5"
          >
            <FaPlus className="mr-2" />
            Add Users
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
