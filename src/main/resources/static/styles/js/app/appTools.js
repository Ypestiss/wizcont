// ------------------------------------Funções do Estoque------------------------------------//
var nomeItensArray = [];
var itensOriginal = [];
var itensOriginais = [];
var itensModificados = [];
var item = [];
// Função para adicionar itens, considerando variações de capitalização e acentuação
function adicionarItem(categoria) {
  const nomeItem = prompt(`Digite o nome do item de ${categoria}:`);
  if (nomeItem) {
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
      categoria,
      medidaSelect.value
    ];

    nomeItensArray.push(novoItem);
    itensOriginais = nomeItensArray.slice()
    cardContainer.appendChild(novoCard);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.style.backgroundColor = 'transparent';
    botaoExcluir.style.color = 'red';
    botaoExcluir.textContent = 'Excluir';
    botaoExcluir.onclick = function() {
      const index = nomeItensArray.findIndex(item => item[0] === novoItem[0] && item[1] === novoItem[1] && item[2] === novoItem[2] && item[3] === novoItem[3]);
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
    medidaSelect.addEventListener('change', function() {
      novoItem[3] = medidaSelect.value;
    });
  }
}

const deleteButtons = document.querySelectorAll('.btn-excluir');
// Adiciona um evento de clique a cada botão
deleteButtons.forEach(button => {
  button.addEventListener('click', deleteItens);
});

function deleteItens(){
  const deleteForm = document.createElement('form');
    deleteForm.setAttribute('method', 'post');
    deleteForm.setAttribute('action', '/app/deleteItens');
    const card = this.closest('.card');
    var idItem = card.getAttribute('data-idItem');
    const inputIdItem = document.createElement('input');
    inputIdItem.setAttribute('type', 'hidden');
    inputIdItem.setAttribute('name', 'idItem');
    inputIdItem.setAttribute('value', idItem);
    console.log(inputIdItem.value);
    deleteForm.appendChild(inputIdItem);
    document.body.appendChild(deleteForm);
    console.log("delete Form submitado");
    card.remove();
    deleteForm.submit();
};
 
