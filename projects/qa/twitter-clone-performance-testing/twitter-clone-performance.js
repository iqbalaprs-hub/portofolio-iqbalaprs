// -----------------------------      CANVAS related to "graph-response-time-per-user-number" in scenario implementation
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

// --------------    CANVAS related to "graph-response-time-300-users-20s-rampup"    --------------------
const responseTime300usersrampup20s_canvas = document.getElementById(
  "graph-response-time-300-users-20s-rampup"
);

const responseTime300usersrampup20s_data = {
  labels: [
    "t+1",
    "t+2",
    "t+3",
    "t+4",
    "t+5",
    "t+6",
    "t+7",
    "t+8",
    "t+9",
    "t+10",
    "t+11",
    "t+12",
    "t+13",
    "t+14",
    "t+15",
    "t+16",
    "t+17",
    "t+18",
    "t+19",
    "t+20",
    "t+21",
    "t+22",
    "t+23",
  ],
  datasets: [
    {
      label: "POST /auth/login",
      data: [
        133, 291, 494, 652, 775, 908, 1119, 1233, 1418, 1568, 1647, 1726, 1797,
        1991, 2131, 2255, 2404, 2484, 2625, 2739, 2765,
      ],
      borderWidth: 1,
      borderColor: "blue",
      backgroundColor: "blue",
    },
    {
      label: "POST /tweets",
      data: [
        1471, 344, 608, 723, 1181, 1374, 1735, 1850, 2360, 2536, 2801, 3118,
        3391, 3804, 4042, 4218, 4456, 4482, 4535, 3575, 2607, 1753, 837,
      ],
      borderWidth: 1,
      borderColor: "green",
      backgroundColor: "green",
    },
    {
      label: "GET /tweets?page=1",
      data: [
        142, 370, 547, 740, 1057, 1348, 1612, 2008, 2290, 2501, 2695, 3047,
        3320, 3461, 3945, 3989, 4386, 4597, 4491, 3655, 2677, 1753, 714,
      ],
      borderWidth: 1,
      borderColor: "purple",
      backgroundColor: "purple",
    },
  ],
};

new Chart(responseTime300usersrampup20s_canvas, {
  type: "line",
  data: responseTime300usersrampup20s_data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "Response time of 3 requests with load : 300 users & 20s ramp-up",
      },
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          title: () => "",
          beforeLabel: (context) => `${context.label} s`,
          label: (context) => `Avg response time : ${context.parsed.y} ms`,
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time (s)",
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
      },
    },
  },
});

// Refresh page when resized
// Add an event listener to the window resize event
window.addEventListener("resize", function () {
  // Reload the page when the screen size changes
  location.reload();
});
