export const mainProfileLabels = [
  "executor",
  "comunicador",
  "planejador",
  "analista",
];

export const profileColors = {
  executor: "#CA2037",
  comunicador: "#FFBA00",
  planejador: "#00A760",
  analista: "#2657ED",
};

export const mainProfileOptions = {
  layout: {
    autoPadding: false,
    padding: 0,
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    datalabels: {
      display: false,
    },
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
  responsive: true,
  indexAxis: "y",
  animation: false,
  scales: {
    x: {
      stacked: true,
      title: {
        display: false,
      },
      display: false,
    },
    y: {
      stacked: true,
      title: {
        display: false,
      },
      display: false,
    },
  },
};

export const formatMainProfileData = (data) => {
  if (Boolean(data) === false) return null;

  const [analista, comunicador, executor, planejador] = data;

  const mainProfileDatasets = {
    datasets: [
      {
        label: "executor",
        data: [executor.total],
        backgroundColor: profileColors.executor,
        borderColor: profileColors.executor,
        borderRadius: () => {
          return {
            bottomLeft: 30,
            topLeft: 30,
            bottomRight: 0,
            topRight: 0,
          };
        },
        borderWidth: 2,
        borderSkipped: false,
        barThickness: 15,
      },
      {
        label: "comunicador",
        data: [comunicador.total],
        backgroundColor: profileColors.comunicador,
        barThickness: 15,
      },
      {
        label: "planejador",
        data: [planejador.total],
        backgroundColor: profileColors.planejador,
        borderColor: "transparent",

        borderSkipped: false,
        barThickness: 15,
      },

      {
        label: "analista",
        data: [analista.total],
        backgroundColor: profileColors.analista,
        barThickness: 15,
        borderRadius: () => {
          return {
            bottomRight: 30,
            topRight: 30,
            bottomLeft: 0,
            topLeft: 0,
          };
        },
      },
    ],
    labels: [""],
  };

  return mainProfileDatasets;
};
