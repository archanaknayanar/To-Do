
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
});