// ===== RAELA - SCRIPT PRINCIPAL 2026 =====
document.addEventListener('DOMContentLoaded', () => {

  // ===== MENU MOBILE =====
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
  }

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      if (menuToggle) {
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });

  // ===== NAV ACTIVE NO SCROLL =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) { current = section.getAttribute('id'); }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) { link.classList.add('active'); }
    });
  });

  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) { window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' }); }
    });
  });

  // ===== FORMULÁRIO DE CONTACTO (WhatsApp) =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const telefone = contactForm.querySelector('input[type="tel"]').value;
      const servico = contactForm.querySelector('select').value;
      const mensagem = contactForm.querySelector('textarea').value;
      const textoWhatsApp = `Olá RAELA!%0A%0A*Nome:* ${nome}%0A*Email:* ${email}%0A*Telefone:* ${telefone}%0A*Serviço:* ${servico}%0A*Mensagem:* ${mensagem}`;
      window.open(`https://wa.me/244937909898?text=${textoWhatsApp}`, '_blank');
      contactForm.reset();
    });
  }

  // ===== ANIMAÇÕES NO SCROLL =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });
  document.querySelectorAll('.servico-card, .galeria-item, .doc-content, .vaga-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  // ===== CANDIDATURAS =====
  const candForm = document.getElementById('candidaturaForm');
  if (candForm) {
    const WHATS_RECRUTA = '244923842430';
    const EMAILS_RECRUTA = 'fatimaagostinhof@gmail.com,chelseoagostinhof@gmail.com';

    document.querySelectorAll('.btn-candidatar').forEach(btn => {
      btn.addEventListener('click', () => {
        const vaga = btn.getAttribute('data-vaga');
        const select = document.getElementById('candVaga');
        if (select) {
          Array.from(select.options).forEach(op => {
            if (op.text.trim() === vaga || op.value === vaga) {
              select.value = op.value;
            }
          });
        }
        const box = document.getElementById('candidaturaBox');
        if (box) {
          window.scrollTo({ top: box.offsetTop - 80, behavior: 'smooth' });
        }
        const nomeInput = document.getElementById('candNome');
        if (nomeInput) setTimeout(() => nomeInput.focus(), 600);
      });
    });

    function validarCandidatura() {
      const nome = document.getElementById('candNome').value.trim();
      const email = document.getElementById('candEmail').value.trim();
      const telefone = document.getElementById('candTelefone').value.trim();
      const vaga = document.getElementById('candVaga').value.trim();

      if (!nome || !email || !telefone || !vaga) {
        alert('Por favor, preencha os campos obrigatórios: Nome, Email, Telefone e Vaga.');
        return null;
      }
      return {
        nome,
        email,
        telefone,
        idade: document.getElementById('candIdade').value.trim() || 'Não indicado',
        vaga,
        area: document.getElementById('candArea').value.trim() || 'Não indicado',
        linkCV: document.getElementById('candLinkCV').value.trim() || 'Não indicado',
        experiencia: document.getElementById('candExperiencia').value.trim() || 'Não indicado',
        mensagem: document.getElementById('candMensagem').value.trim() || '—'
      };
    }

    const btnWhats = document.getElementById('btnEnviarWhatsApp');
    if (btnWhats) {
      btnWhats.addEventListener('click', () => {
        const dados = validarCandidatura();
        if (!dados) return;
        const texto =
          `*CANDIDATURA RAELA*%0A%0A` +
          `*Nome:* ${encodeURIComponent(dados.nome)}%0A` +
          `*Email:* ${encodeURIComponent(dados.email)}%0A` +
          `*Telefone:* ${encodeURIComponent(dados.telefone)}%0A` +
          `*Idade:* ${encodeURIComponent(dados.idade)}%0A` +
          `*Vaga:* ${encodeURIComponent(dados.vaga)}%0A` +
          `*Área/Formação:* ${encodeURIComponent(dados.area)}%0A` +
          `*Experiência:* ${encodeURIComponent(dados.experiencia)}%0A` +
          `*Link do CV:* ${encodeURIComponent(dados.linkCV)}%0A%0A` +
          `*Mensagem:*%0A${encodeURIComponent(dados.mensagem)}%0A%0A` +
          `_Enviado pelo site RAELA_`;
        window.open(`https://wa.me/${WHATS_RECRUTA}?text=${texto}`, '_blank');
      });
    }

    const btnEmail = document.getElementById('btnEnviarEmail');
    if (btnEmail) {
      btnEmail.addEventListener('click', () => {
        const dados = validarCandidatura();
        if (!dados) return;
        const assunto = `Candidatura RAELA — ${dados.vaga} — ${dados.nome}`;
        const corpo =
          `CANDIDATURA RAELA\n==============================\n\n` +
          `Nome: ${dados.nome}\nEmail: ${dados.email}\nTelefone: ${dados.telefone}\n` +
          `Idade: ${dados.idade}\nVaga: ${dados.vaga}\nÁrea/Formação: ${dados.area}\n` +
          `Experiência: ${dados.experiencia}\nLink do CV: ${dados.linkCV}\n\n` +
          `Mensagem:\n${dados.mensagem}\n\n==============================\nEnviado pelo site RAELA`;
        window.location.href = `mailto:${EMAILS_RECRUTA}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      });
    }
  }

  // ===== PUBLICAR VAGA (EMPRESAS) =====
  const vagaForm = document.getElementById('vagaForm');
  if (vagaForm) {
    const btnVagaWhats = document.getElementById('btnEnviarVagaWhatsApp');
    const btnVagaEmail = document.getElementById('btnEnviarVagaEmail');
    const WHATS_VAGA = '244923842430';
    const EMAIL_VAGA = 'fatimaagostinhof@gmail.com';

    function validarVaga() {
      const empresa = document.getElementById('empresaNome').value.trim();
      const email = document.getElementById('empresaEmail').value.trim();
      const telefone = document.getElementById('empresaTelefone').value.trim();
      const titulo = document.getElementById('vagaTitulo').value.trim();
      const tipo = document.getElementById('vagaTipo').value;
      const local = document.getElementById('vagaLocal').value.trim();
      const desc = document.getElementById('vagaDescricao').value.trim();

      if (!empresa || !email || !telefone || !titulo || !tipo || !local || !desc) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return null;
      }
      return { empresa, email, telefone, titulo, tipo, local, desc };
    }

    if (btnVagaWhats) {
      btnVagaWhats.addEventListener('click', () => {
        const dados = validarVaga();
        if (!dados) return;
        const texto = 
          `*NOVA VAGA PARA PUBLICAR*%0A%0A` +
          `*Empresa:* ${encodeURIComponent(dados.empresa)}%0A` +
          `*Email:* ${encodeURIComponent(dados.email)}%0A` +
          `*Telefone:* ${encodeURIComponent(dados.telefone)}%0A` +
          `*Título da Vaga:* ${encodeURIComponent(dados.titulo)}%0A` +
          `*Tipo:* ${encodeURIComponent(dados.tipo)}%0A` +
          `*Local:* ${encodeURIComponent(dados.local)}%0A%0A` +
          `*Descrição:*%0A${encodeURIComponent(dados.desc)}`;
        window.open(`https://wa.me/${WHATS_VAGA}?text=${texto}`, '_blank');
      });
    }

    if (btnVagaEmail) {
      btnVagaEmail.addEventListener('click', () => {
        const dados = validarVaga();
        if (!dados) return;
        const assunto = `Nova Vaga para Publicar — ${dados.titulo} (${dados.empresa})`;
        const corpo = 
          `PUBLICAR VAGA\n==============================\n\n` +
          `Empresa: ${dados.empresa}\nEmail: ${dados.email}\nTelefone: ${dados.telefone}\n` +
          `Título da Vaga: ${dados.titulo}\nTipo: ${dados.tipo}\nLocal: ${dados.local}\n\n` +
          `Descrição:\n${dados.desc}\n\n==============================\nEnviado pelo site RAELA`;
        window.location.href = `mailto:${EMAIL_VAGA}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      });
    }
  }
});
