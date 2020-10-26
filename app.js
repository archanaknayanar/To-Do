
//Select the Elements 
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');
const add = document.querySelector('.add-to-do');

//Class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "linethrough";

//Variables
let LIST =[]
    ,id = 0
    ,done = false
    ,trash = false;

//get item from local storage
let data = localStorage.getItem("TODO");
//check if data isn't empty
if(data){
    //if data isn't empty
    LIST = JSON.parse(data);
    id = LIST.length; // set id to the last one in list
    loadLIST(LIST); // load list to UI
}
else{
    //if data is empty
    LIST = [];
    id = 0;
}

//Load items to the user's UI
function loadLIST(array){
    array.forEach(function(item){
        addToDo(item.name , item.id , item.done , item.trash);
        
    });
}

//clear the local storage using clear button
clear.addEventListener("click" , function(){
    localStorage.clear();
    location.reload();
});

//Show today's date
const today = new Date();
const options = {weekday : "long" , month : "short" , day:"numeric"};
dateElement.innerHTML = today.toLocaleDateString("en-US",options);

// Add a ToDo 
function addToDo(toDo, id, done, trash){

    if(trash) {return};

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="trash" id="${id}"></i>
                </li> `;
    const position = "beforeend";

    list.insertAdjacentHTML(position,item);
}

// Add a todo when the user press enter key(code =13)
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        //to check input isn't empty
        if (toDo){
            addToDo(toDo, id, done, trash);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

        //add item to local storage(must be written at everywhere we update the data)
        localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = ""; //to clear the text entered from the placeholder
    }
});



//Complete a todo
function completeToDo(element){

    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true; //update the list array

}

//Remove a todo
function removeTodo(element){
    
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//Target the items created dynamicaly
list.addEventListener("click",function(event){
    const element = event.target; //Return the clicked element inside the list
    const elementJob = element.attributes.job.value //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "trash"){
        removeTodo(element);
    }

    //add item to local storage(must be written at everywhere we update the data)
    localStorage.setItem("TODO", JSON.stringify(LIST)); 
});