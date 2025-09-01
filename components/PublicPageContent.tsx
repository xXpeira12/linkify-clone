"use client"

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { User } from "lucide-react";
import Image from "next/image";
import Links from "./Links";

interface PublicPageContentProps {
    username: string;
    preloadedLinks: Preloaded<typeof api.lib.links.getLinksBySlug>;
    preloadedCustomizations: Preloaded<typeof api.lib.customizations.getCustomizationBySlug>;
}

function PublicPageContent({
    username,
    preloadedLinks,
    preloadedCustomizations
}: PublicPageContentProps) {
    const customizations = usePreloadedQuery(preloadedCustomizations);
    const accentColor = customizations?.accentColor || "#08CB00";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Hero Header */}
            <div
                className="h-72 relative overflow-hidden"
                style={{ backgroundColor: accentColor }}
            >
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Decorative elements */}
                <div className="absolute top-6 right-6 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>
            </div>

            <div className="relative -mt-36 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-20">
                    {/* Left Column - Profile */}
                    <div className="lg:w-96 lg:flex-shrink-0 mb-12 sm:mb-16 lg:mb-0">
                        <div className="text-center lg:text-left">
                            {/* Profile Picture */}
                            <div className="flex justify-center lg:justify-start mb-6 sm:mb-8">
                                <div className="relative group">
                                    {customizations?.profilePictureUrl ? (
                                        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white p-1 group-hover:shadow-2xl transition-shadow duration-300">
                                            <Image
                                                src={customizations.profilePictureUrl}
                                                alt={`${username}'s profile picture`}
                                                width={144}
                                                height={144}
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gradient-to-br from-gray-100 to-white rounded-full flex items-center justify-center shadow-xl border-4 border-white group-hover:shadow-2xl transition-shadow duration-300">
                                            <User className="w-16 h-16 sm:w-18 sm:h-18 text-gray-400" />
                                        </div>
                                    )}

                                    {/* Online indicator */}
                                    <div
                                        className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 border-2 sm:border-3 border-white rounded-full shadow-lg"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        <div className="w-full h-full rounded-full animate-ping" style={{ backgroundColor: accentColor, opacity: 0.4 }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                                        <span className="break-all inline-block max-w-full">@{username}</span>
                                    </h1>
                                    <div
                                        className="w-16 h-1 mx-auto lg:mx-0 rounded-full"
                                        style={{ backgroundColor: accentColor }}
                                    ></div>
                                </div>

                                {customizations?.description && (
                                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
                                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed break-words">
                                            {customizations.description}
                                        </p>
                                    </div>
                                )}

                                {/* Stats */}
                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                                    <div
                                        className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-full shadow-md"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0"></div>
                                        <span className="whitespace-nowrap">Active Profile</span>
                                    </div>
                                    <div className="text-sm text-gray-600 bg-white/90 px-4 py-2 rounded-full shadow-md border border-gray-200">
                                        <span className="whitespace-nowrap">Link-in-Bio</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Links */}
                    <div className="flex-1 min-w-0">
                        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl">
                            <div className="mb-6 sm:mb-8">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">My Links</h2>
                                <p className="text-sm sm:text-base text-gray-600">Connect with me through these platforms and projects</p>
                            </div>
                            <Links preloadedLinks={preloadedLinks} />
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8 sm:mt-12">
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200">
                                <p className="text-xs sm:text-sm text-gray-600 break-words">
                                    Create your own professional link-in-bio with{" "}
                                    <a
                                        href="/"
                                        className="font-semibold hover:text-[#253900] transition-colors duration-200"
                                        style={{ color: accentColor }}
                                    >
                                        Linkify
                                    </a>
                                </p>
                                <div className="mt-3 text-xs text-gray-500">
                                    <span className="whitespace-nowrap">Powered by modern web technology</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PublicPageContent;