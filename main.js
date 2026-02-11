/* ═══════════════════════════════════════
   INjoy Riverside — Investor Portal JS
   Scroll animations, counters, chart fills
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Nav Toggle ──
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── Scroll Observer for Animations ──
  const scrollElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        // Trigger charts within this element
        animateChartsIn(entry.target);

        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  scrollElements.forEach(el => observer.observe(el));

  // ── Hero Counter Animation ──
  animateHeroCounters();

  // ── Nav shrink on scroll ──
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(10,12,16,0.95)';
    } else {
      nav.style.background = 'rgba(10,12,16,0.85)';
    }
  });

  // ── Story image fallback ──
  const storyImg = document.getElementById('storyImg');
  if (storyImg) {
    storyImg.onerror = function () {
      this.parentElement.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(46,204,113,0.08))';
      this.style.display = 'none';
      // Add a text placeholder
      const placeholder = document.createElement('div');
      placeholder.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;';
      placeholder.innerHTML = '<span style="font-size:3rem;">🏞️</span><span style="font-size:0.85rem;color:rgba(240,237,230,0.4);text-transform:uppercase;letter-spacing:0.15em;">105 Acre Riverfront</span>';
      this.parentElement.appendChild(placeholder);
    };
  }
});

// ── Hero Counter Animation ──
function animateHeroCounters() {
  const counters = document.querySelectorAll('.hero-stat-value[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.round(target * eased);
      counter.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    // Delay to match hero animation
    setTimeout(() => requestAnimationFrame(update), 800);
  });
}

// ── Animate charts when scrolled into view ──
function animateChartsIn(container) {
  // Bar fills
  container.querySelectorAll('.bar-fill').forEach(bar => {
    const width = bar.dataset.width;
    bar.style.setProperty('--target-width', width + '%');
    setTimeout(() => bar.classList.add('animated'), 100);
  });

  // Margin fills
  container.querySelectorAll('.margin-fill').forEach(bar => {
    const width = bar.dataset.width;
    bar.style.setProperty('--target-width', width + '%');
    setTimeout(() => bar.classList.add('animated'), 100);
  });

  // Waterfall bars
  container.querySelectorAll('.wf-bar').forEach(bar => {
    setTimeout(() => bar.classList.add('animated'), 200);
  });

  // Protection bars
  container.querySelectorAll('.protection-bar').forEach(bar => {
    const width = bar.dataset.width;
    bar.style.setProperty('--target-width', width + '%');
    setTimeout(() => bar.classList.add('animated'), 100);
  });

  // Donut chart segments
  container.querySelectorAll('.donut-segment').forEach(seg => {
    const circumference = 2 * Math.PI * 80; // r=80
    const target = parseFloat(seg.dataset.target) || 0;
    const offset = parseFloat(seg.dataset.offset) || 0;
    setTimeout(() => {
      seg.style.strokeDasharray = `${target} ${circumference - target}`;
      seg.style.strokeDashoffset = -offset;
    }, 200);
  });

  // KPI counters in financials
  container.querySelectorAll('.fin-value[data-count]').forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const prefix = counter.dataset.prefix || '';
    const suffix = counter.dataset.suffix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      counter.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    setTimeout(() => requestAnimationFrame(update), 200);
  });
}

// ── Contact Form Handler ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate submission
  setTimeout(() => {
    btn.textContent = '✓ Request Sent';
    btn.style.background = 'linear-gradient(135deg, #1a8a4a, #2ecc71)';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  }, 1200);

  return false;
}
