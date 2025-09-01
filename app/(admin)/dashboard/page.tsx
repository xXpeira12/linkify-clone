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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Analytics Metrics */}
            <Protect
                feature="analytics"
                fallback={
                    <div className="p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-lg">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                    <div className="p-3 bg-gray-400 rounded-xl w-fit">
                                        <Lock className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics Overview</h2>
                                        <p className="text-sm sm:text-base text-gray-600">Upgrade your plan to access advanced analytics features.</p>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 sm:p-6 bg-gray-50 rounded-xl text-center">
                                    <p className="text-sm sm:text-base text-gray-500 mb-4">Get detailed insights on your link performance, including:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm text-gray-600">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-2 h-2 bg-[#08CB00] rounded-full flex-shrink-0"></div>
                                            <span>Click tracking</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-2 h-2 bg-[#08CB00] rounded-full flex-shrink-0"></div>
                                            <span>Geographic data</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-2 h-2 bg-[#08CB00] rounded-full flex-shrink-0"></div>
                                            <span>Traffic sources</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            >
                <DashboardMetrics analytics={analytics} />
            </Protect>

            {/* Customize Username Section */}
            <div className="p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-lg">
                        <div className="mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Your Link</h2>
                            <p className="text-sm sm:text-base text-gray-600">Customize your personal link to share with others</p>
                        </div>
                        <UsernameForm />
                    </div>
                </div>
            </div>

            {/* Page Customization */}
            <div className="p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-lg">
                        <div className="mb-6">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Page Customization</h2>
                            <p className="text-sm sm:text-base text-gray-600">Personalize your page appearance and branding</p>
                        </div>
                        <CustomizationForm />
                    </div>
                </div>
            </div>

            {/* Manage Links Section */}
            <div className="p-4 sm:p-6 lg:p-8 pb-12 lg:pb-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8 lg:gap-16">
                        {/* Left side - Info */}
                        <div className="lg:w-2/5 lg:sticky lg:top-8">
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                                        Manage Your
                                        <span className="text-[#08CB00] block">Links</span>
                                    </h1>
                                    <div className="w-16 sm:w-20 h-1 bg-[#08CB00] rounded-full mt-3 sm:mt-4"></div>
                                </div>

                                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                                    Organize your links with drag-and-drop functionality,
                                    track performance, and customize each link to match your brand.
                                </p>

                                <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-[#08CB00] rounded-full flex-shrink-0"></div>
                                        <span className="text-sm sm:text-base text-gray-600">Drag and drop to reorder</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-[#08CB00] rounded-full flex-shrink-0"></div>
                                        <span className="text-sm sm:text-base text-gray-600">Real-time link previews</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-[#08CB00] rounded-full flex-shrink-0"></div>
                                        <span className="text-sm sm:text-base text-gray-600">Advanced click analytics</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-[#08CB00] rounded-full flex-shrink-0"></div>
                                        <span className="text-sm sm:text-base text-gray-600">Custom link styling</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Links Management */}
                        <div className="lg:w-3/5 w-full">
                            <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-lg w-full">
                                <div className="mb-6">
                                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Your Links</h2>
                                    <p className="text-sm sm:text-base text-gray-600">Drag to reorder, click to edit, or delete links you no longer need</p>
                                </div>
                                <ManageLinks preloadedLinks={preloadedLinks} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;