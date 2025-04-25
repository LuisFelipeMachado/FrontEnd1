const toggleButton = document.getElementById('temadark');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');


  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
});
