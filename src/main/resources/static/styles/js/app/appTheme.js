// ------------------------------------Alterar tema------------------------------------//
document.addEventListener('DOMContentLoaded', function() {
    const darklightSwitch = document.getElementById('darklight');
    const body = document.body;
    const configContent = document.getElementById('configuracao');
    const sair = document.getElementById('sair');
    const conteudo = document.getElementById('conteudo');
    const estoque = document.getElementById('estoque');
    const titleestoque = document.getElementById('titleestoque');
    const perfil = document.getElementById('perfil');
    const estoqueLimp = document.getElementById('estoque-limp');
    const titleLimp = document.getElementById('titleLimp');
    const sidebar = document.getElementById('sidebar');
    const profile = document.getElementById('profile');
    const navtext = document.querySelectorAll('.nav-text');
    const inputcard = document.querySelectorAll('.input-card');
    const profiletext = document.getElementById('profile-text');
    const card = document.querySelectorAll('.card');
    // Recuperar o estado do modo do armazenamento local ao carregar a página
    const isDarkModeSaved = localStorage.getItem('darkMode');
  
    // Função para aplicar estilos com base no modo escuro/claro
    function applyStyles(isDarkMode) {
      const backgroundColor = isDarkMode ? '#e2e4e8' : '#161a1d';
      const textColor = isDarkMode ? 'rgb(65 65 65)' : '#fff';
      const contBGColor = isDarkMode ? 'whitesmoke' : 'rgb(33, 37, 41)';
      const profileBGColor = isDarkMode ? '#ced2d9' : '#343a40';
      
      body.style.backgroundColor = backgroundColor;
      body.style.color = textColor;
      conteudo.style.backgroundColor = contBGColor;
      configContent.style.backgroundColor = backgroundColor;
      configContent.style.color = textColor;
      perfil.style.backgroundColor = backgroundColor;
      perfil.style.color = textColor;
      estoque.style.backgroundColor = backgroundColor;
      estoque.style.color = textColor;
      titleestoque.style.color = textColor;
      sidebar.style.backgroundColor =  backgroundColor;
      profile.style.backgroundColor = profileBGColor;
      profiletext.style.color = textColor;
      navtext.forEach(element => {
        element.style.color = textColor;
      });
      inputcard.forEach(element => {
        element.style.color = textColor;
      });
      card

  
      estoqueLimp.style.backgroundColor = backgroundColor;
      estoqueLimp.style.color = textColor;
      titleLimp.style.color = textColor;
  
      const subtitleestoque = document.querySelectorAll('.subtitleestoque');
      subtitleestoque.forEach(function(element) {
        element.style.color = textColor;
      });
  
      const subtitleLimp = document.querySelectorAll('.subtitleLimp');
      subtitleLimp.forEach(function(element) {
        element.style.color = textColor;
      });
  
      const opcoesPerfil = document.querySelectorAll('#opcoesPerfil a');
      opcoesPerfil.forEach(function(element) {
        element.style.color = isDarkMode ? '#000' : '#fff';
      });
  
      const categories = document.querySelectorAll('.category h2');
      categories.forEach(function(category) {
        category.style.color = isDarkMode ? '#000' : '#fff';
      });
  
      sair.style.color = textColor;
    }
  
    // Se existir um estado salvo, aplicar os estilos correspondentes
    if (isDarkModeSaved === 'true') {
      darklightSwitch.checked = true;
      applyStyles(true);
    } else {
      darklightSwitch.checked = false;
      applyStyles(false);
    }
  
    // Mudar o modo e salvar o estado no armazenamento local ao alterar o switch
    darklightSwitch.addEventListener('change', function() {
      const isDarkMode = this.checked;
      localStorage.setItem('darkMode', isDarkMode);
      applyStyles(isDarkMode);
    });
  });
  