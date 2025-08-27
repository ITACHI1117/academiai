"use client";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/services/auth.service";
import { useToast } from "../ui/toast";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, BookOpen, MessageSquare } from "lucide-react";

const adminMenuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
];

export const AdminNavBar = () => {
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear token cookie
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    
    logout()
      .then(() => {
        window.location.href = '/auth/login';
      })
      .catch((err) => {
        toast({
          title: "Error logging out",
          variant: "destructive",
        });
        console.log("Error logging out", err);
        // Redirect anyway
        window.location.href = '/auth/login';
      });
  };

  return (
    <header>
      <nav className="fixed z-20 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <Link href="/admin/dashboard" className="flex items-center space-x-2">
                <Logo />
                <span className="text-sm font-medium text-orange-600">Admin</span>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                {adminMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
              >
                Log Out
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};