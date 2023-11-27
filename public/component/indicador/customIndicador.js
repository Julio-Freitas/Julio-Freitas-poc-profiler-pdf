const customLabels = indicador.customLabels;

export const options = {
  responsive: true,
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    datalabels: {
      display: true,
      offset: 10,
      anchor: "start",
      align: "top",
      clamp: true,
      textAlign: "start",

      font: {
        size: 12,
        family: "Lexend",
        weight: 700,
      },
      color: "#4F0572",

      formatter: function (value, context) {
        const paddingLeft = 20;
        const labelText = customLabels[context.dataIndex];
        const paddedText =
          " ".repeat(paddingLeft + labelText.length) +
          labelText.padEnd(18, " ");
        return paddedText;
      },
    },
    legend: {
      display: false,
    },

    tooltip: {
      enabled: false,
    },
  },
  skipNull: true,
  scales: {
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
      ticks: {
        color: "#4F0572",
        font: {
          size: 14,
          family: "Lexend",
          weight: "bold",
        },
        crossAlign: "far",
      },
    },
    x: {
      display: false,
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
      offset: true,
    },
  },
};

/* eslint-disable */
export function formatProfilerDistributionData(data) {
  const labels = indicador.labels;

  const datasets = [
    {
      data: indicador.values,
      backgroundColor: "#4F0572",
      borderRadius: 5,
      borderSkipped: false,
      barThickness: 10,
      borderWidth: 0,
    },
  ];

  return { datasets, labels };
}
