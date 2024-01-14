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

  // Recuperar o estado do modo do armazenamento local ao carregar a página
  const isDarkModeSaved = localStorage.getItem('darkMode');

  // Função para aplicar estilos com base no modo escuro/claro
  function applyStyles(isDarkMode) {
    const backgroundColor = isDarkMode ? '#f9f9f9' : '#222';
    const textColor = isDarkMode ? '#000' : '#fff';
    const backgroundImage = isDarkMode ? 'url("../backgrounds/Interface Branca.png")' : 'url("../backgrounds/Interface Preta.png")';

    body.style.backgroundColor = backgroundColor;
    body.style.color = textColor;
    conteudo.style.backgroundImage = backgroundImage;
    configContent.style.backgroundColor = backgroundColor;
    configContent.style.color = textColor;
    perfil.style.backgroundColor = backgroundColor;
    perfil.style.color = textColor;
    estoque.style.backgroundColor = backgroundColor;
    estoque.style.color = textColor;
    titleestoque.style.color = textColor;

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


// ------------------------------------Área do Usuario------------------------------------//
function previewImage(event) {
  const input = event.target;
  const reader = new FileReader();

  reader.onload = function () {
    const preview = document.getElementById('preview');
    preview.src = reader.result;
  };

  function alterarImagem() {
    const input = document.getElementById('fileInput');
    input.click();
  }  
  

  if (input.files && input.files[0]) {
    reader.readAsDataURL(input.files[0]);
  }

  const nomeUsuario = "Estevão Cruz"; 

  document.getElementById('nomeUsuario').textContent = nomeUsuario;

}

  
  
// ------------------------------------Barra de Navegação------------------------------------//
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
    // Exibe a div de conteúdo específica para Metas
    document.getElementById('notificacao').style.display = 'block';
  }

  function mostrarPerfil() {
    // Oculta todas as divs de conteúdo
    document.querySelectorAll('#conteudo > div').forEach(div => {
      div.style.display = 'none';
    });
    // Exibe a div de conteúdo específica para Metas
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

// ------------------------------------Formatação do Estoque------------------------------------//
  // Função para formatar a string com a primeira letra maiúscula
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Função para remover acentos de caracteres
function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f|\u00b4|\u0060|\u005e|\u007e]/g, '');
}

// Declaração das recomendações para cada categoria (com acentos)
const recomendacoes = {
  graos: ['arroz', 'feijão', 'milho', 'ervilha', 'grão de bico'],
  frutas: ['banana', 'mamão', 'melância', 'maçã', 'melão', 'mexirica'],
  carnes: ['carne moída', 'frango', 'carne bovina', 'carne suína', 'ovo']
};

// ------------------------------------Funções do Estoque------------------------------------//
// Função para adicionar itens, considerando variações de capitalização e acentuação
function adicionarItem(categoria) {
  const nomeItem = prompt(`Digite o nome do item de ${categoria}:`);
  if (nomeItem) {
    const itemPadronizado = removerAcentos(capitalizeFirstLetter(nomeItem.toLowerCase())); // Padronizando o item inserido

    const cardContainer = document.getElementById(`${categoria}-list`);
    const novoCard = document.createElement('div');
    novoCard.classList.add('card');

    const textoItem = document.createElement('span');
    textoItem.textContent = capitalizeFirstLetter(nomeItem); // Texto com primeira letra em maiúsculo
    const nomeItemPadronizado = capitalizeFirstLetter(nomeItem); // Nome padronizado para comparar

    const quantidadeInput = document.createElement('input');
    quantidadeInput.type = 'number';
    quantidadeInput.placeholder = 'Quantidade';
    quantidadeInput.style.width = '80px';
    quantidadeInput.style.backgroundColor = '#f2f2f2';
    novoCard.appendChild(textoItem);
    novoCard.appendChild(quantidadeInput);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.style.backgroundColor = 'transparent';
    botaoExcluir.style.color = 'red';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = function() {
      this.parentNode.remove();
    };

    novoCard.appendChild(botaoExcluir);
    cardContainer.appendChild(novoCard);

    // Verificar se o item inserido corresponde a alguma recomendação padronizada
    if (recomendacoes[categoria].some(item => removerAcentos(capitalizeFirstLetter(item.toLowerCase())) === itemPadronizado)) {
      const confirmarAdicao = confirm(`Gostaria de adicionar as recomendações para ${capitalizeFirstLetter(nomeItem)}?`);
      if (confirmarAdicao) {
        const recomendados = recomendacoes[categoria].filter(item => removerAcentos(capitalizeFirstLetter(item.toLowerCase())) !== itemPadronizado);

        // Adicionar automaticamente os produtos recomendados
        recomendados.forEach(recomendado => {
          const novoCardRecomendado = document.createElement('div');
          novoCardRecomendado.classList.add('card');

          const textoItemRecomendado = document.createElement('span');
          textoItemRecomendado.textContent = capitalizeFirstLetter(recomendado); // Texto com primeira letra em maiúsculo

          const quantidadeInputRecomendado = document.createElement('input');
          quantidadeInputRecomendado.type = 'number';
          quantidadeInputRecomendado.placeholder = 'Quantidade';
          quantidadeInputRecomendado.style.width = '80px';
          quantidadeInputRecomendado.style.backgroundColor = '#f2f2f2';

          const botaoExcluirRecomendado = document.createElement('button');
          botaoExcluirRecomendado.style.backgroundColor = 'transparent';
          botaoExcluirRecomendado.style.color = 'red';
          botaoExcluirRecomendado.textContent = 'Excluir';
          botaoExcluirRecomendado.onclick = function() {
            cardContainer.removeChild(novoCardRecomendado);
          };

          novoCardRecomendado.appendChild(textoItemRecomendado);
          novoCardRecomendado.appendChild(quantidadeInputRecomendado);
          novoCardRecomendado.appendChild(botaoExcluirRecomendado);
          cardContainer.appendChild(novoCardRecomendado); // Adicionar card recomendado com funcionalidades
        });
      }
    }
  }
}


