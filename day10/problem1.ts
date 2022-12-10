import * as fs from 'fs';

async function processInstructions() {
  const cycles = [20, 60, 100, 140, 180, 220];
  const input = fs.readFileSync("input.txt", "utf8");
  const commands = input.split(/\s+/);

  let totalSignalStrength = 0;
  let register = 1;
  let currCycle = 0;
  for(let i = 0; i < commands.length; i++) {
    // Noop or adding will put us past the cycle we are looking for
    if(i + 1 === cycles[currCycle] || i + 2 === cycles[currCycle]) {
      totalSignalStrength += (cycles[currCycle] * register);
      console.log(cycles[currCycle], register, i)
      currCycle++;
    }
    if(commands[i] === "addx") {
      console.log(commands[i], commands[i+1]);
      i++;
      register += parseInt(commands[i]);
    }
  }
  console.log(totalSignalStrength);
}
processInstructions();