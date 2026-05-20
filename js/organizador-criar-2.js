/* ==========================================================================
   ORGANIZADOR CRIAR 2 — Validações e máscaras
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // MÁSCARAS DE INPUT
  // ============================================
  
  // CEP
  const cepInput = document.getElementById('cep');
  if (cepInput) {
    cepInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 8) value = value.slice(0, 8);
      if (value.length > 5) {
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      }
      e.target.value = value;
    });

    // Buscar CEP
    cepInput.addEventListener('blur', async function() {
      const cep = this.value.replace(/\D/g, '');
      if (cep.length === 8) {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          
          if (!data.erro) {
            document.getElementById('endereco').value = data.logradouro || '';
            document.getElementById('bairro').value = data.bairro || '';
            showToast('CEP encontrado!', 'success');
          }
        } catch (error) {
          console.error('Erro ao buscar CEP:', error);
        }
      }
    });
  }
  
  // CPF/CNPJ
  const cpfInputs = document.querySelectorAll('#cnpj, #cpfRepresentante, #cpfBeneficiario, #cpfUsuario');
  cpfInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      // Se for CNPJ (14 dígitos)
      if (input.id === 'cnpj' && value.length > 11) {
        if (value.length > 14) value = value.slice(0, 14);
        value = value.replace(/^(\d{2})(\d)/, '$1.$2');
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        // CPF (11 dígitos)
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/^(\d{3})(\d)/, '$1.$2');
        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');
      }
      
      e.target.value = value;
    });
  });
  
  // Telefone/Celular
  const phoneInputs = document.querySelectorAll('#celularRepresentante, #celular1, #celular2, #telefone, #telefoneUsuario');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
      } else {
        value = value.replace(/^(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
      }
      
      e.target.value = value;
    });
  });

  // ============================================
  // TIPO DE PESSOA - ALTERA LABEL
  // ============================================
  const tipoPessoaSelect = document.getElementById('tipoPessoa');
  const cnpjInput = document.getElementById('cnpj');
  const cnpjLabel = cnpjInput?.closest('.form-group')?.querySelector('.form-label');
  
  if (tipoPessoaSelect && cnpjInput && cnpjLabel) {
    tipoPessoaSelect.addEventListener('change', function() {
      if (this.value === 'fisica') {
        cnpjLabel.innerHTML = 'CPF *';
        cnpjInput.placeholder = '000.000.000-00';
      } else {
        cnpjLabel.innerHTML = 'CNPJ *';
        cnpjInput.placeholder = '00.000.000/0000-00';
      }
      cnpjInput.value = '';
    });
  }

  // ============================================
  // VALIDAÇÃO DO FORMULÁRIO
  // ============================================
  const form = document.getElementById('formCadastro');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#dc3545';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) {
        showToast('Por favor, preencha todos os campos obrigatórios', 'error');
        const firstInvalid = form.querySelector('[required]:not([value])');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
        return;
      }
      
      // Se válido
      const submitBtn = form.querySelector('button[type="submit"]');
      if (typeof fakeLoadingButton === 'function') {
        fakeLoadingButton(submitBtn, () => {
          showToast('Cadastro realizado com sucesso!', 'success');
          setTimeout(() => {
            window.location.href = 'organizador-criar-3.html';
          }, 1500);
        }, 'Processando...');
      } else {
        showToast('Cadastro realizado com sucesso!', 'success');
        setTimeout(() => {
          window.location.href = 'organizador-criar-3.html';
        }, 1500);
      }
    });

    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', function() {
        if (this.value.trim()) {
          this.style.borderColor = '';
        }
      });
    });
  }

});
