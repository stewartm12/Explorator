import "./styles/index.scss";
import Grid from "./scripts/grid"


document.addEventListener("DOMContentLoaded", function() {
  const grid = document.getElementById("grid")

  new Grid(grid)
  
})


