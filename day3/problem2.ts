import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split(/\s+/);
  let priorityTotal = 0;
  for(let i = 0; i < lines.length; i +=3) {
    priorityTotal += findCommonLetter(lines[i], lines[i+1], lines[i+2]);
  }
  console.log(priorityTotal);
}

function findCommonLetter(first: string, second: string, third: string): number {
  const firstSet = new Set<string>();
  for(let i = 0; i < first.length; i++) {
    firstSet.add(first.charAt(i));
  }
  const secondSet = new Set<string>();
  for(let i = 0; i < second.length; i++) {
    const char = second.charAt(i);
    if(firstSet.has(char)) {
      secondSet.add(char)
    }
  }
  for(let i = 0; i < third.length; i++) {
    const char = third.charAt(i);
    if(secondSet.has(char)) {
      const value = char.charCodeAt(0);
      if(value < 91) {
        // This would be easier with Java or something that allows char math
        // Using ascii values here
        return value - 38;
      } else {
        return value - 96;
      }
    }
  }
  return 0;
}

processInstructions();