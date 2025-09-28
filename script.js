const API_URL = "http://localhost:3000/readings";
const tableBody = document.getElementById("tableBody");
const ctx = document.getElementById("wellChart").getContext("2d");

const wellChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      { label: "Temperature (°C)", borderColor: "red", data: [], tension: 0.4 },
      { label: "Pressure (bar)", borderColor: "orange", data: [], tension: 0.4 },
      { label: "Flow (L/s)", borderColor: "blue", data: [], tension: 0.4 }
    ]
  },
  options: {
    responsive: true,
    plugins: { legend: { labels: { color: "white" } } },
    scales: {
      x: { ticks: { color: "white" }, grid: { color: "#333" } },
      y: { beginAtZero: true, ticks: { color: "white" }, grid: { color: "#333" } }
    }
  }
});


function generateReading() {
  const temp = (Math.random() * 200).toFixed(1);
  const pressure = (Math.random() * 2).toFixed(2);
  const flow = Math.floor(Math.random() * 100);
  const time = new Date().toLocaleTimeString();

  let alert = "Normal";
  if (temp > 150) alert = "High Temp!";
  else if (pressure > 1.5) alert = "High Pressure!";
  else if (flow < 20) alert = "Low Flow!";

  return { time, temp, pressure, flow, alert };
}


async function postReading(reading) {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reading)
  });
}

async function fetchReadings() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderTable(data);
  renderChart(data);
}

function renderTable(data) {
  tableBody.innerHTML = "";
  data.slice(-10).reverse().forEach(d => {
    const row = document.createElement("tr");

    let alertClass = "alert-normal";
    if (d.alert.includes("High Temp")) alertClass = "alert-high-temp";
    else if (d.alert.includes("High Pressure")) alertClass = "alert-high-pressure";
    else if (d.alert.includes("Low Flow")) alertClass = "alert-low-flow";

    row.innerHTML = `
      <td>${d.time}</td>
      <td>${d.temp}</td>
      <td>${d.pressure}</td>
      <td>${d.flow}</td>
      <td class="${alertClass}">${d.alert}</td>
    `;
    tableBody.appendChild(row);
  });
}


function renderChart(data) {
  wellChart.data.labels = data.slice(-10).map(d => d.time);
  wellChart.data.datasets[0].data = data.slice(-10).map(d => d.temp);
  wellChart.data.datasets[1].data = data.slice(-10).map(d => d.pressure);
  wellChart.data.datasets[2].data = data.slice(-10).map(d => d.flow);
  wellChart.update();
}


setInterval(async () => {
  const newReading = generateReading();
  await postReading(newReading);
  fetchReadings();
}, 50000);


fetchReadings();
