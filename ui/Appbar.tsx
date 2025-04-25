import Link from "next/link";
import { Button } from "./button";
import { FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa"; // Using icons for better UX

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({
  user,
  onSignin,
  onSignout,
}: AppbarProps) => {
  return (
    <header className="flex justify-between items-center py-4 px-6 bg-gray shadow-md border-b border-slate-300">
      <Link
        href="/dashboard"
        className="text-2xl font-semibold text-indigo-700 hover:text-indigo-600 transition-colors flex items-center"
      >
        <h2 className="mr-2">PaySwift</h2>
        <span className="text-sm text-slate-500">Your Payment Solution</span>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-gray-800">{user.name}</span>
            <Button onClick={onSignout}>
              <FaSignOutAlt /> Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button onClick={onSignin}>
              <FaSignInAlt /> Login
            </Button>
            <Link href="/api/auth/signup">
              <Button >
                <FaUser /> Signup
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

