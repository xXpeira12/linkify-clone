"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";

function Header({ isFixed = false }: { isFixed?: boolean }) {
    return <header className={cn(
        "w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm",
        isFixed && "sticky top-0 z-50"
    )}>
        <div className="max-w-7xl mx-auto px-4 xl:px-8 py-4 flex justify-between items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors">
                <span className="text-primary">Link</span>ify
            </Link>

            <Authenticated>
                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        variant="ghost"
                        className="text-gray-600 hover:text-primary hover:bg-primary/10"
                    >
                        <Link href="/dashboard/new-link" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Link
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="border-secondary text-secondary hover:bg-secondary hover:text-white"
                    >
                        <Link href="/dashboard/billing">Billing</Link>
                    </Button>

                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-8 h-8",
                                userButtonPopoverCard: "bg-white border border-gray-200 shadow-lg",
                                userButtonPopoverActionButton: "hover:bg-primary/10 hover:text-primary"
                            }
                        }}
                    />
                </div>
            </Authenticated>

            <Unauthenticated>
                <SignInButton mode="modal">
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
                    >
                        Get Started for Free
                    </Button>
                </SignInButton>
            </Unauthenticated>
        </div>
    </header>;
}

export default Header;