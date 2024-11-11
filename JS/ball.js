document.addEventListener("DOMContentLoaded", function() {
    const box = document.querySelector(".right-box");
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;
    const ballDiameter = 200;

    const ballColors = ["#1500ff", "#1500ff", "#1500ff", "#1500ff", "#1500ff"];
    const ballImages = [
        "image/html.png",
        "image/figma.png",
        "image/css.png",
        "image/js.png",
        "image/ps.png"
    ];

    const balls = [];

    function isOverlapping(newPosition) {
        return balls.some(ball => {
            const dx = newPosition.x - ball.ballPosition.x;
            const dy = newPosition.y - ball.ballPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance < ballDiameter; // Tabrakan jika jarak < diameter bola
        });
    }

    // Membuat posisi bola tidak tumpang tindih
    for (let i = 0; i < 5; i++) {
        const ball = document.createElement("div");
        ball.classList.add("ball");

        // Tentukan posisi awal yang tidak bertumpuk
        let ballPosition;
        do {
            ballPosition = {
                x: Math.random() * (boxWidth - ballDiameter),
                y: Math.random() * (boxHeight - ballDiameter),
            };
        } while (isOverlapping(ballPosition)); // Ulangi jika posisi bertumpuk

        const velocity = {
            x: (Math.random() - 0.3) * 2, // Kecepatan X lebih lambat
            y: (Math.random() - 0.3) * 2, // Kecepatan Y lebih lambat
        };

        ball.style.backgroundColor = ballColors[i];

        const img = document.createElement("img");
        img.src = ballImages[i];
        img.alt = "Ball Image";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        ball.appendChild(img);
        balls.push({ ball, ballPosition, velocity, rotationDirection: 1 }); // Menambahkan properti rotationDirection
        box.appendChild(ball);
    }

    function detectCollision(ball1, ball2) {
        const dx = ball1.ballPosition.x - ball2.ballPosition.x;
        const dy = ball1.ballPosition.y - ball2.ballPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < ballDiameter; // Tabrakan jika jarak < diameter bola
    }

    function handleCollision(ball1, ball2) {
        const tempVelocity = {...ball1.velocity };
        ball1.velocity.x = ball2.velocity.x;
        ball1.velocity.y = ball2.velocity.y;
        ball2.velocity.x = tempVelocity.x;
        ball2.velocity.y = tempVelocity.y;

        // Balikkan arah rotasi bola setelah tabrakan
        ball1.rotationDirection *= -1;
        ball2.rotationDirection *= -1;
    }

    function updateBallPositions() {
        balls.forEach((ball, index) => {
            ball.ballPosition.x += ball.velocity.x;
            ball.ballPosition.y += ball.velocity.y;

            // Jika bola keluar dari sisi kanan, muncul dari sisi kiri dengan sedikit offset
            if (ball.ballPosition.x > boxWidth) {
                ball.ballPosition.x = -ballDiameter + 10; // sedikit jarak dari sisi kiri
            }
            if (ball.ballPosition.x + ballDiameter < 0) {
                ball.ballPosition.x = boxWidth - 10; // sedikit jarak dari sisi kanan
            }
            if (ball.ballPosition.y > boxHeight) {
                ball.ballPosition.y = -ballDiameter + 10; // sedikit jarak dari sisi atas
            }
            if (ball.ballPosition.y + ballDiameter < 0) {
                ball.ballPosition.y = boxHeight - 10; // sedikit jarak dari sisi bawah
            }

            // Deteksi tabrakan dengan bola lain
            for (let j = index + 1; j < balls.length; j++) {
                if (detectCollision(ball, balls[j])) {
                    handleCollision(ball, balls[j]);

                    // Pastikan bola tidak tumpang tindih setelah tabrakan
                    const overlap = ballDiameter - Math.sqrt((ball.ballPosition.x - balls[j].ballPosition.x) ** 2 + (ball.ballPosition.y - balls[j].ballPosition.y) ** 2);
                    if (overlap > 0) {
                        const angle = Math.atan2(balls[j].ballPosition.y - ball.ballPosition.y, balls[j].ballPosition.x - ball.ballPosition.x);
                        ball.ballPosition.x -= Math.cos(angle) * overlap / 2; // Geser bola agar tidak tumpang tindih
                        ball.ballPosition.y -= Math.sin(angle) * overlap / 2;
                        balls[j].ballPosition.x += Math.cos(angle) * overlap / 2;
                        balls[j].ballPosition.y += Math.sin(angle) * overlap / 2;
                    }
                }
            }

            // Perbarui posisi di DOM
            ball.ball.style.left = `${ball.ballPosition.x}px`;
            ball.ball.style.top = `${ball.ballPosition.y}px`;

            // Mengubah arah rotasi berdasarkan rotationDirection
            ball.ball.style.animation = `spin 5s ${ball.rotationDirection === 1 ? 'linear' : 'reverse'} infinite`;
        });

        requestAnimationFrame(updateBallPositions);
    }


    updateBallPositions();
});