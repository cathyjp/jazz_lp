// 平泉ジャズフェスティバル2026 - メインJavaScript

document.addEventListener('DOMContentLoaded', function () {
  // 要素の取得
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollTopBtn = document.getElementById('scroll-top');
  const contactForm = document.getElementById('contact-form');

  // ヘッダーのスクロール効果
  function handleScroll() {
    const scrollY = window.scrollY;

    // ヘッダーの背景変更
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // スクロールトップボタンの表示/非表示
    if (scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  // スクロールイベントリスナー
  window.addEventListener('scroll', handleScroll);

  // ハンバーガーメニューの切り替え
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // ナビゲーションリンククリック時の処理
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // モバイルメニューを閉じる
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');

        // スムーズスクロール
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // スクロールトップボタンのクリック処理
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // スクロールアニメーション
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  // アニメーションクラスを動的に追加
  function addAnimationClasses() {
    // セクションタイトルにアニメーションクラスを追加
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
      title.classList.add('fade-in');
    });

    // セクションサブタイトルにアニメーションクラスを追加
    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    sectionSubtitles.forEach(subtitle => {
      subtitle.classList.add('fade-in');
    });

    // 概要アイテムにアニメーションクラスを追加
    const aboutItems = document.querySelectorAll('.about-item');
    aboutItems.forEach((item, index) => {
      if (index % 2 === 0) {
        item.classList.add('slide-in-left');
      } else {
        item.classList.add('slide-in-right');
      }
    });

    // ステージにアニメーションクラスを追加
    const stages = document.querySelectorAll('.stage');
    stages.forEach((stage, index) => {
      stage.classList.add('fade-in');
      stage.style.animationDelay = `${index * 0.1}s`;
    });

    // アーティストカードにアニメーションクラスを追加
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach((card, index) => {
      card.classList.add('scale-in');
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // お問い合わせアイテムにアニメーションクラスを追加
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      if (index % 2 === 0) {
        item.classList.add('slide-in-left');
      } else {
        item.classList.add('slide-in-right');
      }
    });

    // お問い合わせフォームにアニメーションクラスを追加
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.classList.add('fade-in');
    }
  }

  // パフォーマンスカードのホバー効果
  function initPerformanceHoverEffects() {
    const performances = document.querySelectorAll('.performance');

    performances.forEach(performance => {
      performance.addEventListener('mouseenter', function () {
        this.style.zIndex = '100';
        this.style.transform = 'scale(1.05)';
      });

      performance.addEventListener('mouseleave', function () {
        this.style.zIndex = '1';
        this.style.transform = 'scale(1)';
      });
    });
  }

  // アーティストカードのホバー効果
  function initArtistHoverEffects() {
    const artistCards = document.querySelectorAll('.artist-card');

    artistCards.forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // フォームのバリデーションと送信処理
  function initContactForm() {
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // フォームデータの取得
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // バリデーション
        if (!name || !email || !subject || !message) {
          showNotification('すべての項目を入力してください。', 'error');
          return;
        }

        if (!isValidEmail(email)) {
          showNotification('正しいメールアドレスを入力してください。', 'error');
          return;
        }

        // 送信処理（実際の送信は実装されていません）
        showNotification('お問い合わせありがとうございます。後日ご連絡いたします。', 'success');
        this.reset();
      });
    }
  }

  // メールアドレスのバリデーション
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 通知の表示
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // 通知のスタイル
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4ecdc4' : type === 'error' ? '#ff6b6b' : '#45b7d1'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            font-weight: 600;
            max-width: 300px;
        `;

    document.body.appendChild(notification);

    // アニメーション
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // 自動削除
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 4000);
  }

  // パフォーマンスの詳細表示
  function initPerformanceDetails() {
    const performances = document.querySelectorAll('.performance');

    performances.forEach(performance => {
      performance.addEventListener('click', function () {
        const artist = this.querySelector('.artist').textContent;
        const time = this.querySelector('.time').textContent;

        showPerformanceModal(artist, time);
      });
    });
  }

  // パフォーマンス詳細モーダル
  function showPerformanceModal(artist, time) {
    const modal = document.createElement('div');
    modal.className = 'performance-modal';
    modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${artist}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p><strong>時間:</strong> ${time}</p>
                        <p><strong>アーティスト:</strong> ${artist}</p>
                        <p>詳細な情報は後日公開予定です。</p>
                    </div>
                </div>
            </div>
        `;

    // モーダルのスタイル
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-radius: 20px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;

    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            color: #fff;
        `;

    const modalClose = modal.querySelector('.modal-close');
    modalClose.style.cssText = `
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

    const modalBody = modal.querySelector('.modal-body');
    modalBody.style.cssText = `
            color: #ccc;
            line-height: 1.6;
        `;

    document.body.appendChild(modal);

    // アニメーション
    setTimeout(() => {
      modal.style.opacity = '1';
      modalContent.style.transform = 'scale(1)';
    }, 100);

    // 閉じる処理
    function closeModal() {
      modal.style.opacity = '0';
      modalContent.style.transform = 'scale(0.8)';
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // キーボードナビゲーション
  function initKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
      // ESCキーでモーダルを閉じる
      if (e.key === 'Escape') {
        const modal = document.querySelector('.performance-modal');
        if (modal) {
          modal.querySelector('.modal-close').click();
        }
      }

      // ハンバーガーメニューの切り替え（Alt + M）
      if (e.altKey && e.key === 'm') {
        navToggle.click();
      }
    });
  }

  // パフォーマンス向上のためのデバウンス関数
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

  // スクロールイベントの最適化
  const debouncedHandleScroll = debounce(handleScroll, 10);
  window.removeEventListener('scroll', handleScroll);
  window.addEventListener('scroll', debouncedHandleScroll);

  // リサイズイベントの処理
  function handleResize() {
    // モバイルメニューが開いている場合は閉じる
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }

  window.addEventListener('resize', debounce(handleResize, 250));

  // 初期化
  function init() {
    addAnimationClasses();
    initScrollAnimations();
    initPerformanceHoverEffects();
    initArtistHoverEffects();
    initContactForm();
    initPerformanceDetails();
    initKeyboardNavigation();

    // ページ読み込み完了の通知
    console.log('平泉ジャズフェスティバル2026 - ウェブサイトが正常に読み込まれました');
  }

  // 初期化実行
  init();

  // ページの読み込み完了時にヒーローアニメーションを開始
  window.addEventListener('load', function () {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroContent) {
      heroContent.style.animation = 'fadeInUp 1s ease-out';
    }

    if (heroVisual) {
      heroVisual.style.animation = 'fadeInRight 1s ease-out 0.5s both';
    }
  });

  // サービスワーカーの登録（PWA対応の準備）
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      // サービスワーカーの登録は実際のファイルがある場合のみ
      // navigator.serviceWorker.register('/sw.js');
    });
  }

  // パフォーマンス監視
  if ('performance' in window) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('ページ読み込み時間:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
      }, 0);
    });
  }
});
