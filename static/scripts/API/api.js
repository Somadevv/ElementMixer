let btn = document.getElementById("btn");
// getInventory()
const fetchData = () => {
  const getPlayerInfo = async () => {
    fetch("http://127.0.0.1:8000/users/2/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  return getPlayerInfo();
};

btn.addEventListener("click", fetchData());

(function() {
fetchData()
}())


