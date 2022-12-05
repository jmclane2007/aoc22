import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");

  const stacks: string[][] = [];
  // This input is so annoying
  let stackNumLine = 0;
  // Assuming there are crates to move, find the crate number line
  for(let i = 1; i < lines.length; i++) {
    if(lines[i].substring(1,2) === "1") {
      stackNumLine = i;
      break;
    }
  }
  // Set up our 2d array
  for(let i = 0; i < lines[0].length / 4; i++) {
    stacks.push([]);
  }

  for(let i = stackNumLine - 1; i > -1; i--) {
    let k = 0;
    for(let j = 0; j < lines[0].length + 1; j += 4) {
      const maybeEmpty = lines[i].substring(j, j+4).trim();
      if(maybeEmpty) {
        stacks[k].push(maybeEmpty);
      }
      k++;
    }
  }
  
  for(let i = stackNumLine + 2; i < lines.length; i++) {
    const moveSplit = lines[i].split(/\D+/);
    // I'm lazy so we're popping twice.
    const tempArray = [];
    for(let j = 0; j < parseInt(moveSplit[1]); j++) {
      const crate = stacks[parseInt(moveSplit[2]) - 1].pop();
      if(crate) {
        tempArray.push(crate);
      }
    }
    while(tempArray.length) {
      stacks[parseInt(moveSplit[3]) - 1].push(tempArray.pop()!);
    }
  }

  let result = "";
  for(let i = 0; i < stacks.length; i++) {
    result += stacks[i][stacks[i].length - 1].charAt(1);
  }

  console.log(result);
}

processInstructions();