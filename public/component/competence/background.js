/* eslint-disable */

// Extending a couple of loosely defined Chart.js types to include required data
// that is available within the Chart instance.

// Cannot draw a filled polygon that has less than 3 sides
const MINIMUM_POINTS = 3;

const radarBackground = {
  id: "competencies",

  beforeDraw({ boxes, ctx, scales }) {
    const scaleOptions = scales.r;
    const { xCenter, yCenter, drawingArea: radius, options } = scaleOptions;

    if (options?.grid?.circular) {
      ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
    } else {
      const numPoints = boxes[1]._pointLabels?.length;
      if (!numPoints || numPoints < MINIMUM_POINTS) {
        return;
      }

      const pointAngle = 360 / numPoints;
      const drawPoints = [];
      for (let i = 0; i <= numPoints; i++) {
        // Calculate the angle (in radians) of the radius line to the x-axis.
        const radians = ((numPoints - i) * pointAngle + 90) * (Math.PI / 180);
        drawPoints.push({
          x: xCenter + radius * Math.cos(radians),
          y: yCenter + radius * Math.sin(radians) * -1,
        });
      }

      // Move to the starting point
      const { x, y } = drawPoints.pop();
      ctx.moveTo(x, y);
      ctx.beginPath();

      // Then connect all the remaining points
      drawPoints.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.closePath();
    }

    const colors = [
      "rgba(204, 227, 218, 1)",
      "rgba(192, 220, 237, 1)",
      "rgba(255, 214, 219, 1)",
      "rgba(255, 247, 205, 1)",
    ];
    const numColors = colors.length;
    const sectionAngle = 360 / numColors;

    for (let i = 0; i < numColors; i++) {
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(xCenter, yCenter);
      ctx.arc(
        xCenter,
        yCenter,
        radius,
        i * sectionAngle * (Math.PI / 180),
        (i + 1) * sectionAngle * (Math.PI / 180)
      );
      ctx.closePath();
    }

    ctx.restore();
  },
};

export { radarBackground };
