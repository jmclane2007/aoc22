import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const strings = input.split(/\s+/);
  const values = [];
  for(let i = 0; i < strings.length; i++) {
    const num = parseInt(strings[i]);
    // There are duplicate values, so include an index to key off of
    values.push([num, i]);
  }

  for(let i = 0; i < values.length; i++) {
    const index = values.findIndex(value => value[1] === i);
    const value = values[index][0];
    values.splice(index, 1);
    values.splice((index + value) % values.length, 0, [value, i]);
  }

  const zeroIndex = values.findIndex(value => value[0] === 0);
  let sum = values[(zeroIndex + 1000) % values.length][0] +
    values[(zeroIndex + 2000) % values.length][0] +
    values[(zeroIndex + 3000) % values.length][0];

  console.log(sum);
}

processInstructions();

