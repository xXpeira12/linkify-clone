import { AnalyticsData } from "@/lib/analytics-server";
import { Protect } from "@clerk/nextjs";
import { Calendar, Clock, ExternalLink, Globe, Link, Lock, MapPin, MousePointer, TrendingUp, User } from "lucide-react";

interface DashboardMetricsProps {
    analytics: AnalyticsData;
}

function DashboardMetrics({ analytics }: DashboardMetricsProps) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    const formatReferrer = (referrer: string | null) => {
        if (!referrer || referrer === "direct") return "Direct";
        try {
            const url = new URL(referrer);
            return url.hostname.replace("www.", "");
        } catch {
            return referrer;
        }
    };

    return (
        <div className="p-4 lg:p-8 mb-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Analytics Overview</h2>
                        <p className="text-gray-600">Track your link performance over the last 30 days</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-[#08CB00]/5 to-white hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-[#08CB00] rounded-xl shadow-md">
                                    <MousePointer className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-[#08CB00]">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Total Clicks</p>
                                <p className="text-3xl font-bold text-[#253900]">{analytics.totalClicks.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500 rounded-xl shadow-md">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-blue-500">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Unique Visitors</p>
                                <p className="text-3xl font-bold text-blue-900">{analytics.uniqueVisitors.toLocaleString()}</p>
                            </div>
                        </div>

                        <Protect
                            plan="ultra"
                            fallback={
                                <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-gray-400 rounded-xl shadow-md">
                                            <Globe className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-gray-400">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Countries</p>
                                        <p className="text-lg font-bold text-gray-900">Upgrade to Ultra</p>
                                    </div>
                                </div>
                            }
                        >
                            <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-500 rounded-xl shadow-md">
                                        <Globe className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-purple-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Countries</p>
                                    <p className="text-3xl font-bold text-purple-900">{analytics.countriesReached.toLocaleString()}</p>
                                </div>
                            </div>
                        </Protect>

                        <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-500 rounded-xl shadow-md">
                                    <Link className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-orange-500">
                                    <ExternalLink className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Links Clicked</p>
                                <p className="text-3xl font-bold text-orange-900">{analytics.totalLinksClicked.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-indigo-50 to-white hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-indigo-500 rounded-xl shadow-md">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-indigo-500">
                                    <Clock className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-1">Last Activity</p>
                                <p className="text-xl font-bold text-indigo-900">{formatDate(analytics.lastClick)}</p>
                            </div>
                        </div>
                    </div>

                    {(analytics.topLinkTitle || analytics.topReferrer) && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {analytics.topLinkTitle && (
                                <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-[#08CB00]/5 to-white hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-[#08CB00] rounded-lg shadow-md">
                                            <ExternalLink className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Top Performing Link</h3>
                                    </div>
                                    <p className="text-gray-700 font-medium truncate bg-gray-100 rounded-md px-3 py-2">
                                        {analytics.topLinkTitle}
                                    </p>
                                </div>
                            )}

                            {analytics.topReferrer && (
                                <div className="p-6 rounded-xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-blue-500 rounded-lg shadow-md">
                                            <Globe className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900">Top Traffic Source</h3>
                                    </div>
                                    <p className="text-gray-700 font-medium truncate bg-gray-100 rounded-md px-3 py-2">
                                        {formatReferrer(analytics.topReferrer)}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardMetrics;