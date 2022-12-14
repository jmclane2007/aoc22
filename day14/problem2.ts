import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const lines = input.split("\r\n");
  // Just taking a guess, not sure if sand can build past 500
  const gridSize = 700;
  // After sand goes past the y max we can stop building sand
  let yMax = 0;
  const rocks: boolean[][] = [...Array(gridSize)].map(e => Array(gridSize).fill(false));
  for(let line of lines) {
    const coords = line.split(/[\s->,]+/).map(str => parseInt(str));
    let a: Point = {x: coords[0], y: coords[1]};
    yMax = Math.max(yMax, a.y);
    for(let i = 2; i < coords.length; i += 2) {
      const b = {x: coords[i], y: coords[i+1]};
      yMax = Math.max(yMax, b.y);
      markRocks(a, b, rocks);
      a = b;
    }
  }
  for(let i = 0; i < gridSize; i++) {
    rocks[i][yMax + 2] = true;
  }

  console.log(dropSand(rocks));
}
function markRocks(a: Point, b: Point, rocks: boolean[][]) {
  if(a.x === b.x) {
    if(a.y >= b.y) {
      for(let i = a.y; i >= b.y; i--) {
        rocks[a.x][i] = true;
      }
    } else {
      for(let i = a.y; i <= b.y; i++) {
        rocks[a.x][i] = true;
      }
    }
  } else {
    if(a.x >= b.x) {
      for(let i = a.x; i >= b.x; i--) {
        rocks[i][a.y] = true;
      }
    } else {
      for(let i = a.x; i <= b.x; i++) {
        rocks[i][a.y] = true;
      }
    }
  }
}

function dropSand(rocks: boolean[][]) {
  const sandXStart = 500;
  const sandYStart = 0;
  let sandCount = 0;
  while(true) {
    let sandX = sandXStart;
    for(let i = sandYStart; i < rocks[0].length; i++) {
      
      if(rocks[sandXStart][sandYStart]) {
        return sandCount;
      }
      if(rocks[sandX + 1] === undefined) {
        console.log(sandX + 1, i+1);
      }
      if(rocks[sandX][i+1]) {
        if(rocks[sandX - 1][i+1]) {
          if(rocks[sandX + 1][i+1]) {
            rocks[sandX][i] = true;
            sandCount++;
            break;
          } else {
            sandX++;
          }
        } else{
          sandX--;
        }
      }
    }
  }
}

processInstructions();

interface Point {
  x: number;
  y: number;
}