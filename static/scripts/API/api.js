let slap = document.getElementById('slap')
const fetchData = () => {
  const getPlayerInfo = async () => {
    fetch("http://127.0.0.1:8000/api/update-inventory/1", {method: 'POST', body: response.json(), headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },})
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return getPlayerInfo();
};

// slap.addEventListener("click", console.log('clicked'));
fetchData()


