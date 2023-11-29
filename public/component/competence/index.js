import "./indicador/index.js";
import { radarBackground } from "./background.js";

const data = {
  labels: competence.labels,
  datasets: [
    {
      data: competence.guidelines,
      fill: true,
      backgroundColor: "rgba(94, 0, 90, 0.3)",
      borderColor: "#6B3077",
      tension: 0,
    },
  ],
};

const options = {
  aspectRatio: 2,
  scales: {
    r: {
      grid: {
        circular: true,
        color: "#fff",
        lineWidth: 2,
      },
      angleLines: {
        color: "#fff",
        lineWidth: 2,
      },
      ticks: {
        display: false,
        stepSize: 25,
      },
      pointLabels: {
        color: "#601E82",
        font: {
          size: 12,
          style: "normal",
          weight: "bold",
        },
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      borderWidth: 3,
    },
  },
};

const config = {
  type: "radar",
  data,
  options,
  plugins: [radarBackground],
};
const ctx = document.getElementById("competencies");
new Chart(ctx, config);
