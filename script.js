// 1. --- Get HTML Elements ---
const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// 2. --- Event Listeners ---

// Add task when "Add" button is clicked
addButton.addEventListener("click", addTask);

// Add task when "Enter" key is pressed in the input field
taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Handle clicks on the task list (for completing or deleting tasks)
// This uses "event delegation"
taskList.addEventListener("click", handleTaskClick);

// 3. --- Main Functions ---

/**
 * Adds a new task to the list
 */
function addTask() {
    const taskText = taskInput.value.trim(); // Get text and remove whitespace

    if (taskText === "") {
        alert("You must write something!");
        return; // Don't add empty tasks
    }

    // Create new list item (li)
    const li = document.createElement("li");
    li.innerHTML = taskText; // Set the text of the li

    // Create the delete button (span)
    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "&times;"; // The "x" symbol
    li.appendChild(deleteBtn); // Add the delete button to the li

    // Add the new li to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = "";
    
    // Save data to localStorage
    saveData();
}

/**
 * Handles clicks inside the task list
 * @param {Event} e - The click event
 */
function handleTaskClick(e) {
    const clickedElement = e.target;

    if (clickedElement.tagName === "LI") {
        // Clicked on the task item (li)
        // Toggle the "checked" class to mark/unmark as complete
        clickedElement.classList.toggle("checked");
        saveData(); // Save changes
    } else if (clickedElement.tagName === "SPAN") {
        // Clicked on the delete button (span)
        // Remove the parent <li> element
        clickedElement.parentElement.remove();
        saveData(); // Save changes
    }
}

// 4. --- localStorage Functions ---

/**
 * Saves the current state of the task list to localStorage
 */
function saveData() {
    localStorage.setItem("todoData", taskList.innerHTML);
}

/**
 * Loads and displays the tasks from localStorage when the page loads
 */
function loadData() {
    const data = localStorage.getItem("todoData");
    if (data) {
        taskList.innerHTML = data;
    }
}

// 5. --- Load Data on Page Start ---
loadData();