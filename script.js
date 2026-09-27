/* Dr Thanish · Medical Oncologist — page behaviour */
(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');

  /* Footer year */
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Hairline under the header once the page has scrolled */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  const setMenu = (open) => {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 861px)').addEventListener('change', (event) => {
    if (event.matches) setMenu(false);
  });

  /* Mark the nav link for the section currently in view */
  const navLinks = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const current = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', current);
          if (current) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach((section) => observer.observe(section));
  }

  /* Copy the clinic email address */
  const emailLink = document.querySelector('[data-contact-email]');
  const copyButton = document.querySelector('[data-copy-email]');
  const clinicEmail = emailLink ? emailLink.textContent.trim() : '';

  const flash = (button, text) => {
    const original = button.dataset.label || button.textContent;
    button.dataset.label = original;
    button.textContent = text;
    clearTimeout(button._flashTimer);
    button._flashTimer = setTimeout(() => { button.textContent = original; }, 2000);
  };

  const selectText = (element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  if (emailLink && copyButton) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(clinicEmail);
        flash(copyButton, 'Copied');
      } catch {
        selectText(emailLink);
        flash(copyButton, 'Selected');
      }
    });
  }

  /* Appointment request: validate, then hand over to the visitor's email app */
  const form = document.getElementById('appointment-form');
  const status = document.getElementById('form-status');

  const messages = {
    name: 'Enter your full name.',
    phone: 'Enter a phone number using digits, spaces or a leading +.',
    reason: 'Choose a reason for your visit.',
  };

  const showFieldState = (field) => {
    const valid = field.checkValidity();
    const error = document.getElementById(`${field.id}-error`);
    field.setAttribute('aria-invalid', String(!valid));
    if (error) error.textContent = valid ? '' : messages[field.id] || 'Check this field.';
    return valid;
  };

  if (form) {
    const required = [...form.querySelectorAll('[required]')];

    required.forEach((field) => {
      const recheck = () => {
        if (field.getAttribute('aria-invalid') === 'true') showFieldState(field);
      };
      field.addEventListener('input', recheck);
      field.addEventListener('change', recheck);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const invalid = required.filter((field) => !showFieldState(field));
      if (invalid.length) {
        status.textContent = 'Some details are missing. Check the highlighted fields.';
        status.classList.add('is-error');
        invalid[0].focus();
        return;
      }

      const data = new FormData(form);
      const name = String(data.get('name')).trim();
      const subject = `Consultation request: ${name}`;
      const body = [
        `Name: ${name}`,
        `Phone: ${String(data.get('phone')).trim()}`,
        `Reason for visit: ${data.get('reason')}`,
        '',
        String(data.get('message') || '').trim(),
      ].join('\n').trim();

      window.location.href = `mailto:${clinicEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      status.classList.remove('is-error');
      status.textContent = `Your email app should open with this request filled in, ready to send. If it doesn't, write to ${clinicEmail} or call the clinic.`;
    });
  }
})();
