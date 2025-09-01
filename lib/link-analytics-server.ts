export interface LinkAnalyticsData {
    linkId: string;
    linkTitle: string;
    linkUrl: string;
    totalClicks: number;
    uniqueUsers: number;
    countriesReached: number;
    dailyData: Array<{
        date: string;
        clicks: number;
        uniqueUsers: number;
        countriesReached: number;
    }>;
    countryData: Array<{
        country: string;
        clicks: number;
        percentage: number;
    }>
}

interface TinybirdLinkAnalyticsRow {
    date: string;
    linkTitle: string;
    linkUrl: string;
    total_clicks: number;
    unique_users: number;
    countries_reached: number;
}

interface TinybirdCountryAnalyticsRow {
    country: string;
    total_clicks: number;
    unique_users: number;
    percentage: number;
}

export async function fetchLinkAnalytics(
    userId: string,
    linkId: string,
    daysBack: number = 30
): Promise<LinkAnalyticsData | null> {
    if (!process.env.TINYBIRD_HOST || !process.env.TINYBIRD_TOKEN) {
        return {
            linkId,
            linkTitle: "Sample Link",
            linkUrl: "https://example.com",
            totalClicks: 0,
            uniqueUsers: 0,
            countriesReached: 0,
            dailyData: [],
            countryData: []
        };
    }

    try {
        let tinybirdResponse = await fetch(
            `${process.env.TINYBIRD_HOST}/v0/pipes/fast_link_analytics.json?profileUserId=${userId}&linkId=${linkId}&days_back=${daysBack}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}`
                },
                next: { revalidate: 0 }
            }
        );

        if (!tinybirdResponse.ok) {
            tinybirdResponse = await fetch(
                `${process.env.TINYBIRD_HOST}/v0/pipes/link_analytics.json?profileUserId=${userId}&linkId=${linkId}&days_back=${daysBack}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}`
                    },
                    next: { revalidate: 0 }
                }
            );
        }

        if (!tinybirdResponse.ok) {
            console.error("Tinybird response not ok:", await tinybirdResponse.text());
            throw new Error("Failed to fetch link analytics");
        }

        const data = await tinybirdResponse.json();

        if (!data.data || data.data.length === 0) return null;

        const dailyData = data.data.map((row: TinybirdLinkAnalyticsRow) => ({
            date: row.date,
            clicks: row.total_clicks || 0,
            uniqueUsers: row.unique_users || 0,
            countriesReached: row.countries_reached || 0
        }));

        const totalClicks = dailyData.reduce((sum: number, day: { clicks: number }) => sum + day.clicks, 0);
        const uniqueUsers = Math.max(...dailyData.map((day: { uniqueUsers: number }) => day.uniqueUsers), 0);
        const countriesReached = Math.max(...dailyData.map((day: { countriesReached: number }) => day.countriesReached), 0);

        const firstRow = data.data[0] as TinybirdLinkAnalyticsRow;

        let countryData: Array<{ country: string; clicks: number; percentage: number }> = [];

        try {
            const countryResponse = await fetch(
                `${process.env.TINYBIRD_HOST}/v0/pipes/link_country_analytics.json?profileUserId=${userId}&linkId=${linkId}&days_back=${daysBack}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}`
                    },
                    next: { revalidate: 0 }
                }
            );

            if (countryResponse.ok) {
                const countryResult = await countryResponse.json();

                if (countryResult.data && countryResult.data.length > 0) {
                    countryData = countryResult.data.map((row: TinybirdCountryAnalyticsRow) => ({
                        country: row.country || "Unknown",
                        clicks: row.total_clicks || 0,
                        percentage: row.percentage || 0
                    }));
                }
            }
        } catch (error) {
            console.error("Error fetching country analytics:", error);
        }

        return {
            linkId,
            linkTitle: firstRow.linkTitle || "Unknown Link",
            linkUrl: firstRow.linkUrl || "",
            totalClicks,
            uniqueUsers,
            countriesReached,
            dailyData: dailyData.reverse(),
            countryData
        };
    } catch (error) {
        console.error("Error fetching link analytics:", error);
        return null;
    }
}