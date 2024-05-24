// carregamento dos itens no banco
for(var i = 0; i < itens.length; i++){
    var item = itens[i];
    console.log('teste');
    var categoria = item.categoria_item;
    var quantidade = item.qtd_item;
    var medida = item.medida_item;
    var cardContainer = document.getElementById(`${categoria}-list`);
    var card = document.createElement('div');
    card.classList.add('card');
  
    var textoItem = document.createElement('span');
    textoItem.textContent = item.nome_item;
    card.appendChild(textoItem);
    var quantidadeInput = document.createElement('input');
    quantidadeInput.type = 'number';
    quantidadeInput.placeholder = Number(item.qtd_item);
    quantidadeInput.style.width = '80px';
    quantidadeInput.style.backgroundColor = '#f2f2f2';
    quantidadeInput.value = Number(item.qtd_item);
    card.appendChild(quantidadeInput);
  
    const novoItem = [
      textoItem.textContent,
      quantidadeInput.value.toString(),
      categoria
    ];