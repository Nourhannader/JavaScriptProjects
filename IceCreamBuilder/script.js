const scoops={
    scoop1:document.querySelector(".scoop1"),
    scoop2:document.querySelector(".scoop2"),
    scoop3:document.querySelector(".scoop3"),
};

const buttons={
    scoop1:document.getElementById("btn-scoop1"),
    scoop2:document.getElementById("btn-scoop2"),
    scoop3:document.getElementById("btn-scoop3"),
    topping1:document.getElementById("btn-topping1"),
    topping2:document.getElementById("btn-topping2")
};

const getRandomHex = () => {
    const hex = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    }

    return color;
};

buttons.scoop1.addEventListener("click",() => {
    scoops.scoop1.style.backgroundColor=getRandomHex();
});

buttons.scoop2.addEventListener("click",() => {
    scoops.scoop2.style.backgroundColor=getRandomHex();
});

buttons.scoop3.addEventListener("click",() => {
    scoops.scoop3.style.backgroundColor=getRandomHex();
});

buttons.topping1.addEventListener("click",() => {
    scoops.scoop1.style.backgroundImage=`
      radial-gradient(
        circle at 20px 12px,
        ${getRandomHex()} 25px,
        transparent 25px)
    `;
});

buttons.topping2.addEventListener("click",() => {
    scoops.scoop3.style.backgroundImage=`
      radial-gradient(
        circle at 20px 12px,
        ${getRandomHex()} 25px,
        transparent 25px)
    `;
});