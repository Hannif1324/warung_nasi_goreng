// Menunggu dokumen HTML selesai dimuat sepenuhnya sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ANIMASI SCROLL REVEAL (Muncullah elemen saat di-scroll) ---
    
    // 1. Pilih semua elemen yang ingin dianimasikan (kelas 'fade-in')
    // Kita juga bisa menambahkan elemen section agar muncul perlahan
    const animatedElements = document.querySelectorAll('.fade-in, .section h2, .feature-card, .menu-item');
    
    // 2. Buat 'Observer' (Pengamat)
    // Observer ini bertugas memantau apakah elemen masuk ke layar (viewport)
    const observerOptions = {
        root: null, // Memantau berdasarkan viewport browser
        rootMargin: '0px', // Tidak ada margin tambahan
        threshold: 0.1 // Animasi jalan saat 10% elemen terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen terlihat di layar...
            if (entry.isIntersecting) {
                // Tambahkan kelas 'visible' untuk memicu CSS transition
                entry.target.classList.add('visible');
                
                // Tambahkan kelas 'fade-in' manual jika elemen belum memilikinya 
                // (untuk elemen seperti h2 atau card yang kita pilih di atas)
                if (!entry.target.classList.contains('fade-in')) {
                   entry.target.style.transition = "all 0.6s ease-out";
                   entry.target.style.opacity = "1";
                   entry.target.style.transform = "translateY(0)";
                }

                // Berhenti mengamati elemen ini setelah muncul (agar tidak animasi ulang)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // 3. Pasang Observer ke setiap elemen target
    animatedElements.forEach(el => {
        // Set state awal transparan jika bukan kelas .fade-in bawaan
        if (!el.classList.contains('fade-in')) {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)"; // Turun sedikit ke bawah
        }
        observer.observe(el);
    });


    // --- SMOOTH SCROLL NAVIGASI ---
    // Meski di CSS sudah ada scroll-behavior: smooth, ini back-up untuk browser lama
    // dan kontrol lebih jika diperlukan.
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Mencegah loncat langsung

            const targetId = this.getAttribute('href'); // Ambil id tujuan (#tentang)
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll ke elemen tersebut dengan halus
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Posisikan di awal elemen
                });
            }
        });
    });

    // --- PESAN DI CONSOLE (Rahasia Developer) ---
    console.log("Warung Nasi Goreng Wayang: Siap Melayani!");
});
