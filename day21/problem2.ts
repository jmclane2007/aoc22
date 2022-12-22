import * as fs from 'fs';

let path: string[] = [];
async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const lines = input.split(/\r\n/);
  
  const valMap = new Map();
  const originalMap = new Map<string, string | number>();
  for(let i = 0; i < lines.length; i++) {
    const arr = lines[i].split(/: /);
    const parsed = parseInt(arr[1])
    if(Number.isNaN(parsed)) {
      valMap.set(arr[0], arr[1])
      originalMap.set(arr[0], arr[1])
    } else {
      valMap.set(arr[0], parsed)
    }
  }
  const val = valMap.get("root");
  if(typeof val === "number") {
    return;
  }
  const unkownValue = val!.split(/\s+/);
  const strArr: string[] = []
  findPath(valMap, unkownValue[0], "mlgc", strArr, new Set())
  // What we need to match
  const secondValue = findValue(valMap, unkownValue[2])
  findValue(valMap, unkownValue[0]);
  // humn is in the first equation
  let totalValue: number = secondValue;
  while(path.length > 1) {
    const currMonkey = path.pop();
    const equation = originalMap.get(currMonkey!);
    if(typeof equation === "number") {
      console.error("Something went really wrong");
      return;
    }
    const splitArr = equation!.split(/\s+/);
    if(splitArr[1] === "+") {
      if(splitArr![0] === path[path.length - 1]) {
        totalValue -= valMap.get(splitArr[2])!;
      } else {
        totalValue -= valMap.get(splitArr[0]);
      }
    } else if(splitArr[1] === "-") {
      if(splitArr![0] === path[path.length - 1]) {
        totalValue += valMap.get(splitArr[2]);
      } else {
        totalValue = (totalValue - valMap.get(splitArr[0])) * -1;
      }
    } else if(splitArr[1] === "*") {
      if(splitArr![0] === path[path.length - 1]) {
        totalValue /= valMap.get(splitArr[2]);
      } else {
        totalValue /= valMap.get(splitArr[0]);
      }
    } else {
      if(splitArr![0] === path[path.length - 1]) {
        totalValue *= valMap.get(splitArr[2]);
      } else {
        totalValue = valMap.get(splitArr[0])! / totalValue;
      }
    }
  }
  console.log(totalValue);
}

function findValue(valMap: Map<string, string | number>, monkey: string): number {
  const val = valMap.get(monkey);
  if(typeof val === "number") {
    return val;
  }
  const unkownValue = val!.split(/\s+/);
  const firstMonkeyValue = findValue(valMap, unkownValue[0]);

  if(unkownValue[1] === "+") {
    const finalValue = firstMonkeyValue + findValue(valMap, unkownValue[2]);
    valMap.set(monkey, finalValue);
    return finalValue;
  } else if(unkownValue[1] === "-") {
    const finalValue = firstMonkeyValue - findValue(valMap, unkownValue[2]);
    valMap.set(monkey, finalValue);
    return finalValue;
  } else if(unkownValue[1] === "*") {
    const finalValue = firstMonkeyValue * findValue(valMap, unkownValue[2]);
    valMap.set(monkey, finalValue);
    return finalValue;
  } else {
    const finalValue = firstMonkeyValue / findValue(valMap, unkownValue[2]);
    valMap.set(monkey, finalValue);
    return finalValue;
  }
}

function findPath(valMap: Map<string, string | number>, monkey: string, target: string, stack: string[], visited: Set<string>): void {

  stack.push(monkey);
  if(monkey === target) {
    path = [...stack, "humn"].reverse();
  }

  visited.add(monkey);
  const val = valMap.get(monkey);
  if(typeof val === "string") {
    const unkownValue = val.split(/\s+/);
    if(!visited.has(unkownValue[0])) {
      findPath(valMap, unkownValue[0], target, stack, visited);
    }
    if(!visited.has(unkownValue[2])) {
      findPath(valMap, unkownValue[2], target, stack, visited);
    }
  }
  stack.pop();
}


processInstructions();
