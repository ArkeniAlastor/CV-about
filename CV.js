// Interactivity: selectable icons and avatar error fallback
document.addEventListener('DOMContentLoaded', function () {
    const avatar = document.getElementById('avatar-img');
    const circles = Array.from(document.querySelectorAll('.circle'));
    const tools = Array.from(document.querySelectorAll('.tool'));

    function toggle(el) {
        el.classList.toggle('active');
        const pressed = el.classList.contains('active');
        el.setAttribute('aria-pressed', pressed);
    }

    function makeToggleable(list) {
        list.forEach(el => {
            el.setAttribute('role', 'button');
            el.setAttribute('aria-pressed', 'false');
            el.tabIndex = 0;
            el.addEventListener('click', () => toggle(el));
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(el);
                }
            });
        });
    }

    makeToggleable(circles);
    makeToggleable(tools);

    if (avatar) {
        avatar.addEventListener('error', function () {
            avatar.style.display = 'none';
            const parent = avatar.parentElement;
            if (parent && !parent.querySelector('.placeholder')) {
                const ph = document.createElement('div');
                ph.className = 'placeholder';
                ph.textContent = 'No image';
                parent.appendChild(ph);
            }
        });
    }
});
