// Canvas

const canvas = document.getElementById("graph-response-time-per-user-number");

const labels = [10, 50, 100, 150, 200, 250, 270, 300, 500, 1000];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Login (POST /auth/login)",
      data: [77, 75, 76, 75, 73, 75, 393, 1558, 8571, 25858],
      borderWidth: 1,
      borderColor: "blue",
      backgroundColor: "blue",
      pointStyle: (ctx) => (ctx.parsed.y < 500 ? "circle" : "crossRot"),
    },
    {
      label: "Post tweet (POST /tweets)",
      data: [3, 3, 3, 3, 3, 34, 440, 2493, 13150, 33341],
      borderWidth: 1,
      borderColor: "green",
      backgroundColor: "green",
      pointStyle: (ctx) => (ctx.parsed.y < 500 ? "circle" : "crossRot"),
    },
    {
      label: "Read tweets (GET /tweets?page=1)",
      data: [5, 5, 5, 5, 5, 35, 410, 1972, 4517, 5947],
      borderWidth: 1,
      borderColor: "purple",
      backgroundColor: "purple",
      pointStyle: (ctx) => (ctx.parsed.y < 500 ? "circle" : "crossRot"),
    },
    {
      label: "Baseline (500ms)",
      data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
      borderWidth: 1,
      pointStyle: false,
      borderColor: "red",
      borderWidth: 2,
      borderDash: [5, 5],
    },
  ],
};

new Chart(canvas, {
  type: "line",
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "Average response time vs Number of simultaneous users",
      },
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          title: () => "",
          beforeLabel: (context) => `${context.label} users`,
          label: (context) => `Avg response time : ${context.parsed.y} ms`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Number of users",
        },
        beginAtZero: true,
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Average response time (ms)",
        },
        beginAtZero: true,
        type: "logarithmic",
      },
    },
  },
});
