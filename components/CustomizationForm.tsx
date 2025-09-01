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
        accentColor: "#08CB00"
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

                toast.success("Customizations saved successfully!");
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
                    profilePictureStorageId: storageId
                });

                toast.success("Profile picture uploaded successfully!");
            } catch {
                toast.error("Failed to upload profile picture");
            }
        });
    };

    const handleRemoveProfilePicture = async () => {
        startUploading(async () => {
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
                accentColor: existingCustomization.accentColor || "#08CB00"
            });
        }
    }, [existingCustomization]);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Your Page</h2>
                <p className="text-gray-600">Personalize your profile to match your brand and style.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Picture Section */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold text-gray-900">Profile Picture</Label>
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="relative">
                            {existingCustomization?.profilePictureUrl ? (
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 bg-white">
                                    <Image
                                        src={existingCustomization.profilePictureUrl}
                                        alt="Profile picture"
                                        width={96}
                                        height={96}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveProfilePicture}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-24 h-24 rounded-full border-4 border-gray-200 bg-gray-50 flex items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/*"
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                {isUploading ? "Uploading..." : "Upload New Picture"}
                            </Button>
                            <p className="text-sm text-gray-500">Max 5MB. Supported: JPG, PNG, GIF, WebP</p>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="space-y-4">
                    <Label htmlFor="description" className="text-lg font-semibold text-gray-900">
                        Bio Description
                    </Label>
                    <div className="space-y-2">
                        <textarea
                            id="description"
                            placeholder="Tell your visitors about yourself, your brand, or what they can expect from your links..."
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-vertical transition-colors"
                            maxLength={200}
                        />
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">This will appear below your profile picture</p>
                            <p className="text-sm text-gray-500">{formData.description.length}/200</p>
                        </div>
                    </div>
                </div>

                {/* Color Customization */}
                <div className="space-y-4">
                    <Label className="text-lg font-semibold text-gray-900">Brand Colors</Label>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="accentColor" className="text-sm font-medium text-gray-700">
                                Header Color
                            </Label>
                            <div className="flex items-center gap-4">
                                <input
                                    id="accentColor"
                                    type="color"
                                    value={formData.accentColor}
                                    onChange={(e) => handleInputChange("accentColor", e.target.value)}
                                    className="w-16 h-16 rounded-xl border-2 border-gray-300 cursor-pointer hover:border-primary transition-colors"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Current Color</p>
                                    <p className="text-xs text-gray-500 font-mono">{formData.accentColor}</p>
                                    <p className="text-xs text-gray-500 mt-1">Used for page header background</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Color Presets */}
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-gray-700">Quick Presets</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {[
                                    { color: "#08CB00", name: "Primary Green" },
                                    { color: "#253900", name: "Dark Green" },
                                    { color: "#6366f1", name: "Indigo" },
                                    { color: "#ec4899", name: "Pink" },
                                    { color: "#f59e0b", name: "Amber" },
                                    { color: "#10b981", name: "Emerald" },
                                    { color: "#8b5cf6", name: "Violet" },
                                    { color: "#ef4444", name: "Red" }
                                ].map((preset) => (
                                    <button
                                        key={preset.color}
                                        type="button"
                                        onClick={() => handleInputChange("accentColor", preset.color)}
                                        className="w-10 h-10 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                                        style={{ backgroundColor: preset.color }}
                                        title={preset.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-gray-200">
                    <Button
                        type="submit"
                        disabled={isLoading || isUploading}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-medium transition-colors"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving Changes...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Palette className="w-4 h-4" />
                                Save Customizations
                            </div>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CustomizationForm;