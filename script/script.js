document.addEventListener('DOMContentLoaded', function() {
    // Ship por nome
    const shipForm = document.querySelector('#ship_txt form');
    const resultText = document.getElementById('result_text');

    function getShipKey(name1, name2) {
        // Gera uma chave única para o casal, independente da ordem
        return [name1.toLowerCase().trim(), name2.toLowerCase().trim()].sort().join('-');
    }

    shipForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name1 = shipForm.ship_name.value.trim().toLowerCase();
        const name2 = shipForm.ship_name2.value.trim().toLowerCase();
        const key = getShipKey(name1, name2);

        if (!name1 || !name2) return;

        let ships = JSON.parse(localStorage.getItem('ships') || '{}');
        let shipResult = ships[key];

        if (!shipResult) {
            const percent = Math.floor(Math.random() * 91) + 10; // 10-100%
            let bonito = '';
            if (percent < 10) {
                bonito = 'Nunca vai dar certo 😢';
            } else if (percent < 30) {
                bonito = 'Baixas chances de dar certo!';
            } else if (percent < 60) {
                bonito = 'Pode dar certo!';
            } else if (percent < 80) {
                bonito = 'Muitas chances de dar certo!';
            } else if (percent < 95) {
                bonito = 'Casal bonito!';
            } else {
                bonito = 'CASAL PERFEITOOO! 💖';
            }
            shipResult = { name1, name2, percent, bonito };
            ships[key] = shipResult;
            localStorage.setItem('ships', JSON.stringify(ships));
        }

        const result = `${shipResult.name1} ❤️ ${shipResult.name2}: ${shipResult.percent}% de compatibilidade. ${shipResult.bonito}`;
        resultText.textContent = result;
    });

    // Ship por imagem
    const imgForm = document.querySelector('#ship_img form');
    const imgResultText = document.getElementById('img_result_text');

    // Prévia das imagens
    const imgPreview1 = document.createElement('img');
    const imgPreview2 = document.createElement('img');
    imgPreview1.style.maxWidth = '100px';
    imgPreview2.style.maxWidth = '100px';

    imgForm.ship_img.addEventListener('change', function() {
        const file = imgForm.ship_img.files[0];
        if (file) {
            imgPreview1.src = URL.createObjectURL(file);
            imgForm.insertBefore(imgPreview1, imgForm.ship_img.nextSibling);
        }
    });

    imgForm.ship_img2.addEventListener('change', function() {
        const file = imgForm.ship_img2.files[0];
        if (file) {
            imgPreview2.src = URL.createObjectURL(file);
            imgForm.insertBefore(imgPreview2, imgForm.ship_img2.nextSibling);
        }
    });

    imgForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const img1 = imgForm.ship_img.files[0];
        const img2 = imgForm.ship_img2.files[0];

        if (!img1 || !img2) return;

        const percent = Math.floor(Math.random() * 91) + 10; // 10-100%
        let bonito = '';
        if (percent < 10) {
            bonito = 'Nunca vai dar certo 😢';
        } else if (percent < 30) {
            bonito = 'Baixas chances de dar certo!';
        } else if (percent < 60) {
            bonito = 'Pode dar certo!';
        } else if (percent < 80) {
            bonito = 'Muitas chances de dar certo!';
        } else if (percent < 95) {
            bonito = 'Casal bonito!';
        } else {
            bonito = 'CASAL PERFEITOOO! 💖';
        }
        const result = `Imagens shipadas: ${percent}% de compatibilidade. ${bonito}`;

        imgResultText.textContent = result;

        // Salva no localStorage
        let imgShips = JSON.parse(localStorage.getItem('imgShips') || '[]');
        imgShips.push({ img1: img1.name, img2: img2.name, percent, bonito });
        localStorage.setItem('imgShips', JSON.stringify(imgShips));
    });
});