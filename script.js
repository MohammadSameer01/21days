let boxes = document.querySelectorAll(".box");
let daysCompletedCount =
  parseInt(localStorage.getItem("daysCompletedCount")) || 0;
const weekdays = [
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
];
let daysCompletedDisplayer = document.querySelector(".daysCompletedDisplayer");
let currentIndex = parseInt(localStorage.getItem("currentIndex")) || 0;
let clearStorageButton = document.querySelector(".clearStorage");
let editButton = document.querySelector(".editButton");

// Load saved state for each box
boxes.forEach((box, index) => {
  if (localStorage.getItem(`box${index}`) === "completed") {
    box.classList.remove("box");
    box.classList.add("dayCompletedClass");
    dayCompletedEffectFunction(box); // Add completed text and class
  }
});

// Initialize day numbers and dates for each box
for (let i = 0; i < boxes.length; i++) {
  let dateContainer = document.createElement("div");
  dateContainer.setAttribute("class", "dateContainer");
  dateContainer.innerHTML = `
    <span class='boxDate'>${String(i + 1).padStart(2, "0")} November 2024</span>
    <span class="weekday">${weekdays[i % weekdays.length]}</span>
  `;
  boxes[i].appendChild(dateContainer);

  let dayCount = document.createElement("div");
  dayCount.setAttribute("class", "dayCount");
  dayCount.innerHTML = `Day <span class='dayCountNumberClass'>${i + 1}</span>`;
  boxes[i].append(dayCount);
}

// Click event for boxes
boxes.forEach((box, index) => {
  box.addEventListener("dblclick", () => {
    if (
      !box.classList.contains("dayCompletedClass") &&
      index === currentIndex
    ) {
      box.classList.add("dayCompletedTransition");
      setTimeout(() => {
        box.classList.remove("box");
        box.classList.add("dayCompletedClass");
        box.classList.remove("dayCompletedTransition");
      }, 600);

      currentIndex++;
      daysCompletedCount++;
      localStorage.setItem("daysCompletedCount", daysCompletedCount);
      localStorage.setItem("currentIndex", currentIndex);
      localStorage.setItem(`box${index}`, "completed");

      // Store the dayCompletedCount class
      localStorage.setItem(`dayCompletedCount${index}`, "true");

      dayCompletedEffectFunction(box);
      daysCompletedCountFunc();
      buttonBackgroundFunc();
      taskOverFunc();
    } else if (
      !box.classList.contains("dayCompletedClass") &&
      index !== currentIndex
    ) {
      alert("Complete Above days First");
    } else {
      alert("This day has already been completed.");
    }
  });
});

function daysCompletedCountFunc() {
  let daysCompletedCountDisplayer = document.querySelector(
    ".daysCompletedCount"
  );
  daysCompletedCountDisplayer.innerText = String(daysCompletedCount).padStart(
    2,
    "0"
  );
}

function buttonBackgroundFunc() {
  const maxDays = 21;
  const percentage = (daysCompletedCount / maxDays) * 100;
  daysCompletedDisplayer.style.background = `linear-gradient(
    to right, 
    #7ee07e80 ${percentage}%, 
    #f3f3f3 ${percentage}%
  )`;
}

function taskOverFunc() {
  if (daysCompletedCount === 21) {
    let allEle = document.querySelectorAll("*");
    allEle.forEach((ele) => {
      ele.classList.add("taskOverClass");
      daysCompletedDisplayer.style.background = "transparent";

      let section = document.querySelector("section");
      section.setAttribute("class", "taskOverSection");
    });
  }
}

function dayCompletedEffectFunction(box) {
  const dayCount = box.querySelector(".dayCount");
  if (dayCount) {
    dayCount.append(" Completed");
    dayCount.classList.add("dayCompletedCount");
  }
}

// Load initial count and background
daysCompletedCountFunc();
buttonBackgroundFunc();

// Reapply the dayCompletedCount class from localStorage
boxes.forEach((box, index) => {
  if (localStorage.getItem(`dayCompletedCount${index}`) === "true") {
    const dayCount = box.querySelector(".dayCount");
    if (dayCount) {
      dayCount.append(" Completed");
      dayCount.classList.add("dayCompletedCount");
    }
  }
});

// Utility function for date formatting
function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

clearStorageButton.addEventListener("click", () => {
  localStorage.clear();

  clearStorageButton.style.width = "100%";
  clearStorageButton.style.justifyContent = "unset";

  let text = document.querySelector(".clearStorage p");
  text.innerText = "Clearing All";

  let section = document.querySelector("section");
  section.style.scale = ".15";
  section.style.transition = "1s ease";
  setTimeout(() => {
    section.style.transform = "translate(0,400%)";
  }, 400);

  setTimeout(() => {
    document.body.style.display = "none";
    window.location.href = "";
  }, 1000);
});

function reasonEditFunc() {
  let reason = document.querySelector(".reason");
  let newReason = prompt("New Challenge Title");

  if (
    newReason &&
    ((newReason >= "a" && newReason <= "z") ||
      (newReason >= "A" && newReason <= "Z"))
  ) {
    reason.innerText = newReason;

    // Store the new reason in localStorage
    localStorage.setItem("challengeTitle", newReason);
  } else {
    alert("Please enter a valid title.");
  }
}

window.onload = () => {
  let reason = document.querySelector(".reason");
  const savedReason = localStorage.getItem("challengeTitle");

  if (savedReason) {
    reason.innerText = savedReason;
  }
};

editButton.addEventListener("click", () => {
  reasonEditFunc();
});
