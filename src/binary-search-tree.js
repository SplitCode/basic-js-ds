const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

// Metods:
// root — return root node of the tree
// add(data) — add node with data to the tree
// has(data) — returns true if node with the data exists in the tree and false otherwise
// find(data) — returns node with the data if node with the data exists in the tree and null otherwise
// remove(data) — removes node with the data from the tree if node with the data exists
// min — returns minimal value stored in the tree (or null if tree has no nodes)
// max — returns maximal value stored in the tree (or null if tree has no nodes)

  // class Node {
  //   constructor(data) {
  //     this.data = data;
  //     this.left = null;
  //     this.right = null;
  //   }
  // }

class BinarySearchTree {

  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      let current = this.rootNode;
      let parent = null;

      while (current !== null) {
        parent = current;
        if (data < current.data) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      if (data < parent.data) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    }
  }

  has(data) {
    let current = this.rootNode;

    while (current !== null) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  find(data) {
    let current = this.rootNode;

    while (current !== null) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return null;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      let newNode = this.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }

  remove(data) {
    if (this.has(data)) {
      this.rootNode = this.removeNode(this.rootNode, data);
      return true;
    } else {
      return false;
    }
  }

  minNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.minNode(node.left);
    };
  }

  maxNode(node) {
    if (node.right === null) {
      return node;
    } else {
      return this.maxNode(node.right);
    }
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }
    let minimalNode = this.minNode(this.rootNode);
    return minimalNode.data;
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }
    let maximumNode = this.maxNode(this.rootNode);
    return maximumNode.data;
  }
}

module.exports = {
  BinarySearchTree
};