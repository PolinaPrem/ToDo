// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("text-input").focus();
//   });
let isActive=false;
const buttons = Array.from(document.querySelectorAll("button"));
const container = document.getElementById("container-main");
//loop over the buttons to add eventListeners
for (let button of buttons) {
  let listOfNotes = document.createElement("ul");

  let closeListButton;
  closeListButton = document.createElement("button");
  closeListButton.textContent = "X";
  closeListButton.classList.add("close-list-button");
 
  button.setAttribute("type", "button");

  // Add cick event to the button

  button.addEventListener("click", (event) => {
    if(isActive){
      if (event.target !== contextItemRename && event.target !== contextItemDelete) {
        event.stopImmediatePropagation();
      }
    }
     else if(
      // if no input was ever created on the button
      button.classList.contains("list-box") &&
      !button.querySelector(".input-list")
    ) {
      button.classList.remove("list-box");
      button.classList.add("full-screen");
      disableOtherButtons(buttons, button);

      let inputInsideList = document.createElement("input");
      inputInsideList.classList.add("input-list");
      inputInsideList.setAttribute("id", "inputfornotes");

      button.appendChild(closeListButton);
      button.appendChild(inputInsideList); //connect the inputfield inside the button
      button.appendChild(listOfNotes); //connect the listofNotes inside the button

      inputInsideList.focus();

      inputInsideList.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      // trying to save the value

      inputInsideList.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          saveNoteValue(inputInsideList, listOfNotes);
          event.preventDefault();
          inputInsideList.value = "";
        }
      });

      //trying to close the list

      closeListButton.addEventListener("click", (event) => {
        event.stopPropagation();
        saveNoteValue(inputInsideList, listOfNotes);

        button.classList.remove("full-screen");

        button.classList.add("list-box");

        enableOtherButtons(buttons);

        // Removing the elements from the button
        if (button.contains(inputInsideList)) {
          button.removeChild(inputInsideList);
          console.log("removedInput");
        }
        if (button.contains(closeListButton)) {
          button.removeChild(closeListButton);
        }
      });
    }
    // if the imput was already created on that button
    else if (button.classList.contains("list-box")) {
      button.classList.remove("list-box");
      button.classList.add("full-screen");
      disableOtherButtons(buttons, button);
      inputInsideList.focus();
      inputInsideList.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      // trying to save the value

      inputInsideList.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          saveNoteValue(inputInsideList, listOfNotes);
        }
      });
    }
  });
}
//Functions to disable/enable not active buttons
function disableOtherButtons(buttons, activeButton) {
  for (let button of buttons) {
    if (button !== activeButton) {
      button.disabled = true;
    }
  }
}

function enableOtherButtons(buttons) {
  for (let button of buttons) {
    button.disabled = false;
  }
}
//Function to save the value to the new li

function saveNoteValue(input, list) {
  const noteValue = input.value.trim();
  if (noteValue) {
    const note = document.createElement("li");
    note.textContent = noteValue;
    note.classList.add("list-of-items");
    list.appendChild(note);
    list.classList.add("unordered-list");
    list.style.fontFamily = "'Courier New', Courier, monospace";
    addButton(note);
  }
}

function addButton(note) {
  const deleteButton = document.createElement("button");

  deleteButton.classList.add("deleting-task-button");
  deleteButton.textContent = "v";
  note.appendChild(deleteButton);
  deleteButton.addEventListener("click", () => {
    if (note.style.textDecoration === "line-through") {
      note.remove();
    } else {
      note.style.textDecoration = "line-through";
      deleteButton.textContent = "x";
    }

    console.log(note.textContent);
  });
}

const textInput = document.getElementById("text-input");

textInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveTextInputValue();
    textInput.value = "";
  }
});

function saveTextInputValue() {
  const textInputValue = textInput.value.trim();
  if (textInputValue) {
    const button = document.createElement("button");
    const p = document.createElement("p");
    p.textContent = textInputValue;
    button.classList.add("full-screen");
    buttons.push(button);
    button.appendChild(p);
    container.appendChild(button);
    setButton(button);
  }
}

