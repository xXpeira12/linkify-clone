import { Geo } from "@vercel/functions"

export interface ClientTrackingData {
    profileUsername: string;
    linkId: string;
    linkTitle: string;
    linkUrl: string;
    userAgent?: string;
    referrer?: string;
}

export interface ServerTrackingEvent extends ClientTrackingData {
    profileUserId: string;
    location: Geo;
    timestamp: string;
}