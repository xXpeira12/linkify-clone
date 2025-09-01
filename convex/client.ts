import { ConvexClient, ConvexHttpClient } from "convex/browser";

export const getHttpClient = () => {
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) throw new Error("Missing NEXT_PUBLIC_CONVEX_URL");

    return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}

export const getClient = () => {
    if (!process.env.NEXT_PUBLIC_CONVEX_URL) throw new Error("Missing NEXT_PUBLIC_CONVEX_URL");

    return new ConvexClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}