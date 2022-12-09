import * as fs from 'fs';

async function processInstructions() {
  const NUM_KNOTS = 10;
  const input = fs.readFileSync("input.txt", "utf8");
  const moves = input.split(/\s+/);

  const visited = new Set();
  const knots = [];
  for(let i = 0; i < NUM_KNOTS; i++) {
    knots.push({up: 0, right: 0})
  }

  for(let i = 0; i < moves.length; i+=2) {
    let num = parseInt(moves[i+1]);
    // actually move the head
    for(let j = 0; j < num; j++) {
      // avoiding doing point object here
      if(moves[i] === "U") {
        knots[0].up++;
      } else if (moves[i] === "D") {
        knots[0].up--;
      } else if (moves[i] === "R") {
        knots[0].right++;
      } else {
        knots[0].right--;
      }

      for(let k = 0; k < knots.length - 1; k++) {
        const head = knots[k];
        const tail = knots[k + 1];
        if(head.right - tail.right > 1) {
          if(head.up - tail.up > 0) {
            tail.up++;
          } else if(head.up - tail.up < 0) {
            tail.up--;
          }
          tail.right++
        } else if(head.right - tail.right < -1) {
          if(head.up - tail.up > 0) {
            tail.up++
          } else if(head.up - tail.up < 0) {
            tail.up--;
          }
          tail.right--;
        }
        if(head.up - tail.up > 1) {
          if(head.right - tail.right > 0) {
            tail.right++;
          } else if (head.right - tail.right < 0) {
            tail.right--;
          }
          tail.up++;
        } else if(head.up - tail.up < -1) {
          if(head.right - tail.right > 0) {
            tail.right++;
          } else if (head.right - tail.right < 0) {
            tail.right--;
          }
          tail.up--;
        }
      }
      visited.add(knots[knots.length- 1].right + "," + knots[knots.length- 1].up);
    }
  }
  console.log(knots);
  console.log(visited.size);
}

processInstructions();

interface Point {
  up: number;
  right: number;
}