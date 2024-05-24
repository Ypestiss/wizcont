// Animação do subtitle

document.addEventListener('DOMContentLoaded', function() {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  });

  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));
});

// Animação do título 

document.addEventListener("DOMContentLoaded", function() {
  const titleElement = document.getElementById("title");

  // Aguarde 1 segundo antes da animação iniciar
  setTimeout(function(){
    titleElement.classList.add("animate");
  }, 1000);
});

