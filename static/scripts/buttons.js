const fetchData = () => {
    let coins = document.getElementById("coins");
    let username = document.getElementById("username");
    let btn = document.getElementById("btn");
  
  
    const getPlayerInfo = async () => {
      fetch("http://127.0.0.1:8000/players/")
        .then((response) => response.json())
        .then((data) => {
          coins.innerHTML = data[0].coins;
          username.innerHTML = data[0].username;
        });
    };
  
    return getPlayerInfo();
  };
  
  if(btn){
    btn.addEventListener("click", () => {
      console.log('Fetching data...', data)
    });
  } else {
    console.log(btn, 'Not found')
  }
  
  
  for (i = 0; i < 12; i++) {
    document.createElement()
    let inventoryItem = `<img src="/static/images/inventory_slot.png" alt="inventory item">`;
  }
  
  
  
  