function setButton(button) {
  let listOfNotes = document.createElement("ul");

  let closeListButton;
  closeListButton = document.createElement("button");
  closeListButton.textContent = "X";
  closeListButton.classList.add("close-list-button");

  button.setAttribute("type", "button");

  let inputInsideList = document.createElement("input");
  inputInsideList.classList.add("input-list");
  inputInsideList.setAttribute("id", "inputfornotes");

  button.appendChild(closeListButton);
  button.appendChild(inputInsideList); //connect the inputfield inside the button
  button.appendChild(listOfNotes); //connect the listofNotes inside the button

  inputInsideList.focus();

  inputInsideList.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  inputInsideList.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveNoteValue(inputInsideList, listOfNotes);
      event.preventDefault();
      inputInsideList.value = "";
    }
  });

  //trying to close the list

  closeListButton.addEventListener("click", (event) => {
    event.stopPropagation();
    saveNoteValue(inputInsideList, listOfNotes);

    button.classList.remove("full-screen");

    button.classList.add("list-box");

    enableOtherButtons(buttons);

    // Removing the elements from the button
    if (button.contains(inputInsideList)) {
      button.removeChild(inputInsideList);
    }
    if (button.contains(closeListButton)) {
      button.removeChild(closeListButton);
    }
  });
  button.addEventListener("click", () => {
    if (button.classList.contains("list-box")) {
      button.classList.remove("list-box");
      button.classList.add("full-screen");
      disableOtherButtons(buttons, button);

      //adding closeListButton and its event
      let closeListButton;
      closeListButton = document.createElement("button");
      closeListButton.textContent = "X";
      closeListButton.classList.add("close-list-button");
      button.appendChild(closeListButton);
      closeListButton.addEventListener("click", (event) => {
        event.stopPropagation();
        saveNoteValue(inputInsideList, listOfNotes);

        button.classList.remove("full-screen");

        button.classList.add("list-box");

        enableOtherButtons(buttons);

        // Removing the elements from the button
        if (button.contains(inputInsideList)) {
          button.removeChild(inputInsideList);
          
        }
        if (button.contains(closeListButton)) {
          button.removeChild(closeListButton);
        }
      });
      //adding input field

      let inputInsideList = document.createElement("input");
      inputInsideList.classList.add("input-list");
      inputInsideList.setAttribute("id", "inputfornotes");
      if (listOfNotes) {
        button.insertBefore(inputInsideList, listOfNotes);
      } else {
        button.appendChild(inputInsideList);
      }

      //focusing the input
      inputInsideList.focus();
      inputInsideList.addEventListener("click", function (event) {
        event.stopPropagation();
      });

      // trying to save the value

      inputInsideList.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          saveNoteValue(inputInsideList, listOfNotes);
          inputInsideList.value = "";
        }
      });
    }
  });

  let touchTimer;

  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  button.addEventListener("touchstart", (event) => {
    touchTimer = setTimeout(() => {
      showContextMenu(event);
      currentButton = button;
    }, 300);
  });
  button.addEventListener("mousedown", (event) => {
    if (event.button === 0 || event.button === 2) {
      touchTimer = setTimeout(() => {
        showContextMenu(event);
        currentButton = button;
      }, 300);
    }
  });

  button.addEventListener("touchend", () => {
    clearTimeout(touchTimer);
  });

  button.addEventListener("mouseup", () => {
    clearTimeout(touchTimer);
  });

  document.addEventListener("click", () => {
    hideContextMenu();
  });
}

const contextMenu = document.getElementById("context-menu");
const contextItemDelete = document.getElementById("delete");
const contextItemRename = document.getElementById("rename");

// making contextmenu pop up

function showContextMenu(event) {

  event.preventDefault();
  contextMenu.style.display = "flex";

  const posX = event.touches ? event.touches[0].pageX : event.pageX;
  const posY = event.touches ? event.touches[0].pageY : event.pageY;

  contextMenu.style.left = `${posX}px`;
  contextMenu.style.top = `${posY}px`;

  isActive=true;
}

function hideContextMenu() {
  contextMenu.style.display = "none";
isActive=false;
}
let currentButton = null;

for (let button of buttons) {
  let touchTimer;

  button.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  button.addEventListener("touchstart", (event) => {
    touchTimer = setTimeout(() => {
      showContextMenu(event);
      currentButton = button;
      console.log("touched");
    }, 300);
  });
    // Mousedown event for desktop users (right or left click)
    button.addEventListener("mousedown", (event) => {
      if (event.button === 0 || event.button === 2) { // 0: left-click, 2: right-click
        touchTimer = setTimeout(() => {
          showContextMenu(event);
          currentButton = button;
          console.log("clicked");
        }, 300);
      }
    });

  button.addEventListener("touchend", () => {
    clearTimeout(touchTimer);
  });

  button.addEventListener("mouseup", () => {
    clearTimeout(touchTimer);
  });

  document.addEventListener("click", () => {
    hideContextMenu();
  });
}

contextItemDelete.addEventListener("click", () => {
  if (currentButton) {
    deleteListButton(currentButton);
    hideContextMenu();
  }
});

contextItemRename.addEventListener("click", () => {
  if (currentButton) {
    renameListButton(currentButton);
    console.log('clickedrename')
    hideContextMenu();
   
  }
 
});

//Rename and Delete functions

function renameListButton(currentButton) {
  const p = currentButton.querySelector("p");
  if (p) {
    currentButton.removeChild(p);
  }
    const input = document.createElement("input");
    currentButton.disabled = true;
    input.classList.add("rename-input");
    currentButton.prepend(input);
    input.focus();
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const newName = document.createElement("p");
        newName.textContent=input.value.trim();
        
        currentButton.removeChild(input)
        currentButton.prepend(newName)
        currentButton.disabled = false;
      }
    });
  }
  
  function deleteListButton(currentButton){
    currentButton.remove()
  }
    
 //Toggle check
 
 document.getElementById('themeToggle').addEventListener('change', function(event) {
  if (event.target.checked) {
    // Checkbox is checked (switch ON)
    console.log('Switch is ON');
    document.body.classList.add('dark-mode');
    
  } else {
    // Checkbox is unchecked (switch OFF)
    console.log('Switch is OFF');
    
    document.body.classList.remove('dark-mode');
  }
});

  
  

