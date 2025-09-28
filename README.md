 Web-Based Well Monitoring Dashboard

This project is a real-time geothermal well monitoring system built with HTML, CSS, JavaScript, and Chart.js.
It simulates sensor readings (Temperature, Pressure, Flow) and displays them in both a data tableand a live chart.

---

Features

Interactive Chart** – Real-time visualization using Chart.js
* Data Table – Displays the latest 10 readings with alert highlights
* Live Simulation – Automatically generates new readings at set intervals
*  Styled UI– Responsive design with color-coded alerts
* Backend Integration  – Works with a JSON server at `http://localhost:3000/readings`

---

Project Structure


project-root
│── index.html       # Main HTML file
│── styles.css       # CSS styling
│── script.js        # JavaScript logic
│── README.md        # Project documentation
```

---

Setup & Installation

1. Clone the Repository

```bash
git clone https://github.com/your-username/Web-Based-Well-Monitoring.git
cd Web-Based-Well-Monitoring
```

Install JSON Server (Optional, for backend storage)

```bash
npm install -g json-server
```

3. Create a `db.json` file

```json
{
  "readings": []
}
```

4. Run the Server

```bash
json-server --watch db.json --port 3000
```

5. Open the Dashboard

Just open `index.html` in your browser.

---

How It Works

1. `script.js` generates random well readings every few seconds.
2. Data is sent to the backend (JSON Server) using fetch POST requests.
3. The frontend fetches the latest readings and:

   * Updates the data table with alert color-coding.
   * Updates the line chart with the last 10 readings.

---
 Example Alerts

* High Temp! – Temperature > 150 °C
* High Pressure! – Pressure > 1.5 bar
* Low Flow! – Flow < 20 L/s
* Normal – Within safe range

---

Technologies Used

* HTML5 – Structure
* CSS3 – Styling
* avaScript (ES6) – Logic & Simulation
* chart.js – Chart visualization
* JSON Server – Backend storage

---

Future Improvements

* Add user authentication for engineers
* Export readings as CSV/Excel
* Integrate with real IoT sensors instead of simulated data
* Add notification system (SMS/Email alerts)

---

Author

Developed by Simon Njoroge – 2025
