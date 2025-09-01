import { LinkAnalyticsData } from "@/lib/link-analytics-server";
import { Protect } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ArrowLeft, BarChart3, Globe, MapPin, MousePointer, TrendingUp, User, Users, Lock, Calendar, Activity } from "lucide-react";
import Link from "next/link";

interface LinkAnalyticsProps {
    analytics: LinkAnalyticsData;
}

async function LinkAnalytics({ analytics }: LinkAnalyticsProps) {
    const { has } = await auth();
    const hasAnalyticsAccess = has({ feature: "analytics" });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
        });
    };

    if (!hasAnalyticsAccess) {
        return (
            <div className="p-4 lg:p-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-gray-400 rounded-xl">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Link Analytics</h2>
                                <p className="text-gray-600">Upgrade to access advanced analytics features.</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-4 text-gray-600">
                                <MousePointer className="w-5 h-5" />
                                <span>Track total clicks</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600">
                                <Users className="w-5 h-5" />
                                <span>Monitor unique visitors</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600">
                                <Globe className="w-5 h-5" />
                                <span>See geographic distribution</span>
                            </div>
                        </div>
                        <div className="mt-8 bg-gray-50 rounded-lg p-4 text-center">
                            <p>Upgrade to access advanced analytics features.</p>
                            <Link
                                href="/dashboard/billing"
                                className="inline-block mt-4 px-6 py-2 font-medium rounded-lg"
                            >
                                Upgrade Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="p-4 lg:p-8 mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/5">
                        <div className="flex items-center gap-4 mb-6">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-gray-600"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="font-medium">Back to Dashboard</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl border border-blue-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-500 rounded-xl">
                                        <MousePointer className="w-6 h-6 text-white" />
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
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-blue-600">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-600 mb-1">Unique Visitors</p>
                                    <p className="text-3xl font-bold text-blue-900">{analytics.uniqueUsers.toLocaleString()}</p>
                                </div>
                            </div>

                            <Protect
                                plan="ultra"
                                fallback={
                                    <div className="p-6 rounded-2xl border border-blue-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 bg-blue-500 rounded-xl">
                                                <Globe className="w-6 h-6 text-white" />
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
                                            <Globe className="w-6 h-6 text-white" />
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
                        </div>

                        {/* Daily Performance Chart */}
                        <div className="mt-8">
                            <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-green-500 rounded-xl">
                                        <Activity className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Daily Performance</h3>
                                        <p className="text-gray-600">Click trends over the last 30 days</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {analytics.dailyData.length > 0 ? (
                                        <div className="grid gap-3">
                                            {analytics.dailyData.slice(0, 10).map((day) => {
                                                const maxClicks = Math.max(...analytics.dailyData.map(d => d.clicks));
                                                const barWidth = maxClicks > 0 ? (day.clicks / maxClicks) * 100 : 0;

                                                return (
                                                    <div key={day.date} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                        <div className="flex items-center gap-2 w-20">
                                                            <Calendar className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {formatDate(day.date)}
                                                            </span>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                                                                    <div
                                                                        className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-500"
                                                                        style={{ width: `${barWidth}%` }}
                                                                    />
                                                                </div>
                                                                <div className="flex items-center gap-4 text-sm">
                                                                    <span className="font-semibold text-gray-900 w-8 text-right">
                                                                        {day.clicks}
                                                                    </span>
                                                                    <span className="text-gray-500 w-12 text-right">
                                                                        {day.uniqueUsers} users
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                            <p>No click data available yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Country Analytics */}
                        <Protect
                            plan="ultra"
                            fallback={
                                <div className="mt-8">
                                    <div className="bg-white/90 backdrop-blur-sm border-2 border-dashed border-gray-300 rounded-2xl p-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 bg-gray-400 rounded-xl">
                                                <Globe className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">Geographic Analytics</h3>
                                                <p className="text-gray-600">See where your visitors come from</p>
                                            </div>
                                            <div className="ml-auto">
                                                <Lock className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                        <div className="text-center py-8">
                                            <p className="text-gray-600 mb-4">Upgrade to Ultra plan to unlock geographic analytics</p>
                                            <Link
                                                href="/dashboard/billing"
                                                className="inline-block px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                                            >
                                                Upgrade to Ultra
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <div className="mt-8">
                                <div className="bg-white/90 backdrop-blur-sm border border-blue-200 rounded-2xl p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-purple-500 rounded-xl">
                                            <Globe className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Geographic Analytics</h3>
                                            <p className="text-gray-600">Where your visitors come from</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {analytics.countryData.length > 0 ? (
                                            <div className="grid gap-3">
                                                {analytics.countryData.slice(0, 8).map((country) => {
                                                    const maxClicks = Math.max(...analytics.countryData.map(c => c.clicks));
                                                    const barWidth = maxClicks > 0 ? (country.clicks / maxClicks) * 100 : 0;

                                                    return (
                                                        <div key={country.country} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                            <div className="flex items-center gap-2 w-32">
                                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                                <span className="text-sm font-medium text-gray-900 truncate">
                                                                    {country.country}
                                                                </span>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex-1 bg-gray-200 rounded-full h-2 relative overflow-hidden">
                                                                        <div
                                                                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                                                                            style={{ width: `${barWidth}%` }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center gap-4 text-sm">
                                                                        <span className="font-semibold text-gray-900 w-8 text-right">
                                                                            {country.clicks}
                                                                        </span>
                                                                        <span className="text-gray-500 w-12 text-right">
                                                                            {country.percentage.toFixed(1)}%
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 text-gray-500">
                                                <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                <p>No geographic data available yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Protect>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default LinkAnalytics;