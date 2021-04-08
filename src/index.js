import "./styles/index.scss";
import Board from "./scripts/board"


document.addEventListener("DOMContentLoaded", function() {
  const el = document.getElementById("grid")

  new Board(el)
  
})


