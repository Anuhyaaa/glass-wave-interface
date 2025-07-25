import { Search, Menu, MapPin, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import AuthModal from "./AuthModal";

interface HeaderProps {
  onAuthModalOpen?: () => void;
}

const Header = ({ onAuthModalOpen }: HeaderProps) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignInClick = () => {
    if (onAuthModalOpen) {
      onAuthModalOpen();
    } else {
      setIsAuthModalOpen(true);
    }
  };
  return (
    <header className="glass-card rounded-lg m-4 p-4 sticky top-4 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center pulse-glow">
            <span className="text-primary-foreground font-bold text-xl">T</span>
          </div>
          <h1 className="gradient-text text-xl font-bold hidden sm:block">
            TechFinder
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for technicians or services..."
              className="pl-10 glass-card border-0 bg-muted/30"
            />
          </div>
        </div>

        {/* Location & Profile */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </Button>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-white/80 text-sm hidden md:block">
                {user.user_metadata?.name || user.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignInClick}
              className="text-white hover:bg-white/10"
            >
              <User className="h-4 w-4" />
            </Button>
          )}
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;