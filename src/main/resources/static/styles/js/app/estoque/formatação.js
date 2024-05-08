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
  