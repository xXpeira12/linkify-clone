"use client"

import { api } from "@/convex/_generated/api";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import { useMemo, useState } from "react";
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Button } from "./ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import SortableItem from "./SortableItem";
import { Id } from "@/convex/_generated/dataModel";

function ManageLinks({ preloadedLinks }: {
    preloadedLinks: Preloaded<typeof api.lib.links.getLinksByUserId>;
}) {
    const links = usePreloadedQuery(preloadedLinks);
    const updateLinkOrder = useMutation(api.lib.links.updateLinkOrder);

    const [items, setItems] = useState(links.map((link) => link._id))

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const linkMap = useMemo(() => {
        return Object.fromEntries(links.map((link) => [link._id, link]));
    }, [links]);

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id as Id<"links">);
                const newIndex = items.indexOf(over?.id as Id<"links">);

                const newItems = arrayMove(items, oldIndex, newIndex);
                updateLinkOrder({ linkIds: newItems });
                return newItems;
            });
        }
    }

    return (
        <div className="space-y-6">
            {links.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No links yet</h3>
                    <p className="text-gray-600 mb-6">
                        Start building your link-in-bio page by adding your first link.
                    </p>
                    <Button
                        asChild
                        className="bg-[#08CB00] hover:bg-[#253900] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <Link href="/dashboard/new-link" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Your First Link
                        </Link>
                    </Button>
                </div>
            ) : (
                <>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext items={items} strategy={verticalListSortingStrategy}>
                            <div className="space-y-3">
                                {items.map((id) => {
                                    const link = linkMap[id];
                                    return <SortableItem key={id} id={id} link={link} />;
                                })}
                            </div>
                        </SortableContext>
                    </DndContext>

                    <div className="pt-4 border-t border-gray-200">
                        <Button
                            variant="outline"
                            className="w-full border-[#08CB00] text-[#08CB00] hover:bg-[#08CB00] hover:text-white py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                            asChild
                        >
                            <Link
                                href="/dashboard/new-link"
                                className="flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Another Link
                            </Link>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ManageLinks;