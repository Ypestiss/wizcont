  // navegacao.js
  document.addEventListener('DOMContentLoaded', function() {
    const list = document.querySelectorAll('.list');

    function activeLink() {
      list.forEach(item => {
        item.classList.remove('active');
      });
      this.classList.add('active');
    }

    list.forEach(item => {
      item.addEventListener('click', activeLink);
    });
  });

  function mostrarEstoque() {
    // Oculta todas as divs de conteúdo
    document.querySelectorAll('#conteudo > div').forEach(div => {
      div.style.display = 'none';
    });
    // Exibe a div de conteúdo específica para Estoque
    document.getElementById('estoque').style.display = 'block';
  }

  function mostrarMetas() {
    // Oculta todas as divs de conteúdo
    document.querySelectorAll('#conteudo > div').forEach(div => {
      div.style.display = 'none';
    });
    // Exibe a div de conteúdo específica para Metas
    document.getElementById('metas').style.display = 'block';
  }

  function mostrarNotificacao() {
    // Oculta todas as divs de conteúdo
    document.querySelectorAll('#conteudo > div').forEach(div => {
      div.style.display = 'none';
    });
    // Exibe a div de conteúdo específica para Notificação
    document.getElementById('notificacao').style.display = 'block';
  }

  function mostrarPerfil() {
    // Oculta todas as divs de conteúdo
    document.querySelectorAll('#conteudo > div').forEach(div => {
      div.style.display = 'none';
    });
    // Exibe a div de conteúdo específica para Perfil
    document.getElementById('perfil').style.display = 'block';
  }

  function mostrarConfiguracao() {
    // Oculta todas as divs de conteúdo
    document.querySelectorAll('#conteudo > div').forEach(div => {
      div.style.display = 'none';
    });
    // Exibe a div de conteúdo específica para Configuração
    document.getElementById('configuracao').style.display = 'block';
  }
  // Adicione outras funções conforme necessário
