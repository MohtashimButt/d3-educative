// Sample data (nodes and links)
var nodes = [
  { id: "A", group: 1 },
  { id: "B", group: 1 },
  { id: "C", group: 2 },
  { id: "D", group: 2 },
  { id: "E", group: 3 },
  { id: "F", group: 3 },
  { id: "G", group: 4 },
  { id: "H", group: 4 },
];

var links = [
  { source: "A", target: "B", value: 1 },
  { source: "B", target: "C", value: 2 },
  { source: "C", target: "D", value: 3 },
  { source: "D", target: "E", value: 4 },
  { source: "E", target: "F", value: 2 },
  { source: "F", target: "G", value: 3 },
  { source: "G", target: "H", value: 1 },
  { source: "H", target: "A", value: 2 },
];

// Define the dimensions of the SVG container
var width = 600;
var height = 400;

// Define color scale for node groups
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Create the SVG container
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Create a D3 force simulation
var simulation = d3
  .forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody().strength(-200))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(20));

// Create SVG elements for links
var link = svg
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("stroke", "gray")
  .style("stroke-width", d => d.value);

// Create SVG elements for nodes
var node = svg
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("r", 15)
  .attr("fill", d => color(d.group));

// Create labels for nodes
var labels = svg
  .selectAll("text")
  .data(nodes)
  .enter()
  .append("text")
  .text(d => d.id)
  .attr("font-size", 12)
  .attr("dx", 20)
  .attr("dy", 5);

// Update node and link positions in each tick of the simulation
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node.attr("cx", d => d.x).attr("cy", d => d.y);

  labels.attr("x", d => d.x).attr("y", d => d.y);
});

