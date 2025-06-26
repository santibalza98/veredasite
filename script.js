// Vereda Labs Website JavaScript
// Funcionalidad mejorada con colores orgánicos y mejor UX

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización
    initializeWebsite();
    setupEventListeners();
    setupScrollEffects();
});

function initializeWebsite() {
    // Configuración inicial
    console.log('Vereda Labs Website Initialized');
    
    // Configurar smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Configurar animaciones de entrada
    setupIntersectionObserver();
}

function setupEventListeners() {
    // Event listeners para navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Event listeners para botones CTA
    const ctaButtons = document.querySelectorAll('[onclick*="Form"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('onclick');
            if (action.includes('Empresas')) {
                showEmpresasForm();
            } else if (action.includes('Personas')) {
                showPersonasForm();
            }
        });
    });
    
    // Event listeners para cerrar modales
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });
    
    // Event listener para ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function setupScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(245, 243, 231, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(74, 124, 89, 0.1)';
        } else {
            header.style.background = 'rgba(245, 243, 231, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const animatedElements = document.querySelectorAll('.step, .path-card, .stat-item, .testimonial-card, .value-card');
    animatedElements.forEach(el => observer.observe(el));
}

// Funciones de modales mejoradas
function showEmpresasForm() {
    const modalHTML = `
        <div class="modal active" id="empresas-modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                <h2><i class="fas fa-building" style="color: var(--primary-green); margin-right: 10px;"></i>Contacto para Empresas</h2>
                <form id="empresas-form" onsubmit="submitEmpresasForm(event)">
                    <div class="form-group">
                        <label for="empresa-nombre">Nombre de la empresa</label>
                        <input type="text" id="empresa-nombre" name="empresa-nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="contacto-nombre">Nombre del contacto</label>
                        <input type="text" id="contacto-nombre" name="contacto-nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="empresa-email">Email</label>
                        <input type="email" id="empresa-email" name="empresa-email" required>
                    </div>
                    <div class="form-group">
                        <label for="empresa-telefono">Teléfono</label>
                        <input type="tel" id="empresa-telefono" name="empresa-telefono">
                    </div>
                    <div class="form-group">
                        <label for="empresa-necesidad">Describe tu necesidad de talento</label>
                        <textarea id="empresa-necesidad" name="empresa-necesidad" rows="4" placeholder="Cuéntanos qué tipo de talento necesitas, en qué área, y cuáles son tus principales desafíos..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">
                        <i class="fas fa-paper-plane"></i>
                        Enviar solicitud
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Focus en el primer campo
    setTimeout(() => {
        document.getElementById('empresa-nombre').focus();
    }, 100);
}

function showPersonasForm() {
    const modalHTML = `
        <div class="modal active" id="personas-modal">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()">&times;</button>
                <h2><i class="fas fa-user-graduate" style="color: var(--soft-orange); margin-right: 10px;"></i>Contacto para Profesionales</h2>
                <form id="personas-form" onsubmit="submitPersonasForm(event)">
                    <div class="form-group">
                        <label for="persona-nombre">Nombre completo</label>
                        <input type="text" id="persona-nombre" name="persona-nombre" required>
                    </div>
                    <div class="form-group">
                        <label for="persona-email">Email</label>
                        <input type="email" id="persona-email" name="persona-email" required>
                    </div>
                    <div class="form-group">
                        <label for="persona-telefono">Teléfono</label>
                        <input type="tel" id="persona-telefono" name="persona-telefono">
                    </div>
                    <div class="form-group">
                        <label for="persona-experiencia">Experiencia profesional actual</label>
                        <textarea id="persona-experiencia" name="persona-experiencia" rows="3" placeholder="Cuéntanos sobre tu experiencia actual, área de trabajo, y principales habilidades..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="persona-objetivos">¿Qué objetivos profesionales tienes?</label>
                        <textarea id="persona-objetivos" name="persona-objetivos" rows="3" placeholder="Describe hacia dónde quieres dirigir tu carrera, qué habilidades te gustaría desarrollar..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="persona-cv">Adjuntar CV (opcional)</label>
                        <input type="file" id="persona-cv" name="persona-cv" accept=".pdf,.doc,.docx">
                        <small style="color: var(--text-secondary); font-size: 0.9rem;">Formatos aceptados: PDF, DOC, DOCX</small>
                    </div>
                    <button type="submit" class="btn btn-secondary" style="width: 100%;">
                        <i class="fas fa-rocket"></i>
                        Enviar solicitud
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
    
    // Focus en el primer campo
    setTimeout(() => {
        document.getElementById('persona-nombre').focus();
    }, 100);
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.remove();
    });
    document.body.style.overflow = 'auto';
}

