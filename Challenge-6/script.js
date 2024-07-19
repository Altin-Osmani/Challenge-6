
//gjenerojme funksionin per te gjeneru nje event ID ne menyre random
function generateEventId() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

//ktu do marrim nga LS ate qe ruajtem
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('allTasks')) || [];
}

//funksioni i cili do sherbej per ruajtjen e ndryshimeve ne LS
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('allTasks', JSON.stringify(tasks));
}

//tani gjithkqa per kte aplikacion nis kur klikohet butoni 'add task'
function addTask() {

     //marrim valuen e inputeve
    const descriptionInput = document.getElementById('taskDescription').value;
    const taskTimeInput = document.getElementById('taskTime').value;
    const taskDateInput = document.getElementById('taskDate').value;

     //deklarojme nje objekt kur do grumbullohen te dhenat qe jep useri  qe me pas  do i shfaqim ne html
    const newTask = {
        taskId: generateEventId(),
        taskDescription: descriptionInput,
        taskTime: taskTimeInput,
        taskDate: taskDateInput,
    };

     
    const allTasks = getTasksFromLocalStorage();
    allTasks.push(newTask); //i bejme push tek array (e ruajme)

     //e ruajme ne LS
    saveTasksToLocalStorage(allTasks);

    displayTasks(); //therrasim eventin
}



//READ operation :
//do shfaqim tasket ne html
function displayTasks() {
    //marrim divin
    const taskList = document.getElementById('taskList');

    //marrim te dhenat me te cillin me pas do iterojme
    const allTasks = getTasksFromLocalStorage();

    taskList.innerHTML = ''; //kjo sherben per te ber refresh

     //PRA GJITHQKA QE SHTOHET DO BEHET BRENDA NJE LOOP
    allTasks.forEach (task => {

           //krijojm listen
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item p-2 mb-2';

          //krijojm divin
        const taskDiv = document.createElement('div');
        taskDiv.className = 'd-flex justify-content-between align-items-center';
        taskDiv.textContent = `${task.taskDescription} - ${task.taskTime} - ${task.taskDate}`;

         // krijojm butonin DELETE
         const removeDiv = document.createElement('div')
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger mx-4';
        removeBtn.textContent = 'Remove';

          //tani i jap eventlistener dhe on click te butonit therrasim funksionin
       removeBtn.addEventListener('click', () => deleteTask(task.taskId));

        //dhe bejme appendin 
       removeDiv.appendChild(removeBtn); //butonin tek divi
        taskDiv.appendChild(removeDiv);  //divin e butonit dek divi i taskeve
       listItem.appendChild(taskDiv);   // divit i bejme append tek lista
        taskList.appendChild(listItem); // dhe listen i bejme append tek divi kryesor 
    });
}

//krijojm funksioni e delete
function deleteTask(taskId) {

    //si fillim per cdo ndryshim se pari marrim te dhenat ne LS ne menyre qe ndryshimi te behet edhe ne LS
    let allTasks = getTasksFromLocalStorage();

    //bejme filter ku i themi me mbaj te gjitha pervec atije qe klikojme
    allTasks = allTasks.filter(task => task.taskId !== taskId);

    //filtrimin  qe bem e ruajme ne LS
    saveTasksToLocalStorage(allTasks);

    //therrasim funksionin per te i ber display ne html
    displayTasks();
}

//bejme nje listener on load te faqes te shfaqen tasket
document.addEventListener('DOMContentLoaded', displayTasks);
