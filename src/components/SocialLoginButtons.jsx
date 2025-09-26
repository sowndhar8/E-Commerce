import React from "react";

const SocialLoginButtons = ({ handleGoogle, handleFacebook }) => (
  <div className="flex flex-col gap-2">
    <button
      onClick={handleGoogle}
      className="w-full border py-2 rounded-lg hover:bg-gray-100 transition"
    >
      Continue with Google
    </button>
    <button
      onClick={handleFacebook}
      className="w-full border py-2 rounded-lg hover:bg-gray-100 transition"
    >
      Continue with Facebook
    </button>
  </div>
);

export default SocialLoginButtons;
