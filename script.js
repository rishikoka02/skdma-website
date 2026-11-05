/* Shaankari Kuchipudi Dance and Music Academy
   Shared header, footer and WhatsApp shortcut, plus the menu, the photo
   viewer on the gallery page and the enquiry form on the contact page.
   Everything is written into the page directly (no fetch), so the site also
   works when you open the files straight from your computer. */

(function () {
  'use strict';

  var WA_NUMBER = '919133263884';
  var PHONE_DISPLAY = '+91 91332 63884';
  var EMAIL = 'shaankariacademy08@gmail.com';

  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }

  var NAV = [
    ['index.html', 'Home'],
    ['about-institute.html', 'About Institute'],
    ['founder.html', 'Founder'],
    ['courses.html', 'Courses'],
    ['gallery.html', 'Gallery'],
    ['contact.html', 'Contact']
  ];

  var current = location.pathname.split('/').pop() || 'index.html';

  /* ---------- Header ---------- */

  var navLinks = NAV.map(function (item) {
    var active = item[0] === current ? ' aria-current="page"' : '';
    return '<a href="' + item[0] + '"' + active + '>' + item[1] + '</a>';
  }).join('');

  var header = document.getElementById('site-header');
  if (header) {
    header.innerHTML =
      '<div class="wrap site-header__bar">' +
        '<a class="brand" href="index.html" aria-label="Shaankari Kuchipudi Dance and Music Academy, home">' +
          '<img class="brand__mark" src="images/logo.jpg" alt="" width="58" height="58">' +
          '<span>' +
            '<span class="brand__name">Shaankari</span>' +
            '<span class="brand__sub">Kuchipudi Dance and Music Academy</span>' +
            '<span class="brand__regd">Regd. No. 728/2009</span>' +
          '</span>' +
        '</a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<nav class="nav" id="site-nav" aria-label="Main">' + navLinks + '</nav>' +
      '</div>' +
      '<div class="zari zari--thin" aria-hidden="true"></div>';

    var toggle = header.querySelector('.nav-toggle');
    var nav = header.querySelector('#site-nav');

    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- Footer ---------- */

  var footer = document.getElementById('site-footer');
  if (footer) {
    var footerLinks = NAV.map(function (item) {
      return '<li><a href="' + item[0] + '">' + item[1] + '</a></li>';
    }).join('');

    footer.innerHTML =
      '<div class="zari" aria-hidden="true"></div>' +
      '<div class="wrap site-footer__grid">' +
        '<div>' +
          '<a class="brand" href="index.html" aria-label="Shaankari Kuchipudi Dance and Music Academy, home">' +
            '<img class="brand__mark" src="images/logo.jpg" alt="" width="58" height="58">' +
            '<span>' +
              '<span class="brand__name">Shaankari</span>' +
              '<span class="brand__sub">Kuchipudi Dance and Music Academy</span>' +
            '</span>' +
          '</a>' +
          '<p>Authentic Kuchipudi training since 2007, founded by Guru Smt. Narapuraju Sreelatha.</p>' +
          '<p>Regd. No. 728/2009</p>' +
        '</div>' +
        '<div>' +
          '<h2 class="footer-title">Explore</h2>' +
          '<ul class="footer-links">' + footerLinks + '</ul>' +
        '</div>' +
        '<div>' +
          '<h2 class="footer-title">Contact</h2>' +
          '<ul class="footer-contact">' +
            '<li><a href="tel:+919133263884">' + PHONE_DISPLAY + '</a></li>' +
            '<li><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
            '<li>Monday to Saturday, 6:00 to 8:00 pm</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="site-footer__legal"><div class="wrap">' +
        '<p>&copy; ' + new Date().getFullYear() + ' Shaankari Kuchipudi Dance and Music Academy. All rights reserved.</p>' +
      '</div></div>';
  }

  /* ---------- WhatsApp shortcut ---------- */

  document.body.insertAdjacentHTML('beforeend',
    '<a class="wa-float" href="' + waLink('Hello, I am interested in your academy.') + '" target="_blank" rel="noopener">' +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/></svg>' +
      '<span>Chat on WhatsApp</span>' +
    '</a>');

  /* ---------- Gallery photo viewer ---------- */

  var tiles = Array.prototype.slice.call(document.querySelectorAll('.masonry button'));
  var dialog = document.querySelector('.lightbox');

  if (tiles.length && dialog && typeof dialog.showModal === 'function') {
    var viewerImg = dialog.querySelector('img');
    var index = 0;

    var show = function (n) {
      index = (n + tiles.length) % tiles.length;
      var tile = tiles[index];
      viewerImg.src = tile.getAttribute('data-full');
      viewerImg.alt = tile.querySelector('img').alt;
    };

    tiles.forEach(function (tile, i) {
      tile.addEventListener('click', function () {
        show(i);
        dialog.showModal();
      });
    });

    dialog.querySelector('.lightbox__close').addEventListener('click', function () { dialog.close(); });
    dialog.querySelector('.lightbox__prev').addEventListener('click', function () { show(index - 1); });
    dialog.querySelector('.lightbox__next').addEventListener('click', function () { show(index + 1); });

    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }

  /* ---------- Enquiry form: opens WhatsApp with the message ready to send ---------- */

  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = ['Hello, I would like to enquire about Kuchipudi classes.'];

      [['Name', 'name'], ['Phone', 'phone'], ['Student age', 'age'], ['Message', 'message']].forEach(function (f) {
        var value = String(data.get(f[1]) || '').trim();
        if (value) lines.push(f[0] + ': ' + value);
      });

      var link = document.createElement('a');
      link.href = waLink(lines.join('\n'));
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }
})();
