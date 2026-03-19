const STORAGE_KEY = "todo_app_tasks_v3";
const THEME_KEY = "todo_app_theme_v3";

const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

const filterButtons = document.querySelectorAll(".filter-btn");
const sectionButtons = document.querySelectorAll(".section-btn");
const menuButtons = document.querySelectorAll(".menu-btn");

const themeToggle = document.getElementById("themeToggle");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const modalOverlay = document.getElementById("modalOverlay");

const taskForm = document.getElementById("taskForm");
const modalTitle = document.getElementById("modalTitle");
const taskIdInput = document.getElementById("taskId");
const taskInput = document.getElementById("taskInput");
const taskSection = document.getElementById("taskSection");
const taskImportant = document.getElementById("taskImportant");
const dateOption = document.getElementById("dateOption");
const taskDate = document.getElementById("taskDate");
const customDateContainer = document.getElementById("customDateContainer");

const viewTitle = document.getElementById("viewTitle");
const dateLabel = document.getElementById("dateLabel");

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentFilter = "all";
let currentSection = "all";
let currentView = "today";

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatFullDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatShortDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function setTopDate() {
  dateLabel.textContent = formatFullDate(getTodayString());
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Modo claro";
  } else {
    themeToggle.textContent = "🌙 Modo oscuro";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️ Modo claro" : "🌙 Modo oscuro";
}

function openModal(task = null) {
  modalOverlay.classList.remove("hidden");

  if (task) {
    modalTitle.textContent = "Editar tarea";
    taskIdInput.value = task.id;
    taskInput.value = task.text;
    taskSection.value = task.section;
    taskImportant.checked = task.important;
    taskDate.value = task.date;

    if (task.date === getTodayString()) {
      dateOption.value = "today";
      customDateContainer.classList.add("hidden");
    } else {
      dateOption.value = "custom";
      customDateContainer.classList.remove("hidden");
    }
  } else {
    modalTitle.textContent = "Agregar tarea";
    taskForm.reset();
    taskIdInput.value = "";
    dateOption.value = "today";
    taskDate.value = getTodayString();
    customDateContainer.classList.add("hidden");
  }
}

function closeModal() {
  modalOverlay.classList.add("hidden");
}

function updateCounter() {
  const pending = tasks.filter(task => !task.completed).length;
  taskCounter.textContent = `${pending} pendiente${pending !== 1 ? "s" : ""}`;
}

function getFilteredTasks() {
  let filtered = [...tasks];

  if (currentView === "today") {
    filtered = filtered.filter(task => task.date === getTodayString());
  } else if (currentView === "upcoming") {
    filtered = filtered.filter(task => task.date > getTodayString());
  } else if (currentView === "important") {
    filtered = filtered.filter(task => task.important);
  }

  if (currentSection !== "all") {
    filtered = filtered.filter(task => task.section === currentSection);
  }

  if (currentFilter === "pending") {
    filtered = filtered.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filtered = filtered.filter(task => task.completed);
  }

  filtered.sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    return b.createdAt.localeCompare(a.createdAt);
  });

  return filtered;
}

function renderTasks() {
  const filteredTasks = getFilteredTasks();
  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No hay tareas para mostrar.";
    taskList.appendChild(empty);
  } else {
    filteredTasks.forEach(task => {
      const li = document.createElement("li");
      li.className = "task-item";

      li.innerHTML = `
        <div class="task-left">
          <input class="task-checkbox" type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}" />
          <div class="task-content">
            <div class="task-title-row">
              <span class="task-text ${task.completed ? "completed" : ""}">${escapeHtml(task.text)}</span>
              <span class="badge section">${task.section}</span>
              ${task.important ? `<span class="badge important">Importante</span>` : ""}
            </div>
            <div class="task-meta">
              <span>Fecha: ${formatShortDate(task.date)}</span>
              <span>Creada: ${formatShortDate(task.createdAt.slice(0, 10))}</span>
            </div>
          </div>
        </div>

        <div class="task-actions">
          <button class="edit-btn" data-edit="${task.id}">Editar</button>
          <button class="delete-btn" data-delete="${task.id}">Eliminar</button>
        </div>
      `;

      taskList.appendChild(li);
    });
  }

  updateCounter();
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function addTask(taskData) {
  tasks.push(taskData);
  saveTasks();
  renderTasks();
}

function updateTask(updatedTask) {
  tasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = taskInput.value.trim();
  if (!text) return;

  const id = taskIdInput.value;
  const selectedDate = dateOption.value === "today" ? getTodayString() : (taskDate.value || getTodayString());

  if (id) {
    const existingTask = tasks.find(task => task.id === id);
    if (!existingTask) return;

    const updatedTask = {
      ...existingTask,
      text,
      section: taskSection.value,
      important: taskImportant.checked,
      date: selectedDate
    };

    updateTask(updatedTask);
  } else {
    const newTask = {
      id: String(Date.now()),
      text,
      section: taskSection.value,
      important: taskImportant.checked,
      completed: false,
      date: selectedDate,
      createdAt: new Date().toISOString()
    };

    addTask(newTask);
  }

  closeModal();
});

taskList.addEventListener("click", function (e) {
  const editId = e.target.getAttribute("data-edit");
  const deleteId = e.target.getAttribute("data-delete");

  if (editId) {
    const task = tasks.find(item => item.id === editId);
    if (task) openModal(task);
  }

  if (deleteId) {
    deleteTask(deleteId);
  }
});

taskList.addEventListener("change", function (e) {
  if (e.target.classList.contains("task-checkbox")) {
    const id = e.target.getAttribute("data-id");
    toggleTask(id);
  }
});

filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

sectionButtons.forEach(button => {
  button.addEventListener("click", function () {
    sectionButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentSection = button.dataset.section;
    renderTasks();
  });
});

menuButtons.forEach(button => {
  button.addEventListener("click", function () {
    menuButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentView = button.dataset.view;
    viewTitle.textContent = button.textContent;
    renderTasks();
  });
});

dateOption.addEventListener("change", function () {
  if (dateOption.value === "custom") {
    customDateContainer.classList.remove("hidden");
    taskDate.value = taskDate.value || getTodayString();
  } else {
    customDateContainer.classList.add("hidden");
    taskDate.value = getTodayString();
  }
});

taskDate.addEventListener("change", () => {
  const today = getTodayString();

  if (taskDate.value && taskDate.value !== today) {
    dateOption.value = "custom";
    customDateContainer.classList.remove("hidden");
  } else {
    dateOption.value = "today";
    customDateContainer.classList.add("hidden");
  }
});

themeToggle.addEventListener("click", toggleTheme);
openModalBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

setTopDate();
loadTheme();
renderTasks();