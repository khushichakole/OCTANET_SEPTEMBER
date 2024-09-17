const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Add new task
addTaskBtn.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        createTaskElement(taskText);
        taskInput.value = ''; // Clear input
    }
});

// Function to create task item
function createTaskElement(taskText) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.classList.add('task-text');
    span.textContent = taskText;

    // Mark task as completed
    li.addEventListener('click', function (e) {
        if (!e.target.closest('button')) {
            li.classList.toggle('completed');
        }
    });

    // Create button container
    const btnContainer = document.createElement('div');
    btnContainer.classList.add('task-btns');

    // Edit button with icon
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', function () {
        editTask(span, editBtn, li);
    });

    // Delete button with icon
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        li.remove();
    });

    // Append buttons
    btnContainer.appendChild(editBtn);
    btnContainer.appendChild(deleteBtn);

    // Append text and buttons to the list item
    li.appendChild(span);
    li.appendChild(btnContainer);
    
    // Append list item to the task list
    taskList.appendChild(li);
}

// Edit task function
function editTask(span, editBtn, li) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    input.classList.add('edit-input');
    li.replaceChild(input, span);

    editBtn.innerHTML = '<i class="fas fa-save"></i> Save';
    editBtn.addEventListener('click', function () {
        const updatedText = input.value.trim();
        if (updatedText !== '') {
            span.textContent = updatedText;
            li.replaceChild(span, input);
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        }
    });
}
