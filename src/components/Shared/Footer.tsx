import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-yellow-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* About / Brand */}
        <div className="space-y-2">
          <Logo />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Best Movie review platform right now, stay tuned to the biggest
            blast of the year
          </p>
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/ashiful2002" target="_blank">
                <Github />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://www.facebook.com/ashifulislam.mukto/"
                target="_blank"
              >
                <Facebook />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://www.instagram.com/ashifulislammukto/"
                target="_blank"
              >
                <Instagram />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/" target="_blank">
                <Linkedin />
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Email: support@mmdb.com
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Phone: 01759-907907
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="flex justify-around  border-t border-gray-200 dark:border-gray-700 mt-4">
        <p className="text-center text-sm py-4 text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} mmdb. All rights reserved.
        </p>
        <p className="text-center text-sm py-4 text-gray-500 dark:text-gray-400">
          Developed by
          <a
            className="ml-1 underline "
            href="https://ashiful-islam.vercel.app"
            target="_blank"
          >
            Mukto
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
