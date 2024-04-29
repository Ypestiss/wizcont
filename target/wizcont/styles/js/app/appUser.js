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
  
  }
  
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  
  
  function changeEmail(){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    const parentDiv = document.getElementById("trocarDados");
    const buttonEmail = document.getElementById('emailButton');
    const changeCard = document.createElement('div');
    changeCard.classList.add('menu-item');
  
  
    const textCard = document.createElement('span');
    textCard.textContent = 'Novo Nick';
    const email = document.createElement("input");
    email.setAttribute("type", "text");
    email.setAttribute("placeholder", "Novo email");
    const saveButton = document.createElement("button")
    saveButton.setAttribute("placeholder", "Salvar");
    saveButton.setAttribute("id", "saveButton");
    saveButton.addEventListener("click", save);
    function save() {
      if(emailRegex.test(email.value)){
        console.log('Foi')
        console.log(email.value);
        buttonEmail.style.display = 'block';
        changeCard.remove();
      }else{
        alert('Erro, email inválido');
      };
    }  
  
  
    buttonEmail.style.display = 'none';
    changeCard.appendChild(textCard);
    changeCard.appendChild(email);
    changeCard.appendChild(saveButton);
    parentDiv.appendChild(changeCard);
    return changeCard;
  }
  