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
  graos: [''],
  frutas: [''],
  carnes: [''],
  verduras: [''],
  legumes: [''],
  vegetais: ['']
};

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
      cardContainer.removeChild(novoCard);
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
function adicionarCategoria() {
  const novaCategoriaInput = document.getElementById('novaCategoriaInput');
  const novaCategoriaNome = novaCategoriaInput.value.trim(); // Obtém o valor da nova categoria

  if (novaCategoriaNome !== '') {
    const novaCategoriaDiv = document.createElement('div');
    novaCategoriaDiv.classList.add('category');

    const novoTituloCategoria = document.createElement('h2');
    novoTituloCategoria.textContent = capitalizeFirstLetter(novaCategoriaNome);
    novaCategoriaDiv.appendChild(novoTituloCategoria);

    const novoCardContainer = document.createElement('div');
    novoCardContainer.classList.add('card-container');
    novoCardContainer.id = `${novaCategoriaNome.toLowerCase()}-list`;
    novaCategoriaDiv.appendChild(novoCardContainer);

    const novoBotaoAdicionar = document.createElement('button');
    novoBotaoAdicionar.textContent = '+';
    novoBotaoAdicionar.onclick = function() {
      adicionarItem(novaCategoriaNome.toLowerCase());
    };
    novaCategoriaDiv.appendChild(novoBotaoAdicionar);

    const conteudoEstoque = document.getElementById('estoque');

    // Encontra a primeira categoria existente (o primeiro elemento com a classe 'category')
    const primeiraCategoria = conteudoEstoque.querySelector('.category');

    // Insere a nova categoria antes da primeira categoria existente
    conteudoEstoque.insertBefore(novaCategoriaDiv, primeiraCategoria);

    novaCategoriaInput.value = ''; // Limpa o campo de entrada após adicionar a categoria
  }
}

