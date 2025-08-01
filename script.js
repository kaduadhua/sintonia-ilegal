// Alterna o menu hamburguer
function toggleMenu(btn) {
  const menu = document.getElementById('menu');
  const expanded = btn.getAttribute('aria-expanded') === 'true';

  if (expanded) {
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    btn.classList.remove('open');
    document.body.classList.remove('menu-open');
  } else {
    btn.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    btn.classList.add('open');
    document.body.classList.add('menu-open');
  }
}

// Alterna a exibição da lista de drogas
function toggleLista() {
  const lista = document.getElementById('listaDrogas');
  const h3 = lista.previousElementSibling; // pega o h3

  if (lista.style.display === 'block') {
    lista.style.display = 'none';
    h3.setAttribute('aria-expanded', 'false');
  } else {
    lista.style.display = 'block';
    h3.setAttribute('aria-expanded', 'true');
  }
}

// Alterna a exibição da descrição de uma droga e esconde as outras
function toggleDescricao(id) {
  const descricoes = document.querySelectorAll('.descricao');

  descricoes.forEach(d => {
    if (d.id === id) {
      d.style.display = d.style.display === 'block' ? 'none' : 'block';
    } else {
      d.style.display = 'none';
    }
  });
}

// Permitir toggle via teclado (Enter e Space) para acessibilidade
document.addEventListener('DOMContentLoaded', () => {
  // Toggle lista de drogas com teclado
  const listaToggle = document.querySelector('section h3[role="button"]');
  listaToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleLista();
    }
  });

  // Toggle descrições com teclado
  const itens = document.querySelectorAll('#listaDrogas li[role="button"]');
  itens.forEach(item => {
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = item.getAttribute('onclick').match(/'([^']+)'/)[1];
        toggleDescricao(id);
      }
    });
  });
});

// Status possível para cada droga
const statusPossiveis = ['LIVRE', 'PENDENTE', 'ASSUMIDA'];
const statusCores = {
  'LIVRE': '#28a745',     // verde
  'PENDENTE': '#ffc107',  // amarelo
  'ASSUMIDA': '#dc3545'   // vermelho
};

function trocarStatus(id) {
  const statusSpan = document.getElementById(`status-${id}`);
  let statusAtual = statusSpan.textContent.trim();

  let index = statusPossiveis.indexOf(statusAtual);
  index = (index + 1) % statusPossiveis.length;

  const novoStatus = statusPossiveis[index];
  statusSpan.textContent = novoStatus;
  statusSpan.style.color = statusCores[novoStatus];
}


