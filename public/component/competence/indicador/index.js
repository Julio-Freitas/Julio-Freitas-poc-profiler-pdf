import { formatProfilerDistributionData, options } from "./customIndicador.js";

const graphData = [];
const formattedChartData = formatProfilerDistributionData(graphData);

const ctx = document.getElementById("competencies-indicadors");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: formattedChartData.labels,
    datasets: formattedChartData.datasets,
  },
  options: {
    ...options,
  },
});
