// Função para detectar zoom
function detectarZoom() {
    const zoom = (window.outerWidth - 10) / window.innerWidth;
    const setaFimPagina = document.querySelector('.seta-fim-pagina');

    if (zoom >= 0.99 && zoom <= 1.01) {
        setaFimPagina.style.display = 'block';
    } else {
        setaFimPagina.style.display = 'none';
    }
}

// Rolagem suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Observer para skill bars
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.setProperty('--level', level + '%');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
});

// Configuração do áudio
// const audio = new Audio('./assets/audioinicial.mp3');
// audio.volume = 0.5;

let audio = new Audio('/assets/audioInicial.mp3'); // Substitua pelo caminho correto do seu arquivo de áudio
let isPlaying = false;
audio.volume = 0.5;

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        audio.currentTime = 0; // Reinicia o áudio
        document.getElementById('audioTrigger').innerText = '▶️ Play'; // Atualiza o texto do botão
    } else {
        audio.play().catch(error => {
            console.error('Erro ao tentar reproduzir o áudio:', error);
        });
        document.getElementById('audioTrigger').innerText = '⏸️ Pause'; // Atualiza o texto do botão
    }
    isPlaying = !isPlaying; // Alterna o estado de reprodução
}

// Função para alternar entre play e pause
// function toggleAudio() {
//     const audioButton = document.getElementById('audioTrigger');
    
//     if (audio.paused) {
//         audio.play().catch(error => console.log('Erro ao tocar áudio:', error));
//         audioButton.innerHTML = '⏸️ Pause';
//     } else {
//         audio.pause();
//         audioButton.innerHTML = '▶️ Play';
//     }
// }




// Configurar visibilidade do botão play
document.addEventListener('DOMContentLoaded', function() {
    const audioButton = document.getElementById('audioTrigger');
    if (audioButton) {
        audioButton.style.display = 'block'; // Mostra o botão em todos os dispositivos
        
        // Adiciona evento para quando o áudio terminar
        audio.addEventListener('ended', function() {
            audioButton.innerHTML = '▶️ Play';
        });
    }
});

// Função para verificar se é dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Eventos para tocar áudio
window.addEventListener('load', playAudio); // Primeira vez
window.addEventListener('pageshow', function(e) {
    if (e.persisted) { // Quando voltar para a página (histórico)
        playAudio();
    }
});

// Detectar F5
document.addEventListener('keydown', function(e) {
    if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        playAudio();
    }
});

// Eventos adicionais
window.addEventListener('resize', detectarZoom);