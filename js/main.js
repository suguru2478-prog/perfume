/* ══════════════════════════════════════════════
   LUMIÈRE — Luxury Perfumery  |  Main JS
   ══════════════════════════════════════════════ */

'use strict';

/* ─── PRELOADER ─── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
    // Trigger hero reveal after preloader
    document.querySelectorAll('#hero .reveal-up').forEach(el => el.classList.add('visible'));
  }, 1900);
});

/* ─── CUSTOM CURSOR ─── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .product-card, .cat-card, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ─── NAVBAR SCROLL EFFECT ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

/* ─── MOBILE HAMBURGER ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/* ─── FLOATING PARTICLES ─── */
const particlesContainer = document.getElementById('particles');
function createParticle() {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 6 + 3;
  const left = Math.random() * 100;
  const duration = Math.random() * 8 + 6;
  const delay = Math.random() * 5;
  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
  `;
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), (duration + delay) * 1000);
}
setInterval(createParticle, 600);
// Initial burst
for (let i = 0; i < 12; i++) createParticle();

/* ─── SCROLL REVEAL OBSERVER ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  // Skip hero elements (they're triggered by preloader)
  if (!el.closest('#hero')) revealObserver.observe(el);
});

/* ─── STATS COUNTER ANIMATION ─── */
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const duration = 2200;
    const start = performance.now();

    function updateCount(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = target >= 1000
        ? current.toLocaleString()
        : current + (target === 25 || target === 40 ? '+' : '');
      if (progress < 1) requestAnimationFrame(updateCount);
    }
    requestAnimationFrame(updateCount);
    statsObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

/* ─── PRODUCT FILTER TABS ─── */
const tabBtns = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active tab
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    productCards.forEach((card, i) => {
      const category = card.dataset.category;
      const show = filter === 'all' || category === filter;

      if (show) {
        card.classList.remove('hidden');
        card.style.animationDelay = `${i * 0.08}s`;
        // Re-trigger reveal
        card.classList.remove('visible');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => card.classList.add('visible'));
        });
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Make all cards visible initially
productCards.forEach(card => card.classList.add('visible'));

/* ─── TESTIMONIAL SLIDER ─── */
const track = document.getElementById('testimonialTrack');
const slides = track.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let autoSlide;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('dot-btn');
  if (i === 0) dot.classList.add('active');
  dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  currentSlide = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot-btn').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

document.getElementById('prevBtn').addEventListener('click', () => {
  clearInterval(autoSlide);
  goToSlide(currentSlide - 1);
  startAutoSlide();
});
document.getElementById('nextBtn').addEventListener('click', () => {
  clearInterval(autoSlide);
  goToSlide(currentSlide + 1);
  startAutoSlide();
});

function startAutoSlide() {
  autoSlide = setInterval(() => goToSlide(currentSlide + 1), 5000);
}
startAutoSlide();

/* ─── SHOPPING CART ─── */
let cart = JSON.parse(localStorage.getItem('lumiere-cart') || '[]');

function saveCart() {
  localStorage.setItem('lumiere-cart', JSON.stringify(cart));
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = totalItems;
  cartCount.classList.toggle('visible', totalItems > 0);

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <p>Your bag is empty</p>
      </div>`;
    cartFooter.style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">$${item.price}</span>
        <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
    cartFooter.style.display = 'block';

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    cartTotal.textContent = `$${total.toLocaleString()}`;

    // Remove listeners
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        cart = cart.filter(i => i.id !== btn.dataset.id);
        saveCart();
        updateCartUI();
      });
    });
  }
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = +btn.dataset.price;
    const existing = cart.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }
    saveCart();
    updateCartUI();
    showToast(`${name} added to bag ✓`);

    // Animate button
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--dark)';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-plus"></i>';
      btn.style.background = '';
      btn.style.color = '';
    }, 1500);
  });
});

// Cart drawer toggle
const cartBtn = document.getElementById('cartBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');

function openCartDrawer() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCartDrawer);
closeCart.addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

updateCartUI();

