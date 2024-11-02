let boxes = document.querySelectorAll(".box");
let daysCompletedCount =
  parseInt(localStorage.getItem("daysCompletedCount")) || 0;

let daysCompletedDisplayer = document.querySelector(".daysCompletedDisplayer");
let currentIndex = parseInt(localStorage.getItem("currentIndex")) || 0;
let clearStorageButton = document.querySelector(".clearStorage");
let editButton = document.querySelector(".editButton");
let cleanSound = new Audio("assets/cleanSound.mp3");

// Load saved state for each box
boxes.forEach((box, index) => {
  if (localStorage.getItem(`box${index}`) === "completed") {
    box.classList.remove("box");
    box.classList.add("dayCompletedClass");
    dayCompletedEffectFunction(box); // Add completed text and class
  }
});

// Initialize day numbers and dates for each box
// for (let i = 0; i < boxes.length; i++) {
//   let dateContainer = document.createElement("div");
//   dateContainer.setAttribute("class", "dateContainer");
//   dateContainer.innerHTML = `
//     <span class='boxDate'>${String(i + 1).padStart(2, "0")} November 2024</span>
//     <span class="weekday">${weekdays[i % weekdays.length]}</span>
//   `;
//   boxes[i].appendChild(dateContainer);

//   let dayCount = document.createElement("div");
//   dayCount.setAttribute("class", "dayCount");
//   dayCount.innerHTML = `Day <span class='dayCountNumberClass'>${i + 1}</span>`;
//   boxes[i].append(dayCount);
// }

// Click event for boxes
boxes.forEach((box, index) => {
  box.addEventListener("dblclick", () => {
    if (
      !box.classList.contains("dayCompletedClass") &&
      index === currentIndex &&
      box.innerHTML !== ""
    ) {
      navigator.vibrate(25);
      box.classList.add("dayCompletedTransition");
      setTimeout(() => {
        box.classList.remove("box");
        box.classList.add("dayCompletedClass");
        box.classList.remove("dayCompletedTransition");
      }, 900);

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
      buttonBackgroundDisplayerFunc();
      taskOverFunc();

      inputDateContainerHideFunc();
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
  const maxDays = boxes.length;
  const percentage = (daysCompletedCount / maxDays) * 100;
  daysCompletedDisplayer.style.background = `linear-gradient(
    to right, 
    #7ee07e80 ${percentage}%, 
    #f3f3f3 ${percentage}%
  )`;
}

function buttonBackgroundDisplayerFunc() {
  if (daysCompletedCount >= 1) {
    daysCompletedDisplayer.style.opacity = "1";
  }
}

function taskOverFunc() {
  if (daysCompletedCount === boxes.length) {
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
    // dayCount.append(" Completed");
    completed = document.createElement("p");
    completed.innerText = "Completed";
    completed.setAttribute("class", "completedTextClass");
    dayCount.append(completed);
    dayCount.classList.add("dayCompletedCount");
  }
}

// Load initial count and background
daysCompletedCountFunc();
buttonBackgroundFunc();
buttonBackgroundDisplayerFunc();

inputDateContainerHideFunc();

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
  navigator.vibrate(200);

  trashIconStylingsFunc();

  // clearStorageButton.style.width = "100%";
  // clearStorageButton.style.justifyContent = "unset";
  clearStorageButton.style.display = "none";

  let text = document.querySelector(".clearStorage p");
  text.innerText = "Clearing";

  let section = document.querySelector("section");
  section.style.scale = ".15";
  section.style.transition = "1s ease";
  setTimeout(() => {
    cleanSound.play();
    section.style.transform = "translate(0,400%)";
  }, 400);

  setTimeout(() => {
    document.body.style.display = "none";
    window.location.href = "";
  }, 1200);
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

//
function trashIconStylingsFunc() {
  let trashContainer = document.querySelector(".trashContainer");
  let trashIcon = document.querySelector(".trash-icon");
  let lid = document.querySelector(".lid");

  trashContainer.classList.add("trashContainerStart");
  trashIcon.classList.add("trashIconStart");
  lid.classList.add("lidStart");

  setTimeout(() => {
    lid.classList.add("lidClose");
  }, 600);
}

function inputDateContainerHideFunc() {
  if (daysCompletedCount >= 1) {
    let inputDateContainer = document.querySelector(".inputDateContainer");
    inputDateContainer.classList.add("inputDateContainerHide");
    setTimeout(() => {
      inputDateContainer.style.display = "none";
    }, 300);
  }
}

if (daysCompletedCount === 0) {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      const button = document.getElementById("generateDatesButton");
      button.click();
    }, 10);
  });
}

boxes.forEach((box) => {
  let startX;

  box.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  box.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const distance = endX - startX;

    // Remove any previous swipe classes
    box.classList.remove("swiped-right", "swiped-left");

    if (distance > 50) {
      box.classList.add("swiped-right");
      setTimeout(() => {
        box.classList.remove("swiped-right");
      }, 200);
    } else if (distance < -50) {
      box.classList.add("swiped-left");
      navigator.vibrate(25);
      setTimeout(() => {
        box.classList.remove("swiped-left");

        // Programmatically trigger a double-click event
        const dblClickEvent = new Event("dblclick");
        box.dispatchEvent(dblClickEvent);
      }, 200);
    }
  });
});

setTimeout(() => {
  allDivs.forEach((div) => {
    div.classList.remove("loadingClass");
  });
}, 300);
