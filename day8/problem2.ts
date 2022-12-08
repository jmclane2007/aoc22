import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");

  let maxScore = 0;
  for(let i = 1; i < lines.length - 1; i++) {
    for(let j = 1; j < lines[0].length - 1; j++) {
      maxScore = Math.max(findScenicScore(lines, i, j), maxScore);
    }
  }
  console.log(maxScore);
}

processInstructions();

function findScenicScore(trees: string[], i: number, j: number): number {
  const currHeight = trees[i].charCodeAt(j);
  // Check all directions
  let upCount = 0;
  for(let row = i-1; row >= 0; row--) {
    upCount++;
    if(trees[row].charCodeAt(j) >= currHeight) {
      break;
    }
  }
  let downCount = 0;
  for(let row = i+1; row < trees.length; row++) {
    downCount++;
    if(trees[row].charCodeAt(j) >= currHeight) {
      break;
    }
  }
  let leftCount = 0;
  for(let col = j-1; col >= 0; col--) {
    leftCount++;
    if(trees[i].charCodeAt(col) >= currHeight) {
      break;
    }
  }
  let rightCount = 0;
  for(let col = j+1; col < trees[0].length; col++) {
    rightCount++;
    if(trees[i].charCodeAt(col) >= currHeight) {
      break;
    }
  }

  return upCount * downCount * leftCount * rightCount;
}