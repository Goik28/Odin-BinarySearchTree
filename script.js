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

  buildTree(array) {}

  insertNode(data) {
    const newNode = new Node(data);
    if (this.root == null) {
      return (this.root = newNode);
    }
    if (find(this.root, newNode)) {
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
    const delNode = find(this.root,data);
    if (delNode == null) {
        return "Error - data to be deleted doesn't exists in this tree";
    }
    let pointer = this.root;
    while (pointer != delNode) {
        
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
      this.find(root.left, data);
    }
    if (root.data < data) {
      this.find(root.right, data);
    }
  }

  levelOrder(callback) {}

  inOrder() {}
  preOrder() {}
  postOrder() {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}
