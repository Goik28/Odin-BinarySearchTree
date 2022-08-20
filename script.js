class Node {
  data = null;
  left = null;
  right = null;

  constructor(data) {
    this.data = data;
  }
}

class Tree {
  root = null;

  buildTree(array) {
    array = this.prepArray(array);
    this.reduceInsert(array);
    return this.root;
  }

  prepArray(array) {
    array = array.sort((a, b) => a - b);
    array = new Set(array);
    array = Array.from(array);
    return array;
  }

  reduceInsert(array) {
    let midPoint;
    if (array.length > 2) {
      midPoint = array.splice((array.length - 1) / 2, 1);
      this.insertNode(...midPoint);
      let leftArray = array.slice(0, array.length / 2);
      let rightArray = array.slice(array.length / 2);
      this.reduceInsert(leftArray);
      this.reduceInsert(rightArray);
    }
    if (array.length == 2) {
      this.insertNode(array[0]);
      this.insertNode(array[1]);
      return;
    }
    if (array.length == 1) {
      this.insertNode(array.shift());
      return;
    }
  }

  insertNode(data) {
    const newNode = new Node(data);
    if (this.root == null) {
      return (this.root = newNode);
    }
    if (this.find(this.root, data)) {
      return "Error - data already exists in this tree";
    }
    let pointer = this.root;
    while (pointer != null) {
      if (pointer.data > newNode.data) {
        if (pointer.left == null) {
          return (pointer.left = newNode);
        } else {
          pointer = pointer.left;
        }
      } else {
        if (pointer.right == null) {
          return (pointer.right = newNode);
        } else {
          pointer = pointer.right;
        }
      }
    }
  }

  deleteNode(data) {
    const delNode = find(this.root, data);
    if (delNode == null) {
      return "Error - data to be deleted doesn't exists in this tree";
    }
    const delNodeParent = this.findParent(this.root, delNode); //delNodeParent = null if delNode is the root of the tree.
    //case1 - no children
    if (delNode.left == null && delNode.right == null) {
      if (delNodeParent == null) {
        return (this.root = null);
      }
      if (delNodeParent.left === delNode) {
        return (delNodeParent.left = null);
      } else {
        return (delNodeParent.right = null);
      }
    }
    //case2 - only one child, first left, then right.
    if (delNode.left != null && delNode.right == null) {
      if (delNodeParent == null) {
        return (this.root = delNode.left);
      }
      if (delNodeParent.left === delNode) {
        return (delNodeParent.left = delNode.left);
      } else {
        return (delNodeParent.right = delNode.left);
      }
    }
    if (delNode.left == null && delNode.right != null) {
      if (delNodeParent == null) {
        this.root = delNode.right;
      }
      if (delNodeParent.left === delNode) {
        return (delNodeParent.left = delNode.right);
      } else {
        return (delNodeParent.right = delNode.right);
      }
    }
    //case3 - two children.
    if (delNode.left != null && delNode.right != null) {
      const delNodeSuccessor = this.nodeSuccessor(delNode);
      const delNodeSuccessorParent = this.findParent(
        this.root,
        delNodeSuccessor
      );
      if (delNodeSuccessorParent == delNode) {
        if (delNodeParent.left === delNode) {
          delNodeParent.left = delNodeSuccessor;
          delNodeSuccessor.left = delNode.left;
          delNodeSuccessor.right = delNode.right;
          return;
        } else {
          delNodeParent.right = delNodeSuccessor;
          delNodeSuccessor.left = delNode.left;
          delNodeSuccessor.right = delNode.right;
          return;
        }
      } else {
        if (delNodeParent.left === delNode) {
          delNodeParent.left = delNodeSuccessor;
          delNodeSuccessor.left = delNode.left;
          delNodeSuccessor.right = delNode.right;
          delNodeSuccessorParent.left = delNodeSuccessor.right;
          return;
        } else {
          delNodeParent.right = delNodeSuccessor;
          delNodeSuccessor.left = delNode.left;
          delNodeSuccessor.right = delNode.right;
          delNodeSuccessorParent.left = delNodeSuccessor.right;
          return;
        }
      }
    }
  }

  nodeSuccessor(node) {
    if (node.right != null) {
      node = node.right;
      while (node.left != null) {
        node = node.left;
      }
      return node;
    }
    return null;
  }

