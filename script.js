document.addEventListener('DOMContentLoaded', () => {
  const phone = '+919765320683';
  const whatsappNumber = '919765320683';
  const secondWhatsappNumber = '919834752705';
  const email = 'absbirdnetting@gmail.com';

  const whatsappLinks = document.querySelectorAll('[data-whatsapp-link]');
  const phoneLinks = document.querySelectorAll('[data-phone-link]');
  const emailLinks = document.querySelectorAll('[data-email-link]');
  const inquiryForm = document.getElementById('inquiry-form');
  const formMessage = document.getElementById('form-message');
  const yearEl = document.getElementById('year');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const serviceLink = document.querySelector('.nav-link[href="services.html"]');
  const revealItems = document.querySelectorAll('.card, .benefit-card, .testimonial-card, .feature-box, .hero-card, .promo-card, .step-card, .compare-card, .photo-card');
  const countItems = document.querySelectorAll('[data-count]');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  whatsappLinks.forEach((link) => {
    link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hello, I need a quote for bird net or invisible grill services.')}`;
    link.addEventListener('click', () => {
      link.classList.add('is-clicked');
      setTimeout(() => link.classList.remove('is-clicked'), 300);
    });
  });

  phoneLinks.forEach((link) => {
    link.href = `tel:${phone}`;
    link.textContent = `Call ${phone}`;
    link.addEventListener('click', () => {
      link.classList.add('is-clicked');
      setTimeout(() => link.classList.remove('is-clicked'), 300);
    });
  });

  emailLinks.forEach((link) => {
    link.href = `mailto:${email}`;
    link.textContent = 'Email Us';
    link.addEventListener('click', () => {
      link.classList.add('is-clicked');
      setTimeout(() => link.classList.remove('is-clicked'), 300);
    });
  });

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('active');
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
    });

    siteNav.querySelectorAll('a').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        if (anchor === serviceLink) {
          event.preventDefault();
          triggerPigeonFlight(anchor.href);
          return;
        }
        siteNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function triggerPigeonFlight(targetUrl) {
    const pigeon = document.createElement('div');
    pigeon.className = 'pigeon-flight';
    pigeon.innerHTML = '🕊️';
    document.body.appendChild(pigeon);

    const startX = window.innerWidth * 0.1;
    const startY = window.innerHeight * 0.8;
    const endX = window.innerWidth * 0.9;
    const endY = window.innerHeight * 0.1;

    pigeon.animate([
      { transform: `translate(${startX}px, ${startY}px) scale(1)`, opacity: 1 },
      { transform: `translate(${endX}px, ${endY}px) scale(1.2)`, opacity: 0.8 },
      { transform: `translate(${endX + 80}px, ${endY - 40}px) scale(0.1)`, opacity: 0 }
    ], {
      duration: 900,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards'
    });

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 800);
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(inquiryForm);
      const name = formData.get('name')?.toString().trim() || 'Guest';
      const phoneValue = formData.get('phone')?.toString().trim() || 'Not provided';
      const emailValue = formData.get('email')?.toString().trim() || 'Not provided';
      const service = formData.get('service')?.toString().trim() || 'Not specified';
      const message = formData.get('message')?.toString().trim() || 'No additional details provided.';

      const text = `New inquiry from website\nName: ${name}\nPhone: ${phoneValue}\nEmail: ${emailValue}\nService: ${service}\nMessage: ${message}`;
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      const secondWhatsappUrl = `https://wa.me/${secondWhatsappNumber}?text=${encodeURIComponent(text)}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      window.open(secondWhatsappUrl, '_blank', 'noopener,noreferrer');

      inquiryForm.reset();
      if (formMessage) {
        formMessage.textContent = 'Thank you! We have opened WhatsApp for your inquiry.';
        formMessage.style.color = '#2f9e44';
      }
    });
  }

  const revealOnScroll = () => {
    revealItems.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        item.classList.add('is-visible');
        item.style.transitionDelay = `${index * 80}ms`;
      }
    });

    countItems.forEach((counter) => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60 && !counter.dataset.animated) {
        const target = Number(counter.dataset.count || 0);
        let current = 0;
        const step = () => {
          current += Math.max(1, Math.floor(target / 20));
          if (current >= target) {
            counter.textContent = target.toLocaleString();
            counter.dataset.animated = 'true';
            return;
          }
          counter.textContent = current.toLocaleString();
          requestAnimationFrame(step);
        };
        step();
      }
    });
  };

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll, { passive: true });
});