// Funciones de envío de formularios
function submitEmpresasForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validación básica
    if (!validateForm(data, 'empresa')) {
        return;
    }
    
    // Mostrar loading
    showLoading(event.target);
    
    // Simular envío (en producción, aquí iría la llamada al backend)
    setTimeout(() => {
        sendEmailToVereda(data, 'empresa');
        showSuccessMessage('empresa');
        closeModal();
    }, 1500);
}

function submitPersonasForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Validación básica
    if (!validateForm(data, 'persona')) {
        return;
    }
    
    // Mostrar loading
    showLoading(event.target);
    
    // Simular envío (en producción, aquí iría la llamada al backend)
    setTimeout(() => {
        sendEmailToVereda(data, 'persona');
        showSuccessMessage('persona');
        closeModal();
    }, 1500);
}

function validateForm(data, type) {
    const requiredFields = type === 'empresa' 
        ? ['empresa-nombre', 'contacto-nombre', 'empresa-email', 'empresa-necesidad']
        : ['persona-nombre', 'persona-email', 'persona-experiencia', 'persona-objetivos'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            showError(`Por favor completa el campo: ${field.replace('-', ' ')}`);
            return false;
        }
    }
    
    // Validar email
    const emailField = type === 'empresa' ? 'empresa-email' : 'persona-email';
    if (!isValidEmail(data[emailField])) {
        showError('Por favor ingresa un email válido');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showLoading(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    submitButton.dataset.originalText = originalText;
}

function sendEmailToVereda(data, type) {
    // En un entorno de producción, aquí se haría una llamada al backend
    // Por ahora, creamos un mailto como solución temporal
    
    const subject = type === 'empresa' 
        ? `Nueva consulta de empresa: ${data['empresa-nombre'] || 'Sin nombre'}`
        : `Nueva consulta de profesional: ${data['persona-nombre'] || 'Sin nombre'}`;
    
    let body = `Nuevo contacto desde la página web de Vereda Labs:\n\n`;
    
    if (type === 'empresa') {
        body += `Tipo: Empresa\n`;
        body += `Empresa: ${data['empresa-nombre']}\n`;
        body += `Contacto: ${data['contacto-nombre']}\n`;
        body += `Email: ${data['empresa-email']}\n`;
        body += `Teléfono: ${data['empresa-telefono'] || 'No proporcionado'}\n`;
        body += `Necesidad: ${data['empresa-necesidad']}\n`;
    } else {
        body += `Tipo: Profesional\n`;
        body += `Nombre: ${data['persona-nombre']}\n`;
        body += `Email: ${data['persona-email']}\n`;
        body += `Teléfono: ${data['persona-telefono'] || 'No proporcionado'}\n`;
        body += `Experiencia: ${data['persona-experiencia']}\n`;
        body += `Objetivos: ${data['persona-objetivos']}\n`;
    }
    
    body += `\nFecha: ${new Date().toLocaleString('es-ES')}\n`;
    
    // Crear enlace mailto (solución temporal)
    const mailtoLink = `mailto:info@veredalabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    console.log('Email data prepared:', { subject, body, data });
}

function showSuccessMessage(type) {
    const message = type === 'empresa' 
        ? '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto para discutir tus necesidades de talento.'
        : '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto para explorar oportunidades de desarrollo profesional.';
    
    // Crear notificación de éxito
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-green);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-medium);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
            <div>
                <strong>¡Mensaje enviado!</strong><br>
                <small>${message}</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover notificación después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function showError(message) {
    // Crear notificación de error
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #EF4444;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-medium);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 1.2rem;"></i>
            <div>
                <strong>Error</strong><br>
                <small>${message}</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remover notificación después de 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Funciones de navegación
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Animaciones CSS adicionales
const additionalStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .modal {
        animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
        animation: slideInUp 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

// Agregar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Funciones de utilidad
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimización de scroll
const optimizedScrollHandler = debounce(() => {
    // Aquí se pueden agregar más efectos de scroll optimizados
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Funciones globales para compatibilidad
window.showEmpresasForm = showEmpresasForm;
window.showPersonasForm = showPersonasForm;
window.closeModal = closeModal;
window.scrollToSection = scrollToSection;
window.submitEmpresasForm = submitEmpresasForm;
window.submitPersonasForm = submitPersonasForm;


// Burger menu toggle
function toggleMenu() {
  const menu = document.querySelector('.nav-menu');
  menu.classList.toggle('active');
}

// Close the menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.querySelector('.nav-menu');
      if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });
  });
});
