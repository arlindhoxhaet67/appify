/* 
filename: complex_code.js

Description: 
This code implements a complex and elaborate algorithm for finding the shortest path in a weighted graph using Dijkstra's algorithm. It includes functions for creating the graph, initializing distances and previous nodes, finding the shortest path, and printing the result. 

Note: For simplicity, this code assumes that the graph is represented as an adjacency matrix. It can be modified to work with different data structures based on the specific requirements.

*/

// Graph creation function
function createGraph(vertices) {
  let graph = new Array(vertices);
  for (let i = 0; i < vertices; i++) {
    graph[i] = new Array(vertices);
    for (let j = 0; j < vertices; j++) {
      graph[i][j] = -1; // Initialize with -1 to represent no edge between vertices
    }
  }
  return graph;
}

// Function to initialize distances and previous nodes
function initialize(graph, start) {
  let distances = new Array(graph.length);
  let previous = new Array(graph.length);
  
  for (let i = 0; i < graph.length; i++) {
    distances[i] = Infinity;
    previous[i] = null;
  }
  
  distances[start] = 0;
  
  return { distances, previous };
}

// Dijkstra's algorithm for finding the shortest path
function dijkstra(graph, start) {
  let { distances, previous } = initialize(graph, start);
  let unvisited = new Set(Array.from(Array(graph.length).keys()));
  
  while (unvisited.size) {
    let currNode = getClosestNode(distances, unvisited);
    unvisited.delete(currNode);
    
    for (let neighbor = 0; neighbor < graph.length; neighbor++) {
      let distance = graph[currNode][neighbor];
      if (distance === -1) continue; // Skip non-existent edges
      
      let totalDistance = distances[currNode] + distance;
      
      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previous[neighbor] = currNode;
      }
    }
  }
  
  return { distances, previous };
}

// Helper function to get node with the shortest distance
function getClosestNode(distances, unvisited) {
  let minDistance = Infinity;
  let closestNode = null;
  
  unvisited.forEach(node => {
    if (distances[node] < minDistance) {
      minDistance = distances[node];
      closestNode = node;
    }
  });
  
  return closestNode;
}

// Function to print the shortest path
function printShortestPath(graph, start, end) {
  let { distances, previous } = dijkstra(graph, start);
  let path = [end];
  
  while (previous[path[0]] !== null) {
    path.unshift(previous[path[0]]);
  }
  
  console.log(`Shortest path from ${start} to ${end}: ${path.join(' -> ')}`);
  console.log(`Total distance: ${distances[end]}`);
}

// Example usage
let graph = createGraph(6);

graph[0][1] = 4;
graph[0][2] = 2;
graph[1][2] = 1;
graph[1][3] = 5;
graph[2][3] = 8;
graph[2][4] = 10;
graph[3][4] = 2;
graph[3][5] = 6;
graph[4][5] = 3;

printShortestPath(graph, 0, 5);