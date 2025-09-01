import LinkAnalytics from "@/components/LinkAnalytics";
import { fetchLinkAnalytics } from "@/lib/link-analytics-server";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

interface LinkAnalyticsPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function LinkAnalyticsPage({ params }: LinkAnalyticsPageProps) {
    const { id } = await params;
    const user = await currentUser();

    if (!user) notFound();

    const analytics = await fetchLinkAnalytics(user.id, id);

    if (!analytics) {
        const emptyAnalytics = {
            linkId: id,
            linkTitle: "This Link has no analytics",
            linkUrl: "Please wait for analytics to be generated",
            totalClicks: 0,
            uniqueUsers: 0,
            countriesReached: 0,
            dailyData: [],
            countryData: []
        };
        return <LinkAnalytics analytics={emptyAnalytics}/>;
    }

    return (
        <LinkAnalytics analytics={analytics}/>
    );
}

export default LinkAnalyticsPage;