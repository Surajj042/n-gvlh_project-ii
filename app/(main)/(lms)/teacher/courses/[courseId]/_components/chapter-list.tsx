"use client";

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: any[];
  onReorder: (updateData: { id: string; position: number }[]) => void;
  onEdit: (id: string) => void;
}

export const ChapterList = ({
  items,
  onReorder,
  onEdit,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter._id,
      position: items.findIndex((item) => item._id === chapter._id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {process.browser && (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="chapters">
              {(provided) => (
                <div className="mt-2" {...provided.droppableProps} ref={provided.innerRef}>
                  {chapters.map((chapter, index) => (
                    <Draggable
                      draggableId={chapter._id}
                      key={chapter._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={`mb-4 flex items-center gap-x-2 rounded-md border border-gray-200 bg-gray-200 text-sm text-gray-700 ${chapter.isPublished && "border-blue-200 bg-blue-100 text-blue-700"} dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:${chapter.isPublished && "border-blue-600 bg-blue-800 text-blue-300"} `}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div
                            className={`rounded-l-md border-r border-r-gray-200 px-2 py-3 transition hover:bg-gray-300 ${chapter.isPublished && "border-r-blue-200 hover:bg-blue-200"} dark:border-r-slate-800 dark:hover:bg-slate-700 dark:${chapter.isPublished && "border-r-blue-600 hover:bg-blue-800"} `}
                            {...provided.dragHandleProps}
                          >
                            <Grip className="h-5 w-5" />
                          </div>
                          {chapter.title}
                          <div className="ml-auto flex items-center gap-x-2 pr-2">
                            {chapter.isFree && (
                              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                                Free
                              </Badge>
                            )}
                            {chapter.isPublished ? (
                              <Badge>Published</Badge>
                            ) : (
                              <Badge variant="inactive">Draft</Badge>
                            )}

                            <Pencil
                              onClick={() => onEdit(chapter._id)}
                              className="h-4 w-4 cursor-pointer transition hover:opacity-75"
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      )}
    </>
  );
};
