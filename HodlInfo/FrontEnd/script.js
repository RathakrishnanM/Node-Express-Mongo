const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
  }
});

const FULL_DASH_ARRAY = 339.292;
const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;

const counterElement = document.getElementById("counter");
const progressRing = document.querySelector(".progress-ring__circle");
progressRing.style.strokeDasharray = `${FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`;
progressRing.style.strokeDashoffset = FULL_DASH_ARRAY;

function updateCounter() {
  timePassed++;
  timeLeft = TIME_LIMIT - timePassed;

  counterElement.textContent = timeLeft;

  const progressPercent = timeLeft / TIME_LIMIT;

  const offset = FULL_DASH_ARRAY * (1 - progressPercent);
  progressRing.style.strokeDashoffset = offset;

  if (timeLeft <= 0) {
    timePassed = 0;
  }
}

setInterval(updateCounter, 1000);

async function fetchAndDisplayData() {
  try {
    const response = await fetch("http://localhost:5500/getCriptoData");
    const data = await response.json();

    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    data.forEach((item, index) => {
      const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${item.name}</td>
              <td>${item.last}</td>
              <td>${item.buy} / ${item.sell}</td>
              <td>${item.volume}</td>
              <td>${item.base_unit}</td>
            </tr>
          `;
      tableBody.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

window.onload = fetchAndDisplayData;
