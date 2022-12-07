import * as fs from 'fs';

async function processInstructions() {
  const TOTAL_SPACE = 70000000;
  const FREE_SPACE_NEEDED = 30000000;

  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");
  // Start at the root
  const root: DoubleTree = {
    size: 0,
    dirs: new Map<string, DoubleTree>()
  }

  let currDir = root;
  for(let line of lines) {
    const commands = line.split(/\s+/);
    // At this point, we should know we are executing a command
    if(commands[0] === "$") {
      if(commands[1] === "cd") {
        if(commands[2] === "/") {
          currDir = root;
        } else if(commands[2] === "..") {
          if(currDir.up) {
            currDir = currDir.up;
          }
        } else {
          if(currDir.dirs?.has(commands[2])) {
            currDir = currDir.dirs.get(commands[2])!;
          } else {
            currDir.dirs?.set(commands[2], {size: 0, up: currDir, dirs: new Map<string, DoubleTree>()})
          }
        }
      } else {
        currDir.size = 0;
      }
    } else {
      if(commands[0] === "dir") {
        if(!currDir.dirs.has(commands[1])) {
          currDir.dirs.set(commands[1], {size: 0, up: currDir, dirs: new Map<string, DoubleTree>()})
        }
      } else {
        // it's a number, so add to the size
        currDir.size += parseInt(commands[0]);
      }
    }
  }
  // Add up the space used in a separate run
  const spaceUsed = dfs(root, false);
  const spaceNeeded =  FREE_SPACE_NEEDED - (TOTAL_SPACE - spaceUsed);
  let minDir = TOTAL_SPACE;
  function dfs(dir: DoubleTree, findMin: boolean): number {
    if(dir.dirs.size === 0) {
      if(findMin && dir.size >= spaceNeeded) {
        minDir = Math.min(minDir, dir.size);
      }
      return dir.size;
    } else {
      let currSize = dir.size;
      for(let key of dir.dirs.keys()) {
        currSize += dfs(dir.dirs.get(key)!, findMin);
      }
      if(findMin && currSize >= spaceNeeded) {
        minDir = Math.min(minDir, currSize);
      }
      return currSize;
    }
  }

  dfs(root, true);
  console.log(minDir);
}



processInstructions();

interface DoubleTree {
  size: number;
  dirs: Map<string, DoubleTree>;
  up?: DoubleTree;
}