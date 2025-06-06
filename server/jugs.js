const traversedResults = {};
let resultKey = '';
let foundResult = false;
let foundResultNode;
let resultSteps = Infinity;
let resultJug1, resultJug2, jugCapacity1, jugCapacity2;
var totalCreatedNodes = 0;


function findPath(finJug1, finJug2, jugCap1, jugCap2) {
  console.log(finJug1, ' - ', finJug2, ' - ', jugCap1, ' - ', jugCap2, ' - ');
  jugCapacity1 = jugCap1;
  jugCapacity2 = jugCap2;
  resultJug1 = finJug1;
  resultJug2 = finJug2;

  const resultNode = new Node(0, 0, null, 0);
  resultKey = finJug1 + '-' + finJug2;
  traverse(resultNode, null, 0);

  // console.log(resultNode);
  console.log('Total nodes created - ', totalCreatedNodes);
  if (foundResult) {
    let response = backtrackAndReturnPath(foundResultNode);
    // console.log('Result found - ', JSON.stringify(response));
    return response;
  } else {
    console.log('Result not found');
    return backtrackAndReturnPath(null);
  }
}

function traverse(currNode, prevNode, steps) {
  // console.log(currNode.jug1, ' - ', currNode.jug2, ' ---- ', steps, ' - ');
  {
    // Empty Jug1 
    let currJug1 = currNode.jug1;
    let currJug2 = currNode.jug2;
    currJug1 = 0;
    let key = currJug1 + '-' + currJug2;

    if (!traversedResults[key] || traversedResults[key] > steps + 1) {
      let newNode = createNewNode(currJug1, currJug2, currNode, steps + 1);
      traverse(newNode, currNode, steps + 1);
    }
  }
  {
    // Empty Jug2 
    let currJug1 = currNode.jug1;
    let currJug2 = currNode.jug2;
    currJug2 = 0;
    let key = currJug1 + '-' + currJug2;

    if (!traversedResults[key] || traversedResults[key] > steps + 1) {
      let newNode = createNewNode(currJug1, currJug2, currNode, steps + 1);
      traverse(newNode, currNode, steps + 1);
    }
  }
  {
    // Fill Jug1 to Capacity
    let currJug1 = currNode.jug1;
    let currJug2 = currNode.jug2;
    currJug1 = jugCapacity1;
    let key = currJug1 + '-' + currJug2;

    if (!traversedResults[key] || traversedResults[key] > steps + 1) {
      let newNode = createNewNode(currJug1, currJug2, currNode, steps + 1);
      traverse(newNode, currNode, steps + 1);
    }
  }
  {
    // Fill Jug2 to Capacity
    let currJug1 = currNode.jug1;
    let currJug2 = currNode.jug2;
    currJug2 = jugCapacity2;
    let key = currJug1 + '-' + currJug2;

    if (!traversedResults[key] || traversedResults[key] > steps + 1) {
      let newNode = createNewNode(currJug1, currJug2, currNode, steps + 1);
      traverse(newNode, currNode, steps + 1);
    }
  }
  {
    // Fill water from Jug1 to Jug2
    let currJug1 = currNode.jug1;
    let currJug2 = currNode.jug2;
    let buffer = jugCapacity2 - currJug2;
    if (currJug1 >= buffer) {
      currJug1 -= buffer;
      currJug2 = jugCapacity2;
    } else {
      currJug2 += currJug1;
      currJug1 = 0;
    }
    let key = currJug1 + '-' + currJug2;

    if (!traversedResults[key] || traversedResults[key] > steps + 1) {
      let newNode = createNewNode(currJug1, currJug2, currNode, steps + 1);
      traverse(newNode, currNode, steps + 1);
    }
  }
  {
    // Fill water from Jug2 to Jug1
    let currJug1 = currNode.jug1;
    let currJug2 = currNode.jug2;
    let buffer = jugCapacity1 - currJug1;
    if (currJug2 >= buffer) {
      currJug2 -= buffer;
      currJug1 = jugCapacity1;
    } else {
      currJug1 += currJug2;
      currJug2 = 0;
    }
    let key = currJug1 + '-' + currJug2;

    if (!traversedResults[key] || traversedResults[key] > steps + 1) {
      let newNode = createNewNode(currJug1, currJug2, currNode, steps + 1);
      traverse(newNode, currNode, steps + 1);
    }
  }
  {
    // Fill water in Jug1 to maximum capacity
    let currJug1 = currNode.jug1;
    let currJug2 = currNode.jug2;
    currJug1 = jugCapacity1;
    let key = currJug1 + '-' + currJug2;

    if (!traversedResults[key] || traversedResults[key] > steps + 1) {
      let newNode = createNewNode(currJug1, currJug2, currNode, steps + 1);
      traverse(newNode, currNode, steps + 1);
    }
  }
  {
    // Fill water in Jug2 to maximum capacity
    let currJug1 = currNode.jug1;
    let currJug2 = currNode.jug2;
    currJug2 = jugCapacity2;
    let key = currJug1 + '-' + currJug2;

    if (!traversedResults[key] || traversedResults[key] > steps + 1) {
      let newNode = createNewNode(currJug1, currJug2, currNode, steps + 1);
      traverse(newNode, currNode, steps + 1);
    }
  }
}

function backtrackAndReturnPath(tail) {
  let curr = tail;
  let ar = [];
  let responseP = [];
  while (curr != null && curr != undefined) {
    ar.push(curr);
    curr = curr.prev;
  }

  for (let i = ar.length; i >= 0; i--) {
    if (ar[i]) {
      let arr = [ar[i].jug1, ar[i].jug2];
      responseP.push(arr);
    }
  }
  return responseP;
}

function createNewNode(jug1, jug2, prevNode, steps) {
  let newNode = new Node(jug1, jug2, prevNode, steps);
  totalCreatedNodes++;
  traversedResults[newNode.name] = steps;

  if (newNode.name == resultKey) {
    foundResult = true;
    if (newNode.steps < resultSteps) {
      resultSteps = newNode.steps;
      foundResultNode = newNode;
    }
  }

  return newNode;
}

class Node {
  constructor(j1, j2, prevNode, step) {
    this.jug1 = j1;
    this.jug2 = j2;
    this.name = j1 + '-' + j2;
    this.prev = prevNode;
    this.steps = step;
  }
}

// ------------------------------------------------------------------

let jugCapa1 = 5;
let jugCapa2 = 4;
let jug1 = 3;
let jug2 = 0;
// console.log(findPath(jug1, jug2, jugCapa1, jugCapa2));

// ------------------------------------------------------------------
module.exports = {
  findPath
};