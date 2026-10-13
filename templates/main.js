document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mostrar mensajes o alertas (Consigna 1)
  // ==========================================
  alert("¡Bienvenido a POVIMARKET! Tu tienda de claves digitales.");


  // ==========================================
  // 2. Validación de formularios (Consigna 2)
  // ==========================================
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required]');

      inputs.forEach(input => {
        const existingError = input.parentNode.querySelector('.error-msg');
        if (existingError) existingError.remove();

        if (!input.value.trim()) {
          showError(input, 'Este campo es obligatorio.');
          isValid = false;
        } 
        else if (input.type === 'email' || input.id.includes('email')) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            showError(input, 'Ingresá un correo electrónico válido (ejemplo@dominio.com).');
            isValid = false;
          }
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  function showError(inputElement, message) {
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error-msg';
    errorSpan.style.color = '#dc2626';
    errorSpan.style.fontSize = '0.85rem';
    errorSpan.style.marginTop = '0.2rem';
    errorSpan.style.display = 'block';
    errorSpan.style.fontWeight = 'bold';
    errorSpan.innerText = message;
    inputElement.parentNode.appendChild(errorSpan);
  }


  // ==========================================
  // 3. Fecha y hora en tiempo real (Consigna 3)
  // ==========================================
  // Crear elemento de reloj para el Header y Footer
  const footer = document.querySelector('.site-footer');
  const headerContainer = document.querySelector('.header-container');

  let clockFooter = document.createElement('p');
  clockFooter.id = 'live-clock-footer';
  clockFooter.style.fontSize = '0.9rem';
  clockFooter.style.marginTop = '0.5rem';
  clockFooter.style.fontWeight = 'bold';
  if (footer) footer.appendChild(clockFooter);

  let clockHeader = document.createElement('div');
  clockHeader.id = 'live-clock-header';
  clockHeader.style.fontSize = '0.85rem';
  clockHeader.style.color = '#e9d5ff';
  clockHeader.style.fontWeight = 'bold';
  clockHeader.style.padding = '0.3rem 0.6rem';
  clockHeader.style.borderRadius = '6px';
  clockHeader.style.backgroundColor = '#1a0830';
  clockHeader.style.border = '1px solid #a855f7';
  if (headerContainer) headerContainer.appendChild(clockHeader);

  function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = now.toLocaleDateString('es-AR', options);
    const timeStr = now.toLocaleTimeString('es-AR');

    const clockText = `📅 ${dateStr} | ⏰ ${timeStr}`;
    
    if (clockFooter) clockFooter.innerText = clockText;
    if (clockHeader) clockHeader.innerText = clockText;
  }

  updateClock();
  setInterval(updateClock, 1000);


  // ==========================================
  // 4. Menús interactivos (Consigna 4)
  // ==========================================
  const navLinks = document.querySelector('.nav-links');
  const navHeader = document.querySelector('.nav-header');

  if (navLinks && navHeader) {
    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = '☰ Menú Nav';
    toggleBtn.className = 'menu-toggle-btn';
    toggleBtn.style.backgroundColor = '#7c3aed';
    toggleBtn.style.color = '#fff';
    toggleBtn.style.border = 'none';
    toggleBtn.style.padding = '0.5rem 1rem';
    toggleBtn.style.borderRadius = '6px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.margin = '0.5rem auto';
    toggleBtn.style.display = 'block';

    navHeader.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'none' || navLinks.style.display === '') {
        navLinks.style.display = 'flex';
      } else {
        navLinks.style.display = 'none';
      }
    });
  }


  // ==========================================
  // 5. Galería de imágenes y Zoom (Consigna 5)
  // ==========================================
  const imageContainers = document.querySelectorAll('.viral-list, .cards-grid-2, main');
  let images = [];
  
  imageContainers.forEach(container => {
    const foundImgs = container.querySelectorAll('img');
    foundImgs.forEach(img => {
      if (!img.classList.contains('logo-img') && !img.classList.contains('mascot-img')) {
        images.push(img);
      }
    });
  });

  if (images.length > 0) {
    let currentIndex = 0;

    let modal = document.getElementById('gallery-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'gallery-modal';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
      modal.style.display = 'none';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = '10000';
      modal.style.flexDirection = 'column';

      modal.innerHTML = `
        <div style="position: relative; text-align: center;">
          <span id="close-modal" style="position: absolute; top: -40px; right: 0; color: #fff; font-size: 2rem; cursor: pointer;">&times;</span>
          <img id="modal-img" src="" style="max-width: 80vw; max-height: 70vh; border-radius: 8px; border: 3px solid #a855f7; object-fit: contain;">
          <div style="margin-top: 1rem; display: flex; gap: 1rem; justify-content: center;">
            <button id="prev-btn" style="background: #9333ea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">◄ Anterior</button>
            <button id="next-btn" style="background: #9333ea; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: bold;">Siguiente ►</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close-modal');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    function updateModalImage(index) {
      currentIndex = index;
      modalImg.src = images[currentIndex].src;
    }

    images.forEach((img, idx) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        modal.style.display = 'flex';
        updateModalImage(idx);
      });
    });

    closeModal.addEventListener('click', () => modal.style.display = 'none');
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateModalImage(currentIndex);
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateModalImage(currentIndex);
    });
  }


  // ==========================================
  // 6. Cambiar el tema de la página (Consigna 6)
  // ==========================================
  if (headerContainer && !document.querySelector('.theme-toggle-btn')) {
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-toggle-btn';
    themeBtn.innerText = '🌙 / ☀️ Tema';
    themeBtn.style.backgroundColor = '#3b1566';
    themeBtn.style.color = '#e9d5ff';
    themeBtn.style.border = '1px solid #a855f7';
    themeBtn.style.padding = '0.5rem 0.8rem';
    themeBtn.style.borderRadius = '8px';
    themeBtn.style.cursor = 'pointer';
    themeBtn.style.fontWeight = 'bold';

    headerContainer.appendChild(themeBtn);

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }


  // ==========================================
  // 7. Formulario con Resumen previo (Consigna 7)
  // ==========================================
  const supportForm = document.querySelector('.support-form');
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      const textarea = supportForm.querySelector('textarea');
      if (textarea && textarea.value.trim()) {
        e.preventDefault();

        const confirmSubmit = confirm(`Resumen de tu consulta:\n\n"${textarea.value.trim()}"\n\n¿Deseás enviar esta consulta al equipo de Soporte Técnico?`);
        if (confirmSubmit) {
          alert('¡Consulta enviada con éxito! Nos pondremos en contacto pronto.');
          supportForm.reset();
        }
      }
    });
  }

});