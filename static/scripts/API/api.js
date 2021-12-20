let slap = document.getElementById('slap')
const fetchData = () => {
  const getPlayerInfo = async () => {
    fetch("http://127.0.0.1:8000/api")
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return getPlayerInfo();
};

// slap.addEventListener("click", console.log('clicked'));
fetchData()


