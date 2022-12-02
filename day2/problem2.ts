import * as fs from 'fs';

const xScore = 1;
const yScore = 2;
const zScore = 3;

const win = 6;
const draw = 3;
const loss = 0;

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8");
  const splitInput = input.split(/\s+/);

  let totalScore = 0;
  for(let i = 0; i < splitInput.length; i+=2) {
    if(splitInput[i] === "A") {
      if(splitInput[i+1] === "X") {
        totalScore += zScore + loss;
      } else if(splitInput[i+1] === "Y") {
        totalScore += xScore + draw;
      } else {
        totalScore += yScore + win;
      }
    } else if (splitInput[i] === "B") {
      if(splitInput[i+1] === "X") {
        totalScore += xScore + loss;
      } else if(splitInput[i+1] === "Y") {
        totalScore += yScore + draw;
      } else {
        totalScore += zScore + win;
      }
    } else {
      if(splitInput[i+1] === "X") {
        totalScore += yScore + loss;
      } else if(splitInput[i+1] === "Y") {
        totalScore += zScore + draw;
      } else {
        totalScore += xScore + win;
      }
    }
  }
  
  console.log(totalScore);
}

processInstructions();