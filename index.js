// * This js file is incomplete. It will log to the console the elements you click
// call another function and set stone. You will have to work through the logic
// of the game as you know it from building it in the terminal. Work through the
// puzzle slowly, stepping through the flow of logic, and making the game work.
// Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

let stone = null;

// this function is called when a row is clicked.
// Open your inspector tool to see what is being captured and can be used.
const selectColumn = (column) => {
  if (!stone) {
    if (column.firstElementChild) {
      pickUpStone(column.id);
    } else {
      console.log("there is no stone to pick up!");
    }
  } else {
    dropStone(column.id);
  }
  const currentColumn = column.getAttribute("data-row");

  // console.log("Yay, we clicked an item", column);
  // console.log("Here is the stone's id: ", column.id);
  // console.log("Here is the stone's data-size: ", currentColumn);

  // pickUpStone(column.id)

  // !stone
  // ? column.firstElementChild
  // ? pickUpStone(column.id)
  // : console.log("there is no stone to pick up!")
  // :
  // dropStone(column.id);
};

// this function can be called to get the last stone in the stack
// but there might be something wrong with it...
const pickUpStone = (columnID) => {
  const selectedColumn = document.getElementById(columnID);
  stone = selectedColumn.removeChild(selectedColumn.firstElementChild);
  console.log(stone);
};

// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (columnID) => {
  const column = document.getElementById(columnID);
  console.log(
    "Top stone value is: ",
    column.firstElementChild
      ? column.firstElementChild.getAttribute("data-size")
      : "no stone"
  );
  console.log(
    "This is the value of the stone in hand ",
    stone.getAttribute("data-size")
  );

  if (!column.firstElementChild) {
    document.getElementById(columnID).prepend(stone);
    stone = null;
  } else {
    const stoneInHand = stone.getAttribute("data-size");
    const firstStoneInColumn =
      column.firstElementChild.getAttribute("data-size");
    if (stoneInHand < firstStoneInColumn) {
      document.getElementById(columnID).prepend(stone);
      stone = null;
    } else {
      console.log('Illegal move. try again!')
    }
  }
};

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.