/* ─── QUICK VIEW MODAL ─── */
const productsData = {
  1: { name: 'Velvet Noir',     family: 'Woody · Oriental',  notes: 'Sandalwood · Vanilla · Dark Musk', price: 189, img: 'images/UGu3NdjG.jpg' },
  2: { name: 'Rose Divine',    family: 'Floral · Romantic',  notes: 'Turkish Rose · Peony · White Musk', price: 210, img: 'images/EppsqiLs.jpg' },
  3: { name: 'Ocean Mist',     family: 'Fresh · Aquatic',    notes: 'Sea Salt · Bergamot · Driftwood', price: 165, img: 'images/4V0thIO0.jpg' },
  4: { name: 'Golden Oud',     family: 'Woody · Spicy',      notes: 'Oud · Amber · Saffron', price: 340, img: 'images/72DdVIvw.jpg' },
  5: { name: 'Midnight Bloom', family: 'Floral · Nocturnal', notes: 'Jasmine · Tuberose · Blue Iris', price: 225, img: 'images/povacKOu.jpg' },
  6: { name: 'Cedar Sage',     family: 'Fresh · Earthy',     notes: 'Cedar · Sage · Vetiver', price: 178, img: 'images/1e6njzlH.jpg' },
};

const modal = document.getElementById('productModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalInner = document.getElementById('modalInner');

function openModal(id) {
  const p = productsData[id];
  if (!p) return;
  modalInner.innerHTML = `
    <div class="modal-img-side">
      <img src="${p.img}" alt="${p.name}" />
    </div>
    <div class="modal-info-side">
      <div class="product-family">${p.family}</div>
      <h2 class="product-name">${p.name}</h2>
      <p class="product-notes">${p.notes}</p>
      <span class="product-price">$${p.price}</span>
      <button class="btn-primary add-to-cart" data-id="${id}" data-name="${p.name}" data-price="${p.price}">
        Add to Bag &nbsp;<i class="fas fa-shopping-bag"></i>
      </button>
    </div>
  `;
  // Re-attach cart listener for modal button
  modalInner.querySelector('.add-to-cart').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const pid = btn.dataset.id;
    const name = btn.dataset.name;
    const price = +btn.dataset.price;
    const existing = cart.find(i => i.id === pid);
    if (existing) existing.qty++;
    else cart.push({ id: pid, name, price, qty: 1 });
    saveCart();
    updateCartUI();
    showToast(`${name} added to bag ✓`);
    closeModal();
    openCartDrawer();
  });

  modal.classList.add('open');
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.quick-view-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openModal(btn.dataset.id);
  });
});
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

/* ─── TOAST NOTIFICATION ─── */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

const loginScreen = document.getElementById('loginScreen');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

function unlockSite() {
  loginScreen.classList.add('closed');
  document.body.classList.remove('login-locked');
}

if (sessionStorage.getItem('lumiere-auth') === 'true') {
  unlockSite();
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value;

  if (username === 'vedu' && password === 'vedu1428') {
    loginError.textContent = '';
    sessionStorage.setItem('lumiere-auth', 'true');
    unlockSite();
    showToast('Welcome back, vedu.');
  } else {
    loginError.textContent = 'Invalid username or password.';
  }
});

/* ─── NEWSLETTER FORM ─── */
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  showToast(`Welcome to LUMIÈRE! Check your inbox ✓`);
  e.target.reset();
});

/* ─── CONTACT FORM ─── */
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  showToast('Message sent! We will be in touch soon ✓');
  e.target.reset();
});

/* ─── SMOOTH ANCHOR SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });
});

/* ─── PARALLAX HERO IMAGE ─── */
const heroImg = document.querySelector('.hero-img');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    heroImg.style.transform = `scale(1) translateY(${window.scrollY * 0.25}px)`;
  }
});

/* ─── KEYBOARD ESC TO CLOSE ─── */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeCartDrawer();
  }
});

/* ─── FOOTER YEAR ─── */
const yearEls = document.querySelectorAll('.footer-year');
yearEls.forEach(el => el.textContent = new Date().getFullYear());
