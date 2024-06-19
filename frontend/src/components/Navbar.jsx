import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className="h-[90px] w-screen bg-blue-600 flex items-center justify-between px-5">
      <p className="text-3xl text-white hover:underline hover:underline-offset-8 cursor-pointer">
        Home
      </p>
      <div className="flex items-center">
        {isSignedIn ? (
          <div className="flex items-center">
            {/*<p className="text-white mr-4">Signed in as {user?.fullName}</p> */}
            <UserButton
              userProfileMode="navigation"
              className="w-20 h-20 text-7xl rounded-full overflow-hidden border-2 border-white"
            />
            <SignOutButton className="bg-white text-blue-600 px-4 py-2 mx-3 rounded-md shadow-md hover:bg-gray-100 transition duration-300" />
          </div>
        ) : (
          <div className="flex items-center">
            <p className="text-white mr-4">Not signed in</p>
            <SignInButton className="bg-white text-blue-600 px-4 py-2 mx-1 rounded-md shadow-md hover:bg-gray-100 transition duration-300" />
            <SignUpButton className="bg-white text-blue-600 px-4 py-2 mx-1 rounded-md shadow-md hover:bg-gray-100 transition duration-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
