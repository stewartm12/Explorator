import "./styles/index.scss";
import Board from "./scripts/board"


document.addEventListener("DOMContentLoaded", function() {
  const el = document.getElementById("grid");
  const info = document.getElementById
  const board = el => new Board(el);
  board(el);


});


