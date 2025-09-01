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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link Title</FormLabel>
                            <FormControl>
                                <Input placeholder="My Link Title" {...field}/>
                            </FormControl>
                            <FormDescription>
                                This is the title of your link. It should be descriptive and concise.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com" {...field}/>
                            </FormControl>
                            <FormDescription>
                                This is the URL of your link. It should be a valid URL.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>
                )}

                <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "Creating..." : "Create Link"}
                </Button>
            </form>
        </Form>
    );
}

export default CreateLinkForm;