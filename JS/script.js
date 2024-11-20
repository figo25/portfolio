// Mengambil nama dari parameter URL
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');

// Menampilkan pesan sambutan dengan nama
const welcomeMessage = document.getElementById("welcomeMessage");
if (name) {
    // Gunakan innerHTML agar tag HTML dalam string dirender
    welcomeMessage.innerHTML = `Hi ${name}</span>`;
}