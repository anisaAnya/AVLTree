'use strict';
function Node(key) {
    this.key = key;
    this.height = 0;
    this.left;
    this.right;
}

function AVLTree(head) {
    this.root = head;
}

AVLTree.prototype.add = function(node, key) {
    if(node == null) {
        return new Node(key);
    }
    if (key < node.key) {
        node.left = this.add(node.left, key);  
    } else {
        node.right = this.add(node.right, key);
    }  
  
    return this.balance(node);
}

Node.prototype.getDiffer = function(node) {
    return (node ? node.getHeight(node.right) - node.getHeight(node.left) : 0);
}

Node.prototype.getHeight = function(node) {
    return (node ? node.height : -1);
}


AVLTree.prototype.fixHeight = function(node) {
    if(node) {
	}
    node.height = (node.getHeight(node.left) > node.getHeight(node.right) ?
    node.getHeight(node.left) : node.getHeight(node.right)) + 1;
}

AVLTree.prototype.balance = function(node) {
    this.fixHeight(node);

    if (node.getDiffer(node) == 2) {
        if (node.getDiffer(node.right) < 0) {
            node.right = this.rotateRight(node.right);
        }
        return this.rotateLeft(node);
    }
    if (node.getDiffer(node) == -2) {
        if (node.getDiffer(node.left) > 0) {
	    node.left = rotateLeft(node.left);
        }
        return this.rotateRight(node);
    }
    return node;
}

AVLTree.prototype.rotateRight = function(node) {
    let temp = node.left;
    node.left = temp.right;
    temp.right = node;
    this.fixHeight(temp);
    this.fixHeight(node);
    console.log(temp);
    return temp;
}

AVLTree.prototype.rotateLeft = function(node) {
    let temp = node.right;
    node.right = temp.left;
    temp.left = node;
    this.fixHeight(node);
    this.fixHeight(temp);
    return temp;
}

AVLTree.prototype.getMin = function(node) {
    return (node.left ? this.getMin(node.left) : node);
}

AVLTree.prototype.getMax = function(node) {
    return (node.right ? this.getMax(node.right) : node);
}

AVLTree.prototype.removeMin = function(node) {
    if (!node.left) {
        return node.right;
    }
    node.left = this.removeMin(node.left);
    return this.balance(node);
}

AVLTree.prototype.removeNode = function(node, key) {
    if (!node) {
        return 0;
    }
    if (key < node.key) {
        node.left = this.removeNode(node.left, key);
    } 
    if (key > node.key) {
        node.right = this.removeNode(node.right, key);
    }
    if (key == node.key) {
        let temp = node.left;
        let temp1 = node.right;
        if (!temp1) {
            return temp;
        }
        let min = this.getMin(temp1);
        min.right = this.removeMin(temp1);
        min.left = temp;
        return this.balance(min); 
    }
    return this.balance(node); 
}

let head = new Node(2);

let tree = new AVLTree(head);
tree.root = tree.add(tree.root, 4);
console.log('added 5');
tree.root = tree.add(tree.root, 7);
console.log('added 7');
tree.root = tree.add(tree.root, 10);
tree.root = tree.add(tree.root, 12);
console.log(tree.root);
tree.root = tree.add(tree.root, 6);
console.log('add 5');
tree.root = tree.add(tree.root, 5);
console.log(tree.root);


console.log(tree.root.height + ' root height');


console.log(tree.getMin(tree.root) + ' = Min ' + tree.getMax(tree.root) + ' = Max ');

tree.root = tree.removeNode(tree.root, 4);
console.log(tree.root);

console.log(tree.root.height + ' root height');
