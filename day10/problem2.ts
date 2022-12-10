import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const commands = input.split(/\s+/);

  const screenSize = 40;
  let screen = "";
  let register = 1;
  for(let i = 0; i < commands.length; i++) {
    const remainder = i % screenSize;
    if(i > 0 && remainder === 0) {
      screen += "\n";
    }
    if(remainder <= register + 1 && remainder >= register - 1) {
      screen += "#";
    } else {
      screen += ".";
    }
    if(commands[i] === "addx") {
      i++;
      if(i > 0 && i % screenSize === 0) {
        screen += "\n";
      }
      if(i%screenSize <= register + 1 && i%screenSize >= register - 1) {
        screen += "#";
      } else {
        screen += "."
      }
      
      register += parseInt(commands[i]);
    }
  }
  console.log(screen);
}
processInstructions();