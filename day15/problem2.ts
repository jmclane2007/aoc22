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
  const maxBounds = 4000000;
  let itemY = -1;
  for(let row = 0; row <= maxBounds && itemY === -1; row++) {
    const ranges: number[][] = [];
  
    for(let i = 0; i < sensors.length; i++) {
      const manDist = Math.abs(sensors[i].x - beacons[i].x) + Math.abs(sensors[i].y - beacons[i].y);
      const distanceToRow = Math.abs(row - sensors[i].y);
      if(distanceToRow < manDist) {
        const radius = manDist - distanceToRow;
        // create a range 
        ranges.push([Math.max(sensors[i].x - radius, 0), Math.min(sensors[i].x + radius, 4000000)]);
      }
    }
    
    const mergedRanges = mergeRanges(ranges);
    if(mergedRanges.length > 1) {
      itemY = row;
      console.log(mergedRanges[0][1] + 1);
      console.log(row);
      console.log((maxBounds * (mergedRanges[0][1] + 1)) + itemY)
    }
  }
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