import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BestCityToMoveTo</h3>
            <p className="text-gray-400">Find your perfect city match and connect with potential roommates.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/quiz" className="text-gray-400 hover:text-white transition">
                  City Quiz
                </Link>
              </li>
              <li>
                <Link href="/results" className="text-gray-400 hover:text-white transition">
                  Browse Cities
                </Link>
              </li>
              <li>
                <Link href="/roommates" className="text-gray-400 hover:text-white transition">
                  Find Roommates
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Moving Guides
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={24} />
              </a>
            </div>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2">Subscribe to our newsletter</h5>
              <form onSubmit={handleSubscribe} className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-primary text-gray-900"
                />
                <Button 
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} BestCityToMoveTo.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
