"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// An object that represents the three stacks of Towers of Hanoi;
// * each key is an array of Numbers:
// * A is the far-left,
// * B is the middle,
// * C is the far-right stack
// * Each number represents the largest to smallest tokens:
// * 4 is the largest,
// * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: [],
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  /**
   * move a piece
    *need to know start and end place of the stone, so they should be params
    *take the piece from the start stack and put it on the end stack
    .pop                              and                .push
  */
  if (isLegal(startStack, endStack)) {
    let stone = stacks[startStack].pop();

    stacks[endStack].push(stone);
  }
};

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  //try to move a piece from one stack to the other

  //check if its legal -small piece on empty stack or a larger piece
  //   if(stacks[start].length === 0 || stacks[start][stacks[start].length -1] > stacks[end][stacks[end].length -1]) {
  //      //if valid return true else return false
  //     return false;
  //   } return true;
  // }

  let end = Number(stacks[endStack].slice(-1));
  let start = Number(stacks[startStack].slice(-1));

  console.log("end: ", end);
  console.log("start: ", start);

  if (end === 0) {
    return true;
  } else if (start < end) {
    return true;
  } else {
    console.log("invalid input");
    return false;
  }
};

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here

  //a win is an array of [4,3,2,1] in either b or c stack
  //if yes, return true, otherwise return false
  if (stacks.b.length === 4 || stacks.c.length === 4) {
    console.log("you win!!");
    return true;
  }
  return false;
};

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here

  //here's where we use all the function
  //1. user enters a start and end stack
  //2. check if move is legal.
  //if yes, call the movePiece function,
  //if no, notify the user (console.log in terminal or alert in DOM)
  //3. check for win (call the function)
  //if yes, then notify the user

  movePiece(startStack, endStack);
  checkForWin();
};

const getPrompt = () => {
  printStacks();
  rl.question("start stack: ", (startStack) => {
    rl.question("end stack: ", (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
};

// Tests

if (typeof describe === "function") {
  describe("#towersOfHanoi()", () => {
    it("should be able to move a block", () => {
      towersOfHanoi("a", "b");
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe("#isLegal()", () => {
    it("should not allow an illegal move", () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: [],
      };
      assert.equal(isLegal("a", "b"), false);
    });
    it("should allow a legal move", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      assert.equal(isLegal("a", "c"), true);
    });
  });
  describe("#checkForWin()", () => {
    it("should detect a win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {
  getPrompt();
}
