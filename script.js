/* ==========================================================================
   个人主页交互脚本 — 纯原生 JavaScript
   1. 背景视频检测（bg.mp4 就位后自动淡入）
   2. 滚动渐显（IntersectionObserver）
   3. 顶部导航 scrollspy（激活项橙黄高亮）
   4. 顶部导航滚动加深
   5. 移动端全屏菜单
   6. 触屏设备：点击扇形侧边栏展开/收起
   7. 首屏滑动图片专栏（自动轮播，悬停暂停，圆点切换）
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- 1. 背景视频：文件存在且可播放时才淡入 ----------
     视频未就位时保持渐变氛围背景，无需改代码。 */
  var bgVideo = document.querySelector('.bg-video');
  if (bgVideo) {
    bgVideo.addEventListener('canplay', function () {
      bgVideo.classList.add('is-ready');
    });
    var bgSource = bgVideo.querySelector('source');
    if (bgSource) {
      bgSource.addEventListener('error', function () {
        // 未找到 assets/video/bg.mp4，保持渐变背景占位
        console.info('[bg-video] 未找到 assets/video/bg.mp4，使用渐变背景占位。');
      });
    }
  }

  /* ---------- 2. 滚动渐显 ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // 旧浏览器兜底：直接全部显示
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* ---------- 3. scrollspy：滚动到某区块时高亮对应导航 ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = Array.prototype.slice
    .call(document.querySelectorAll('section[id]'))
    .filter(function (s) {
      return navLinks.some(function (l) { return l.getAttribute('href') === '#' + s.id; });
    });

  if ('IntersectionObserver' in window && sections.length) {
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spyObserver.observe(s); });
  }

  /* ---------- 4. 顶部导航：滚动后加深背景 ---------- */
  var topNav = document.getElementById('topNav');
  if (topNav) {
    var onScroll = function () {
      topNav.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 5. 移动端全屏菜单 ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    document.body.classList.remove('no-scroll');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll', isOpen);
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // 点击菜单背景（非链接处）或按 Esc 关闭
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) closeMobileMenu();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  /* ---------- 6. 触屏设备：点击扇形侧边栏切换展开 ---------- */
  var dock = document.getElementById('dock');
  if (dock && window.matchMedia('(hover: none)').matches) {
    dock.addEventListener('click', function (e) {
      // 点到菜单项时正常跳转，不切换状态
      if (e.target.closest('.fan-item')) return;
      dock.classList.toggle('open');
    });
    // 点击页面其他位置收起
    document.addEventListener('click', function (e) {
      if (!dock.contains(e.target)) dock.classList.remove('open');
    });
  }

  /* ---------- 7. 首屏滑动图片专栏：自动轮播，悬停暂停 ---------- */
  var showcase = document.getElementById('showcase');
  if (showcase) {
    var track = showcase.querySelector('.showcase-track');
    var slideEls = showcase.querySelectorAll('.slide');
    var dotEls = Array.prototype.slice.call(showcase.querySelectorAll('.dot'));
    var current = 0;
    var autoTimer = null;

    function goTo(i) {
      current = (i + slideEls.length) % slideEls.length;
      track.style.transform = 'translateX(' + (-100 * current) + '%)';
      dotEls.forEach(function (dot, k) {
        dot.classList.toggle('active', k === current);
      });
    }

    function playAuto() {
      stopAuto();
      autoTimer = setInterval(function () { goTo(current + 1); }, 4000);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    if (slideEls.length > 1) {
      dotEls.forEach(function (dot, k) {
        dot.addEventListener('click', function () {
          goTo(k);
          playAuto();
        });
      });
      showcase.addEventListener('mouseenter', stopAuto);
      showcase.addEventListener('mouseleave', playAuto);
      playAuto();
    }
  }
})();
