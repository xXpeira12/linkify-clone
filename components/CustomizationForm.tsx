"use client"

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { ImageIcon, Palette, Upload, X } from "lucide-react";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { Label } from "./ui/label";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";

function CustomizationForm() {
    const { user } = useUser();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const updateCustomizations = useMutation(
        api.lib.customizations.updateCustomizations
    );

    const generateUploadUrl = useMutation(
        api.lib.customizations.generateUploadUrl
    );

    const removeProfilePicture = useMutation(
        api.lib.customizations.removeProfilePicture
    );

    const existingCustomization = useQuery(
        api.lib.customizations.getUserCustomizations,
        user ? { userId: user.id } : "skip"
    );

    const [formData, setFormData] = useState({
        description: "",
        accentColor: "#6366f1"
    });

    const [isLoading, startTransition] = useTransition();
    const [isUploading, startUploading] = useTransition();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        startTransition(async () => {
            try {
                await updateCustomizations({
                    description: formData.description || undefined,
                    accentColor: formData.accentColor || undefined
                });

                toast.success("Customizations saved");
            } catch {
                toast.error("Failed to save customizations");
            }
        });
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload a valid image file.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB.");
            return;
        }

        startUploading(async () => {
            try {
                const uploadUrl = await generateUploadUrl();

                const uploadResult = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file
                });

                if (!uploadResult.ok) {
                    throw new Error("Upload failed");
                }

                const { storageId } = await uploadResult.json();

                await updateCustomizations({
                    profilePictureStorageId: storageId,
                    description: formData.description || undefined,
                    accentColor: formData.accentColor || undefined
                });

                toast.success("Profile picture uploaded");
            } catch {
                toast.error("Failed to upload profile picture");
            } finally {
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        });
    };

    const handleRemoveImage = async () => {
        startTransition(async () => {
            try {
                await removeProfilePicture();
                toast.success("Profile picture removed");
            } catch {
                toast.error("Failed to remove profile picture");
            }
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };
 
    useEffect(() => {
        if (existingCustomization) {
            setFormData({
                description: existingCustomization.description || "",
                accentColor: existingCustomization.accentColor || "#6366f1"
            })
        }
    }, [existingCustomization]);

    return (
        <div className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg border border-black">
                        <Palette className="w-5 h-5 text-black"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Customize Your Page
                        </h2>
                        <p className="text-gray-600 text-sm">Change the look and feel of your page.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <Label className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4"/>
                        Profile Picture
                    </Label>

                    {existingCustomization?.profilePictureUrl && (
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                    src={existingCustomization.profilePictureUrl}
                                    alt="Current Profile Picture"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-700 font-medium">Current Profile Picture</p>
                                <p className="text-sm text-gray-500">Click &ldquo;Remove&rdquo; to delete this picture</p>
                            </div>
                            <Button 
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={handleRemoveImage}
                                className="text-red-600"
                            >
                                <X className="w-4 h-4 mr-1"/>
                                Remove
                            </Button>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={isUploading}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4"/>
                            {isUploading ? "Uploading..." : "Upload New Picture"}
                        </Button>
                        <p className="text-sm text-gray-500">Max 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                        id="description"
                        placeholder="Tell others about yourself..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
                        maxLength={200}
                    />
                    <p className="text-sm text-gray-500">{formData.description.length}/200 characters</p>
                </div>

                <div className="space-y-3">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <input
                                id="accentColor"
                                type="color"
                                value={formData.accentColor}
                                onChange={(e) => handleInputChange("accentColor", e.target.value)}
                                className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                            />
                            <div>
                                <p className="text-sm font-medium text-gray-700">Choose your brand color</p>
                                <p className="text-xs text-gray-500">{formData.accentColor}</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">This color will be used as an accent in your page header</p>
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={isLoading || isUploading}
                        className="w-full"
                    >
                        {isLoading ? "Saving..." : "Save Customizations"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CustomizationForm;