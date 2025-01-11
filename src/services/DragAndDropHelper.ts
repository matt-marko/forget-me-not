import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export default class DragAndDropHelper {
  private items: Array<{id: number}>;

  constructor(items: Array<{id: number}>) {
    this.items = items;
  }

  getNewItemsAfterDragEnd(event: DragEndEvent): Array<{id: number}> {
    const { active, over } = event; 

    const oldIndex = this.items.findIndex((item: {id: number}) => item.id === active.id);
    const newIndex = this.items.findIndex((item: {id: number}) => item.id === over?.id);

    const newItems = arrayMove(this.items, oldIndex, newIndex);

    return newItems
  };
}