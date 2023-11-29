import { formatProfilerDistributionData, options } from "./customIndicador.js";

const graphData = [];
const formattedChartData = formatProfilerDistributionData(graphData);

const ctx = document.getElementById("indicadors");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: formattedChartData.labels,
    datasets: formattedChartData.datasets,
  },
  options,
});
