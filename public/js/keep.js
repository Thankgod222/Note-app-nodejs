function myFunction(x) {
  x.classList.toggle("change");
}

// LINK ACTIVE WORK

const linkWork = document.querySelectorAll(".one");

function activeWork() {
  linkWork.forEach(l => l.classList.remove("active-work"));
  this.classList.add("active-work");
}
linkWork.forEach(l => l.addEventListener("click", activeWork));



function myFunction() {
  alert("The form was submitted");
}


  document.getElementById("bar1").style.display = "block"
  document.getElementById("bar2").style.display = "none"

function changeBar() {
  document.getElementById("bar1").style.display = "none"
  document.getElementById("bar2").style.display = "block"
}

function closedBar() {
  window.document.getElementById("bar1").style.display = "block"
  window.document.getElementById("bar2").style.display = "none"
}

function auto_height(elem) {  /* javascript */
    elem.style.height = "1px";
    elem.style.height = (elem.scrollHeight)+"px";
}


