import { mainProfileLabels, profileColors } from "./custom.js";

export const htmlLegendPlugin = (data) => {
  return {
    id: "htmlLegend",
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;

      const badgeWidth = 50;
      const badgeHeight = 25;
      const labelTop = 45;
      const columns = chartArea.width / 4;

      const titleSize = 32;
      const titleColor = "#4F0572";

      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      ctx.beginPath();
      ctx.font = `bold ${titleSize}px Lexend`;
      ctx.fillStyle = titleColor;

      ctx.fillText(
        data.mainProfile,
        chartArea.width / 2,
        chartArea.height / 3 - titleSize / 2
      );

      ctx.closePath();

      mainProfileLabels.forEach((profile, index) => {
        const [datasetMeta] = chart.getDatasetMeta(index).data;
        ctx.beginPath();
        ctx.fillStyle = profileColors[profile];

        const centerElement = columns * (index + 1) - columns / 2;

        ctx.roundRect(
          centerElement - badgeWidth / 2,
          datasetMeta.y + labelTop,
          badgeWidth,
          badgeHeight,
          10
        );
        ctx.fill();

        ctx.fillStyle = "#fff";
        ctx.font = "12px Lexend";

        const dados = data?.profiles.find((el) => el.label === profile);

        ctx.fillText(
          `${dados.total}%`,
          centerElement - badgeWidth / 2 + 25,
          datasetMeta.y + labelTop + 13
        );

        ctx.fillStyle = profileColors[profile];
        ctx.font = "bold 14px Lexend";
        ctx.fillText(
          profile.toUpperCase(),
          centerElement,
          datasetMeta.y + labelTop + 40
        );

        ctx.fillStyle = "#616161";
        ctx.font = "14px Lexend";
        ctx.fillText(
          dados.level.toLocaleUpperCase(),
          centerElement,
          datasetMeta.y + labelTop + 60
        );
        ctx.closePath();
      });
    },
  };
};
