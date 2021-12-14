const buttons = (() => {
  const modal = document.getElementById("myModal");
  const openModal = document.getElementById("myBtn");
  const close = document.querySelector(".closeButton");

  openModal.onclick = () => {
    modal.style.display = "block";
  };

  close.onclick = () => {
    modal.style.display = "none";
    console.log("asd");
  };

  // When the user clicks anywhere outside of the openModal, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    } 
  };
})();


