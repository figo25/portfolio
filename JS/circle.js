const circle = document.querySelector('.circle');

function moveCircle() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let x, y;
    let directionX = 0;
    let directionY = 0;

    // Pilih sisi acak untuk keluar dari layar
    function getRandomSide() {
        const side = Math.floor(Math.random() * 4); // 0 = kiri, 1 = atas, 2 = kanan, 3 = bawah
        if (side === 0) { // Kiri
            x = -circle.offsetWidth;
            y = Math.random() * screenHeight;
            directionX = 1;
            directionY = 0;
        } else if (side === 1) { // Atas
            x = Math.random() * screenWidth;
            y = -circle.offsetHeight;
            directionX = 0;
            directionY = 1;
        } else if (side === 2) { // Kanan
            x = screenWidth;
            y = Math.random() * screenHeight;
            directionX = -1;
            directionY = 0;
        } else { // Bawah
            x = Math.random() * screenWidth;
            y = screenHeight;
            directionX = 0;
            directionY = -1;
        }
    }

    // Set posisi awal dan mulai gerakan
    function startMovement() {
        // Tentukan posisi acak untuk keluar dari layar
        getRandomSide();

        // Kecepatan gerakan
        const speedX = Math.random() * 3 + 2; // Kecepatan horizontal (2-5 px/frame)
        const speedY = Math.random() * 3 + 2; // Kecepatan vertikal (2-5 px/frame)

        // Set posisi awal
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        // Fungsi untuk memindahkan elemen keluar dan masuk lagi
        function updatePosition() {
            // Update posisi elemen berdasarkan arah
            x += directionX * speedX;
            y += directionY * speedY;

            // Jika elemen keluar dari layar, delay sebelum reset ke sisi acak
            if (
                x < -circle.offsetWidth || x > screenWidth ||
                y < -circle.offsetHeight || y > screenHeight
            ) {
                setTimeout(() => {
                    // Pilih sisi acak lagi setelah keluar
                    getRandomSide();
                    startMovement(); // Mulai gerakan baru setelah delay
                }, 4000); // Delay selama 2 detik (2000ms)
                return;
            }

            // Terapkan posisi baru
            circle.style.left = `${x}px`;
            circle.style.top = `${y}px`;

            // Lanjutkan animasi
            requestAnimationFrame(updatePosition);
        }

        updatePosition(); // Mulai animasi
    }

    // Mulai animasi pertama kali
    startMovement();
}

// Panggil fungsi untuk memulai animasi
moveCircle();