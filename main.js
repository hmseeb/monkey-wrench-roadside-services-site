/* Monkey Wrench Roadside Services — main.js */

(function () {
  'use strict';

  /* ----- Mobile nav toggle ----- */
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.querySelector('.main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      this.classList.toggle('open');
      mainNav.classList.toggle('open');
    });

    // Close nav on link click
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        mainNav.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        mainNav.classList.remove('open');
      }
    });
  }

  /* ----- Scroll fade-in animation ----- */
  function initFadeUp() {
    var targets = document.querySelectorAll(
      '.service-card, .why-list li, .contact-card, .section-header, .why-text-col, .why-img-col'
    );
    targets.forEach(function (el) {
      el.classList.add('fade-up');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            // Stagger cards in the same parent
            var siblings = Array.from(entry.target.parentElement.children);
            var idx = siblings.indexOf(entry.target);
            setTimeout(function () {
              entry.target.classList.add('visible');
            }, idx * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  if ('IntersectionObserver' in window) {
    initFadeUp();
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.fade-up').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ----- Contact form ----- */
  var form    = document.getElementById('contact-form');
  var success = document.getElementById('form-success');

  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name  = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();

      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      // Simulate send (no backend)
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      setTimeout(function () {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Send Message';
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(function () {
          success.hidden = true;
        }, 6000);
      }, 900);
    });
  }

  /* ----- Smooth scroll for anchor links (older browsers) ----- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ----- Header shadow on scroll ----- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,.12)';
      } else {
        header.style.boxShadow = '';
      }
    }, { passive: true });
  }

})();
