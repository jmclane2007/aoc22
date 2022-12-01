import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput = input.split("\r\n");
  let currentCals = 0;
  const elves = [];
  for (const line of splitInput) {
    if(line) {
      currentCals += parseInt(line);
    } else {
      elves.push(currentCals)
      currentCals = 0;
    }
  }
  elves.sort();
  console.log(elves[elves.length-1] + elves[elves.length-2] + elves[elves.length-3]);
}

processInstructions();