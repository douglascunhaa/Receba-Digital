/* ==========================================================================
   RECEBE DIGITAL — JS Global
   Micro-interações e helpers
   ========================================================================== */

// Toast notification
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#FF6600' : type === 'info' ? '#58C6C7' : '#dc3545'};
    color: white;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    transform: translateX(120%);
    transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  `;
  document.body.appendChild(toast);

  setTimeout(() => toast.style.transform = 'translateX(0)', 50);
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Botão com loading fictício
function fakeLoadingButton(btn, callback, loadingText = 'Carregando...') {
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.style.opacity = '0.7';
  btn.innerHTML = `<span class="spinner"></span> ${loadingText}`;
  setTimeout(() => {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.innerHTML = original;
    if (callback) callback();
  }, 900);
}

// Spinner CSS injection
(function injectSpinner() {
  const style = document.createElement('style');
  style.textContent = `
    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.4);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin-right: 8px;
      vertical-align: middle;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
})();

// Efeito de "ripple" em botões ao clicar
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.btn, .btn-nav');
  if (!btn) return;
  const ripple = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.4);
    width: ${size}px;
    height: ${size}px;
    left: ${e.clientX - rect.left - size / 2}px;
    top: ${e.clientY - rect.top - size / 2}px;
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  `;
  btn.style.position = btn.style.position || 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

(function () {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to { transform: scale(2); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

// Marca a aba ativa do menu pela URL
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });
});
