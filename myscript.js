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
      this.changedJobs = true;
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

let toBeRemovedNumber = 0;

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

  
  function removeFromArray(x) {
    totalPop = totalPop.filter(item => item.id !== toBeRemovedNumber);
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
    removeFromArray: removeFromArray,
  }

})();

let classChangeTarget = null;

var popupFuncts = (function() {
  'use strict';

  function poppity() {
    document.getElementById("container-popup").style.display = "inline";
    document.getElementById("popup").style.display = "flex";
  }

  function unpopAll() {
    if (classChangeTarget !== "Jobless") {
      document.getElementById(`popup_${classChangeTarget}`).style.display = "flex";
      document.getElementById("container-popup").style.display = "none";
      document.getElementById("popup").style.display = "none";
    } else {
      document.getElementById("container-popup").style.display = "none";
      document.getElementById("popup").style.display = "none";
    }
  }

  //////////////

  //popup to display
  //specificClass popup hidden
  //then a value of "popup_" to be selected
  //then popup to disappear
  //specificClass popup unhidden 

  /* function testListener() {
    
  }

  function myDisplayer(some) {
    document.getElementById("chars_absent").innerHTML = some;
  }
  
  function myCalculator(num1, num2, myCallback) {
    let sum = num1 + num2;
    myCallback(sum);
  }
  
  myCalculator(5, 5, myDisplayer);

  some_3secs_function(some_value, function() {
    some_5secs_function(other_value, function() {
      some_8secs_function(third_value, function() {
        //All three functions have completed, in order.
      });
    });
  }); */

  ///////////////

  function specificClassPopup() {
    if (classChangeTarget !== "Jobless") {
      document.getElementById(`popup_${classChangeTarget}`).style.display = "none";
    }
  }

  return {
      poppity: poppity,
      specificClassPopup: specificClassPopup,
      unpopAll: unpopAll,
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
    console.log("function findCharIndex used");
    return objIndex;
  } 

  if (e.target.className.slice(0,9) === 'jobstatus') {
    let popupWarrior = document.getElementById("popup_Warrior")
    let popupCleric = document.getElementById("popup_Cleric")
    let popupArcher = document.getElementById("popup_Archer")
    let popupCancel = document.getElementById("popup_Cancel")

    jobStatusChangeNumber = Number(e.target.className.substr(10));
    i = jobStatusChangeNumber; // i is for the "id" class
    objIndex = findCharIndex(i); // finds respective index in totalPop
    classChangeTarget = totalPop[objIndex].job_choice;
    popupFuncts.poppity();
    popupFuncts.specificClassPopup();

    popupWarrior.addEventListener("click", (e) => {
      let classToChangeTo = e.target.innerHTML;
      totalPop[objIndex].newJob = `${classToChangeTo}`;
      popupFuncts.unpopAll();
      cardFuncts.loopArrayForCards();
    })

    popupCleric.addEventListener("click", (e) => {
      let classToChangeTo = e.target.innerHTML;
      totalPop[objIndex].newJob = `${classToChangeTo}`;
      popupFuncts.unpopAll();
      cardFuncts.loopArrayForCards();
    })

    popupArcher.addEventListener("click", (e) => {
      let classToChangeTo = e.target.innerHTML;
      totalPop[objIndex].newJob = `${classToChangeTo}`;
      popupFuncts.unpopAll();
      cardFuncts.loopArrayForCards();
    })

    popupCancel.addEventListener("click", (e) => {
      popupFuncts.unpopAll();
    })



    // popup selection for class change
    // ** put this all in a function!
    // ** possibly make this into function outside and call in with objIndex?

    /* if (e.target.id.slice(0, 6) === "popup_") {
      let classToChangeTo = e.target.id.substr(6);
      //use .value instead????
      console.log(classToChangeTo);
      totalPop[objIndex].newJob = `${classToChangeTo}`;
      console.log(totalPop[objIndex].job_choice);
    } */

    /*
    Below is specificClassPopup()
    if (classChangeTarget !== "Jobless") {
      document.getElementById(`popup_${classChangeTarget}`).style.display = "none";
    }
    */   

    // get "id" class of button clicked (and hence, of same card)
    /* jobStatusChangeNumber = Number(e.target.className.substr(9)); 
    i = jobStatusChangeNumber; // i is for the "id" class
    objIndex = findCharIndex(i); // finds respective index in totalPop
    cardFuncts.loopArrayForCards(); */
  } else if (e.target.className.slice(0,13) === 'removeowncard') {
    console.log("this is to remove stuffs");
    // target char with same unique class #
    toBeRemovedNumber = Number(e.target.className.substr(14));
    console.log(toBeRemovedNumber);
    cardFuncts.removeFromArray();
    cardFuncts.loopArrayForCards();
    cardFuncts.checkIfArrayEmpty();
    console.table(totalPop);
  }
});

/* let popupWarrior = document.getElementById("popup_Warrior")
let popupCleric = document.getElementById("popup_Cleric")
let popupArcher = document.getElementById("popup_Archer")
let popupCancel = document.getElementById("popup_Cancel")

popupWarrior.addEventListener("click", (e) => {
  let classToChangeTo = e.target.id.substr(6);
  console.log(classToChangeTo);
  totalPop[objIndex].newJob = `${classToChangeTo}`;
  console.log(totalPop[objIndex].job_choice);
}) */