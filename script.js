// --- Simulated geothermal data ---
function getRandomData() {
  const temp = (Math.random() * 200).toFixed(1); // 0–200 °C
  const pressure = (Math.random() * 2).toFixed(2); // 0–2 bar
  const flow = Math.floor(Math.random() * 100);   // 0–100 L/s

  let alert = "Normal";
  if (temp > 150) alert = "⚠️ High Temp!";
  else if (pressure > 1.5) alert = "⚠️ High Pressure!";
  else if (flow < 10) alert = "⚠️ Low Flow!";

  return {
    time: new Date().toLocaleTimeString(),
    temp,
    pressure,
    flow,
    alert
  };
}

// --- Render table row ---
function renderRow(data) {
  const row = document.createElement("tr");

  // Apply row background color
  if (data.alert.includes("High Temp")) row.classList.add("high-temp");
  else if (data.alert.includes("High Pressure")) row.classList.add("high-pressure");
  else if (data.alert.includes("Low Flow")) row.classList.add("low-flow");
  else row.classList.add("normal");

  // Pick alert text color
  let alertClass = "alert-normal";
  if (data.alert.includes("High Temp")) alertClass = "alert-high-temp";
  else if (data.alert.includes("High Pressure")) alertClass = "alert-high-pressure";
  else if (data.alert.includes("Low Flow")) alertClass = "alert-low-flow";

  row.innerHTML = `
    <td>${data.time}</td>
    <td>${data.temp}</td>
    <td>${data.pressure}</td>
    <td>${data.flow}</td>
    <td class="${alertClass}">${data.alert}</td>
  `;

  row.addEventListener("click", () => {
    document.getElementById("rowDetails").textContent =
      `At ${data.time}, Temperature: ${data.temp} °C, Pressure: ${data.pressure} bar, Flow: ${data.flow} L/s, Alert: ${data.alert}`;
  });

  return row;
}

// --- Update table + chart ---
function updateTableAndChart() {
  const data = getRandomData();
  const tableBody = document.getElementById("tableBody");

  const row = renderRow(data);
  tableBody.prepend(row);

  // Keep last 10 rows
  while (tableBody.rows.length > 10) {
    tableBody.deleteRow(-1);
  }

  // --- Update chart ---
  wellChart.data.labels.push(data.time);
  wellChart.data.datasets[0].data.push(data.temp);
  wellChart.data.datasets[1].data.push(data.pressure);
  wellChart.data.datasets[2].data.push(data.flow);

  // Keep chart to last 10 points
  if (wellChart.data.labels.length > 10) {
    wellChart.data.labels.shift();
    wellChart.data.datasets.forEach(ds => ds.data.shift());
  }

  wellChart.update();
}

// --- Chart.js setup ---
const ctx = document.getElementById("wellChart").getContext("2d");
const wellChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Temperature (°C)",
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.1)",
        data: [],
      },
      {
        label: "Pressure (bar)",
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.1)",
        data: [],
      },
      {
        label: "Flow (L/s)",
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.1)",
        data: [],
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Run every 5s
setInterval(updateTableAndChart, 5000);
updateTableAndChart();
