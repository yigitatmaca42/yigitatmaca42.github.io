(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  var formMessage = document.getElementById('formMessage');
  var submitBtn = document.getElementById('submitBtn');
  var submitLabel = submitBtn.textContent;
  var isSubmitting = false;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var fields = ['name', 'email', 'subject', 'message'].map(function (id) {
    return {
      id: id,
      input: document.getElementById(id),
      error: document.getElementById(id + '-error')
    };
  });

  function setFieldError(field, message) {
    field.input.setAttribute('aria-invalid', 'true');
    field.error.textContent = message;
    field.error.hidden = false;
  }

  function clearFieldError(field) {
    field.input.removeAttribute('aria-invalid');
    field.error.textContent = '';
    field.error.hidden = true;
  }

  function validateField(field) {
    var value = field.input.value.trim();

    if (!value) {
      setFieldError(field, 'Bu alan zorunludur.');
      return false;
    }

    if (field.id === 'email' && !EMAIL_RE.test(value)) {
      setFieldError(field, 'Geçerli bir e-posta adresi gir.');
      return false;
    }

    if (field.id === 'message' && value.length < 10) {
      setFieldError(field, 'Mesajın en az 10 karakter olmalı.');
      return false;
    }

    clearFieldError(field);
    return true;
  }

  fields.forEach(function (field) {
    field.input.addEventListener('blur', function () { validateField(field); });
    field.input.addEventListener('input', function () {
      if (field.input.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (isSubmitting) return;

    var allValid = fields.reduce(function (valid, field) {
      return validateField(field) && valid;
    }, true);

    if (!allValid) {
      fields.find(function (f) { return f.input.getAttribute('aria-invalid') === 'true'; }).input.focus();
      return;
    }

    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Gönderiliyor…';
    formMessage.className = 'form-message';
    formMessage.textContent = '';

    var formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          formMessage.textContent = 'Mesajın başarıyla gönderildi. En kısa sürede dönüş yapacağım.';
          formMessage.className = 'form-message is-success';
          form.reset();
          fields.forEach(clearFieldError);
        } else {
          formMessage.textContent = 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar dene.';
          formMessage.className = 'form-message is-error';
        }
      })
      .catch(function () {
        formMessage.textContent = 'Bağlantı hatası oluştu. Lütfen daha sonra tekrar dene.';
        formMessage.className = 'form-message is-error';
      })
      .finally(function () {
        isSubmitting = false;
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      });
  });
})();
