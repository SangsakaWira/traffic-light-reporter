import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Menu, Moon, Sun, User } from "lucide-react";
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
  onLogin = () => { },
  onRegister = () => { },
  onLogout = () => { },
  onToggleTheme = () => { },
  isDarkTheme = false,
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          {/* Mobile logo (visible on mobile screens) */}
          <img
            src="/logo-mobile.png"
            alt="LAPORPJU Mobile Logo"
            className="h-16 w-auto my-6 inline md:hidden"
          />
          {/* Desktop logo (visible on screens medium and up) */}
          <img
            src="/logo.png"
            alt="LAPORPJU Desktop Logo"
            className="h-16 w-auto my-6 inline hidden md:inline"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Link
          to="/"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Peta
        </Link>
        <Link
          to="/tentang"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Tentang
        </Link>
        <Link
          to="/bantuan"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Bantuan
        </Link>
        <Link
          to="/search"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Cari
        </Link>
        <Link
          to="https://dishub.palembang.go.id"
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          Web Dishub
        </Link>
        {isAuthenticated && (
          <Link
            to="/dashboard"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Dasbor
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
              Masuk
            </Button>
            <Button size="sm" onClick={onRegister}>
              Daftar
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
                Peta
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
              >
                Tentang
              </Link>
              <Link
                to="/help"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
              >
                Bantuan
              </Link>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                  >
                    Dasbor
                  </Link>
                  <Link
                    to="/profile"
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                  >
                    Profil
                  </Link>
                  <Link
                    to="/settings"
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                  >
                    Pengaturan
                  </Link>
                  <Button variant="outline" onClick={onLogout} className="mt-2">
                    Keluar
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2 mt-2">
                  <Button onClick={onLogin}>Masuk</Button>
                  <Button variant="outline" onClick={onRegister}>
                    Daftar
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
