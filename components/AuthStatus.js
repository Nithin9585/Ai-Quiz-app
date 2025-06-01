"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut, UserCircle } from "lucide-react"; // Added icons

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-gray-400 text-sm animate-pulse">Authenticating...</p>;
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm font-medium rounded-lg shadow-md hover:from-gray-500 hover:to-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
      >
        <LogIn size={18} className="mr-2" />
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-3 bg-gray-700 bg-opacity-50 p-2.5 rounded-lg shadow">
      {session.user.image ? (
        <img src={session.user.image} alt="User" className="w-8 h-8 rounded-full" />
      ) : (
        <UserCircle size={24} className="text-gray-400" />
      )}
      <div>
        <p className="text-xs text-gray-300">Signed in as</p>
        <p className="text-sm font-medium text-white truncate max-w-[150px]" title={session.user.email}>
            {session.user.name || session.user.email}
        </p>
      </div>
      <button
        onClick={() => signOut()}
        title="Sign out"
        className="p-2 bg-gray-600 hover:bg-red-600 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-red-500"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
}