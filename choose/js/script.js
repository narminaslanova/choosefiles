let upload = document.getElementById("upload");
let table = document.getElementById("table");
let tbody = document.getElementById('tbody');
let removeAll = document.getElementById("removeAll");
let dropArea = document.querySelector(".drop-Area");
removeAll.classList.add("d-none");
let closeIcon = [];
let iconArr = [];

upload.onclick = function () {
    this.nextElementSibling.click();
}

upload.nextElementSibling.onchange = function (ev) {
    UploadFiles(ev.target.files)  
}

function getIcons (array, icon){
    array.push(icon)
    return array;
}

dropArea.ondragover=function(ev){
    ev.preventDefault();
}
dropArea.ondrop=function(event){
    event.preventDefault();
  UploadFiles(event.dataTransfer.files)
  
}

function UploadFiles(files){
    for (const file of files) {
        let reader = new FileReader();
        reader.onloadend = function (ev) {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td><img src="${ev.target.result}" height="200"></td><td>${file.name}</td><td>${file.type}</td><td>${file.size}</td>`
            let td = document.createElement('td');
            td.innerHTML = `<i class="icons fas fa-times-circle" style="line-height: 10">`;
            tr.append(td);
            tbody.append(tr);
            closeIcon.push(document.querySelectorAll('.icons'));
            getIcons(iconArr, closeIcon[closeIcon.length-1][closeIcon.length-1])
            iconArr.forEach(item=>{
               item.addEventListener('click', function(ev){
                 ev.target.parentNode.parentNode.remove();
                 if(tbody.children.length == 0){
                    table.classList.add("d-none")
                    removeAll.classList.add("d-none");
                 }
                })  
           })
           table.classList.remove("d-none");

        }  
        reader.readAsDataURL(file);
        table.classList.remove("d-none");
        removeAll.classList.remove("d-none");
    }    
}
removeAll.onclick = function () {
    table.lastElementChild.innerHTML = "";
    upload.nextElementSibling.value = "";
    table.classList.add("d-none");
    removeAll.classList.add("d-none");

}
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

balls.forEach((el, i, ra) => {
    let to = {
      x: Math.random() * (i % 2 === 0 ? -11 : 11),
      y: Math.random() * 12
    };
  
    let anim = el.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` }
      ],
      {
        duration: (Math.random() + 1) * 2000, // random duration
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out"
      }
    );
  });
