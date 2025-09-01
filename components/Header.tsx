"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Authenticated, Unauthenticated } from "convex/react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";

function Header({ isFixed = false }: { isFixed?: boolean }) {
    return <header className={cn(
        "w-full bg-white/90 backdrop-blur-sm border-b border-b-slate-200 z-50",
        isFixed && "sticky top-0 z-50"
    )}>
        <div className="max-w-7xl mx-auto px-4 xl:px-2 py-4 flex justify-between items-center">
            <Link href="/dashboard" className="text-2xl font-bold">
                Linkify
            </Link>

            <Authenticated>
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/new-link" className="flex items-center gap-2 px-4 py-2 rounded">
                        <Plus className="w-4 h-4" />
                        Add Link
                    </Link>
                    <Button
                        asChild
                        variant="outline"
                    >
                        <Link href="/dashboard/billing">Billing</Link>
                    </Button>

                    <UserButton />
                </div>
            </Authenticated>

            <Unauthenticated>
                <SignInButton mode="modal">
                    <Button
                        variant="outline"
                    >
                        Get Started for Free
                    </Button>
                </SignInButton>
            </Unauthenticated>
        </div>
    </header>;
}

export default Header;