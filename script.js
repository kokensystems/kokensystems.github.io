document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. OKUMA İLERLEME ÇUBUĞU (Reading Progress)
    // ==========================================
    const progressContainer = document.createElement('div');
    progressContainer.className = 'reading-progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    
    progressContainer.appendChild(progressBar);
    document.body.prepend(progressContainer); // Sayfanın en üstüne ekle

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Bölme hatası olmaması için kontrol (sayfa çok kısaysa)
        if (scrollHeight > 0) {
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        }
    });

    // ==========================================
    // 2. KAYDIRMA ANİMASYONLARI (Fade In Up)
    // ==========================================
    // Animasyon eklenecek hedefleri belirliyoruz
    const selectorsToAnimate = [
        '.content p', 
        '.content h2', 
        '.content h3', 
        '.content ul',
        '.content blockquote', 
        '.formula', 
        '.loop-box',
        '.time-align-container',
        '.golden-aforizma',
        '.emphasis-line',
        '.concept-card'
    ];
    
    const elementsToAnimate = document.querySelectorAll(selectorsToAnimate.join(', '));
    
    // Her birine CSS'te tanımladığımız başlangıç class'ını ekliyoruz
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-animate');
    });

    // Ekranda belirdiklerinde animasyonu tetikleyecek Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px', // Öğe ekrana 40px girince tetiklensin
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Görünürlük class'ını ekle
                entry.target.classList.add('is-visible');
                // Bir kez animasyon olduktan sonra tekrar etmemesi için takibi bırak (Performans)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Gözlemciyi (Observer) tüm hedeflere bağla
    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });
});
