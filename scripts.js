let pos=document.documentElement;
  
pos.addEventListener("mousemove",(event)=>{
  pos.style.setProperty("--x",event.clientX+"px");
  pos.style.setProperty("--y",event.clientY+"px");
})


const allImages = document.getElementsByTagName("img");

for (let i=0; i<allImages.length;i++) {

    allImages[i].style.transition="opacity 0.5s";

    allImages[i].addEventListener("mouseover",()=>{
        for (let j=0;j<allImages.length;j++){
            allImages[j].style.opacity="0.4";
        }
});


    allImages[i].addEventListener("mouseout", () => {
        for (let j=0;j<allImages.length;j++){
            allImages[j].style.opacity="1";
        }
    });
}
