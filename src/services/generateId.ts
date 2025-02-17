export const generateId = (items: Array<{id: number}>): number => {
  let existDuplicate = false;

  for (let i = 1; i < items.length + 1; i++) {
    for (let j = 0; j < items.length; j++) {
      if (items[j].id === i) {
        existDuplicate = true;
      }
    }

    if (!existDuplicate) {
      return i;
    } 

    existDuplicate = false;
  }

  return items.length + 1;
}