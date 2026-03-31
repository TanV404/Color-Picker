let colorArr=["#060404","#241818","#432C2C","#633F3F","#835252"];   

const colorPicker=document.getElementById("color-picker");
const mode=document.getElementById("mode");
const getColor=document.getElementById("get-color");

renderColors(colorArr);

getColor.addEventListener("click",(e)=>{
    e.preventDefault(); 
    const color=String(colorPicker.value.slice(1,7).toUpperCase()); 
    const themeValue=mode.value; 
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${themeValue}&count=5`,
        {
            "Content-Type": "application/json",
        }
    ) 
    .then(res=>res.json()) 
    .then(data=>{ 
        colorArr=[]; 
        data.colors.forEach((item)=>{ colorArr.push(item.hex.value); 
        }) 
        renderColors(colorArr); 
    }) 
})

function renderColors(colors){
    const colorDisplay=document.getElementById("color-scheme-display");
    let template="";
    
    for (let color of colors){
        template+=`<div class="color-id-wrapper">
        <div id="color-bg" style="background-color:${color}"></div>
        <p id="color-id">${color}</p>
    </div>`
    }
    colorDisplay.innerHTML=template;
}

function copyToClipboard(color){
    navigator.clipboard.writeText(color) 
    .then(()=>{ 
        alert(`Color code ${color} copied to clipboard!`);
     }) 
    .catch(err=>{ 
        console.error("Failed to copy color code: ",err); 
    }) 
} 

document.getElementById("color-scheme-display").addEventListener("click",(e)=>{
    if(e.target.id==="color-id"){
        const colorCode=e.target.textContent;
        copyToClipboard(colorCode);
    }
})