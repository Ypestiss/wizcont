document.addEventListener('DOMContentLoaded', function() {

  // Seleciona a imagem
  const userImage = document.getElementById('user');

  // Armazena as fontes das imagens
  const imageSources = [
    './icons/icon.svg',
    './icons/alticon.svg'
  ];

  // Adiciona um evento de mouseover para trocar a fonte da imagem
  userImage.addEventListener('mouseover', function() {
    userImage.src = imageSources[1]; // Troca para a imagem colorida
  });

  // Adiciona um evento de mouseout para retornar à fonte original da imagem
  userImage.addEventListener('mouseout', function() {
    userImage.src = imageSources[0]; // Troca para a imagem branca
  });

});

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

