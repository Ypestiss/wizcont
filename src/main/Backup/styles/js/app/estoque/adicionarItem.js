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
  
      const medidaSelect = document.createElement('select');
      const medidas = ['Un', 'Kg', 'L', 'mL']; // Adicione as medidas que desejar
      for (const medida of medidas) {
        const option = document.createElement('option');
        option.value = medida;
        option.textContent = medida;
        medidaSelect.appendChild(option);
      }
  
      medidaSelect.style.backgroundColor = 'transparent';
      medidaSelect.style.fontSize = '12px'
  
      novoCard.appendChild(textoItem);
      novoCard.appendChild(quantidadeInput);
      novoCard.appendChild(medidaSelect);
      
      const novoItem = [
        nomeItem,
        quantidadeInput.value.toString(),
        categoria
      ];
  
  
      nomeItensArray.push(novoItem);
      cardContainer.appendChild(novoCard);
  
      const botaoExcluir = document.createElement('button');
      botaoExcluir.style.backgroundColor = 'transparent';
      botaoExcluir.style.color = 'red';
      botaoExcluir.textContent = 'Excluir';
      botaoExcluir.onclick = function() {
        const index = nomeItensArray.findIndex(item => item[0] === novoItem[0] && item[1] === novoItem[1] && item[2] === novoItem[2]);
        console.log("Teste index:" + index);
        console.log("Teste item: " + item);
        console.log("Teste itens array:" + nomeItensArray)
  
        if(index !== -1){
          nomeItensArray.splice(index,  1);
          console.log("Teste index2:" + index);
          console.log("Teste item2: " + item);
          console.log("Teste itens array2:" + nomeItensArray)
          console.log(novoItem)
          fetch('delitem', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(novoItem)
          })
          .then(response => {
            if(!response.ok) {
              throw new Error(`HTTP error! Status ${response.status}`);
            }
            return response.json();
          }) 
          this.parentNode.remove();  
        }
      };
      novoCard.appendChild(botaoExcluir);
  
  
      quantidadeInput.addEventListener('input', function() {
        // Obtém o valor atualizado do campo de quantidade e adiciona à array global
        novoItem[1] = quantidadeInput.value.toString();
      });
      // Verificar se o item inserido corresponde a alguma recomendação padronizada
      if (recomendacoes[categoria].some(item => removerAcentos(capitalizeFirstLetter(item.toLowerCase())) === itemPadronizado)) {
        const confirmarAdicao = confirm(`Gostaria de adicionar as recomendações para ${capitalizeFirstLetter(nomeItem)}?`);
        if (confirmarAdicao) {
          const recomendados = recomendacoes[categoria].filter(item => removerAcentos(capitalizeFirstLetter(item.toLowerCase())) !== itemPadronizado);
  
          // Adicionar automaticamente os produtos recomendados
          recomendados.forEach(recomendado => {
            const novoCardRecomendado = document.creat01eElement('div');
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
              const index = nomeItensArray.findIndex(item => item[0] === novoItem[0] && item[1] === novoItem[1] && item[2] === novoItem[2]);
              console.log(item);
              if(index !== -1){
                nomeItensArray.splice(index,  1);
  
                fetch('/delitem', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(novoItem)
                })
                .then(response => {
                  if(!response.ok) {
                    throw new Error(`HTTP error! Status ${response.status}`);
                  }
                  return response.json();
                }) 
              }
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