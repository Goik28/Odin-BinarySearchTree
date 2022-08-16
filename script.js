class Node {
  data=null;
  left=null;
  right=null;

  constructor(data){
    this.data = data;
  }
}

class Tree {
  root = buildTree();

  buildTree(array) {}

  insertNode(root, data) {
    const newNode = new Node(data);
    if(find(this.root,newNode)){
        return ("Error - data already exists in this tree");
    }
    if(root.data > newNode.data && root.left == null){
     return   root.left = newNode;
    }
    if(root.data < newNode.data && root.right == null){
        root.right = newNode;
    }
  }

  deleteNode() {}

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
