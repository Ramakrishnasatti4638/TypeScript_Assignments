"use strict";
const images = ["Images/tomato.jpg", "Images/beans.jpg", "Images/carrot.jpg", "Images/cucumber.jpg", "Images/eggplant.jpg"];
const names = ["Tomato", "Beans", "Carrot", "Cucumber", "EggPlant"];
let index = 0;
function moveRight() {
    let iamge = document.getElementById("image");
    let name = document.getElementById("name");
    for (let i = 0; i < images.length; i++) {
        if (iamge.src.endsWith(images[i])) {
            index = i;
            break;
        }
    }
    if ((index + 1) >= images.length) {
        index = -1;
    }
    iamge.src = images[index + 1];
    name.innerHTML = names[index + 1];
}
function moveLeft() {
    let iamge = document.getElementById("image");
    let name = document.getElementById("name");
    for (let i = 0; i < images.length; i++) {
        if (iamge.src.endsWith(images[i])) {
            index = i;
            break;
        }
    }
    if ((index) == 0) {
        index = images.length;
    }
    iamge.src = images[index - 1];
    name.innerHTML = names[index - 1];
}
