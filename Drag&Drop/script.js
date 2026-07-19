const dropArea=document.querySelector(".drag-area"),
 dragtext=dropArea.querySelector("header"),
button=dropArea.querySelector("button"),
input=dropArea.querySelector("input");
let file;

button.onclick=()=>{
    input.click();
}
input.addEventListener("change",(e)=>{
    file=e.target.files[0];
    dropArea.classList.add("active");
    showFile();
})

//if user Drag file Over DragArea
dropArea.addEventListener("dragover",(event) => {
    event.preventDefault();
    //console.log("file is over DragArea");
    dropArea.classList.add("active");
    dragtext.textContent="Release to Upload File";
});

//if user leave dragged file from DragArea
dropArea.addEventListener("dragleave",(event) => {
    event.preventDefault();
    //console.log("file is outside DragArea");
    dropArea.classList.remove("active");
    dragtext.textContent="Drag & Drop to Upload File";
})

//if user drop file on DragArea
dropArea.addEventListener("drop",(event) => {
    event.preventDefault();
    //console.log("file is dropped on DragArea");
     file=event.dataTransfer.files[0];
     showFile();
     console.log(file);
     
});
    
function showFile(){
    let fileType=file.type;
     let validExtensions=["image/jpeg","image/jpg","image/png"];
     if (validExtensions.includes(fileType)) {
        let fileReader=new FileReader();
        fileReader.onload=() => {
            let fileURL=fileReader.result;
            let imgTag=`<img src="${fileURL}">`;
             dropArea.innerHTML=imgTag
            }
            fileReader.readAsDataURL(file)
            
     }else{
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragtext.textContent="Drag & Drop to Upload File";
     }
}