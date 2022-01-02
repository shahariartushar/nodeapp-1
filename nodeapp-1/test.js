let exampleNode = {
    value: 0,
    next: {
      value: 1,
      next: {
        value: 2,
        next: null
      }
    }
  };
  
const arr = [];
  
function printList(node) {
  // Print all nodes in the linkedlist given the first node
  while (exampleNode !== null) {
    arr.push(exampleNode.value);
    exampleNode = exampleNode.next;
  }
}


printList(exampleNode);
console.log(arr);