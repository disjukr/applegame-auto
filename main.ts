import "@nut-tree/nl-matcher";
import { loadImage, mouse, screen } from "@nut-tree/nut-js";
import { Apple } from "./Apple.js";
import { Stage } from "./Stage.js";

mouse.config.mouseSpeed = 800;

const apples: Apple[] = [];
const images = await Promise.all([1, 2, 3, 4, 5, 6, 7, 8, 9].map(
  (n) => loadImage(`./images/${n}.png`),
));
for (let i = 0; i < images.length; ++i) {
  const number = i + 1;
  const regions = await screen.findAll(images[i], {
    confidence: 0.98,
    providerData: { searchMultipleScales: false },
  });
  for (let j = 0; j < regions.length; ++j) {
    const priority = j / regions.length;
    const region = regions[j];
    apples.push(new Apple(region, number, priority));
  }
}

const stage = new Stage(apples);
console.log("-- stage --");
console.log(stage.toString());

for (let i = 0; i < 2; ++i) {
  for (let h = 1; h <= 2; ++h) {
    for (let w = 1; w <= 2; ++w) {
      if (w === 1 && h === 1) continue;
      for (let y = 0; y <= Stage.height - h; ++y) {
        for (let x = 0; x <= Stage.width - w; ++x) {
          const ok = await stage.action(x, w, y, h);
          if (ok) await sleep(200);
        }
      }
    }
  }
}

for (let i = 0; i < 2; ++i) {
  for (let h = 1; h <= 3; ++h) {
    for (let w = 1; w <= 3; ++w) {
      if (w === 1 && h === 1) continue;
      for (let y = 0; y <= Stage.height - h; ++y) {
        for (let x = 0; x <= Stage.width - w; ++x) {
          const ok = await stage.action(x, w, y, h);
          if (ok) await sleep(200);
        }
      }
    }
  }
}

for (let i = 0; i < 3; ++i) {
  for (let h = 1; h <= Stage.height; ++h) {
    for (let w = 1; w <= Stage.width; ++w) {
      if (w === 1 && h === 1) continue;
      for (let y = 0; y <= Stage.height - h; ++y) {
        for (let x = 0; x <= Stage.width - w; ++x) {
          const ok = await stage.action(x, w, y, h);
          if (ok) await sleep(200);
        }
      }
    }
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
