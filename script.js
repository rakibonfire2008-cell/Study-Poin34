// ===============================
// StudyMate — JavaScript
// ===============================


// ===============================
// DATA
// ===============================

const tasks = [
  {
    name: "Complete algebra worksheet",
    meta: "Math · 45m",
    done: true
  },
  {
    name: "Read chapter 4",
    meta: "English · 30m",
    done: false
  },
  {
    name: "Review photosynthesis notes",
    meta: "Science · 25m",
    done: true
  },
  {
    name: "Practice HTML & CSS",
    meta: "ICT · 40m",
    done: false
  }
];


let subjects = [
  {
    name: "Mathematics",
    icon: "∑",
    progress: 78,
    detail: "12 of 15 lessons"
  },
  {
    name: "English",
    icon: "Aa",
    progress: 64,
    detail: "8 of 12 lessons"
  },
  {
    name: "Science",
    icon: "⚗",
    progress: 82,
    detail: "14 of 17 lessons"
  },
  {
    name: "ICT",
    icon: "⌘",
    progress: 91,
    detail: "10 of 11 lessons"
  },
  {
    name: "Bangla",
    icon: "অ",
    progress: 56,
    detail: "7 of 13 lessons"
  },
  {
    name: "History",
    icon: "◈",
    progress: 43,
    detail: "5 of 12 lessons"
  }
];


let notes = [
  {
    title: "Quadratic formulas",
    body: "Key formulas, examples and shortcuts from today's mathematics class.",
    tag: "MATHEMATICS"
  },
  {
    title: "Essay ideas",
    body: "A few strong ideas for the upcoming English writing assignment.",
    tag: "ENGLISH"
  },
  {
    title: "Photosynthesis",
    body: "Important definitions and the process explained in simple steps.",
    tag: "SCIENCE"
  }
];


// ===============================
// RENDER TASKS
// ===============================

function renderTasks(targetId, list = tasks) {

  const element = document.getElementById(targetId);

  if (!element) return;

  element.innerHTML = list.map((task, index) => {

    return `
      <div class="task ${task.done ? "done" : ""}">

        <button
          class="check"
          onclick="toggleTask(${index})"
        >
          ${task.done ? "✓" : ""}
        </button>

        <span class="task-name">
          ${task.name}
        </span>

        <span class="task-meta">
          ${task.meta}
        </span>

      </div>
    `;

  }).join("");
}


// ===============================
// TOGGLE TASK
// ===============================

function toggleTask(index) {

  tasks[index].done = !tasks[index].done;

  renderTasks("taskList");
  renderTasks("allTasks");

  updateDoneCount();

  if (tasks[index].done) {

    toast("Task completed! 🎉");

  } else {

    toast("Task reopened.");

  }
}


// ===============================
// UPDATE COMPLETED TASK COUNT
// ===============================

function updateDoneCount() {

  const countElement = document.getElementById("doneCount");

  if (!countElement) return;

  const completed =
    tasks.filter(task => task.done).length;

  countElement.textContent = completed + 6;
}


// ===============================
// SUBJECTS
// ===============================

function renderSubjects() {

  const grid =
    document.getElementById("subjectGrid");

  if (!grid) return;

  grid.innerHTML = subjects.map(subject => {

    return `
      <article class="subject">

        <div class="subject-top">

          <div class="subject-icon">
            ${subject.icon}
          </div>

          <b>
            ${subject.progress}%
          </b>

        </div>

        <h3>
          ${subject.name}
        </h3>

        <small>
          ${subject.detail}
        </small>

        <div class="progress">

          <i
            style="width: ${subject.progress}%"
          ></i>

        </div>

      </article>
    `;

  }).join("");
}


// ===============================
// NOTES
// ===============================

function renderNotes() {

  const grid =
    document.getElementById("notesGrid");

  if (!grid) return;

  grid.innerHTML = notes.map(note => {

    return `
      <article class="note">

        <h3>
          ${note.title}
        </h3>

        <p>
          ${note.body}
        </p>

        <small>
          ${note.tag}
        </small>

      </article>
    `;

  }).join("");
}


// ===============================
// WEEKLY CHART
// ===============================

function renderChart() {

  const chart =
    document.getElementById("chart");

  if (!chart) return;

  const values =
    [42, 67, 53, 82, 61, 90, 76];

  const days =
    ["M", "T", "W", "T", "F", "S", "S"];


  chart.innerHTML = values.map((value, index) => {

    return `
      <div class="bar-wrap">

        <div
          class="bar"
          style="height: ${value}%"
        ></div>

        <span class="bar-label">
          ${days[index]}
        </span>

      </div>
    `;

  }).join("");
}


// ===============================
// PAGE NAVIGATION
// ===============================

