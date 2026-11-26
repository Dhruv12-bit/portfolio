window.onload = function () {
    const bootingOverlay = document.getElementById('booting-overlay');
    const bootLines = [
        "[    0.000000] Linux version 6.6.8-arch1-1 (linux@archlinux) (gcc (GCC) 13.2.1)",
        "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-linux root=UUID=xxxx rw quiet",
        "[    0.012847] BIOS-provided physical RAM map:",
        "[    0.012849] BIOS-e820: [mem 0x00000000-0x0009fbff] usable",
        "[    0.012853] BIOS-e820: [mem 0x00100000-0xdffeffff] usable",
        "[    0.092341] NX (Execute Disable) protection: active",
        "[    0.115678] SMBIOS 3.4.0 present.",
        "[    0.238412] ACPI: Core revision 20230628",
        "[    0.241234] ACPI: AML tables loaded",
        "[    0.412934] Kernel command line processed",
        "[    0.558901] Memory: 16GB available",
        "[    0.771234] PCI: Using configuration type 1",
        "[    0.889123] HugeTLB: registered 2.00 MiB page size",
        "[    1.012345] ACPI: Interpreter enabled",
        "[    1.067890] ACPI: PM: (supports S0 S3 S4 S5)",
        "[    1.234567] PCI: Probing PCI hardware",
        "[    1.443214] EXT4-fs (sda1): mounted filesystem",
        "[    1.556789] VFS: Mounted root filesystem",
        "[    1.667234] random: crng init done",
        "[    1.778123] Freeing unused kernel memory",

        "",
        "systemd[1]: systemd 255 running in system mode",
        "systemd[1]: Detected virtualization kvm.",
        "systemd[1]: Detected architecture x86-64.",
        "systemd[1]: Hostname set to <localhost>.",

        "[  OK  ] Mounted /boot.",
        "[  OK  ] Reached target Local File Systems.",
        "[  OK  ] Started Rule-based Manager for Device Events.",
        "[  OK  ] Found device /dev/ttyS0.",
        "[  OK  ] Started D-Bus System Message Bus.",
        "[  OK  ] Started Network Manager.",
        "[  OK  ] Started Getty on tty1.",
        "[  OK  ] Reached target Login Prompts.",
        "[  OK  ] Started OpenSSH Daemon.",
        "[  OK  ] Reached target Multi-User System.",
        "[  OK  ] Reached target Graphical Interface.",

        "",
        "localhost login:"
    ];

    function getRandomBootDelay() {
        return Math.floor(Math.random() * 200);
    }

    let lineIndex = 0;

    function displayNextLine() {
        if (lineIndex < bootLines.length) {
            const line = document.createElement('div');
            line.textContent = bootLines[lineIndex];
            bootingOverlay.appendChild(line);

            bootingOverlay.scrollTop = bootingOverlay.scrollHeight;

            const delay = getRandomBootDelay();
            lineIndex++;

            setTimeout(displayNextLine, delay);
        } else {
            setTimeout(() => {
                bootingOverlay.style.display = 'none';
                document.querySelector('.desktop').classList.add('visible');
            }, 800);
        }
    }

    displayNextLine();
};

// Window opening & closing animations
function getIconOffset(iconEl) {
    const desktop = document.querySelector('.desktop');
    const desktopRect = desktop.getBoundingClientRect();
    const iconRect = iconEl.getBoundingClientRect();
    return {
        dx: (iconRect.left + iconRect.width / 2) - (desktopRect.left + desktopRect.width / 2),
        dy: (iconRect.top + iconRect.height / 2) - (desktopRect.top + desktopRect.height / 2)
    };
}

function openWindow(windowEl, iconEl) {
    const allWindows = [
        { win: terminal, icon: terminalIcon },
        { win: projectsWindow, icon: projectsIcon },
        { win: experienceWindow, icon: experienceIcon },
        { win: certificationsWindow, icon: certificationsIcon },
        { win: resumeWindow, icon: resumeIcon }
    ];

    allWindows.forEach(({ win, icon }) => {
        if (win !== windowEl && win.classList.contains('open')) {
            closeWindow(win, icon);
        }
    });

    const { dx, dy } = getIconOffset(iconEl);
    windowEl.classList.remove('open');
    windowEl.style.display = 'block';
    windowEl.style.setProperty('--ox', dx + 'px');
    windowEl.style.setProperty('--oy', dy + 'px');
    windowEl.style.setProperty('--s', 0.05);
    setTimeout(() => {
        windowEl.style.setProperty('--ox', '0px');
        windowEl.style.setProperty('--oy', '0px');
        windowEl.style.setProperty('--s', 1);
        windowEl.classList.add('open');
    }, 10);
    windowEl.focus();
}

function closeWindow(windowEl, iconEl) {
    const { dx, dy } = getIconOffset(iconEl);
    windowEl.classList.remove('open');
    windowEl.style.setProperty('--ox', dx + 'px');
    windowEl.style.setProperty('--oy', dy + 'px');
    windowEl.style.setProperty('--s', 0.05);
    setTimeout(() => {
        windowEl.style.display = 'none';
    }, 400);
}