  findParent(root, node) {
    if (node == root) {
      return null;
    }
    if (root.left == node || root.right == node) {
      return root;
    } else {
      if (root.data > node.data) {
        this.findParent(root.left, node);
      }
      if (root.data < node.data) {
        this.findParent(root.right, node);
      }
    }
  }

  find(root, data) {
    if (root == null) {
      return null;
    }
    if (root.data === data) {
      return root;
    }
    if (root.data > data) {
      return this.find(root.left, data);
    }
    if (root.data < data) {
      return this.find(root.right, data);
    }
  }

  levelOrder(callback = false) {
    let pointer = this.root;
    const queue = [];
    const finalArray = [];
    while (pointer != null || pointer != undefined) {
      finalArray.push(pointer);
      if (pointer.left != null) {
        queue.push(pointer.left);
      }
      if (pointer.right != null) {
        queue.push(pointer.right);
      }
      pointer = queue.shift();
    }
    if (callback == false) {
      return finalArray;
    } else {
      for (let index = 0; index < finalArray.length; index++) {
        callback(finalArray[index]);
      }
    }
  }

  inOrder(pointer = this.root) {
    if (this.root == null) {
      return "Error - Tree is empty";
    }
    const array = [];
    if (pointer != null) {
      array.push(...this.inOrder(pointer.left));
      array.push(pointer.data);
      array.push(...this.inOrder(pointer.right));
    }
    return array;
  }

  preOrder(pointer = this.root) {
    if (this.root == null) {
      return "Error - Tree is empty";
    }
    const array = [];
    if (pointer != null) {
      array.push(pointer.data);
      array.push(...this.preOrder(pointer.left));
      array.push(...this.preOrder(pointer.right));
    }
    return array;
  }

  postOrder(pointer = this.root) {
    if (this.root == null) {
      return "Error - Tree is empty";
    }
    const array = [];
    if (pointer != null) {
      array.push(...this.postOrder(pointer.left));
      array.push(...this.postOrder(pointer.right));
      array.push(pointer.data);
    }
    return array;
  }

  height(node) {
    if (node == null) {
      return -1;
    }
    let leftDepth = this.height(node.left);
    let rightDepth = this.height(node.right);
    if (leftDepth > rightDepth) {
      return leftDepth + 1;
    } else {
      return rightDepth + 1;
    }
  }

  depth(root = this.root, node) {
    while (root != null) {
      if (node == root) {
        return 0;
      } else {
        let leftDepth = this.depth(root.left, node);
        let rightDepth = this.depth(root.right, node);
        if (leftDepth > rightDepth) {
          return leftDepth + 1;
        }
        if (leftDepth < rightDepth) {
          return rightDepth + 1;
        }
        return -1;
      }
    }
    return -1;
  }

  isBalanced(root = this.root) {
    if (root == null) {
      return true;
    }
    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);
    const heightDifference = (leftHeight - rightHeight) * -1;
    if (
      heightDifference <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    ) {
      return true;
    } else {
      return false;
    }
  }

  reBalance() {
    let array = this.inOrder();
    this.root = null;
    this.buildTree(array);
  }
}

//drive
const myTree = new Tree();
myTree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(myTree.isBalanced()); /*
console.log(myTree.inOrder());
console.log(myTree.preOrder());
console.log(myTree.postOrder());
console.log(myTree.insertNode(7));*/
myTree.insertNode(107);
myTree.insertNode(127);
myTree.insertNode(137);
myTree.insertNode(87);
myTree.insertNode(157);
myTree.insertNode(207);
myTree.insertNode(227);
myTree.insertNode(237);
myTree.insertNode(257);
myTree.insertNode(267);
console.log(myTree.isBalanced()); /*
console.log(myTree.inOrder());
console.log(myTree.preOrder());
console.log(myTree.postOrder());*/
myTree.reBalance();
console.log(myTree.isBalanced()); /*
console.log(myTree.inOrder());*/
console.log(myTree.preOrder()); /*
console.log(myTree.postOrder());*/

console.log(myTree.find(myTree.root, 87)); /*
console.log(myTree.find(myTree.root,57));
console.log(myTree.levelOrder((x)=>{console.log(x.data)}));*/

console.log(myTree.height(myTree.find(myTree.root, 23)));
console.log(myTree.depth(myTree.root, myTree.find(myTree.root, 6345)));
