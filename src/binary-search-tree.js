const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
  this.node = null;
  }
  root() {
    return this.node;
  }

  add(data) {
    if (this.node === null) {
      this.node = new Node(data);
      return this;
    }

    let origin = this.node;

    while (origin) {
      if (data === origin.data) {
        return undefined;
      }
      if (data < origin.data) {
        if (origin.left === null) {
          origin.left = new Node(data);
          return this;
        }
        origin = origin.left;
      } else {
        if (origin.right === null) {
          origin.right = new Node(data);
          return this;
        }
        origin = origin.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let origin = this.node;

    while (origin) {
      if (data > origin.data) {
        origin = origin.right;
      } else if (data < origin.data) {
        origin = origin.left;
      } else {
        return origin;
      }
    }
    return null;
  }

  remove(data) {
    this.node = removeNode(this.node, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let rightMin = node.right;
        while (rightMin.left) {
          rightMin = rightMin.left;
        }
        node.data = rightMin.data;

        node.right = removeNode(node.right, rightMin.data);

        return node;
      }
    }
  }

  min() {
    let origin = this.node;

    while (origin.left) {
      origin = origin.left;
    }

    return origin.data;
  }

  max() {
    let origin = this.node;

    while (origin.right) {
      origin = origin.right;
    }

    return origin.data;
  }
}

module.exports = {
  BinarySearchTree
};