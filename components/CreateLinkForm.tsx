"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const formSchema = z.object({
    title: z
        .string()
        .min(1, { message: "Title is required" })
        .max(100, { message: "Title must be less than 100 characters" }),
    url: z.string().url({ message: "Invalid URL" })
});

function CreateLinkForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            url: ""
        }
    });

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, startTransition] = useTransition();
    const router = useRouter();
    const createLink = useMutation(api.lib.links.createLink);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);

        if (!values.url.startsWith("https://") && !values.url.startsWith("http://")) {
            values.url = `https://${values.url}`;
        }

        startTransition(async () => {
            try {
                await createLink({
                    title: values.title,
                    url: values.url
                });
                router.push("/dashboard");
            } catch (e) {
                setError(e instanceof Error ? e.message : "Failed to create link");
            }
        });
    }

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-900 font-medium">Link Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="My Awesome Link"
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-600">
                                    Give your link a descriptive and memorable title that tells visitors what to expect.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-900 font-medium">Destination URL</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com"
                                        className="border-gray-300 focus:border-primary focus:ring-primary"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-600">
                                    Enter the full URL where you want to redirect your visitors.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {error && (
                        <div className="text-red-700 text-sm bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
                            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h4 className="font-medium">Error</h4>
                                <p>{error}</p>
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium transition-colors"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating Link...
                                </div>
                            ) : (
                                "Create Link"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CreateLinkForm;