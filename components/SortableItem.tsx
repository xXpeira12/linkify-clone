"use client"

import { Doc, Id } from "@/convex/_generated/dataModel";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { BarChart, Check, GripVertical, Pencil, Trash, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Input } from "./ui/input";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function SortableItem({ id, link }: {
    id: Id<"links">;
    link: Doc<"links">
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const deleteLink = useMutation(api.lib.links.deleteLink);
    const updateLink = useMutation(api.lib.links.updateLink);

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(link?.title || "");
    const [editUrl, setEditUrl] = useState(link?.url || "");
    const [isUpdating, startTransition] = useTransition();

    if (!link) return null;

    const handleCancel = () => {
        setIsEditing(false);
        setEditTitle(link.title);
        setEditUrl(link.url);
    };

    const handleSave = () => {
        if (!editTitle.trim() || !editUrl.trim()) return;

        startTransition(async () => {
            try {
                let processedUrl = editUrl;
                if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) processedUrl = `https://${processedUrl}`;

                await updateLink({ linkId: id, title: editTitle.trim(), url: processedUrl.trim() });
                setIsEditing(false);
            } catch { }
        });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${isEditing ? 'ring-2 ring-[#08CB00]/20 border-[#08CB00]' : 'hover:border-gray-300'
                }`}
        >
            {isEditing ? (
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Link Title
                                </label>
                                <Input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Enter a descriptive title"
                                    className="border-gray-300 focus:border-[#08CB00] focus:ring-[#08CB00]/20 text-lg font-semibold"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Destination URL
                                </label>
                                <Input
                                    value={editUrl}
                                    onChange={(e) => setEditUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="border-gray-300 focus:border-[#08CB00] focus:ring-[#08CB00]/20 font-mono"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleCancel}
                                disabled={isUpdating}
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleSave}
                                disabled={isUpdating || !editTitle.trim() || !editUrl.trim()}
                                className="bg-[#08CB00] hover:bg-[#253900] text-white shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                {isUpdating ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Check className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            ) :
                (
                    <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6 hover:bg-gray-50/50 transition-colors duration-200">
                        <div
                            {...attributes}
                            {...listeners}
                            aria-describedby={`link-${id}`}
                            className="cursor-move p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0 group/drag"
                        >
                            <GripVertical className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover/drag:text-[#08CB00] transition-colors duration-200" />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                            <h3 className="font-semibold text-base md:text-lg text-gray-900 truncate group-hover:text-[#253900] transition-colors duration-200">
                                {link.title}
                            </h3>
                            <p className="text-gray-500 text-xs md:text-sm truncate font-mono bg-gray-100 rounded-md px-2 md:px-3 py-1 inline-block max-w-full">
                                {link.url}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 md:h-9 md:w-9 border-gray-300 hover:border-[#08CB00] hover:bg-[#08CB00]/10 hover:text-[#08CB00] transition-all duration-200"
                                asChild
                            >
                                <Link href={`/dashboard/links/${id}`}>
                                    <BarChart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 md:h-9 md:w-9 border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                                onClick={() => { setIsEditing(true) }}
                            >
                                <Pencil className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 md:h-9 md:w-9 border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();

                                    const isConfirmed = confirm(`Are you sure you want to delete "${link.title}"?`);

                                    if (isConfirmed) deleteLink({ linkId: id });
                                }}
                            >
                                <Trash className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </Button>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default SortableItem;