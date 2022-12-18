import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const coords = input.split(/[,\s]+/).map(str => parseInt(str));

  let xMax = 0, yMax = 0, zMax = 0;
  for(let i = 0; i < coords.length; i += 3) {
    xMax = Math.max(xMax, coords[i])
    yMax = Math.max(yMax, coords[i+1])
    zMax = Math.max(zMax, coords[i+2])
  }

  // Leave an extra space on the outside of the shape
  const space: boolean[][][] = Array.from(
    { length: xMax + 3 }, e => Array.from(
      { length: yMax + 3 }, e => Array(zMax + 3).fill(false)))
  for(let i = 0; i < coords.length; i += 3) {
    // Add 1 to account for coordinates at x, y, or z = 0
    space[coords[i]+1][coords[i+1]+1][coords[i+2]+1] = true;
  }

  console.log(checkSides(0, 0, 0, space));
}

function checkSides(startX:number, startY:number, startZ:number, space: boolean[][][]): number {

  // Do a BFS this time since we are measuring the outside of the shape
  // check all of the empty space around the droplet
  const visited = new Set();
  let surfaceArea = 0;
  const queue: Point[] = [{x: startX, y: startY, z: startZ}];
  while(queue.length > 0) {
    let {x, y, z} = queue.pop()!;
    const str = `${x},${y},${z}`;
    if(visited.has(str)) {
      continue;
    }
    visited.add(str);
    if(x > 0) {
      if(space[x-1][y][z]) {
        surfaceArea++;
      } else {
        queue.push({x: x-1, y, z});
      }
    }
    if(y > 0) {
      if(space[x][y-1][z]) {
        surfaceArea++;
      } else {
        queue.push({x , y: y-1, z});
      } 
    }
    if(z > 0) {
      if(space[x][y][z-1]) {
        surfaceArea++;
      } else {
        queue.push({x , y, z: z-1});
      }
    }
    if(x < space.length-1) {
      if(space[x+1][y][z]) {
        surfaceArea++;
      } else {
        queue.push({x: x+1 , y, z});
      }
    }
    if(y < space[0].length-1) {
      if(space[x][y+1][z]) {
        surfaceArea++;
      } else {
        queue.push({x , y: y+1, z});
      }
    } 
    if(z < space[0][0].length-1) {
      if(space[x][y][z+1]) {
        surfaceArea++;
      } else {
        queue.push({x, y, z: z+1});
      }
    } 
  }
  return surfaceArea;
}

processInstructions();

interface Point {
  x: number;
  y: number;
  z: number;
}