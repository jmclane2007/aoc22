import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split(/\s+/);
  let priorityTotal = 0;
  for(let line of lines) {
    const firstHalf = line.substring(0,line.length/2);
    const secondHalf = line.substring(line.length/2, line.length);
    priorityTotal += findCommonLetter(firstHalf, secondHalf);
  }
  console.log(priorityTotal);
}

function findCommonLetter(firstHalf: string, secondHalf: string): number {
  const set = new Set<string>();
  for(let i = 0; i < firstHalf.length; i++) {
    set.add(firstHalf.charAt(i));
  }
  for(let i = 0; i < secondHalf.length; i++) {
    const char = secondHalf.charAt(i);
    if(set.has(char)) {
      console.log(secondHalf.charAt(i))
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