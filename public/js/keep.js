

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



// $(function () {
//   $(document).scroll(function () {
//       var $nav = $("#navBar");
//       $nav.toggleClass("scrolled", $(this).scrollTop() > 30);
//   });
// });

function myFunction() {
  alert("The form was submitted");
}

function myDelete() {
  alert("The note was deleted"); 
}






