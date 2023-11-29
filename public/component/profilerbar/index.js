import { mainProfileOptions, formatMainProfileData } from "./custom.js";
import { htmlLegendPlugin } from "./plugin.js";

const ctx = document.getElementById("profilerbar");

const formattedData = formatMainProfileData(graphDataProfiler?.profiles);

const config = {
  type: "bar",
  data: formattedData,
  options: mainProfileOptions,
  plugins: [htmlLegendPlugin(graphDataProfiler)],
};

new Chart(ctx, config);