// Terminal functionality
const terminal = document.getElementById('terminal');
const terminalOutput = document.getElementById('terminal-output');
const terminalText = document.getElementById('terminal-text');
const terminalCursor = document.getElementById('terminal-cursor');
const terminalIcon = document.getElementById('terminal-icon');
let typingInterval;

terminalIcon.addEventListener('click', function () {
    openWindow(terminal, terminalIcon);
    terminalText.textContent = '';
    clearInterval(typingInterval);
    simulateTyping();
});

document.getElementById('close-terminal').addEventListener('click', function () {
    closeWindow(terminal, terminalIcon);
    clearInterval(typingInterval);
    terminalText.textContent = '';
    terminalCursor.classList.remove('typing');
});

document.getElementById('minimize-terminal').addEventListener('click', function () {
    closeWindow(terminal, terminalIcon);
});

// Projects window functionality
const projectsWindow = document.getElementById('projects-window');
const projectsIcon = document.getElementById('projects-icon');

projectsIcon.addEventListener('click', function () {
    openWindow(projectsWindow, projectsIcon);
});

document.getElementById('close-projects').addEventListener('click', function () {
    closeWindow(projectsWindow, projectsIcon);
});

document.getElementById('minimize-projects').addEventListener('click', function () {
    closeWindow(projectsWindow, projectsIcon);
});

// Experience window functionality
const experienceWindow = document.getElementById('experience-window');
const experienceIcon = document.getElementById('experience-icon');

experienceIcon.addEventListener('click', function () {
    openWindow(experienceWindow, experienceIcon);
});

document.getElementById('close-experience').addEventListener('click', function () {
    closeWindow(experienceWindow, experienceIcon);
});

document.getElementById('minimize-experience').addEventListener('click', function () {
    closeWindow(experienceWindow, experienceIcon);
});

// Certifications window functionality
const certificationsWindow = document.getElementById('certifications-window');
const certificationsIcon = document.getElementById('certifications-icon');

certificationsIcon.addEventListener('click', function () {
    openWindow(certificationsWindow, certificationsIcon);
});

document.getElementById('close-certifications').addEventListener('click', function () {
    closeWindow(certificationsWindow, certificationsIcon);
});

document.getElementById('minimize-certifications').addEventListener('click', function () {
    closeWindow(certificationsWindow, certificationsIcon);
});

// Resume window functionality
const resumeWindow = document.getElementById('resume-window');
const resumeIcon = document.getElementById('resume-icon');

resumeIcon.addEventListener('click', function () {
    openWindow(resumeWindow, resumeIcon);
});

document.getElementById('close-resume').addEventListener('click', function () {
    closeWindow(resumeWindow, resumeIcon);
});

document.getElementById('minimize-resume').addEventListener('click', function () {
    closeWindow(resumeWindow, resumeIcon);
});

// Accordion mechanics for expanding cards
document.querySelectorAll('.exp-header').forEach(header => {
    const item = header.closest('.exp-item');
    const details = header.nextElementSibling;

    header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        if (isOpen) {
            details.style.maxHeight = '0px';
        } else {
            details.style.maxHeight = details.scrollHeight + 'px';
        }

        item.classList.toggle('open', !isOpen);
        header.setAttribute('aria-expanded', String(!isOpen));
    });
});

// Keyboard accessibility for interactive buttons
document.querySelectorAll('[role="button"]').forEach(el => {
    el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
        }
    });
});

// Terminal typing simulation
function simulateTyping() {
    const text = "$ cat about.txt\n\n" +
        "• Welcome to Dhruv Nimse's portfolio workspace.\n\n" +
        "• Explore front-end projects, experience, certifications, and resume from the dock.\n\n" +
        "• Click any dock icon below to open its panel.\n\n";
    let index = 0;
    terminalCursor.classList.add('typing');

    typingInterval = setInterval(() => {
        if (index < text.length) {
            terminalText.textContent += text.charAt(index);
            terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
            index++;
        } else {
            clearInterval(typingInterval);
            terminalCursor.classList.remove('typing');
        }
    }, 10);
}

