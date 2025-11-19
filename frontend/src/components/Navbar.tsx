import { useNavigate } from "react-router-dom";
import { Moon, Sun, User, LogOut, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-6 dark:border-[#374151] dark:bg-[#1F2937]">
      <div className="flex items-center gap-4">
        <h2 className="text-[20px] font-semibold text-[#1F2937] dark:text-[#F9FAFB]">
          Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-[#4B5563] hover:bg-[#E5E7EB] dark:text-[#D1D5DB] dark:hover:bg-[#374151]"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#4B5563] hover:bg-[#E5E7EB] dark:text-[#D1D5DB] dark:hover:bg-[#374151]"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#1F2937] text-white dark:bg-[#4B5563]">
                  PM
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <div className="text-[14px] font-medium text-[#1F2937] dark:text-[#F9FAFB]">
                  Programme Manager
                </div>
                <div className="text-[12px] text-[#4B5563] dark:text-[#D1D5DB]">
                  manager@gpt.gov.za
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

