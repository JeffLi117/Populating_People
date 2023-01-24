class Person {
      
    constructor(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.hasJob = false;
      this.skill = "unknown"
      this.id = idcounter++;
    }
  
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  
    setFirstName(firstName) {
      this.firstName = firstName;
    }
  
    setLastName(lastName) {
      this.lastName = lastName;
    }
  
    set setFullName(name) {
      name = name.split(' ');
      this.setFirstName(name[0]);
      this.setLastName(name[1]);
    }

    set newJob(job) {
      this.job_choice = job;
    }

    get noClassStatement() {
      const SS = `${this.fullName()}'s special ability is ${this.skill}\nHe/She needs more training!`;
      return SS;
    }
  }
  
class Warrior extends Person {

    constructor(firstName, lastName) {
      super(firstName, lastName);
      this.hasJob = true;
      this.skill = "fighting";
    }
  
    get specialStatement() {
      const SS = `${this.fullName()}'s special ability is ${this.skill}`;
      return SS;
    }
}

class Cleric extends Person {

    constructor(firstName, lastName) {
      super(firstName, lastName);
      this.hasJob = true;
      this.skill = "healing";
    }
    
    get specialStatement() {
      const SS = `${this.fullName()}'s special ability is ${this.skill}`;
      return SS;
    }
}

class Archer extends Person {

    constructor(firstName, lastName) {
      super(firstName, lastName);
      this.hasJob = true;
      this.skill = "shooting";
    }
    
    get specialStatement() {
      const SS = `${this.fullName()}'s special ability is ${this.skill}`;
      return SS;
    }
}

var characterFuncts = (function() {
    'use strict';

    function createNewChar() {

        if (test.job_choice.value == "Jobless") {
            var newChar = new Person();
        } else if (test.job_choice.value == "Warrior") {
            var newChar = new Warrior();
        } else if (test.job_choice.value == "Cleric") {
            var newChar = new Cleric();
        } else if (test.job_choice.value == "Archer") {
            var newChar = new Archer();
        }
    
        newChar.firstName = test.fname.value;
        newChar.lastName = test.lname.value;
        newChar.job_choice = test.job_choice.value;
        return newChar;
    }

    return {
        createNewChar: createNewChar,
    }

})();

var cardFuncts = (function() {
  'use strict';
  function newCharCard(el) {
    let firstName = el.firstName;
    let lastName = el.lastName;
    let job_choice = el.job_choice;
    let id = el.id;

    let newCardDiv = document.createElement("div");
    newCardDiv.className += `card_${job_choice}_${id}`;

    let newCardBtn = document.createElement("button");
    newCardBtn.className = `removeowncard_${id}`;
    newCardBtn.innerHTML = "Remove This Character?";

    let jobBtn = document.createElement("button");
    jobBtn.className = `jobstatus_${id}`;
    jobBtn.innerHTML = "Change my job class!";

    let newCardP = document.createElement("p");
    newCardP.className = `name_${id}`;
    newCardP.innerHTML = `${firstName} ${lastName}`;

    let jobName = document.createElement("p");
    jobName.innerHTML = `${job_choice}`;

    newCardDiv.appendChild(newCardP);
    newCardDiv.appendChild(jobName);
    newCardDiv.appendChild(jobBtn);
    newCardDiv.appendChild(newCardBtn);
    document.getElementById("card_container").appendChild(newCardDiv);
  }

  function clearArrayOfCards() {
    let container = document.getElementById("card_container");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    };
  }

  function loopArrayForCards() {
    clearArrayOfCards();

    totalPop.forEach((el) => {
      newCharCard(el);
    })
  }

  function checkIfArrayEmpty() {
    let charsPresDisplay = document.getElementById("chars_present")
    let charsAbsDisplay = document.getElementById("chars_absent")
    let clearAllBtn = document.getElementById("clear_all_button")

    if (totalPop.length > 0) {
      charsPresDisplay.style.display = "block";
      charsAbsDisplay.style.display = "none";
      clearAllBtn.style.display = "inline-block";
    } else if (totalPop.length == 0) {
      charsPresDisplay.style.display = "none";
      charsAbsDisplay.style.display = "block";
      clearAllBtn.style.display = "none";
    }
  }

  return {
    newCharCard: newCharCard,
    clearArrayOfCards: clearArrayOfCards,
    loopArrayForCards: loopArrayForCards,
    checkIfArrayEmpty: checkIfArrayEmpty,
  }

})();

var popupFuncts = (function() {
  'use strict';

  function poppity() {
      document.getElementById("container-popup").style.display = "inline";
      document.getElementById("popup").style.display = "flex";
  }

  return {
      poppity: poppity,
  }
})();

let totalPop = [];
var idcounter = 0;

const submitFormBtn = document.getElementById("submit_button")

submitFormBtn.addEventListener('click', (e) => {
    var x = characterFuncts.createNewChar();
    totalPop.push(x);
    cardFuncts.loopArrayForCards();
    cardFuncts.checkIfArrayEmpty();
    console.table(totalPop);
    e.preventDefault();
})

const clearArrayBtn = document.getElementById("clear_all_button")

clearArrayBtn.addEventListener('click', () => {
  let text = "Are you sure you want to completely remove all your characters?"
  if (confirm(text) == true) {
    totalPop = [];
    console.table(totalPop);
    cardFuncts.loopArrayForCards();
    cardFuncts.checkIfArrayEmpty();
  }
})

const hideFormBtn = document.getElementById("cancel_button")

hideFormBtn.addEventListener('click', () => {
  const newBookForm = document.getElementById("test")

  newBookForm.style.display = 'none';
})

const showFormBtn = document.getElementById("new_form_button")

showFormBtn.addEventListener('click', () => {
  const newBookForm = document.getElementById("test")

  if (newBookForm.style.display === 'none' || newBookForm.style.display === '') {
    newBookForm.style.display = 'block';
  }
})

const btns = document.querySelector('#card_container');
btns.addEventListener('click', e => {

  let i = 0;
  let objIndex = 0;

  function findCharIndex(i) {
    objIndex = totalPop.findIndex((obj => obj.id == i));
    console.log("function findCharIndex worked");
    return objIndex;
  } 

  totalPop[0].newJob = "Warrior"

  if (e.target.className.slice(0,9) === 'jobstatus') {
    console.log("selected job status");
    popupFuncts.poppity();
    // get "id" class of button clicked (and hence, of same card)
    readStatusChangeNumber = Number(e.target.className.substr(10)); 
    i = readStatusChangeNumber; // i is for the "id" class
    objIndex = findCharIndex(i); // finds respective index in totalPop
    cardFuncts.loopArrayForCards();
  } else if (e.target.className.slice(0,13) === 'removeowncard') {
    console.log("this is to remove stuffs");
    // target char with same unique class #
    toBeRemovedNumber = Number(e.target.className.substr(14));
    removeFromLib();
    loopArrayForCards();
    checkBooksPresent();
    console.table(totalPop);
  }
});

