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
      this.find(root.left, data);
    }
    if (root.data < data) {
      this.find(root.right, data);
    }
  }

  levelOrder(callback) {}

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

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}
