/*******************************/
/*    CREATING A SCATTERPLOT   */
/*******************************/

d3.csv("cities.csv", d3.autoType).then(cities => {
    let e = cities.filter(city => city.eu === true);
    d3.select(".city-count").text(`Number of Cities: ${e.length}`);
    ScatterPlot(e);
});

let ScatterPlot = (cities) => {
    //Instructions: Draw a circle for each city
    const width = 700;
    const height = 550;
    const svg = d3.select(".population-plot")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

svg.selectAll("circle")
    .data(cities)
    .enter()
    .append("circle")
    .attr("class", "scatter")
    .attr("cy", d => d.y)
    .attr("cx", d => d.x)
    .attr("r", d => (d.population <= 1000000 ? 4 : 8))
    //Instructions: Draw labels for top cities
svg.selectAll("text")
    .data(cities.filter((city) => city.population >= 1000000))
    .enter()
    .append("text")
    .attr("class", "cityname")
    .attr("text-anchor", "middle")
    .attr("dx", (d) => d.x)
    .attr("dy", (d) => d.y - 11)
    .text((d) => d.city);
};
  

/*******************************/
/*     CREATING A BARCHART     */
/*******************************/

d3.csv("buildings.csv", d3.autoType).then((data) => {
    //Sort by height according to m to get same result as Instruction
    let cities = data.sort((firstBuilding, secondBuilding) => secondBuilding.height_m - firstBuilding.height_m);
    BarChart(cities);
});

const whenClick = (d, i) => {
    const panel = document.querySelector(".detail-panel");
    let path = `./img/${i + 1}.jpg`;
    let inner =
    `<img src=${path}></img>` +
    `<div class="description"><h2>${d.building}</h2>
    <div class="row">
        <span class=category>Height</br></span>
        <span class=stat>${d.height_ft} ft</span>
    </div>
    <div class="row">
        <span class=category>City</br></span>
        <span class=stat>${d.city}</span>
    </div>
    <div class="row">
        <span class=category>Country</br></span>
        <span class=stat>${d.country}</span>
    </div>
    <div class="row">
        <span class=category>Floors</br></span>
        <span class=stat>${d.floors}</span>
    </div>
    <div class="row">
        <span class=category>Completed</br></span>
        <span class=stat>${d.completed}</span>
    </div>
    </div>`;
  panel.innerHTML = inner;
};

const BarChart = (cities) => {
    const width = 550;
    const height = 500;
    const svg = d3.select(".city-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

//Instructions: Draw rectangles
svg.selectAll("rect")
    .data(cities)
    .enter()
    .append("rect")
    .attr("class","bar")
    .attr("width", (d) => d.height_px)
    .attr("height", 35)
    .attr("x", 235)
    .attr("y", (d, i) => 45 * i)
    .on("click", (event, d) => {
        whenClick(d, cities.indexOf(d)); });

//Instructions: Draw labels using building names and heights
svg.selectAll("names")
    .data(cities)
    .enter()
    .append("text")
    .attr("text-anchor", "center")
    .attr("dy", (d, i) => i * 45 + 25)
    .attr("dx", 0)
    .text(d => d.building);
svg.selectAll("heights")
    .data(cities)
    .enter()
    .append("text")
    .attr("class", "height")
    .attr("text-anchor", "end")
    .attr("dx", (d) => d.height_px + 225)
    .attr("dy", (d, i) => i * 45 + 25)
    .text(d => d.height_ft + " ft")
};