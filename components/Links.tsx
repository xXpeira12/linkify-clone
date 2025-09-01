import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { trackLinkClick } from "@/lib/analytics";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function Links({
    preloadedLinks
}: {
    preloadedLinks: Preloaded<typeof api.lib.links.getLinksBySlug>;
}) {
    const links = usePreloadedQuery(preloadedLinks);
    const params = useParams();
    const username = params.username as string;

    const handleLinkClick = async (link: Doc<"links">) => {
        // Track the click
        await trackLinkClick({
            profileUsername: username,
            linkId: link._id,
            linkTitle: link.title,
            linkUrl: link.url
        })
    };

    if (links.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="text-gray-300 mb-6">
                    <ArrowUpRight className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-gray-600 text-xl font-semibold">No links found</p>
                <p className="text-gray-400 text-sm mt-2">Links will appear here when they're added</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {links.map((link) => (
                <Link
                    key={link._id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full"
                    onClick={() => handleLinkClick(link)}
                >
                    <div className="relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#08CB00] transition-all duration-300 group-hover:scale-[1.02] transform">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#08CB00]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#253900] transition-colors duration-200">
                                    {link.title}
                                </h3>
                                <p className="text-sm text-gray-500 truncate font-mono bg-gray-100 rounded-md px-3 py-1 inline-block">
                                    {link.url.replace(/^https?:\/\//, "")}
                                </p>
                            </div>
                            <div className="ml-6 text-gray-400 group-hover:text-[#08CB00] transition-colors duration-200">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Links;