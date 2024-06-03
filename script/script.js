const container = document.querySelector('.container');

const qrCodeInput = document.querySelector('#qr-reader input');
const qrCodeButton = document.querySelector('#qr-reader button');

const qrCodeContainer = document.querySelector('#qr-code')
const qrCodeImg = document.querySelector('#qr-code img');

const p = document.createElement('p');
p.id = 'qr-gerado'

// gerar

function generateQrCode() {
    const InputValue = qrCodeInput.value;
    
    if (!InputValue) return;
    
    p.textContent = '';
    qrCodeButton.innerText = 'Gerando...';

    qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${InputValue}`;

    qrCodeImg.addEventListener('load', () => {
        container.classList.add('active');
        qrCodeButton.innerText = 'Gerado';

        p.textContent = 'QR Code gerado!';
        container.appendChild(p);
    })
}

qrCodeButton.addEventListener('click', () => {
    generateQrCode();
});

qrCodeInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        generateQrCode();
    };
});

// remover

qrCodeInput.addEventListener('keyup', () => {
    if (!qrCodeInput.value) {
        container.classList.remove('active');
        qrCodeButton.innerText = 'Gerar QR Code';
        container.removeChild(p);
    }
});

// download qr code
function downloadQrCode() {
    const InputValue = qrCodeInput.value;
    const imageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${InputValue}`;
    const fileName = 'qr-code.jpg';
    fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => console.error('Erro ao baixar a imagem:', error));
}
