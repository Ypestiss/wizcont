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

const nomeItensArray = [];
var itensOriginais = [];
var itensScan = [];
var novoItem = [];
var diff = 0;
const itensModificados = [];
let quantidadeAtual;

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

  const botaoExcluir = document.createElement('button');
    botaoExcluir.style.backgroundColor = 'transparent';
    botaoExcluir.style.color = 'red';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = function() {
      this.parentNode.remove();  
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
  card.appendChild(botaoExcluir);
  nomeItensArray.push(novoItem);
  itensOriginais = JSON.parse(JSON.stringify(nomeItensArray))
  
  console.log("valor de itensOriginais: "+ itensOriginais)

  quantidadeInput.addEventListener('input', function() {
    // Obtém o valor atualizado do campo de quantidade e adiciona à array global
    novoItem[1] = quantidadeInput.value.toString();
  });
  if (cardContainer) {
    cardContainer.appendChild(card);
  } else {
    console.error('Card Container não encontrado!');
  }
}

//Função para salvar os itens
function setArrays(){
  const arrayObj = {
    Itens: nomeItensArray
  };

  // itensModificados1 = moddedItens(itens);
  const itensModificados = moddedItens(nomeItensArray);


  // enviar pro servidor 
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'getarray', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      console.log('Arrays enviadas com sucesso!!');
    }
  };
  const jsonArray = JSON.stringify(arrayObj);
  console.log("Valor de jsonArray: " + jsonArray)
  console.log("Valor de itensModificados: " + itensModificados)
  xhr.send(jsonArray);
}

function moddedItens(itens) {
  let itensModificados = [];
  if(itensOriginais.length > 0){
      for (let i = 0; i < itens.length; i++) {
          let itemOriginal = itensOriginais[i];
          let itemModificado = itens[i].slice(); // Cria uma cópia do item modificado

          // Verifica individualmente se houve modificação
          let modificado = false;
          if (itemOriginal[0] !== itemModificado[0]) { // Nome modificado
              modificado = true;
          }
          if (itemOriginal[1] !== itemModificado[1]) { // Quantidade modificada
              itemModificado[1] -= itemOriginal[1]; // Calcula a diferença diretamente
              modificado = true;
          }
          if (itemOriginal[2] !== itemModificado[2]) { // Categoria modificada
              modificado = true;
          }

          if (modificado) {
              console.log("Item modificado na função moddedItens: ", itemModificado);
              itensModificados.push(itemModificado);
              generateQR(itensModificados);
          }
      }
  }
  return itensModificados;
}

function updateData(){
  const data = newEmail

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'getarray', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      console.log('Arrays enviadas com sucesso!!');
    }
  };
  const jsonArray = JSON.stringify(arrayObj);
  xhr.send(jsonArray);
}

function generateQR(itensModificados){
  const array = {
    Itens: itensModificados
  };

  var jsonString = JSON.stringify(array);

  let qrcode = new QRCode(document.getElementById('generator-result'), jsonString);
  console.log(qrcode)
}

function scanQR(){
  const scanner = new Html5QrcodeScanner('reader', { 
    qrbox: {
        width: 250,
        height: 250,
    }, 
    fps: 20,
});

  scanner.render(success, error);
  document.getElementById('scanQR-button').style.display = 'none';
  // Starts scanner

  function success(result) {
    var objeto = JSON.parse(result);
    var arrays = objeto.Itens;
    
    var htmlItens = '';
    for (var i = 0; i < arrays.length; i++) {
        var itensArray = arrays[i];
        console.log('Array' + (i + 1) + ':');
        for (var j = 0; j < itensArray.length; j++) {
            htmlItens += itensArray[j];
            console.log(itensArray[j]);
        }
    }

    // Exibir os itens na página HTML
    document.getElementById('result').innerHTML = `
        <h2>Success!</h2>
        <div>${htmlItens}</div>
    `;
      document.getElementById('complete-scan').style.display = 'block';
      document.getElementById('complete-scan').addEventListener('click', () =>{
        console.log(arrays)
        console.log(itensArray[1])
        scanArrays(arrays);
      })
      scanner.clear();

      document.getElementById('reader').remove();

  }

  function error(err) {
      console.error(err);
      // Prints any errors to the console
  }

}

async function scanArrays(arrays){
  const arrayObj = {
    Itens: arrays
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'getarray', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      console.log('Arrays enviadas com sucesso!!');
    }
  };
  const jsonArray = JSON.stringify(arrayObj);
  xhr.send(jsonArray);
}

//-----------------------Configurações do leitor QR------------------//


// document.addEventListener("DOMContentLoaded", function() {
//   const menuData = [
//     { name: "Hamburguer", price: "15.00", description: "Delicioso hamburguer com queijo, alface e tomate." },
//     { name: "Pizza", price: "20.00", description: "Pizza margherita feita com ingredientes frescos." },
//     { name: "Salada", price: "10.00", description: "Salada fresca com alface, tomate, pepino e azeitonas." },
//     { name: "Sushi", price: "25.00", description: "Sushi variado com peixe fresco e arroz temperado." }
//   ];

//   const menuContainer = document.getElementById("menu");

//   function createMenuItem(item) {
//     const menuItem = document.createElement("div");
//     menuItem.classList.add("menu-item");

//     const name = document.createElement("input");
//     name.setAttribute("type", "text");
//     name.setAttribute("placeholder", "Nome do item");
//     name.value = item.name;

//     const price = document.createElement("input");
//     price.setAttribute("type", "number");
//     price.setAttribute("step", "0.01");
//     price.setAttribute("placeholder", "Preço");
//     price.value = item.price;

//     const quantity = document.createElement("input");
//     quantity.setAttribute("type", "number");
//     quantity.setAttribute("step", "1");
//     quantity.setAttribute("min", "0");
//     quantity.setAttribute("placeholder", "Quantidade");
//     quantity.value = 0;

//     const description = document.createElement("input");
//     description.setAttribute("type", "text");
//     description.setAttribute("placeholder", "Descrição");
//     description.value = item.description;

//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Excluir";
//     deleteButton.addEventListener("click", function() {
//       menuItem.remove();
//     });

//     menuItem.appendChild(name);
//     menuItem.appendChild(price);
//     menuItem.appendChild(quantity);
//     menuItem.appendChild(description);
//     menuItem.appendChild(deleteButton);

//     return menuItem;
//   }

//   function addNewMenuItem() {
//     const newItem = createMenuItem({ name: "", price: "", description: "" });
//     menuContainer.appendChild(newItem);
//   }

//   menuData.forEach(item => {
//     const menuItem = createMenuItem(item);
//     menuContainer.appendChild(menuItem);
//   });

//   const addNewButton = document.createElement("button");
//   addNewButton.textContent = "Adicionar Novo Produto";
//   addNewButton.addEventListener("click", addNewMenuItem);
//   menuContainer.appendChild(addNewButton);
// });

