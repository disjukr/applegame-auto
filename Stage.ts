import { mouse, straightTo } from "@nut-tree/nut-js";
import { Apple, chunks, sortByX, sortByY, sum, weld } from "./Apple.js";

export class Stage {
  public static width = 18;
  public static height = 9;
  public arr: Apple[][];
  public removed: Set<Apple> = new Set();
  constructor(apples: Apple[]) {
    this.arr = [...chunks(sortByY(weld(apples)), Stage.width)].map(sortByX);
  }
  async action(left: number, width: number, top: number, height: number) {
    const tl = this.get(left, top);
    const br = this.get(left + width - 1, top + height - 1);
    if (!tl || !br) return false;
    const apples = this.apples(left, width, top, height);
    if (sum(apples) !== 10) return false;
    for (const apple of apples) this.removed.add(apple);
    await mouse.move(straightTo(tl.centerOf(-5, -5)));
    await mouse.drag(straightTo(br.centerOf(5, 5)));
    return true;
  }
  apples(left: number, width: number, top: number, height: number): Apple[] {
    const result: Apple[] = [];
    for (let i = 0; i < height; ++i) {
      const y = top + i;
      for (let j = 0; j < width; ++j) {
        const x = left + j;
        const apple = this.get(x, y);
        apple && result.push(apple);
      }
    }
    return result;
  }
  get(x: number, y: number, ignoreRemoved = false): Apple | null {
    if (x < 0 || x >= Stage.width) return null;
    if (y < 0 || y >= Stage.height) return null;
    const apple = this.arr[y][x];
    if (ignoreRemoved) return apple;
    if (this.removed.has(apple)) return null;
    return apple;
  }
  toString() {
    return this.arr.map((r) => r.map((a) => a.number).join("")).join("\n");
  }
}
