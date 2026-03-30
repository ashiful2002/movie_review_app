"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getUser } from "@/services/authentication";
import Logo from "./Logo";
import LogOut from "../Buttons/Logout";
import { UserTypes } from "@/types";
import { ModeToggle } from "../Buttons/ModeToggler";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserTypes | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    const getCurrentUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };

    getCurrentUser();
  }, []);
  const navLinks: any[] = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
  ];
 
  const firstName = user?.name?.trim()?.split(" ")?.[0] || "";
  return (
    <nav className="w-full border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-yellow-400" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <Link href={"/dashboard"}>
                <Button>Dashboard</Button>
              </Link>
              <LogOut />
              <ModeToggle />
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <Button>Login</Button>
              </Link>
              <ModeToggle />
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size={"icon"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col gap-3 px-3 pt-3"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-lg font-medium transition-colors ${
                    pathname === link.href ? "text-red-500" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href={"/dashboard"}>
                    <Button>Dashboard</Button>
                  </Link>{" "}
                  <ModeToggle />
                  <LogOut />
                </>
              ) : (
                <>
                  <ModeToggle />
                  <Link href={"/login"}>
                    <Button>Login</Button>
                  </Link>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