// Adiciona uma nova categoria 
//function adicionarCategoria() {
//  const novaCategoriaInput = document.getElementById('novaCategoriaInput');
//  const novaCategoriaNome = novaCategoriaInput.value.trim(); // Obtém o valor da nova categoria

//  if (novaCategoriaNome !== '') {
//    const novaCategoriaDiv = document.createElement('div');
//    novaCategoriaDiv.classList.add('category');

//    const novoTituloCategoria = document.createElement('h2');
//    novoTituloCategoria.textContent = capitalizeFirstLetter(novaCategoriaNome);
//    novaCategoriaDiv.appendChild(novoTituloCategoria);

//    const novoCardContainer = document.createElement('div');
//    novoCardContainer.classList.add('card-container');
//    novoCardContainer.id = `${novaCategoriaNome.toLowerCase()}-list`;
//    novaCategoriaDiv.appendChild(novoCardContainer);

//    const novoBotaoAdicionar = document.createElement('button');
//    novoBotaoAdicionar.textContent = '+';
//    novoBotaoAdicionar.onclick = function() {
//      adicionarItem(novaCategoriaNome.toLowerCase());
//    };
//    novaCategoriaDiv.appendChild(novoBotaoAdicionar);

//    const conteudoEstoque = document.getElementById('estoque');

    // Encontra a primeira categoria existente (o primeiro elemento com a classe 'category')
//    const primeiraCategoria = conteudoEstoque.querySelector('.category');

    // Insere a nova categoria antes da primeira categoria existente
//    conteudoEstoque.insertBefore(novaCategoriaDiv, primeiraCategoria);

//    novaCategoriaInput.value = ''; // Limpa o campo de entrada após adicionar a categoria
//  }
//}

function trocarSecao() {
  const estoque = document.getElementById('estoque');
  const estoqueLimp = document.getElementById('estoque-limp');

  if (estoque.style.display !== 'none') {
    // Se a seção de estoque estiver sendo exibida, oculta e mostra a seção de limpeza
    estoque.style.display = 'none';
    estoqueLimp.style.display = 'block';

    // Adicionar animação de rolagem (exemplo com scrollIntoView)
    estoqueLimp.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Se a seção de limpeza estiver sendo exibida, oculta e mostra a seção de estoque
    estoqueLimp.style.display = 'none';
    estoque.style.display = 'block';

    // Adicionar animação de rolagem (exemplo com scrollIntoView)
    estoque.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Função para adicionar itens à lista de produtos de limpeza
function adicionarItemLimp(categoria) {
  const nomeItem = prompt(`Digite o nome do item de ${categoria}:`);
  if (nomeItem) {
    const itemPadronizado = removerAcentos(capitalizeFirstLetter(nomeItem.toLowerCase())); // Padronizando o item inserido

    const cardContainer = document.getElementById(`${categoria}-list`);
    const novoCard = document.createElement('div');
    novoCard.classList.add('card');

    const textoItem = document.createElement('span');
    textoItem.textContent = capitalizeFirstLetter(nomeItem); // Texto com primeira letra em maiúsculo
    const nomeItemPadronizado = capitalizeFirstLetter(nomeItem); // Nome padronizado para comparar

    const quantidadeInput = document.createElement('input');
    quantidadeInput.type = 'number';
    quantidadeInput.placeholder = 'Quantidade';
    quantidadeInput.style.width = '80px';
    quantidadeInput.style.backgroundColor = '#f2f2f2';
    novoCard.appendChild(textoItem);
    novoCard.appendChild(quantidadeInput);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.style.backgroundColor = 'transparent';
    botaoExcluir.style.color = 'red';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = function() {
      this.parentNode.remove();
    };

    novoCard.appendChild(botaoExcluir);
    cardContainer.appendChild(novoCard);

    // Lógica de recomendação de itens de limpeza pode ser adicionada aqui
  }
}



