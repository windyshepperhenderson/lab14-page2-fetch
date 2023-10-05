// we need to get our create chart function running on the chart page, which we have taken
// from our home page
function renderChart() {
  //GET our products from the LOCAL storage in the browser

  const allToys = JSON.parse(localStorage.getItem("allToys"));

  const ctx = document.getElementById("myChart"); // context of the chart

  const labels = [];
  const views = [];
  const clicks = [];

  // NOW we loop through my allToys array and add in the label, views and clicks data to my arrays
  for (let i = 0; i < allToys.length; i++) {
    labels.push(allToys[i].name);
    views.push(allToys[i].views);
    clicks.push(allToys[i].clicks);
  }

  // run the Chart function (that does the chart making)
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "# of views",
          data: views,
          borderWidth: 1,
        },
        {
          label: "# of clicks",
          data: clicks,
          borderWidth: 1,
        },
      ],
    },
  });
}

renderChart();
