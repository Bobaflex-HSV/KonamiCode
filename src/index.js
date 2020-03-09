// used keys in code array
var possibleKeys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  74: "j",
  69: "e",
  78: "n",
  83: "s"
};

function screenManipulation() {
  document.body.style.background = "black";
}

function showGhost() {
  var ghostElement = document.getElementById("ghost");
  ghostElement.style.visibility = "visible";
  ghostElement.style.position = "absolute";
  ghostElement.style.top = 0;
  ghostElement.style.left = 0;
}
// code array -> sequence of keys to be entered in right order
var codeArr = ["j", "up", "e", "down", "n", "left", "s", "right"];

// a variable to remember the 'position' the user has reached so far.
var codeArrPosition = 0;

// add event listener for key down (ignores lower/uppercase)

var checkCode = function(event) {
  // get the value of the key code from the key map
  var key = possibleKeys[event.keyCode];
  // get the value of the required key from the code array
  var requiredKey = codeArr[codeArrPosition];

  // compare key with the required key
  //(which is at the current position in the code array)
  if (key === requiredKey) {
    // move to next position in the code array
    codeArrPosition++;

    // if end of code array reached (success), do screen manipulation
    if (codeArrPosition === codeArr.length) {
      codeArrPosition = 0;
      document.removeEventListener("keydown", checkCode);
      screenManipulation();
      showGhost();
      gameLoop();
    }
  }
  // on invalid input, reset code position to check from start
  else {
    codeArrPosition = 0;
  }
};

//FORKED
document.addEventListener("keydown", checkCode);

function leftArrowPressed() {
  var element = document.getElementById("ghost");
  if (parseInt(element.style.left) >= 5) {
    element.style.left = parseInt(element.style.left) - 5 + "px";
  }
}

function rightArrowPressed() {
  var element = document.getElementById("ghost");
  if (parseInt(element.style.left) <= document.body.clientWidth - 500) {
    element.style.left = parseInt(element.style.left) + 5 + "px";
  }
}

function upArrowPressed() {
  var element = document.getElementById("ghost");
  if (parseInt(element.style.top) >= 5) {
    element.style.top = parseInt(element.style.top) - 5 + "px";
  }
}

function downArrowPressed() {
  var element = document.getElementById("ghost");
  if (parseInt(element.style.top) <= document.body.clientHeight - 500) {
    element.style.top = parseInt(element.style.top) + 5 + "px";
  }
}

function moveSelection(event) {
  switch (event.keyCode) {
    case 37:
      leftArrowPressed();
      break;

    case 39:
      rightArrowPressed();
      break;

    case 38:
      upArrowPressed();
      break;

    case 40:
      downArrowPressed();
      break;
    default:
      break;
  }
}

function gameLoop() {
  document.addEventListener("keydown", moveSelection);
}
