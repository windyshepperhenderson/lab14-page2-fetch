// DOM Nodes by using CSS querySelector
let toyContainer = document.querySelector("section");

//HTML document ID
const image1 = document.getElementById("img1");
const image2 = document.getElementById("img2");
const image3 = document.getElementById("img3");

// make sure the user only has 25 clicks
let userVotes = 0;
const maxVotes = 25;

const allToys = [];

// a constructor that makes product objects
function Toy(name, views, clicks) {
  this.name = name;
  this.src = `./images/${name}.jpg`;
  this.views = views;
  this.clicks = clicks;
  // take the new object that is created, and put it into the array
  allToys.push(this);
}

// if there is nothing in localStorage for the products:
// instantiate my default products (0 views and clicks)
if (localStorage.getItem("allToys") === null) {
  /* there is nothing in localStorage */
  new Toy("bag", 0, 0),
    new Toy("banana", 0, 0),
    new Toy("bathroom", 0, 0),
    new Toy("boots", 0, 0),
    new Toy("breakfast", 0, 0),
    new Toy("bubblegum", 0, 0),
    new Toy("chair", 0, 0),
    new Toy("cthulhu", 0, 0),
    new Toy("dog-duck", 0, 0),
    new Toy("dragon", 0, 0),
    new Toy("pen", 0, 0),
    new Toy("pet-sweep", 0, 0),
    new Toy("scissors", 0, 0),
    new Toy("shark", 0, 0),
    new Toy("sweep", 0, 0),
    new Toy("tauntaun", 0, 0),
    new Toy("unicorn", 0, 0),
    new Toy("water-can", 0, 0),
    new Toy("wine-glass", 0, 0);
} else {
  //BUT if there IS soemthing in localStorage,
  //get that, and turn into my products
  const allToysLS = JSON.parse(localStorage.getItem("allToys"));
  // for each item in theallToysLS array, make a new Product
  for (let i = 0; i < allToysLS.length; i++) {
    // create a new product for each item in the array
    //(and the Product function automatically adds it to the producst array)
    new Toy(allToysLS[i].name, allToysLS[i].views, allToysLS[i].clicks);
  }
}

// function to choose a random toy
function getRandomIndex() {
  return Math.floor(Math.random() * allToys.length);
}

function renderToys() {
  // get 3 random indexes from our toy array
  let toy1Index = getRandomIndex();
  let toy2Index = getRandomIndex();
  let toy3Index = getRandomIndex();

  // prevent the 3 images being the same toy
  while (
    toy1Index === toy2Index ||
    toy1Index === toy3Index ||
    toy2Index === toy3Index
  ) {
    toy2Index = getRandomIndex();
    toy3Index = getRandomIndex();
  }

  // change the src and alt attributes of our img tags
  image1.src = allToys[toy1Index].src;
  image2.src = allToys[toy2Index].src;
  image3.src = allToys[toy3Index].src;
  image1.alt = allToys[toy1Index].name;
  image2.alt = allToys[toy2Index].name;
  image3.alt = allToys[toy3Index].name;

  // increase the toy views
  allToys[toy1Index].views++;
  allToys[toy2Index].views++;
  allToys[toy3Index].views++;
}

// handle what happens when the toy is being clicked
// the "clicks" property of the image I click to go up by one

function handleToyClick(event) {
  // check if the user has run out of clicks
  if (userVotes >= maxVotes) {
    //or - (userVotes === maxVotes)
    alert("See below for results.");
    renderChart();
    // take our array after we have updated the clicks and views and add to localStorage
    localStorage.setItem("allToys", JSON.stringify(allToys));
    return; // Exit the function if the user has reached the limit
  }

  // increase the number of times the user has clicked

  // get the name of the toy we just clicked
  let clickedToy = event.target.alt;

  // increase the clicks of the toy
  // loop through allToys
  for (let i = 0; i < allToys.length; i++) {
    // check if the name of the toy in the array, matches the alt tag of our image
    if (clickedToy === allToys[i].name) {
      // increase the number of clicks
      allToys[i].clicks++;
      // increment userVotes
      userVotes++;
      // stop the for loop because we found the goat

      break;
    }
  }

  renderToys();
}

// render the results
// when the user clicks the view results button
// render a ul full of lis that tell the user how many tiems each goat has been clicked

image1.addEventListener("click", handleToyClick);
image2.addEventListener("click", handleToyClick);
image3.addEventListener("click", handleToyClick);

// a button to view the results
// function showResults() {
//   // put a bunch of lis into a ul
//   const results = document.getElementById("results");

//   // loop through our products and make an li for each one
//   for (let i = 0; i < allToys.length; i++) {
//     const li = document.createElement("li");
//     const toy = allToys[i];
//     li.textContent = `${toy.name} was viewed ${toy.views} times, and clicked ${toy.clicks} times`;
//     results.appendChild(li);
//   }
// }

renderToys();

const labels = [];
const views = [];
const clicks = [];

// craete a function that make a chart
function renderChart() {
  // get where we are going to put the chart
  const ctx = document.getElementById("myChart"); // context of the chart
  for (let i = 0; i < allToys.length; i++) {
    labels.push(allToys[i].name);
    views.push(allToys[i].views);
    clicks.push(allToys[i].clicks);
  }

  // populate the arrays with data
  // TODO: ^

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
