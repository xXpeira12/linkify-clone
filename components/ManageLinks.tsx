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
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                        {items.map((id) => {
                            const link = linkMap[id];
                            return <SortableItem key={id} id={id} link={link}/>;
                        })}
                    </div>
                </SortableContext>
            </DndContext>

            <Button
                variant="outline"
                className="w-full mt-4"
                asChild
            >
                <Link
                    href="/dashboard/new-link"
                    className="flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4"/>
                    Add Link
                </Link>
            </Button>
        </>
    );
}

export default ManageLinks;