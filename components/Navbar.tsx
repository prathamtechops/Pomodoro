import { navLinks } from "@/constants";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-2xl  font-bold  md:text-3xl">Pomodoro</h1>
      <div className="space-x-4">
        {navLinks.map((link) => (
          <Link
            className="text-xs text-gray-500 hover:underline  dark:text-gray-400  md:text-xl"
            key={link.name}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
