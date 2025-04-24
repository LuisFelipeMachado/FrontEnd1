const toggleButton = document.getElementById('temadark');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  // Salvar preferência no localStorage
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Ao carregar, aplicar o tema salvo
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
});
