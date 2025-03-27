import { Link } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">BestCityToMoveTo</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/quiz" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Quiz
            </Link>
            <Link href="/results" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Cities
            </Link>
            <Link href="/roommates" className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium">
              Roommates
            </Link>
          </div>
          
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-gray-600">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Home
            </Link>
            <Link href="/quiz" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Quiz
            </Link>
            <Link href="/results" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Cities
            </Link>
            <Link href="/roommates" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50">
              Roommates
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
