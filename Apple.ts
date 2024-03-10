import { Point, Region } from "@nut-tree/nut-js";

export class Apple {
  constructor(
    public region: Region,
    public number: number,
    public priority: number,
  ) {}
  centerOf(dx = 0, dy = 0) {
    return new Point(
      this.region.left + (this.region.width / 2) + dx,
      this.region.top + (this.region.height / 2) + dy,
    );
  }
  distance(otherApple: Apple): number {
    const a = this.centerOf();
    const b = otherApple.centerOf();
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt((dx * dx) + (dy * dy));
  }
}

export function sum(apples: Apple[]) {
  return apples
    .map((apple) => apple.number)
    .reduce((acc, curr) => curr + acc, 0);
}

export function weld(apples: Apple[]): Apple[] {
  const removed: Set<Apple> = new Set();
  for (const apple of apples) {
    if (removed.has(apple)) continue;
    for (const otherApple of apples) {
      if (apple === otherApple) continue;
      if (removed.has(otherApple)) continue;
      if (apple.distance(otherApple) < 10) {
        if (apple.priority < otherApple.priority) removed.add(otherApple);
        else removed.add(apple);
      }
    }
  }
  return apples.filter((apple) => !removed.has(apple));
}

export function sortByX(apples: Apple[]) {
  return apples.sort((a, b) => a.region.left - b.region.left);
}

export function sortByY(apples: Apple[]) {
  return apples.sort((a, b) => a.region.top - b.region.top);
}

export function* chunks<T>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
