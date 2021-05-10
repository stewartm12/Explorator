export function dijkstraAlgo(grid, startNode, finishNode) {
	// sptSet (shortest path tree set)
  const sptSet = [];
  startNode.distance = 0;
	
  const unvisitedNodes = allSingleNodes(grid);
	
  while (unvisitedNodes.length) {

    // sortByDistance(unvisitedNodes);
    let unvisitedNodesSorted = unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

    const closestNode = unvisitedNodesSorted.shift();
    
    if (closestNode.isWall) continue;

    closestNode.isVisited = true;
    sptSet.push(closestNode);
		
    if (closestNode === finishNode) return sptSet;
		
    updateUnvisitedNeighbors(closestNode, grid);
		
  }
}

function updateUnvisitedNeighbors(node, grid) {
	
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
    
  }
	
}

function getUnvisitedNeighbors(node, grid) {
	
  const neighbors = [];
  const {col, row} = node;
// grab the top neighbor
  if (row > 0) neighbors.push(grid[row - 1][col]);
  // grab the bottom neighbor
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  // grab the left neighbor
  if (col > 0) neighbors.push(grid[row][col - 1]);
  // grab the right neighbor
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
	
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function allSingleNodes(grid) {
	
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

	
  return nodes;
}

export function dijkstraShortestPath(finishNode) {
  const shortestPath = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    shortestPath.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath;
}