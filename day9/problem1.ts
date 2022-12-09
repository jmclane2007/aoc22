import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const moves = input.split(/\s+/);

  const visited = new Set();

  let headRight = 0, headUp = 0;
  let tailRight = 0, tailUp = 0;
  for(let i = 0; i < moves.length; i+=2) {
    let num = parseInt(moves[i+1]);
    // actually move the head
    for(let j = 0; j < num; j++) {
      // avoiding doing point object here
      visited.add(tailRight + "," + tailUp);
      if(moves[i] === "U") {
        headUp++
      } else if (moves[i] === "D") {
        headUp--;
      } else if (moves[i] === "R") {
        headRight++;
      } else {
        headRight--;
      }
      if(headRight - tailRight > 1) {
        if(headUp - tailUp > 0) {
          tailUp++;
        } else if(headUp - tailUp < 0) {
          tailUp--;
        }
        tailRight++
      } else if(headRight - tailRight < -1) {
        if(headUp - tailUp > 0) {
          tailUp++
        } else if(headUp - tailUp < 0) {
          tailUp--;
        }
        tailRight--;
      } else if(headUp - tailUp > 1) {
        if(headRight - tailRight > 0) {
          tailRight++;
        } else if (headRight - tailRight > 0) {
          tailRight--;
        }
        tailUp++;
      } else if(headUp - tailUp < -1) {
        if(headRight - tailRight > 0) {
          tailRight++;
        } else if (headRight - tailRight > 0) {
          tailRight--;
        }
        tailUp--;
      }
    }
  }
  console.log(visited.size);
}

processInstructions();