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
            <div className="p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                            <div className="p-3 bg-gray-400 rounded-xl w-fit">
                                <BarChart3 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Link Analytics</h2>
                                <p className="text-sm sm:text-base text-gray-600">Upgrade to access advanced analytics features.</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-4 text-gray-600">
                                <MousePointer className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Track total clicks</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600">
                                <Users className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">Monitor unique visitors</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-600">
                                <Globe className="w-5 h-5 flex-shrink-0" />
                                <span className="text-sm sm:text-base">See geographic distribution</span>
                            </div>
                        </div>
                        <div className="mt-6 sm:mt-8 bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
                            <p className="text-sm sm:text-base text-gray-600 mb-4">Upgrade to access advanced analytics features.</p>
                            <Link
                                href="/dashboard/billing"
                                className="inline-block px-6 py-3 bg-[#08CB00] hover:bg-[#253900] text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="p-4 sm:p-6 lg:p-8 mb-6 lg:mb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white border border-gray-200 rounded-xl lg:rounded-2xl p-6 sm:p-8 shadow-lg">
                        {/* Back Navigation */}
                        <div className="flex items-center gap-4 mb-8">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-gray-600 hover:text-[#08CB00] transition-colors duration-200 font-medium"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span className="text-sm sm:text-base">Back to Dashboard</span>
                            </Link>
                        </div>

                        {/* Link Info Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Link Analytics</h1>
                            <div className="space-y-1">
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{analytics.linkTitle}</h2>
                                <p className="text-sm text-gray-500 font-mono bg-gray-100 rounded-md px-3 py-1 inline-block">
                                    {analytics.linkUrl}
                                </p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
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
                                    <p className="text-2xl sm:text-3xl font-bold text-[#253900]">{analytics.totalClicks.toLocaleString()}</p>
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
                                    <p className="text-2xl sm:text-3xl font-bold text-blue-900">{analytics.uniqueUsers.toLocaleString()}</p>
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
                                        <p className="text-2xl sm:text-3xl font-bold text-purple-900">{analytics.countriesReached.toLocaleString()}</p>
                                    </div>
                                </div>
                            </Protect>
                        </div>

                        {/* Daily Performance Chart */}
                        <div className="mb-8">
                            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-lg">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                                    <div className="p-3 bg-[#08CB00] rounded-xl shadow-md w-fit">
                                        <Activity className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Daily Performance</h3>
                                        <p className="text-sm sm:text-base text-gray-600">Click trends over the last 30 days</p>
                                    </div>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    {analytics.dailyData.length > 0 ? (
                                        <div className="space-y-2 sm:space-y-3">
                                            {analytics.dailyData.slice(0, 10).map((day) => {
                                                const maxClicks = Math.max(...analytics.dailyData.map(d => d.clicks));
                                                const barWidth = maxClicks > 0 ? (day.clicks / maxClicks) * 100 : 0;
                                                // Ensure minimum bar width for visibility and consistency
                                                const displayWidth = Math.max(barWidth, 5);

                                                return (
                                                    <div key={day.date} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                        <div className="flex items-center gap-2 w-full sm:w-36 lg:w-40 flex-shrink-0">
                                                            <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                            <span className="text-sm font-medium text-gray-600">
                                                                {formatDate(day.date)}
                                                            </span>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden" style={{ minWidth: '200px' }}>
                                                                    <div
                                                                        className="bg-gradient-to-r from-[#08CB00] to-[#253900] h-full rounded-full transition-all duration-500"
                                                                        style={{ width: `${displayWidth}%` }}
                                                                    />
                                                                </div>
                                                                <div className="flex items-center gap-2 sm:gap-4 text-sm flex-shrink-0 w-20 sm:w-24">
                                                                    <span className="font-semibold text-gray-900 w-6 sm:w-8 text-right">
                                                                        {day.clicks}
                                                                    </span>
                                                                    <span className="text-gray-500 w-12 sm:w-16 text-right text-xs sm:text-sm">
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
                                        <div className="text-center py-8 sm:py-12 text-gray-500">
                                            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                            <p className="text-sm sm:text-base">No click data available yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Country Analytics */}
                        <Protect
                            plan="ultra"
                            fallback={
                                <div className="mb-8">
                                    <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 shadow-lg">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                                            <div className="p-3 bg-gray-400 rounded-xl shadow-md w-fit">
                                                <Globe className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Geographic Analytics</h3>
                                                <p className="text-sm sm:text-base text-gray-600">See where your visitors come from</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <Lock className="w-5 h-5 text-gray-400" />
                                            </div>
                                        </div>
                                        <div className="text-center py-8 sm:py-12">
                                            <p className="text-sm sm:text-base text-gray-600 mb-4">Upgrade to Ultra plan to unlock geographic analytics</p>
                                            <Link
                                                href="/dashboard/billing"
                                                className="inline-block px-6 py-3 bg-[#08CB00] hover:bg-[#253900] text-white font-medium rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                                            >
                                                Upgrade to Ultra
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            <div className="mb-8">
                                <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-lg">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                                        <div className="p-3 bg-purple-500 rounded-xl shadow-md w-fit">
                                            <Globe className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Geographic Analytics</h3>
                                            <p className="text-sm sm:text-base text-gray-600">Where your visitors come from</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        {analytics.countryData.length > 0 ? (
                                            <div className="space-y-2 sm:space-y-3">
                                                {analytics.countryData.slice(0, 8).map((country) => {
                                                    const maxClicks = Math.max(...analytics.countryData.map(c => c.clicks));
                                                    const barWidth = maxClicks > 0 ? (country.clicks / maxClicks) * 100 : 0;
                                                    // Ensure minimum bar width for visibility and consistency
                                                    const displayWidth = Math.max(barWidth, 5);

                                                    return (
                                                        <div key={country.country} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                                            <div className="flex items-center gap-2 w-full sm:w-32 lg:w-36 flex-shrink-0">
                                                                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                                <span className="text-sm font-medium text-gray-900 truncate">
                                                                    {country.country}
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden" style={{ minWidth: '200px' }}>
                                                                        <div
                                                                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                                                                            style={{ width: `${displayWidth}%` }}
                                                                        />
                                                                    </div>
                                                                    <div className="flex items-center gap-2 sm:gap-4 text-sm flex-shrink-0 w-20 sm:w-24">
                                                                        <span className="font-semibold text-gray-900 w-6 sm:w-8 text-right">
                                                                            {country.clicks}
                                                                        </span>
                                                                        <span className="text-gray-500 w-12 sm:w-16 text-right text-xs sm:text-sm">
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
                                            <div className="text-center py-8 sm:py-12 text-gray-500">
                                                <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                                <p className="text-sm sm:text-base">No geographic data available yet</p>
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