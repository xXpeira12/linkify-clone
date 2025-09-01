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
                <div className="text-slate-300 mb-6">
                    <ArrowUpRight className="w-16 h-16 mx-auto"/>
                </div>
                <p className="text-slate-400 text-xl font-medium">No links found</p>
                <p className="text-slate-300 text-sm mt-2 font-medium">Links will appear here soon</p>
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
                    <div className="relative bg-white/70 border border-slate-200/50 rounded-2xl p-6">
                        <div className="absolute inset-0 rounded-md"></div>
                        <div className="relative flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{link.title}</h3>
                                <p className="text-xs italic text-slate-400 truncate font-normal">{link.url.replace(/^https?:\/\//, "")}</p>
                            </div>
                            <div className="ml-4 text-slate-400">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Links;