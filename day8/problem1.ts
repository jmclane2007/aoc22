import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\r\n");

  let visibleTrees = lines.length * 2 + ((lines[0].length - 2) * 2);
  const alreadyVisible = new Array(lines.length);
  //initialize the visible array
  for(let i = 0; i < lines.length; i++) {
    alreadyVisible[i] = new Array(lines[i].length);
    for(let j = 0; j < lines[0].length; j++) {
      alreadyVisible[i][j] = false;
    }
  }
  // Scan rows, we've already looked at the top and bottom row
  for(let i = 1; i < lines.length - 1; i++) {
    const currRow = lines[i];
    let maxLeft = currRow.charCodeAt(0);
    let maxRight = currRow.charCodeAt(currRow.length - 1);
    let maxTop = lines[0].charCodeAt(i);
    let maxBottom = lines[lines.length - 1].charCodeAt(i);
    for(let j = 1; j < currRow.length - 1; j++) {
      const leftHeight = currRow.charCodeAt(j)
      if(leftHeight > maxLeft) {
        if(!alreadyVisible[i][j]) {
          visibleTrees++;
          alreadyVisible[i][j] = true;
        }
        maxLeft = leftHeight;
      }
      const rightHeight = currRow.charCodeAt(currRow.length - j - 1);
      if(rightHeight > maxRight) {
        if(!alreadyVisible[i][currRow.length - j - 1]) {
          visibleTrees++;
          alreadyVisible[i][currRow.length - j - 1] = true;
        }
        maxRight = rightHeight;
      }
      const topHeight = lines[j].charCodeAt(i);
      if(topHeight > maxTop) {
        if(!alreadyVisible[j][i]) {
          visibleTrees++;
          alreadyVisible[j][i] = true;
        }
        maxTop = topHeight
      }
      const bottomHeight = lines[lines.length - j - 1].charCodeAt(i);
      if(bottomHeight > maxBottom) {
        if(!alreadyVisible[lines.length - j - 1][i]) {
          visibleTrees++;
          alreadyVisible[lines.length - j - 1][i] = true;
        }
        maxBottom = bottomHeight;
      }
    }
  }
  console.log(visibleTrees);
}

processInstructions();