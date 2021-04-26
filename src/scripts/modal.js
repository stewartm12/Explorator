import Board from "./board"

export const toggleModal = () => {
  const isVisible = "is-visible";
  const openEls = document.querySelectorAll("[data-open]");
  const closeEls = document.querySelectorAll("[data-close]");

  for (const el of openEls) {
    el.addEventListener("click", function () {
      const modalId = this.dataset.open;
      
      document.getElementById(modalId).classList.add(isVisible);
    });
  }

 
  for (const el of closeEls) {
    el.addEventListener("click", function() {
      Board.prototype.enableButton();
      this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
  }

  document.addEventListener("keyup", e => {
    Board.prototype.enableButton();
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
  });
}

