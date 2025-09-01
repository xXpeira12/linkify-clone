import { ClientTrackingData } from "./types";

export async function trackLinkClick(event: ClientTrackingData) { 
    try {
        const trackingData = {
            profileUsername: event.profileUsername,
            linkId: event.linkId,
            linkTitle: event.linkTitle,
            linkUrl: event.linkUrl,
            userAgent: event.userAgent || navigator.userAgent,
            referrer: event.referrer || document.referrer
        }

        await fetch("/api/track-click", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trackingData)
        });

        return trackingData;
    } catch {}
};