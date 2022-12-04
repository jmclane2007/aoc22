import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput = input.split(/[,\s-]+/);
  
  let overlapCount = 0;
  for(let i = 0; i < splitInput.length; i += 4) {
    const a = parseInt(splitInput[i]);
    const b = parseInt(splitInput[i+1]);
    const c = parseInt(splitInput[i+2]);
    const d = parseInt(splitInput[i+3]);

    // Problem 1 solution
    if((a <= d && a >= c && b >= c && b <= d) || (c <= b && c >= a && d <= b && d >= a)) {
    // Problem 2 solution
    //if((a <= d && a >= c || b >= c && b <= d) || (c <= b && c >= a || d <= b && d >= a)) {
      overlapCount++
    }
  }
  console.log(overlapCount)
}

processInstructions();