//Função para salvar os itens
function saveItens(){
  itensOriginal = [];
// Carregar itens 
  document.querySelectorAll('[data-categoria]').forEach(card =>{
    var idItem = card.getAttribute('data-idItem');
    var nomeItem = card.getAttribute('data-nome');
    var qtdItem = card.getAttribute('data-qtdItem');
    var categoria = card.getAttribute('data-categoria');
    var medida = card.getAttribute('data-medidaItem');
    var item = {
      idItem: idItem,
      nomeItem: nomeItem,
      qtdItem: qtdItem,
      categoria: categoria,
      medida: medida
    };
    itensOriginal.push(item);
    itensOriginais = itensOriginal.slice()
  });

  itensModificados = moddedItens(itensOriginais);

  const saveForm = document.createElement('form');
  const createForm = document.createElement('form');
  saveForm.setAttribute('method', 'post');
  saveForm.setAttribute('action', '/app/saveItens');
  createForm.setAttribute('method', 'post');
  createForm.setAttribute('action', '/app/createItens');
  console.log("Esta fora do modded itens + itensModificados: " + itensModificados);

  //CRIAR O ITEM
  for(const item of nomeItensArray){
    console.log(item);
    const inputNome = document.createElement('input');
      inputNome.setAttribute('type', 'hidden');
      inputNome.setAttribute('name', 'nomeItem');
      inputNome.setAttribute('value', item[0]);
      createForm.appendChild(inputNome);

      const inputQuantidade = document.createElement('input');
      inputQuantidade.setAttribute('type', 'hidden');
      inputQuantidade.setAttribute('name', 'quantidadeItem');
      inputQuantidade.setAttribute('value', item[1]);
      createForm.appendChild(inputQuantidade);

      const inputCategoria = document.createElement('input');
      inputCategoria.setAttribute('type', 'hidden');
      inputCategoria.setAttribute('name', 'categoriaItem');
      inputCategoria.setAttribute('value', item[2]);
      createForm.appendChild(inputCategoria);

      const inputMedida = document.createElement('input');
      inputMedida.setAttribute('type', 'hidden');
      inputMedida.setAttribute('name', 'medidaItem');
      inputMedida.setAttribute('value', item[3]);
      console.log(inputMedida.value);
      createForm.appendChild(inputMedida);
  }
  // ATUALIZAR/MODIFICAR O ITEM
  for(const item of itensModificados){
    console.log(item);
    const inputNome = document.createElement('input');
      inputNome.setAttribute('type', 'hidden');
      inputNome.setAttribute('name', 'nomeItem');
      inputNome.setAttribute('value', item.nomeItem);
      saveForm.appendChild(inputNome);

      const inputItemId = document.createElement('input');
      inputItemId.setAttribute('type', 'hidden');
      inputItemId.setAttribute('name', 'idItem');
      inputItemId.setAttribute('value', item.idItem);
      saveForm.appendChild(inputItemId);

      const inputQuantidade = document.createElement('input');
      inputQuantidade.setAttribute('type', 'hidden');
      inputQuantidade.setAttribute('name', 'quantidadeItem');
      inputQuantidade.setAttribute('value', item.qtdItem);
      saveForm.appendChild(inputQuantidade);

      const inputCategoria = document.createElement('input');
      inputCategoria.setAttribute('type', 'hidden');
      inputCategoria.setAttribute('name', 'categoriaItem');
      inputCategoria.setAttribute('value', item.categoria);
      saveForm.appendChild(inputCategoria);

      const inputMedida = document.createElement('input');
      inputMedida.setAttribute('type', 'hidden');
      inputMedida.setAttribute('name', 'medidaItem');
      inputMedida.setAttribute('value', item.medida);
      console.log(inputMedida.value);
      saveForm.appendChild(inputMedida);
  }
    
    if(saveForm.childElementCount > 0){
      document.body.appendChild(saveForm);
      console.log("Save form submitado");
      saveForm.submit();
    }
    if(createForm.childElementCount > 0){
      document.body.appendChild(createForm);
      console.log("create form submitado");
      createForm.submit();
    }
    
}

function moddedItens(itens) {
  let itensModificados = [];
  for (let i = 0; i < itens.length; i++) {
      var qtdItemInput = document.getElementById("qtdItemInput-" + itens[i].idItem);
      if (qtdItemInput) {
          var newQtdItem = qtdItemInput.getAttribute("newData-qtdItem");
          let itemOriginal = { ...itensOriginal[i] };
          let itemModificado = { ...itens[i] };
          itemModificado.qtdItem = newQtdItem;
          let modificado = false;
          //console.log("ItemModificado: " + itemModificado.qtdItem + "\n" + "ItemOriginal: " + itemOriginal.qtdItem);
          if (itemOriginal.nomeItem !== itemModificado.nomeItem && itemModificado.qtdItem !== null) {
              modificado = true;
          }
          if (itemOriginal.qtdItem !== itemModificado.qtdItem && itemModificado.qtdItem !== null){
            console.log("Item modificado na função moddedItens: " + "item[" + i + "] : " +  itemModificado.qtdItem);
            modificado = true;
          }
          if (itemOriginal.categoria !== itemModificado.categoria && itemModificado.qtdItem !== null) {
              modificado = true;
          }
          if (itemOriginal.medida !== itemModificado.medida && itemModificado.qtdItem !== null) {
              modificado = true;
          }

          if (modificado && itemModificado.qtdItem !== null) {
              console.log("Item modificado na função moddedItens: " + "item[" + i + "] : " +  itemModificado);
              itensModificados.push(itemModificado);
          }  
      }
  }

  return itensModificados;
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

