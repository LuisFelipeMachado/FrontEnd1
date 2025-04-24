  // Alternar Tema Claro/Escuro
  const toggleTema = document.getElementById('darktema');
  const body = document.body;

  // Carregar preferência do usuário
  if (localStorage.getItem('tema') === 'dark') {
    body.classList.add('dark');
  }

  toggleTema.addEventListener('click', () => {
    body.classList.toggle('dark');
    const temaAtual = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('tema', temaAtual);
  });

  // Menu Hambúrguer
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('nav ul');

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  // Fechar menu ao clicar em link
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  });

