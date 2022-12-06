import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");

  // Change window length for problem 1
  // const windowLength = 4
  const windowLength = 14;
  const window = [input.charAt(0), input.charAt(1), input.charAt(2)];
  let startPos = 0;
  for(let i = 3; i < input.length && startPos === 0; i++) {
    const currChar = input.charAt(i);
    window[i % windowLength] = currChar;
    const set = new Set();
    for(let j = 0; j < windowLength; j++) {
      set.add(window[j]);
    }
    if(set.size === windowLength) {
      startPos = i + 1;
    }
  }
  console.log(startPos)
}


processInstructions();