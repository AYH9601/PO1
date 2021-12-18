const btnCall = document.querySelector(".btnCall"); 
const menuMo = document.querySelector(".menuMo"); 
// const marking = document.querySelector("far");

btnCall.onclick = function(e){
    e.preventDefault(); 

    btnCall.classList.toggle("on");  
    menuMo.classList.toggle("on"); 
}

// marking.onclick = function(e){
//     e.preventDefault();

//     marking.classList.toggle("on");
// }