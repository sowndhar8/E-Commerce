import React, { useState } from "react";
import LoginPage from "./LoginPage"; // your login component

const LoginModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className=""
      >
        Open Login
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Background with blur */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)} // close on background click
          ></div>

          {/* Modal content */}
          <div className="relative z-10 w-[400px]">
            <LoginPage /> {/* your login form */}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;