document
  .querySelectorAll(".nav-item[data-page]")
  .forEach(button => {

    button.addEventListener("click", () => {

      // Remove active navigation
      document
        .querySelectorAll(".nav-item")
        .forEach(item => {
          item.classList.remove("active");
        });


      // Activate clicked button
      button.classList.add("active");


      // Hide all pages
      document
        .querySelectorAll(".page")
        .forEach(page => {
          page.classList.remove("active-page");
        });


      // Show selected page
      const page =
        document.getElementById(button.dataset.page);

      if (page) {
        page.classList.add("active-page");
      }


      // Change page title
      const pageName =
        button.dataset.page;


      const title =
        pageName === "dashboard"
          ? "Good morning, Alex 👋"
          : pageName.charAt(0).toUpperCase()
            + pageName.slice(1);


      document.getElementById(
        "pageTitle"
      ).textContent = title;

    });

  });


// ===============================
// DARK MODE
// ===============================

const themeButton =
  document.getElementById("themeBtn");


if (themeButton) {

  themeButton.addEventListener(
    "click",
    () => {

      document.body.classList.toggle("dark");

      const isDark =
        document.body.classList.contains("dark");


      localStorage.setItem(
        "studyMateTheme",
        isDark ? "dark" : "light"
      );


      toast(
        isDark
          ? "Dark mode enabled 🌙"
          : "Light mode enabled ☀️"
      );

    }
  );

}


// Load saved theme

const savedTheme =
  localStorage.getItem("studyMateTheme");


if (savedTheme === "dark") {

  document.body.classList.add("dark");

}


// ===============================
// ADD TASK
// ===============================

const addTaskButton =
  document.getElementById("addTask");


if (addTaskButton) {

  addTaskButton.addEventListener(
    "click",
    () => {

      const name =
        prompt("Enter your task name:");


      if (!name || !name.trim()) {
        return;
      }


      tasks.push({
        name: name.trim(),
        meta: "New task · Today",
        done: false
      });


      renderTasks("allTasks");
      renderTasks("taskList");

      toast("Task added successfully!");


    }
  );

}


// ===============================
// ADD SUBJECT
// ===============================

const addSubjectButton =
  document.getElementById("addSubject");


if (addSubjectButton) {

  addSubjectButton.addEventListener(
    "click",
    () => {

      const name =
        prompt("Enter subject name:");


      if (!name || !name.trim()) {
        return;
      }


      subjects.push({
        name: name.trim(),
        icon: "✦",
        progress: 0,
        detail: "New subject"
      });


      renderSubjects();

      toast("Subject added!");


    }
  );

}


// ===============================
// ADD NOTE
// ===============================

const addNoteButton =
  document.getElementById("addNote");


if (addNoteButton) {

  addNoteButton.addEventListener(
    "click",
    () => {

      const title =
        prompt("Enter note title:");


      if (!title || !title.trim()) {
        return;
      }


      const body =
        prompt("Write your note:") ||
        "No details yet.";


      notes.push({
        title: title.trim(),
        body: body.trim(),
        tag: "PERSONAL"
      });


      renderNotes();

      toast("Note created!");


    }
  );

}


// ===============================
// FOCUS TIMER
// ===============================

let seconds = 25 * 60;

let running = false;

let timerInterval = null;


function updateTimer() {

  const timerElement =
    document.getElementById("timer");

  if (!timerElement) return;


  const minutes =
    String(Math.floor(seconds / 60))
      .padStart(2, "0");


  const remainingSeconds =
    String(seconds % 60)
      .padStart(2, "0");


  timerElement.textContent =
    `${minutes}:${remainingSeconds}`;

}


// ===============================
// START / PAUSE TIMER
// ===============================

const startButton =
  document.getElementById("startBtn");


if (startButton) {

  startButton.addEventListener(
    "click",
    () => {

      running = !running;


      if (running) {

        startButton.textContent =
          "Pause session";


        timerInterval =
          setInterval(() => {

            if (seconds > 0) {

              seconds--;

              updateTimer();

            } else {

              running = false;

              clearInterval(timerInterval);

              startButton.textContent =
                "Start session";

              toast(
                "Focus session complete! 🎉"
              );

            }

          }, 1000);


      } else {

        clearInterval(timerInterval);

        startButton.textContent =
          "Start session";

      }

    }
  );

}


// ===============================
// RESET TIMER
// ===============================

const resetButton =
  document.getElementById("resetBtn");


if (resetButton) {

  resetButton.addEventListener(
    "click",
    () => {

      running = false;

      clearInterval(timerInterval);

      seconds = 25 * 60;

      updateTimer();

      startButton.textContent =
        "Start session";

      toast("Timer reset.");

    }
  );

}


// ===============================
// TOAST MESSAGE
// ===============================

function toast(message) {

  const toastElement =
    document.getElementById("toast");


  if (!toastElement) return;


  toastElement.textContent =
    message;


  toastElement.classList.add("show");


  clearTimeout(window.toastTimer);


  window.toastTimer =
    setTimeout(() => {

      toastElement.classList.remove("show");

    }, 1800);

}


// ===============================
// INITIALIZE WEBSITE
// ===============================

renderTasks("taskList");

renderTasks("allTasks");

renderSubjects();

renderNotes();

renderChart();

updateTimer();

updateDoneCount();
