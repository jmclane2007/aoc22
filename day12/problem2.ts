import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const lines = input.split("\r\n");

  let startRow = -1, startCol = -1;
  for(let i = 0; i < lines.length; i++) {
    const checkStart = lines[i].indexOf("E");
    if(checkStart >= 0) {
      startRow = i;
      startCol = checkStart;
    }
    lines[i] = lines[i].replace("S", "a");
  }
  lines[startRow] = lines[startRow].replace("E", "z");
  
  console.log(dijkstras(lines, startRow, startCol));
}

function dijkstras(elevation: string[], startRow: number, startCol: number) {
  const distances: number[][] = [...Array(elevation.length)].map(e => Array(elevation[0].length).fill(Number.MAX_SAFE_INTEGER));
  distances[startRow][startCol] = 0;
  const stack: Point[] = [{row: startRow, col: startCol}];
  let aDistance = Number.MAX_SAFE_INTEGER;
  while(stack.length > 0) {
    const currPoint = stack.pop();
    const currRow = currPoint!.row;
    const currCol = currPoint!.col;
    if(elevation[currRow][currCol] === "a") {
      aDistance = Math.min(aDistance, distances[currRow][currCol])
    }
    const height = elevation[currRow].charCodeAt(currCol);
    // For each adjacency
    if(currRow + 1 < elevation.length &&
      height - elevation[currRow + 1].charCodeAt(currCol) < 2 &&
      distances[currRow][currCol] + 1 < distances[currRow + 1][currCol]) {
      distances[currRow + 1][currCol] = distances[currRow][currCol] + 1;
      stack.push({row: currRow + 1, col: currCol})
    }
    if(currRow - 1 >= 0 &&
      height - elevation[currRow - 1].charCodeAt(currCol) < 2 &&
      distances[currRow][currCol] + 1 < distances[currRow - 1][currCol]) {
      distances[currRow - 1][currCol] = distances[currRow][currCol] + 1;
      stack.push({row: currRow - 1, col: currCol})
    }
    if(currCol + 1 < elevation[0].length &&
      height - elevation[currRow].charCodeAt(currCol + 1) < 2 &&
      distances[currRow][currCol] + 1 < distances[currRow][currCol + 1]) {
      distances[currRow][currCol + 1] = distances[currRow][currCol] + 1;
      stack.push({row: currRow, col: currCol + 1})
    }
    if(currCol - 1 >= 0 &&
      height - elevation[currRow].charCodeAt(currCol - 1) < 2 &&
      distances[currRow][currCol] + 1 < distances[currRow][currCol - 1]) {
      distances[currRow][currCol - 1] = distances[currRow][currCol] + 1;
      stack.push({row: currRow, col: currCol - 1})
    }
  }

  return aDistance;
}

processInstructions();

interface Point {
  row: number;
  col: number;
}