import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export function getNewItemsAfterDragEnd(event: DragEndEvent, items: Array<{id: number}>): Array<{id: number}> {
  const { active, over } = event; 

  const oldIndex = items.findIndex((item: {id: number}) => item.id === active.id);
  const newIndex = items.findIndex((item: {id: number}) => item.id === over?.id);

  const newItems = arrayMove(items, oldIndex, newIndex);

  return newItems;
};