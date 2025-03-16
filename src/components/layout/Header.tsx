import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MapPin, Menu, Moon, Sun, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface HeaderProps {
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
  onLogin?: () => void;
  onRegister?: () => void;
  onLogout?: () => void;
  onToggleTheme?: () => void;
  isDarkTheme?: boolean;
}

const Header = ({
  isAuthenticated = false,
  userName = "User",
  userAvatar = "",
  onLogin = () => {},
  onRegister = () => {},
  onLogout = () => {},
  onToggleTheme = () => {},
  isDarkTheme = false,
}: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden md:inline">
            Street Light Reporter
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Map
        </Link>
        <Link
          to="/about"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          About
        </Link>
        <Link
          to="/help"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Help
        </Link>
        {isAuthenticated && (
          <Link
            to="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* User Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkTheme ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link to="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/dashboard" className="w-full">
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onLogin}>
              Login
            </Button>
            <Button size="sm" onClick={onRegister}>
              Register
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-6">
              <Link
                to="/"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
              >
                Map
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
              >
                About
              </Link>
              <Link
                to="/help"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
              >
                Help
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                  >
                    Settings
                  </Link>
                  <Button variant="outline" onClick={onLogout} className="mt-2">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Button onClick={onLogin}>Login</Button>
                  <Button variant="outline" onClick={onRegister}>
                    Register
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
