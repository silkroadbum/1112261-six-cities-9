export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomPhotos<T>(items: T[]): T[] {
  const photos = [];
  const availableItems = [...items];
  for (let i = 0; i < 6; i++) {
    const randomIndex = generateRandomValue(0, availableItems.length - 1);
    photos.push(availableItems[randomIndex]);
    availableItems.splice(randomIndex, 1);
  }
  return photos;
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
