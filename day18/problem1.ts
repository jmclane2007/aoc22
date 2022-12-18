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

  const space: boolean[][][] = Array.from(
    { length: xMax + 1 }, e => Array.from(
      { length: yMax + 1 }, e => Array(zMax + 1).fill(false)))
  for(let i = 0; i < coords.length; i += 3) {
    space[coords[i]][coords[i+1]][coords[i+2]] = true;
  }

  let surfaceArea = 0;
  for(let i = 0; i < space.length; i++) {
    for(let j = 0; j < space[0].length; j++) {
      for(let k = 0; k < space[0][0].length; k++) {
        if(space[i][j][k]) {
          // Check sides
          surfaceArea += checkSides(i,j,k, space);
        }
      }
    }
  }
  console.log(surfaceArea)
}

function checkSides(x:number, y:number, z:number, space: boolean[][][]): number {
  let surfaceArea = 0;
  if(x === 0 || !space[x-1][y][z]) {
    surfaceArea++;
  }
  if(y === 0 || !space[x][y-1][z]) {
    surfaceArea++;
  }
  if(z === 0 || !space[x][y][z-1]) {
    surfaceArea++;
  }
  if(x === space.length-1 || !space[x+1][y][z]) {
    surfaceArea++;
  }
  if(y === space[0].length-1 || !space[x][y+1][z]) {
    surfaceArea++;
  }
  if(z === space[0][0].length-1 || !space[x][y][z+1]) {
    surfaceArea++;
  }
  return surfaceArea;
}

processInstructions();