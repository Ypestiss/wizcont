// Pré-carregamento da imagem
const preloadedImage = new Image();
preloadedImage.src = "./icons/icon.svg";
preloadedImage.onload = function() {
  // Imagem carregada, agora atribua-a ao elemento 'user'
  const userImage = document.getElementById('user');
  userImage.src = preloadedImage.src;
};


document.addEventListener('DOMContentLoaded', function() {

  // Seleciona a imagem
  const userImage = document.getElementById('user');

  // Armazena as fontes das imagens
  const imageSources = [
    "./icons/icon.svg",
    "./icons/alticon.svg"
  ];

  // Adiciona um evento de mouseover para trocar a fonte da imagem
  userImage.addEventListener('mouseover', function() {
    userImage.src = imageSources[1]; // Troca para a imagem colorida
    console.log(userImage.src);
  });

  // Adiciona um evento de mouseout para retornar à fonte original da imagem
  userImage.addEventListener('mouseout', function() {
    userImage.src = imageSources[0]; // Troca para a imagem branca
    console.log(userImage.src);
  });

});

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Simulando lógica de login (aqui você validaria os dados com um backend)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificação simples de usuário e senha (simulação)
    if (username === 'usuario' && password === 'senha') {
      // Se as credenciais estiverem corretas, redirecione para a página principal
      window.location.href = 'pagina_principal.html';
    } else {
      // Se as credenciais estiverem incorretas, exiba uma mensagem de erro
      loginMessage.textContent = 'Nome de usuário ou senha incorretos. Tente novamente.';
    }
  });
});