// Date and time display
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const date = now.toLocaleDateString(undefined, options);
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    dateTimeElement.textContent = `${date} | ${time}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Open links securely in external tab
document.querySelectorAll('a').forEach(link => {
    if (!link.target) link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// Close windows with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (terminal.classList.contains('open')) {
            document.getElementById('close-terminal').click();
            return;
        }
        if (projectsWindow.classList.contains('open')) {
            document.getElementById('close-projects').click();
            return;
        }
        if (experienceWindow.classList.contains('open')) {
            document.getElementById('close-experience').click();
            return;
        }
        if (certificationsWindow.classList.contains('open')) {
            document.getElementById('close-certifications').click();
            return;
        }
        if (resumeWindow.classList.contains('open')) {
            document.getElementById('close-resume').click();
            return;
        }
    }
});

// Dock hover wave animation
(function () {
    const dock = document.querySelector('.dock');
    if (!dock) return;
    const iconContainers = Array.from(dock.querySelectorAll('.icon'));
    const icons = iconContainers.map(c => c.querySelector('img'));
    const labels = iconContainers.map(c => c.querySelector('span'));
    const MAX_SCALE = 1.65;
    const EFFECT_RANGE = 90;
    const LERP = 0.25;
    let targetScales = new Array(icons.length).fill(1);
    let currentScales = new Array(icons.length).fill(1);
    let raf = null;

    const iconBaseWidths = icons.map(icon => icon.getBoundingClientRect().width);

    labels.forEach((label, i) => {
        if (!label) return;
        const baseHeight = icons[i].getBoundingClientRect().height;
        label.style.opacity = '0';
        label.style.position = 'absolute';
        label.style.bottom = (baseHeight * MAX_SCALE + 14) + 'px';
        label.style.left = '50%';
        label.style.transform = 'translateX(-50%)';
        label.style.whiteSpace = 'nowrap';
        label.style.pointerEvents = 'none';
    });

    function calculateWaveScale(mouseX, iconIndex) {
        const rect = iconContainers[iconIndex].getBoundingClientRect();
        const iconCenter = rect.left + rect.width / 2;
        const distance = Math.abs(mouseX - iconCenter);
        const influence = Math.max(0, 1 - Math.pow(distance / EFFECT_RANGE, 2));
        return 1 + (MAX_SCALE - 1) * Math.pow(influence, 0.8);
    }

    function onMove(e) {
        const x = e.clientX;
        icons.forEach((icon, i) => {
            const scale = calculateWaveScale(x, i);
            targetScales[i] = scale;

            if (labels[i]) {
                labels[i].style.opacity = scale > 1.3 ? '1' : '0';
            }
        });

        if (!raf) raf = requestAnimationFrame(animate);
    }

    function onLeave() {
        targetScales.fill(1);
        labels.forEach(label => {
            if (label) label.style.opacity = '0';
        });

        if (!raf) raf = requestAnimationFrame(animate);
    }

    function animate() {
        let active = false;
        icons.forEach((icon, i) => {
            const diff = targetScales[i] - currentScales[i];
            currentScales[i] += diff * LERP;

            icon.style.transform = `scale(${currentScales[i]})`;
            iconContainers[i].style.zIndex = Math.round(currentScales[i] * 100);

            const extraHalf = (currentScales[i] - 1) * iconBaseWidths[i] / 2;
            iconContainers[i].style.marginLeft = extraHalf + 'px';
            iconContainers[i].style.marginRight = extraHalf + 'px';

            if (Math.abs(diff) > 0.01) active = true;
        });

        if (active) {
            raf = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(raf);
            raf = null;
        }
    }

    dock.addEventListener('mousemove', onMove);
    dock.addEventListener('mouseleave', onLeave);
})();

// Top-left icons wave effect
(function () {
    const bar = document.querySelector('.icons');
    if (!bar) return;

    const iconContainers = Array.from(bar.querySelectorAll('.icon'));
    const icons = iconContainers.map(c => c.querySelector('img'));
    const labels = iconContainers.map(c => c.querySelector('span'));

    const MAX_SCALE = 1.45;
    const EFFECT_RANGE = 90;
    const LERP = 0.25;

    let targetScales = new Array(icons.length).fill(1);
    let currentScales = new Array(icons.length).fill(1);
    let raf = null;

    function calculateWaveScale(mouseY, index) {
        const rect = iconContainers[index].getBoundingClientRect();
        const barRect = bar.getBoundingClientRect();
        const iconCenter = (rect.top - barRect.top) + rect.height / 2;
        const distance = Math.abs(mouseY - iconCenter);

        const influence = Math.max(0, 1 - Math.pow(distance / EFFECT_RANGE, 2));
        return 1 + (MAX_SCALE - 1) * Math.pow(influence, 0.8);
    }

    function onMove(e) {
        const rect = bar.getBoundingClientRect();
        const y = e.clientY - rect.top;

        icons.forEach((icon, i) => {
            const scale = calculateWaveScale(y, i);
            targetScales[i] = scale;

            if (labels[i]) {
                labels[i].style.opacity = scale > 1.25 ? '1' : '0';
            }
        });

        if (!raf) raf = requestAnimationFrame(animate);
    }

    function onLeave() {
        targetScales.fill(1);
        labels.forEach(l => l && (l.style.opacity = '0'));
        if (!raf) raf = requestAnimationFrame(animate);
    }

    function animate() {
        let active = false;

        icons.forEach((icon, i) => {
            const diff = targetScales[i] - currentScales[i];
            currentScales[i] += diff * LERP;

            icon.style.transform = `scale(${currentScales[i]})`;
            iconContainers[i].style.zIndex = Math.round(currentScales[i] * 100);

            if (Math.abs(diff) > 0.01) active = true;
        });

        if (active) {
            raf = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(raf);
            raf = null;
        }
    }

    bar.addEventListener('mousemove', onMove);
    bar.addEventListener('mouseleave', onLeave);
})();