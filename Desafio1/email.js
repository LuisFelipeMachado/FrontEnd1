// Referências dos elementos HTML
const openBtn = document.getElementById('openPopupBtn');
const closeBtn = document.getElementById('closePopupBtn');
const overlay = document.getElementById('popupOverlay');
const emailInput = document.getElementById('emailInput');
const feedback = document.getElementById('emailFeedback');
const submitBtn = document.getElementById('submitEmailBtn');
const resultMsg = document.getElementById('resultMsg');
const historyList = document.getElementById('emailHistory');

 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// abrir ou fechar o popup
function togglePopup(show) {
  overlay.classList.toggle('active', show);
  overlay.classList.toggle('hidden', !show);
  if (show) {
    emailInput.focus(); 
  }
}

openBtn.addEventListener('click', () => togglePopup(true));
closeBtn.addEventListener('click', () => togglePopup(false));

emailInput.addEventListener('input', () => {
  const email = emailInput.value.trim();

  // Não exibe feedback se o campo estiver vazio ou muito curto
  if (email === '' || email.length < 5) {
    feedback.textContent = '';
    feedback.className = '';
    return;
  }

  // Mostra feedback conforme a validade do e-mail
  if (emailRegex.test(email)) {
    feedback.textContent = 'E-mail válido';
    feedback.className = 'valid';
  } else {
    feedback.textContent = 'E-mail inválido';
    feedback.className = 'invalid';
  }
});

// Botão de enviar: valida e salva
submitBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const isValid = emailRegex.test(email);

  // Mostra mensagem temporária abaixo do botão
  resultMsg.textContent = isValid ? 'E-mail válido!' : 'E-mail inválido!';
  resultMsg.style.color = isValid ? 'green' : 'red';

  if (isValid) {
    saveEmail(email); // salva no histórico
    renderHistory();  // atualiza lista
  }

  setTimeout(() => resultMsg.textContent = '', 3000); // apaga depois de 3s
});

// Salva o e-mail e data/hora no localStorage
function saveEmail(email) {
  const emails = JSON.parse(localStorage.getItem('emails') || '[]');
  emails.push({ email, date: new Date().toLocaleString() });
  localStorage.setItem('emails', JSON.stringify(emails));
}

// Exibe a lista de e-mails salvos
function renderHistory() {
  const emails = JSON.parse(localStorage.getItem('emails') || '[]');
  historyList.innerHTML = '';

  // Lista cada e-mail salvo
  emails.forEach(({ email, date }, index) => {
    const li = document.createElement('li');
    li.textContent = `${email} - ${date}`;

    // Botão de apagar individual
    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.onclick = () => removeEmail(index);
    li.appendChild(delBtn);

    historyList.appendChild(li);
  });

  // Botão para limpar todos
  if (emails.length > 0) {
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Limpar tudo';

    clearBtn.classList.add('btn-clear');

    clearBtn.onclick = () => {
      localStorage.removeItem('emails');
      renderHistory();
    };
    historyList.appendChild(clearBtn);
  }
}

// Remove um e-mail do histórico
function removeEmail(index) {
  const emails = JSON.parse(localStorage.getItem('emails') || '[]');
  emails.splice(index, 1);
  localStorage.setItem('emails', JSON.stringify(emails));
  renderHistory();
}

// Renderiza a lista ao carregar a página
renderHistory();
