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
        debouncedUsername.length >=3 ? { username: debouncedUsername } : "skip",
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
        <div>
            <div>
                <h3>
                    Customize Your Link
                </h3>
                <p>
                    Choose a custom username for your link-in-bio page.
                </p>
            </div>

            {/* Current username status */}
            {hasCustomUsername && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-green-900">Current Username</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-mono text-green-800 bg-white px-2 py-1 rounded text-sm">{currentSlug}</span>
                            <Link
                                href={`/u/${currentSlug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600"
                            >
                                <ExternalLink className="w-4 h-4"/>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* URL preview */}
            <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
                <div className="flex items-center justify-between">
                    <div></div>
                    <span>Your Link Preview</span>
                </div>
                <div className="mt-2 flex items-center justify-between font-mono">
                    <Link
                        href={`/u/${currentSlug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        {getBaseUrl()}/u/{currentSlug}
                    </Link>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`${getBaseUrl()}/u/${currentSlug}`);
                            toast.success("Copied to clipboard");
                        }}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Copy to clipboard"
                    >
                        <Copy className="w-4 h-4"/>
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
                                                <Loader2 className="w-4 h-4 text-gray-500"/>
                                            )}
                                            {status === "available" && (
                                                <CheckCircle className="w-4 h-4 text-green-500"/>
                                            )}
                                            {status === "current" && (
                                                <User className="w-4 h-4 text-blue-500"/>
                                            )}
                                            {status === "unavailable" && (
                                                <AlertCircle className="w-4 h-4 text-red-500"/>
                                            )}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    Your username will be publicly visible and can be changed at any time.
                                </FormDescription>
                                {status === "available" && (
                                    <p className="text-sm text-green-600">Username is available!</p>
                                )}
                                {status === "current" && (
                                    <p className="text-sm text-blue-600">This is your current username</p>
                                )}
                                {status === "unavailable" && (
                                    <p className="text-sm text-red-600">
                                        {availabilityCheck?.error || "Username is already taken"}
                                    </p>
                                )}
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full disabled:opacity-50"
                        disabled={isSubmitDisabled}
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                                Updating...
                            </>
                        ) : (
                            "Update Username"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default UsernameForm;