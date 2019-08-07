<template>
  <pie-chart :data="chartData" :options="options"></pie-chart>
</template>

<script>
import PieChart from './PieChart';

export default {
  name: 'TablePieChart',
  components: {
    PieChart,
  },
  props: {
    datasets: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
          callbacks: {
            label(tooltipItem) {
              return tooltipItem.index + 1;
            },
          },
          custom: (() => {
            const self = this;
            return function name(tooltipModel) {
              let tooltipEl = document.getElementById('chartjs-tooltip');

              const datasetIndex = (((tooltipModel.body || []).pop() || {}).lines || []).pop();

              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = '<table></table>';
                document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              // Set Text
              if (tooltipModel.body) {
                const tableRoot = tooltipEl.querySelector('table');
                const t = self.datasets.tooltip[datasetIndex - 1].data.reduce(
                  (span, label) =>
                    `${span}<div>${label.label}<span class="tooltip-value">${
                      label.value
                    }</span></div>`,
                  ''
                );
                tableRoot.innerHTML = `<div class="tooltip"><div class="tooltip-header">${
                  self.datasets.tooltip[datasetIndex - 1].title
                }</div><div class="tooltip-body">${t}</div></div>`;
              }

              // `this` will be the overall tooltip
              const position = this._chart.canvas.getBoundingClientRect();

              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.left = `${position.left +
                window.pageXOffset +
                tooltipModel.caretX}px`;
              tooltipEl.style.top = `${position.top + window.pageYOffset + tooltipModel.caretY}px`;
              tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
              tooltipEl.style.fontSize = `${tooltipModel.bodyFontSize}px`;
              tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
              tooltipEl.style.padding = `${tooltipModel.yPadding}px ${tooltipModel.xPadding}px`;
              tooltipEl.style.pointerEvents = 'none';
            };
          })(),
        },
      },
    };
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            backgroundColor: this.datasets.backgroundColor,
            data: this.datasets.data,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss">
#chartjs-tooltip {
  .tooltip {
    min-width: 132px;
    padding: 8px;
    background: #ffffff;
    color: #5f5f5f;
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
    line-height: 20px;
  }

  .tooltip-header {
    font-weight: bold;
  }

  .tooltip-body {
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .tooltip-value {
      color: #ff941b;
    }
  }
}
</style>
