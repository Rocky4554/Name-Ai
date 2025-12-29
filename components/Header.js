"use client";

import Link from "next/link";
import Image from "next/image";
import { User, LifeBuoy, Heart, Search, Menu, X, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ModeToggle";

export default function Header({ showThemeToggle = true, onMenuClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Domains for Sale", href: "/domains" },
        { name: "Free Domain Tools", href: "/tools" },
        { name: "Naming & Branding Services", href: "/services" },
        { name: "Why Name.ai", href: "/about" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Updated Logo Section */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.jpg"
                                alt="Logo"
                                width={45}  // 👈 change this to increase logo size anytime
                                height={45}
                                className="w-auto h-auto max-w-[130px] sm:max-w-[150px] md:max-w-[170px] transition-all duration-300"
                                style={{ width: "auto", height: "auto" }} // keeps responsiveness
                                priority
                            />
                            <span className="font-bold text-xl tracking-tight hidden sm:block">
                                name.ai
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <DropdownMenu open={isUserMenuOpen} onOpenChange={setIsUserMenuOpen}>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors outline-none"
                                    onMouseEnter={() => setIsUserMenuOpen(true)}
                                >
                                    <User size={20} />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-48"
                                onMouseEnter={() => setIsUserMenuOpen(true)}
                                onMouseLeave={() => setIsUserMenuOpen(false)}
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/auth/signin" className="cursor-pointer flex items-center gap-2">
                                        <LogIn className="w-4 h-4" />
                                        <span>Login</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/auth/signup" className="cursor-pointer flex items-center gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        <span>Signup</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                            <LifeBuoy size={20} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                            <Heart size={20} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                            <Search size={20} />
                        </button>

                        {showThemeToggle && <ModeToggle />}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-muted-foreground hover:text-primary focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-b border-border">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-muted"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="flex justify-around pt-4 border-t border-border mt-4">
                            <Link href="/auth/signin" className="p-2 text-muted-foreground hover:text-primary"><User /></Link>
                            <button className="p-2 text-muted-foreground hover:text-primary"><LifeBuoy /></button>
                            <button className="p-2 text-muted-foreground hover:text-primary"><Heart /></button>
                            <button className="p-2 text-muted-foreground hover:text-primary"><Search /></button>
                            {showThemeToggle && <ModeToggle />}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
