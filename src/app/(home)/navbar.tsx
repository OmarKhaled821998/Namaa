"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavbarSidebar } from "./navbar-sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon } from "lucide-react"; // XIcon is not directly used for this fix, but often useful for close buttons

// Initialize Poppins font with specified subsets and weight
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

// Define props for NavbarItem component
interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

// NavbarItem component for individual navigation links
const NavbarItem = ({
  href,
  children,
  isActive,
}: NavbarItemProps) => {
  return (
    <Button
      asChild // Render as a child component (Link in this case)
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-[#CDAA7D] border-transparent px-3.5 text-lg",
        isActive && "bg-[#1A1A40] text-white hover:bg-[#1A1A40]" // Active state styling
      )}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
};

// Array of navigation items for the Navbar
const NavbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

// Main Navbar component
export const Navbar = () => {
  const pathname = usePathname(); // Get current path for active link highlighting
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  return (
    <nav className={cn(
      "h-20 flex border-b justify-between font-medium bg-white",
      poppins.className // Apply Poppins font
    )}>
      {/* Logo/Brand link */}
      <Link href="/" className="pl-6 flex items-center"> {/* Added flex and items-center for vertical alignment */}
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funbroad
        </span>
      </Link>

      {/* NavbarSidebar component (assumed to handle the actual sidebar content) */}
      <NavbarSidebar
        items={NavbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      {/* Desktop navigation items */}
      <div className="items-center gap-4 hidden lg:flex">
        {NavbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {/* Desktop login/signup buttons */}
      <div className="hidden lg:flex">
        <Button
          asChild
          variant="secondary"
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white
           hover:bg-[#CDAA7D] hover:text-white transition-colors text-lg"
        >
          <Link href="/sign-in">
            Log In
          </Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-[#1A1A40] text-white
           hover:bg-[#CDAA7D] hover:text-black transition-colors text-lg"
        >
          <Link href="/sign-up">
            Start Selling
          </Link>
        </Button>
      </div>

      {/* Mobile menu button - Only visible on small screens and when sidebar is NOT open */}
      {!isSidebarOpen && (
        <div className="flex lg:hidden items-center justify-center pr-4"> {/* Added pr-4 for right padding */}
          <Button
            variant="ghost"
            className="size-12 border-transparent bg-white flex items-center justify-center" // Ensure content is centered
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon className="h-6 w-6" /> {/* Explicitly set icon size for consistency */}
            <span className="ml-2 text-lg">Menu</span> {/* Added "Menu" text */}
          </Button>
        </div>
      )}
    </nav>
  );
};
