
function pressKey (event) {
    var key = event.key;
    console.log(typeof key);
}

window.addEventListener('keypress', pressKey);


