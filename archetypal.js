// Data
let categories = [
  {
    title: "Personal",
    img: "boy.png",
  },
  {
    title: "Work",
    img: "briefcase.png",
  },
  {
    title: "Shopping",
    img: "shopping.png",
  },
  {
    title: "Coding",
    img: "web-design.png",
  },
  {
    title: "Health",
    img: "healthcare.png",
  },
  {
    title: "Fitness",
    img: "dumbbell.png",
  },
  {
    title: "Education",
    img: "education.png",
  },
  {
    title: "Finance",
    img: "cash.png",
  },
];

let tasks = [
  {
    id: 1,
    task: "Go to market",
    category: "Shopping",
    completed: false,
  },
  {
    id: 2,
    task: "Read a chapter of a book",
    category: "Personal",
    completed: false,
  },
  {
    id: 3,
    task: "Prepare presentation for meeting",
    category: "Work",
    completed: false,
  },
  {
    id: 4,
    task: "Complete coding challenge",
    category: "Coding",
    completed: false,
  },
  {
    id: 5,
    task: "Take a 30-minute walk",
    category: "Health",
    completed: false,
  },
  {
    id: 6,
    task: "Do a 20-minute HIIT workout",
    category: "Fitness",
    completed: false,
  },
  {
    id: 7,
    task: "Watch an educational video online",
    category: "Education",
    completed: false,
  },
  {
    id: 8,
    task: "Review monthly budget",
    category: "Finance",
    completed: false,
  },
];

// DOM Elements
const screenWrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const categoriesContainer = document.querySelector(
  ".categories-wrapper .categories"
);
const tasksContainer = document.querySelector(".tasks-wrapper .tasks");
const numTasks = document.getElementById("num-tasks");
const categoryTitle = document.getElementById("category-title");
const categoryImg = document.getElementById("category-img");
const totalTasks = document.getElementById("total-tasks");
const addTaskWrapper = document.querySelector(".add-task");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskInput = document.getElementById("task-input");
const categorySelect = document.getElementById("category-select");
const blackBackdrop = document.querySelector(".black-backdrop");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");

let selectedCategory = categories[0];

// Local Storage Functions
const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  if (tasksLocal && tasksLocal.length > 0) {
    tasks = tasksLocal;
  }
};

// Screen Toggle
const toggleScreen = () => {
  screenWrapper.classList.toggle("show-category");
};

// Update Task Counts
const updateTotals = () => {
  totalTasks.textContent = tasks.length;

  if (selectedCategory) {
    const categoryTasks = tasks.filter(
      (task) =>
        task.category.toLowerCase() === selectedCategory.title.toLowerCase()
    );
    numTasks.textContent = `${categoryTasks.length} Tasks`;
  }
};

// Render Categories
const renderCategories = () => {
  categoriesContainer.innerHTML = "";

  categories.forEach((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );

    const div = document.createElement("div");
    div.classList.add("category");

    div.addEventListener("click", () => {
      selectedCategory = category;
      toggleScreen();
      categoryTitle.textContent = category.title;
      categoryImg.src = `img/${category.img}`;
      renderTasks();
      updateTotals();
    });

    div.innerHTML = `
      <div class="left">
        <img src="img/${category.img}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>${categoryTasks.length} Tasks</p>
        </div>
      </div>
      <div class="options">
        <div class="toggle-btn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </div>
      </div>
    `;

    categoriesContainer.appendChild(div);
  });
};

// Render Tasks
const renderTasks = () => {
  tasksContainer.innerHTML = "";

  if (!selectedCategory) return;

  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );

  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">No tasks added for this category</p>`;
    return;
  }

  categoryTasks.forEach((task) => {
    const taskWrapper = document.createElement("div");
    taskWrapper.classList.add("task-wrapper");

    const label = document.createElement("label");
    label.classList.add("task");
    label.setAttribute("for", `task-${task.id}`);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${task.id}`;
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      task.completed = !task.completed;
      saveLocal();
      renderTasks();
      updateTotals();
    });

    label.innerHTML = `
      <span class="checkmark">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </span>
      <p>${task.task}</p>
    `;
    label.prepend(checkbox);

    const deleteBtn = document.createElement("div");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    `;

    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveLocal();
      renderTasks();
      renderCategories();
      updateTotals();
    });

    taskWrapper.append(label, deleteBtn);
    tasksContainer.appendChild(taskWrapper);
  });
};

// Add Task Form
const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

const addTask = (e) => {
  e.preventDefault();
  const taskValue = taskInput.value.trim();
  const categoryValue = categorySelect.value;

  if (!taskValue) {
    alert("Please enter a task");
    return;
  }

  const newTask = {
    id: Date.now(),
    task: taskValue,
    category: categoryValue,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";
  saveLocal();
  toggleAddTaskForm();

  // Update the selected category if needed
  if (selectedCategory.title === categoryValue) {
    renderTasks();
  } else {
    selectedCategory =
      categories.find((cat) => cat.title === categoryValue) || categories[0];
    renderTasks();
  }

  renderCategories();
  updateTotals();
};

// Initialize App
const init = () => {
  getLocal();

  // Populate category select
  categorySelect.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.title;
    option.textContent = category.title;
    categorySelect.appendChild(option);
  });

  // Set initial category
  selectedCategory = categories[0];
  categoryTitle.textContent = selectedCategory.title;
  categoryImg.src = `img/${selectedCategory.img}`;

  renderCategories();
  renderTasks();
  updateTotals();
};

// Event Listeners
menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);
addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", toggleAddTaskForm);

// Initialize the app
document.addEventListener("DOMContentLoaded", init);
getLocal();
renderCategories();
