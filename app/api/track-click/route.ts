import { ClientTrackingData, ServerTrackingEvent } from "@/lib/types";
import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";
import { getClient } from "@/convex/client";
import { api } from "@/convex/_generated/api";

export async function POST(request: NextRequest) {
    try {
        const data: ClientTrackingData = await request.json();

        const geo = geolocation(request);

        const convex = getClient();

        const userId = await convex.query(api.lib.usernames.getUserIdBySlug, {
            slug: data.profileUsername
        });

        if (!userId) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

        const trackingEvent: ServerTrackingEvent = {
            ...data,
            timestamp: new Date().toISOString(),
            profileUserId: userId,
            location: {
                ...geo,
            },
            userAgent: data.userAgent || request.headers.get("user-agent") || "unknown",
        }

        if (process.env.TINYBIRD_HOST && process.env.TINYBIRD_TOKEN) {
            try {
                const eventForTinyBird = {
                    timestamp: trackingEvent.timestamp,
                    profileUsername: trackingEvent.profileUsername,
                    profileUserId: trackingEvent.profileUserId,
                    linkId: trackingEvent.linkId,
                    linkTitle: trackingEvent.linkTitle,
                    linkUrl: trackingEvent.linkUrl,
                    userAgent: trackingEvent.userAgent,
                    referrer: trackingEvent.referrer,
                    location: {
                        country: trackingEvent.location.country || "",
                        region: trackingEvent.location.region || "",
                        city: trackingEvent.location.city || "",
                        latitude: trackingEvent.location.latitude || "",
                        longitude: trackingEvent.location.longitude || "",
                    }
                };

                const tinybirdResponse = await fetch(
                    `${process.env.TINYBIRD_HOST}/v0/events?name=link_clicks`,
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${process.env.TINYBIRD_TOKEN}`,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(eventForTinyBird)
                    }
                );

                if (!tinybirdResponse.ok) {
                    const errorText = await tinybirdResponse.text();
                    console.error("Tinybird error:", errorText);
                } else {
                    const responseBody = await tinybirdResponse.json();

                    if (responseBody.quarantined_rows > 0) {
                        console.warn("Some rows were quarantined:", responseBody);
                    }
                }

                return NextResponse.json({ success: true });
            } catch {}
        }
    } catch {
        return NextResponse.json(
            { error: "Failed to track click" },
            { status: 500 }
        )
    }
}