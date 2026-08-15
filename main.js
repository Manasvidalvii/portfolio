document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Project Technology Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-featured-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedFilter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (selectedFilter === 'all' || categories.includes(selectedFilter)) {
                    card.style.display = 'grid';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 2. FocusSpace Pomodoro Demo Widget ---
    const timerDisplay = document.getElementById('timer');
    const toggleBtn = document.getElementById('toggle-timer-btn');
    let isRunning = false;
    let secondsLeft = 25 * 60;
    let timerInterval = null;

    function formatTime(sec) {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    if (toggleBtn && timerDisplay) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isRunning) {
                isRunning = true;
                toggleBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause Timer Demo`;
                timerInterval = setInterval(() => {
                    if (secondsLeft > 0) {
                        secondsLeft--;
                        timerDisplay.textContent = formatTime(secondsLeft);
                    } else {
                        clearInterval(timerInterval);
                        isRunning = false;
                        toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> Restart Demo`;
                    }
                }, 1000);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> Resume Timer Demo`;
            }
        });
    }

    // --- 3. Soundscape Chip Selector ---
    window.playAmbient = function(soundType) {
        const soundChips = document.querySelectorAll('.sound-chip');
        soundChips.forEach(chip => {
            if (chip.textContent.trim() === soundType) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });
    };

    // --- 4. Image Gallery Pro — Mini Preview Category Filter ---
    const galleryChips = document.querySelectorAll('.gallery-chip');
    const galleryItems = document.querySelectorAll('.mini-gallery-item');

    galleryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            galleryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const cat = chip.getAttribute('data-cat');
            galleryItems.forEach(item => {
                const itemCat = item.getAttribute('data-cat');
                if (cat === 'all' || itemCat === cat) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});