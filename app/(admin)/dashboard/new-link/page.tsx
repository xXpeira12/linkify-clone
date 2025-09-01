import CreateLinkForm from "@/components/CreateLinkForm";
import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

async function NewLinkPage() {
    const { has, userId } = await auth();

    const hasTenLinkCapacity = has({ feature: "pro_capacity" });
    const hasUnlimitedLinks = has({ feature: "ultra_capacity" });

    const linkCount = await fetchQuery(api.lib.links.getLinkCountByUserId, {
        userId: userId || "",
    });

    // free = 3 , pro = 10 , ultra = infinity
    const access = {
        canCreate: hasUnlimitedLinks
            ? true
            : hasTenLinkCapacity
                ? linkCount < 10
                : linkCount < 3,
        limit: hasUnlimitedLinks ? "unlimited" : hasTenLinkCapacity ? 10 : 3,
        currentCount: linkCount
    };

    if (!access.canCreate) {
        return (
            <div className="min-h-screen p-4 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Link Limit Reached</h2>
                            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                                You have reached your maximum number of links ({access.currentCount}/{access.limit}).
                                {!hasUnlimitedLinks && " Upgrade to a higher plan to add more links."}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to My Links
                                </Link>
                                {!hasUnlimitedLinks && (
                                    <Link
                                        href="/dashboard/billing"
                                        className="px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
                                    >
                                        Upgrade Plan
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } return (
        <div className="p-4 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to My Links
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
                    <div className="lg:w-2/5 lg:sticky lg:top-8">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    Create New
                                    <span className="text-primary block">Link</span>
                                </h1>
                                <div className="w-20 h-1 bg-primary rounded-full mt-4"></div>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Add a new link to your profile. Share important content, social media,
                                or any URL you want your audience to discover.
                            </p>

                            <div className="space-y-3 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-gray-600">Add custom titles and descriptions</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-gray-600">Track link performance</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-gray-600">Reorder anytime</span>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-xl">
                                <p className="text-sm text-gray-600">
                                    <strong>Links remaining:</strong> {access.limit === "unlimited" ? "Unlimited" : `${Number(access.limit) - access.currentCount} of ${access.limit}`}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-3/5">
                        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Link Details</h2>
                                <p className="text-gray-600">Fill in the details below to create your new link.</p>
                            </div>

                            <CreateLinkForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewLinkPage;