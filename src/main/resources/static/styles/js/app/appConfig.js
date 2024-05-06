// Recupera os elementos do DOM
const darkModeToggle = document.getElementById('dark-mode');
const notificationsToggle = document.getElementById('notifications');
const languageSelect = document.getElementById('language');

// Adiciona evento de mudança para salvar as configurações
darkModeToggle.addEventListener('change', () => {
  localStorage.setItem('darkMode', darkModeToggle.checked);
  applySettings();
});

notificationsToggle.addEventListener('change', () => {
  localStorage.setItem('notifications', notificationsToggle.checked);
  applySettings();
});

languageSelect.addEventListener('change', () => {
  localStorage.setItem('language', languageSelect.value);
  applySettings();
});

// Aplica as configurações armazenadas localmente
function applySettings() {
  const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
  const notificationsEnabled = localStorage.getItem('notifications') === 'true';
  const selectedLanguage = localStorage.getItem('language') || 'en';

  darkModeToggle.checked = darkModeEnabled;
  notificationsToggle.checked = notificationsEnabled;
  languageSelect.value = selectedLanguage;

  // Aplica as configurações na interface
  if (darkModeEnabled) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  // Simulação de notificação (apenas para exemplo)
  if (notificationsEnabled) {
    alert('Notificações estão ativadas!');
  }
}

// Chama a função para aplicar as configurações ao carregar a página
applySettings();
