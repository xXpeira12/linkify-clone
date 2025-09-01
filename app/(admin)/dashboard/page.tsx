import CustomizationForm from "@/components/CustomizationForm";
import DashboardMetrics from "@/components/DashboardMetrics";
import ManageLinks from "@/components/ManageLinks";
import UsernameForm from "@/components/UsernameForm";
import { api } from "@/convex/_generated/api";
import { fetchAnalytics } from "@/lib/analytics-server";
import { Protect } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { Lock } from "lucide-react";

async function DashboardPage() {
    const user = await currentUser();

    const preloadedLinks = await preloadQuery(api.lib.links.getLinksByUserId, {
        userId: user!.id
    });

    const analytics = await fetchAnalytics(user!.id);

    return (
        <div>
            {/* Analytics Metrics */}
            <Protect
                feature="analytics"
                fallback={
                    <div className="p-4 lg:p-8 mb-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-gray-400 rounded-xl">
                                        <Lock className="w-6 h-6 text-white"/>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
                                        <p className="text-gray-600">Upgrade your plan to access advanced analytics features.</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <div className="bg-gray-100 rounded-lg p-4 text-center w-full">
                                        <p className="text-gray-500">Get detailed insights on your link performance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            >
                <DashboardMetrics analytics={analytics} />
            </Protect>

            {/* Customize Link */}
            <div className="p-4 lg:p-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl">
                        <UsernameForm />
                    </div>
                </div>
            </div>

            {/* Page Customization */}
            <div className="p-4 lg:p-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <CustomizationForm />
                </div>
            </div>
        
            {/* Manages Links */}
            <div className="min-h-screen p-4 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
                        {/* Left side */}
                        <div className="lg:w-2/5 lg:sticky lg:top-8">
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Manage Your Links</h1>
                                    <div className="w-20 h-1 rounded-full mt-4"></div>
                                </div>

                                <p className="text-gray-600 text-lg leading-relaxed">Manage your links and their settings from this page.</p>
                            
                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-gray-500">Drag and drop your links here</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-gray-500">Real-time previews</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        <span className="text-gray-500">Click tracking analytics</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="lg:w-3/5">
                            <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your Links</h2>
                                    <p className="text-gray-500">Drag to reorder, click to edit, or delete</p>
                                    <ManageLinks preloadedLinks={preloadedLinks}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;