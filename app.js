//Projects storage
let projects = [];
const projectContainer = document.getElementById("projectContainer");

//Get projects drop-down list
const projectsDropDown = document.getElementById("projectDropdown");

class Project {
  constructor(name, index) {
    this.name = name;
    this.index = index;
  }

  tasks = [];

  get tasks() {
    return this.tasks;
  }

  addTask(task) {
    this.tasks.push(task);
  }
}

//throw this in a dom control class
function clearInputField(inputID) {
  document.getElementById(inputID).value = "";
}

//clear project container
function clearProjectContainer() {
  while (projectContainer.firstChild) {
    projectContainer.removeChild(projectContainer.firstChild);
  }
}

function updateDropDown() {
  for (let i = 0; i < projects.length; i++) {
    const option = document.createElement("option");
    option.value = projects[i].name;
    option.textContent = projects[i].name;

    projectsDropDown.appendChild(option);
  }
}

const submitProjectBtn = document.getElementById("submitProjectBtn");

//add project to projects array
function addProjectToStorage() {
  const projectName = document.getElementById("projectNameInput").value;
  const project = new Project(projectName, projects.length);
  projects.push(project);
}

function deleteProject(project, deleteButton) {
  if (project.id == deleteButton.id) {
    projects.splice(projects[project.id], 1);
    deleteButton.parentElement.remove();
  }
}

//add all projects to DOM
function addProjectsToDOM() {
  for (let i = 0; i < projects.length; i++) {
    const projectCard = document.createElement("div");
    projectCard.classList.add("projectCard");
    projectCard.id = projects[i].index;

    const projectName = document.createElement("h1");
    projectName.textContent = projects[i].name;
    projectCard.appendChild(projectName);

    const taskHeaders = document.createElement("div");
    taskHeaders.classList.add("taskHeaders");
    projectCard.appendChild(taskHeaders);

    const taskHeader = document.createElement("p");
    taskHeader.textContent = "Tasks: ";
    taskHeaders.appendChild(taskHeader);

    const dueDateHeader = document.createElement("p");
    dueDateHeader.textContent = "Due Date: ";
    taskHeaders.appendChild(dueDateHeader);

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.textContent = "X";
    deleteProjectBtn.classList.add("deleteProjectBtn");
    deleteProjectBtn.id = `${projects[i].index}`;
    deleteProjectBtn.addEventListener("click", function () {
      deleteProject(projectCard, deleteProjectBtn);
    });
    projectCard.appendChild(deleteProjectBtn);

    projectContainer.appendChild(projectCard);
  }
}

//throw this in a dom control class
submitProjectBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addProjectToStorage();
  clearProjectContainer();
  addProjectsToDOM();
  updateDropDown();
  clearInputField("projectNameInput");
});
