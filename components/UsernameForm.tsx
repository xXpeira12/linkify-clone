"use client";

import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { AlertCircle, CheckCircle, Copy, ExternalLink, Loader2, User } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { toast } from "sonner";

const formSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be at most 50 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Username must only contain letters, numbers, underscores, and hyphens")
});

function UsernameForm() {
    const { user } = useUser();
    const [debouncedUsername, setDebouncedUsername] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    const watchUsername = form.watch("username");
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedUsername(watchUsername);
        }, 500);

        return () => clearTimeout(timer);
    }, [watchUsername]);

    const currentSlug = useQuery(
        api.lib.usernames.getUserSlug,
        user?.id ? { userId: user.id } : "skip",
    );

    const availabilityCheck = useQuery(
        api.lib.usernames.checkUsernameAvailability,
        debouncedUsername.length >= 3 ? { username: debouncedUsername } : "skip",
    );

    const setUsername = useMutation(api.lib.usernames.setUsername);

    const getStatus = () => {
        if (!debouncedUsername || debouncedUsername.length < 3) return null;
        if (debouncedUsername !== watchUsername) return "checking";
        if (!availabilityCheck) return "checking";
        if (debouncedUsername === currentSlug) return "current";
        return availabilityCheck.available ? "available" : "unavailable";
    };

    const status = getStatus();

    const hasCustomUsername = currentSlug && currentSlug !== user?.username;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!user?.id) return;

        try {
            const result = await setUsername({ username: values.username });
            if (result.success) {
                form.reset();
            } else {
                form.setError("username", { message: result.error || "Failed to set username" });
            }
        } catch {
            form.setError("username", { message: "An unexpected error occurred" });
        }
    }

    const isSubmitDisabled =
        form.formState.isSubmitting ||           // prevent multiple submits
        !watchUsername ||                        // empty field
        watchUsername.length < 3 ||              // too short
        status === "checking" ||                 // still checking
        status === "unavailable" ||              // already taken
        status === "current";

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                    Customize Your Link
                </h3>
                <p className="text-gray-600">
                    Choose a custom username for your link-in-bio page.
                </p>
            </div>

            {/* Current username status */}
            {hasCustomUsername && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex items-center space-x-2 min-w-0">
                            <User className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-green-900">Current Username</span>
                        </div>
                        <div className="flex items-center space-x-2 min-w-0">
                            <span className="font-mono text-green-800 bg-white px-3 py-1 rounded text-sm truncate max-w-[200px] sm:max-w-none">
                                {currentSlug}
                            </span>
                            <Link
                                href={`/u/${currentSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-700 flex-shrink-0"
                                title="Open your page"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* URL preview */}
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Your Link Preview</span>
                </div>
                <div className="flex items-center justify-between gap-3 min-w-0">
                    <Link
                        href={`/u/${currentSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-mono text-sm truncate min-w-0 flex-1"
                        title={`${getBaseUrl()}/u/${currentSlug}`}
                    >
                        <span className="hidden sm:inline">{getBaseUrl()}/u/</span>
                        <span className="sm:hidden">linkify.com/u/</span>
                        <span className="font-semibold">{currentSlug}</span>
                    </Link>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`${getBaseUrl()}/u/${currentSlug}`);
                            toast.success("Copied to clipboard!");
                        }}
                        className="p-2 rounded-md hover:bg-gray-200 transition-colors flex-shrink-0"
                        title="Copy to clipboard"
                    >
                        <Copy className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Form */}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="enter-your-username"
                                            {...field}
                                            className="pr-10"
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            {status === "checking" && (
                                                <Loader2 className="w-4 h-4 text-gray-500" />
                                            )}
                                            {status === "available" && (
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                            )}
                                            {status === "current" && (
                                                <User className="w-4 h-4 text-blue-500" />
                                            )}
                                            {status === "unavailable" && (
                                                <AlertCircle className="w-4 h-4 text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription className="text-gray-600">
                                    {status === "available" && "✅ Username is available!"}
                                    {status === "unavailable" && "❌ Username is already taken"}
                                    {status === "current" && "💡 This is your current username"}
                                    {status === "checking" && "⏳ Checking availability..."}
                                    {!status && "Use letters, numbers, underscores, and hyphens only"}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-[#08CB00] hover:bg-[#253900] text-white py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                        disabled={isSubmitDisabled}
                    >
                        {form.formState.isSubmitting ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Updating Username...
                            </div>
                        ) : (
                            hasCustomUsername ? "Update Username" : "Claim Username"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default UsernameForm;