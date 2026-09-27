(function () {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  var formMessage = document.getElementById('formMessage');
  var submitBtn = document.getElementById('submitBtn');
  var submitLabel = submitBtn.textContent;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

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
        submitBtn.disabled = false;
        submitBtn.textContent = submitLabel;
      });
  });
})();
