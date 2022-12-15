import * as fs from 'fs';

async function processInstructions() {
  const input = fs.readFileSync("input.txt", "utf8").trim();
  const coords = input.split(/[^0-9-]+/);
  const sensors: Point[] = [];
  const beacons: Point[] = [];
  let minBeaconX = Number.MAX_SAFE_INTEGER;
  let maxBeaconX = Number.MIN_SAFE_INTEGER
  for(let i = 1; i < coords.length; i += 4) {
    sensors.push({x: parseInt(coords[i]), y: parseInt(coords[i+1])})
    const beaconX = parseInt(coords[i+2]);
    beacons.push({x: beaconX, y: parseInt(coords[i+3])})
    minBeaconX = Math.min(minBeaconX, beaconX);
    maxBeaconX = Math.max(maxBeaconX, beaconX);
  }
  // Manhattan distance is Math.abs(x1 - x2) + Math.abs(y1 - y2)
  // build ranges based on distance
  const row = 2000000;
  const ranges: number[][] = [];
  for(let i = 0; i < sensors.length; i++) {
    const manDist = Math.abs(sensors[i].x - beacons[i].x) + Math.abs(sensors[i].y - beacons[i].y);
    const distanceToRow = Math.abs(row - sensors[i].y);
    if(distanceToRow < manDist) {
      const radius = manDist - distanceToRow;
      // create a range 
      ranges.push([sensors[i].x - radius, sensors[i].x + radius]);
    }
  }
  const mergedRanges = mergeRanges(ranges);
  const beaconSet = new Set();
  // Account for inclusive boundaries
  let spaces = mergedRanges.length;
  // Check to see if beacons are on the row
  for(let i = 0; i < beacons.length; i++) {
    if(beacons[i].y === row && !beaconSet.has(beacons[i].x)) {
      beaconSet.add(beacons[i].x);
      for(let range of mergedRanges) {
        if(beacons[i].x >= range[0] && beacons[i].x <= range[1]) {
          spaces--;
        }
      }
    }
  }

  for(let range of mergedRanges) {
    spaces += Math.abs(range[0] - range[1]);
  }
  console.log(minBeaconX, maxBeaconX)
  console.log(spaces);
}

function mergeRanges(ranges: number[][]) {
  ranges.sort((a,b) => a[0] - b[0]);
  const result = [];
  let start = ranges[0];
  for(let i = 1; i < ranges.length; i++) {
    if(start[1] >= ranges[i][0]) {
      start = [start[0], Math.max(start[1], ranges[i][1])]
    } else {
      result.push(start);
      start = ranges[i];
    }
  }
  result.push(start);
  return result;
}

processInstructions();

interface Point {
  x: number;
  y: number;
}