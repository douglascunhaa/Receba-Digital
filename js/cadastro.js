// ============================================
// FORM INTERACTIVITY & VALIDATION
// Cadastro de Organizador
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // PASSWORD TOGGLE
    // ============================================
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.innerHTML = `
                    <svg class="eye-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M14.12 14.12A8.9 8.9 0 0110 16C4 16 1 10 1 10a13.16 13.16 0 013.88-4.12M9 5a3 3 0 013 3M17 3L3 17M10 4c6 0 9 6 9 6a13.16 13.16 0 01-1.88 2.88" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                `;
            } else {
                passwordInput.type = 'password';
                this.innerHTML = `
                    <svg class="eye-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                `;
            }
        });
    });

    // ============================================
    // CEP LOOKUP
    // ============================================
    const searchCepButton = document.getElementById('searchCep');
    const cepInput = document.getElementById('cep');
    
    if (searchCepButton) {
        searchCepButton.addEventListener('click', async function() {
            const cep = cepInput.value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                showToast('Por favor, insira um CEP válido com 8 dígitos', 'error');
                return;
            }
            
            // Show loading state
            this.disabled = true;
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="spinning">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-dasharray="40" stroke-dashoffset="40"/>
                </svg>
            `;
            
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                
                if (data.erro) {
                    showToast('CEP não encontrado', 'error');
                } else {
                    // Fill address fields
                    document.getElementById('endereco').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    document.getElementById('uf').value = data.uf || '';
                    
                    // Focus on number field
                    document.getElementById('numero').focus();
                    
                    showToast('Endereço encontrado com sucesso!', 'success');
                }
            } catch (error) {
                showToast('Erro ao buscar CEP. Tente novamente.', 'error');
            } finally {
                // Restore button
                this.disabled = false;
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="2"/>
                        <path d="M11 11L14 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                `;
            }
        });
        
        // Allow Enter key to trigger search
        cepInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                searchCepButton.click();
            }
        });
    }

    // ============================================
    // INPUT MASKS
    // ============================================
    
    // CEP Mask
    const cepInputs = document.querySelectorAll('input[name="cep"]');
    cepInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            if (value.length > 5) {
                value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = value;
        });
    });
    
    // CPF Mask
    const cpfInputs = document.querySelectorAll('input[id*="cpf"], input[id*="Cpf"]');
    cpfInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            value = value.replace(/^(\d{3})(\d)/, '$1.$2');
            value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1-$2');
            e.target.value = value;
        });
    });
    
    // CNPJ Mask
    const cnpjInput = document.getElementById('cnpj');
    if (cnpjInput) {
        cnpjInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 14) value = value.slice(0, 14);
            value = value.replace(/^(\d{2})(\d)/, '$1.$2');
            value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
    
    // Phone Mask (Celular)
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length <= 10) {
                // Telefone fixo (00) 0000-0000
                value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            } else {
                // Celular (00) 00000-0000
                value = value.replace(/^(\d{2})(\d)/, '($1) $2');
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            }
            
            e.target.value = value;
        });
    });

    // ============================================
    // FORM VALIDATION
    // ============================================
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        // Real-time validation
        const inputs = registrationForm.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const allInputs = this.querySelectorAll('input[required], select[required]');
            
            allInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Collect form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                console.log('Form Data:', data);
                
                // Show success message
                showToast('Cadastro realizado com sucesso! Redirecionando...', 'success');
                
                // Simulate redirect after 2 seconds
                setTimeout(() => {
                    // window.location.href = 'organizador-dashboard.html';
                    console.log('Redirect to dashboard');
                }, 2000);
            } else {
                showToast('Por favor, preencha todos os campos obrigatórios corretamente', 'error');
                
                // Scroll to first error
                const firstError = this.querySelector('.is-invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    }

    // ============================================
    // FIELD VALIDATION FUNCTION
    // ============================================
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'E-mail inválido';
            }
        }
        
        // CPF validation (basic)
        if (field.id.toLowerCase().includes('cpf') && value) {
            const cpfClean = value.replace(/\D/g, '');
            if (cpfClean.length !== 11) {
                isValid = false;
                errorMessage = 'CPF deve ter 11 dígitos';
            }
        }
        
        // CNPJ validation (basic)
        if (field.id === 'cnpj' && value) {
            const cnpjClean = value.replace(/\D/g, '');
            if (cnpjClean.length !== 14) {
                isValid = false;
                errorMessage = 'CNPJ deve ter 14 dígitos';
            }
        }
        
        // Update field state
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            removeErrorMessage(field);
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
            showErrorMessage(field, errorMessage);
        }
        
        return isValid;
    }

    function showErrorMessage(field, message) {
        removeErrorMessage(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-error';
        errorDiv.textContent = message;
        
        field.parentElement.appendChild(errorDiv);
    }

    function removeErrorMessage(field) {
        const existingError = field.parentElement.querySelector('.text-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.form-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // ============================================
    // TIPO PESSOA CHANGE
    // ============================================
    const tipoPessoaSelect = document.getElementById('tipoPessoa');
    const cnpjField = document.getElementById('cnpj');
    const cnpjLabel = cnpjField?.previousElementSibling;
    
    if (tipoPessoaSelect && cnpjField) {
        tipoPessoaSelect.addEventListener('change', function() {
            if (this.value === 'fisica') {
                cnpjLabel.textContent = 'CPF ';
                cnpjField.placeholder = '000.000.000-00';
            } else {
                cnpjLabel.textContent = 'CNPJ ';
                cnpjField.placeholder = '00.000.000/0000-00';
            }
            
            // Add required asterisk
            const required = document.createElement('span');
            required.className = 'required';
            required.textContent = '*';
            cnpjLabel.appendChild(required);
            
            cnpjField.value = '';
        });
    }
});

// ============================================
// CSS ANIMATIONS (injected)
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes spinning {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .spinning {
        animation: spinning 1s linear infinite;
    }
`;
document.head.appendChild(style);
