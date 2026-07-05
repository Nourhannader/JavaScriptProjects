
const btn=document.getElementById('btn');
const rgbValue=document.querySelector('.rgbValue');
const hexValue=document.querySelector('.hexValue');
const DEFAULT_COLOR= {r:241,g:245,b:24};


btn.addEventListener('click',()=>{
    newColor();
    render();
});
const newColor=()=>{
    const color=getRandomColorRGB();
    saveColor(color);
    return color;
}

function render(){
    const color=getColor() || newColor();
    const colorHex=rgbToHex(color.r,color.g,color.b);
    document.body.style.backgroundColor=color;
    rgbValue.innerHTML=`rgb(${color.r},${color.g},${color.b})`;
    hexValue.innerHTML=colorHex;
};
render();

function getRandomColorRGB(){
   const r=Math.floor(Math.random() * 256);
   const g=Math.floor(Math.random() * 256);
   const b=Math.floor(Math.random() * 256);
   return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(r, g, b) {
    return (
        "#"+[r,g,b].map(x=> x.toString(16).padStart(2,'0'))
        .join("")
        .toUpperCase()
    );
}



const saveColor= (color)=> localStorage.setItem("color",JSON.stringify(color));

const getColor = ()=> {return JSON.parse(localStorage.getItem("color")) || DEFAULT_COLOR };

