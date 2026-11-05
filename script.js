fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
    });

function toggleMenu() {

    const menu = document.getElementById("menu");
    const button = document.querySelector(".menu-toggle");

    menu.classList.toggle("show");
    button.classList.toggle("active");
}

document.addEventListener("click", function(event){

    const menu = document.getElementById("menu");
    const button = document.querySelector(".menu-toggle");

    if(
        !menu.contains(event.target) &&
        !button.contains(event.target)
    ){
        menu.classList.remove("show");
        button.classList.remove("active");
    }

});



