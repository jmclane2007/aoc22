import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const lines = input.split(/\r\n/);
  
  const valMap = new Map<string, string | number>();
  for(let i = 0; i < lines.length; i++) {
    const arr = lines[i].split(/: /);
    const parsed = parseInt(arr[1])
    if(Number.isNaN(parsed)) {
      valMap.set(arr[0], arr[1])
    } else {
      valMap.set(arr[0], parsed)
    }
  }
  console.log(findValue(valMap, "root"));
}

function findValue(valMap: Map<string, string | number>, monkey: string): number {
  const val = valMap.get(monkey);
  if(typeof val === "number") {
    return val;
  }
  const unkownValue = val!.split(/\s+/);
  const firstMonkeyValue = findValue(valMap, unkownValue[0]);

  if(unkownValue[1] === "+") {
    return firstMonkeyValue + findValue(valMap, unkownValue[2]);
  } else if(unkownValue[1] === "-") {
    return firstMonkeyValue - findValue(valMap, unkownValue[2]);
  } else if(unkownValue[1] === "*") {
    return firstMonkeyValue * findValue(valMap, unkownValue[2]);
  } else {
    return firstMonkeyValue / findValue(valMap, unkownValue[2]);
  }
}
processInstructions();
