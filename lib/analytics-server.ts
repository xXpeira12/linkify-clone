export interface AnalyticsData {
    totalClicks: number;
    uniqueVisitors: number;
    countriesReached: number;
    totalLinksClicked: number;
    topLinkTitle: string | null;
    topReferrer: string | null;
    firstClick: string | null;
    lastClick: string | null;
}

export async function fetchAnalytics(
    userId: string,
    daysBack: number = 30
): Promise<AnalyticsData> {
    if (!process.env.TINYBIRD_HOST || !process.env.TINYBIRD_TOKEN) {
        return {
            totalClicks: 0,
            uniqueVisitors: 0,
            countriesReached: 0,
            totalLinksClicked: 0,
            topLinkTitle: null,
            topReferrer: null,
            firstClick: null,
            lastClick: null
        }
    }

    try {
        const tinybirdResponse = await fetch(
            `${process.env.TINYBIRD_HOST}/v0/pipes/profile_summary.json?profileUserId=${userId}&days_back=${daysBack}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}`
                },
                next: { revalidate: 0 }
            }
        );

        if (!tinybirdResponse.ok) {
            console.error("Tinybird response not ok:", await tinybirdResponse.text());
            throw new Error("Failed to fetch analytics data");
        }

        const data = await tinybirdResponse.json();

        if (!data.data || data.data.length === 0) {
            return {
                totalClicks: 0,
                uniqueVisitors: 0,
                countriesReached: 0,
                totalLinksClicked: 0,
                topLinkTitle: null,
                topReferrer: null,
                firstClick: null,
                lastClick: null
            }
        }

        const analytics = data.data[0];

        return {
            totalClicks: analytics.total_clicks || 0,
            uniqueVisitors: analytics.unique_users || 0,
            countriesReached: analytics.countries_reached || 0,
            totalLinksClicked: analytics.total_links_clicked || 0,
            topLinkTitle: analytics.top_link_title?.[0] || null,
            topReferrer: analytics.top_referrer?.[0] || null,
            firstClick: analytics.first_click || null,
            lastClick: analytics.last_click || null
        }
    } catch (error) {
        console.error("Error fetching analytics data:", error);
        return {
            totalClicks: 0,
            uniqueVisitors: 0,
            countriesReached: 0,
            totalLinksClicked: 0,
            topLinkTitle: null,
            topReferrer: null,
            firstClick: null,
            lastClick: null
        };
    }
}