import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const lines = input.split("\r\n");

  const monkeys: Monkey[] = [];
  // read in monkeys, this would be so much easier to hard code
  for(let i = 1; i < lines.length; i += 7) {
    const items = lines[i].substring(18).split(/[,\s]+/).map(str => parseInt(str));
    const operationLine = lines[i+1].split(/\s+/);
    let opFunction;
    const operation = lines[i+1].charAt(23) === "*";
    if(operationLine[operationLine.length - 1] === "old") {
      if(operation) {
        opFunction = (old: number) => old * old;
      } else {
        opFunction = (old: number) => old + old;
      }
    } else {
      if(operation) {
        opFunction = (old: number) => old * parseInt(operationLine[operationLine.length - 1]);
      } else {
        opFunction = (old: number) => old + parseInt(operationLine[operationLine.length - 1]);
      }
    }
    const remainderLine = lines[i+2].split(/\s+/);
    const remainderTest = parseInt(remainderLine[remainderLine.length - 1]);
    const trueMonkey = parseInt(lines[i+3].charAt(lines[i+3].length-1));
    const falseMonkey = parseInt(lines[i+4].charAt(lines[i+4].length-1));

    monkeys.push({activity: 0, items, operation: opFunction, remainderTest, trueMonkey, falseMonkey});
  }

  const bigMod = monkeys.map(monkey => monkey.remainderTest).reduce((a, b) => a * b);

  const numRounds = 10000;
  for(let i = 0; i < numRounds; i++) {
    for(let j = 0; j < monkeys.length; j++) {
      const monkey = monkeys[j];
      monkey.activity += monkey.items.length;
      while(monkey.items.length > 0) {
        const item = monkey.operation(monkey.items.pop()! % bigMod);
        if(item % monkey.remainderTest === 0) {
          monkeys[monkey.trueMonkey].items.push(item);
        } else {
          monkeys[monkey.falseMonkey].items.push(item);
        }
      }
    }
  }

  monkeys.sort((a,b) => b.activity - a.activity);
  console.log(monkeys[0].activity * monkeys[1].activity);
}

processInstructions();

interface Monkey {
  activity: number
  items: number[];
  operation (old:number): number;
  remainderTest: number;
  trueMonkey: number;
  falseMonkey: number;
}

