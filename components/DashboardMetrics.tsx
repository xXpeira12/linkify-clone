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
                <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Overview</h2>
                        <p className="text-gray-600">Last 30 days performance metrics</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                        <div className="p-6 rounded-2xl border border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500 rounded-xl">
                                    <MousePointer className="w-6 h-6 text-white"/>
                                </div>
                                <div className="text-blue-600">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-600 mb-1">Total Clicks</p>
                                <p className="text-3xl font-bold text-blue-900">{analytics.totalClicks.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500 rounded-xl">
                                    <User className="w-6 h-6 text-white"/>
                                </div>
                                <div className="text-blue-600">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-600 mb-1">Unique Visitors</p>
                                <p className="text-3xl font-bold text-blue-900">{analytics.uniqueVisitors.toLocaleString()}</p>
                            </div>
                        </div>
                    
                        <Protect
                            plan="ultra"
                            fallback={
                                <div className="p-6 rounded-2xl border border-blue-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-3 bg-blue-500 rounded-xl">
                                            <Globe className="w-6 h-6 text-white"/>
                                        </div>
                                        <div className="text-blue-600">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-blue-600 mb-1">Countries</p>
                                        <p className="text-xl font-bold text-blue-900">Upgrade to Ultra</p>
                                    </div>
                                </div>
                            }
                        >
                            <div className="p-6 rounded-2xl border border-blue-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-500 rounded-xl">
                                        <Globe className="w-6 h-6 text-white"/>
                                    </div>
                                    <div className="text-blue-600">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Countries</p>
                                    <p className="text-3xl font-bold text-blue-900">{analytics.countriesReached.toLocaleString()}</p>
                                </div>
                            </div>
                        </Protect>
                        
                        <div className="p-6 rounded-2xl border border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500 rounded-xl">
                                    <Link className="w-6 h-6 text-white"/>
                                </div>
                                <div className="text-blue-600">
                                    <ExternalLink className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-600 mb-1">Links Clicked</p>
                                <p className="text-3xl font-bold text-blue-900">{analytics.totalLinksClicked.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-500 rounded-xl">
                                    <Calendar className="w-6 h-6 text-white"/>
                                </div>
                                <div className="text-blue-600">
                                    <Clock className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-600 mb-1">Last Activity</p>
                                <p className="text-xl font-bold text-blue-900">{formatDate(analytics.lastClick)}</p>
                            </div>
                        </div>
                    </div>

                    {(analytics.topLinkTitle || analytics.topReferrer) && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {analytics.topLinkTitle && (
                                <div className="p-6 rounded-2xl border border-blue-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-blue-500 rounded-lg">
                                            <ExternalLink className="w-6 h-6 text-white"/>
                                        </div>
                                        <h3 className="font-semibold text-slate-900">Top Performing Link</h3>
                                    </div>
                                    <p className="text-slate-700 font-medium truncate">{analytics.topLinkTitle}</p>
                                </div>
                            )}

                            {analytics.topReferrer && (
                                <div className="p-6 rounded-2xl border border-blue-200">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-blue-500 rounded-lg">
                                            <Globe className="w-6 h-6 text-white"/>
                                        </div>
                                        <h3 className="font-semibold text-slate-900">Top Performing Referrer</h3>
                                    </div>
                                    <p className="text-slate-700 font-medium truncate">{formatReferrer(analytics.topReferrer)}</p>
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