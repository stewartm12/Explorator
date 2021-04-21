import "./styles/index.scss";
import Board from "./scripts/board";
import {toggleModal} from "./scripts/modal";


document.addEventListener("DOMContentLoaded", function() {
  const el = document.getElementById("grid");
  const board = el => new Board(el);
  board(el);
  toggleModal();
});


