import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const lines = input.split("\r\n");

  let indexSum = 0;
  for(let i = 0; i < lines.length; i+=3) {
    const left = JSON.parse(lines[i]);
    const right = JSON.parse(lines[i+1]);
    if(compareSignals(left, right) > 0) {
      console.log(i/3 + 1)
      indexSum += ((i/3) + 1);
    }
  }
  console.log(indexSum);
}

function compareSignals(left: number | any[], right: number | any[]): number {
  if(typeof left === "number") {
    if(typeof right === "number") {
      if(left < right) {
        return 1;
      } else if (left > right) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return compareSignals([left], right);
    }
  }
  if(typeof right === "number") {
    return compareSignals(left, [right]);
  }
  for(let i = 0; i < Math.max(left.length, right.length); i++) {
    if(left[i] === undefined) {
      return 1;
    }
    if(right[i] === undefined) {
      return -1;
    }
    const cmp = compareSignals(left[i], right[i]);
    if(cmp !== 0) {
      return cmp;
    }
  }
  return 0;
}

processInstructions();