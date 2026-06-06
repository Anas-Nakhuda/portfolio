    // === PRELOADER ===
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('hide');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1000);

        document.getElementById('year').textContent = new Date().getFullYear();
        updateTime();
        setInterval(updateTime, 1000);
        startTitleRotation();
    });

    // === ANIMATED BROWSER TITLE ===
    function startTitleRotation() {
        const titles = [
        
            'Anas Nakhuda-Data Science & ML',
        ];
        let index = 0;
        document.title = titles[0];

        setInterval(() => {
            index = (index + 1) % titles.length;
            document.title = titles[index];
        }, 3500);
    }

    // === LOCAL TIME LOGIC ===
    function updateTime() {
        const timeDisplay = document.getElementById('local-time');
        if(timeDisplay) {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleTimeString('id-ID', {
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false
            });
        }
    }

    // === DARK MODE LOGIC ===
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        html.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.theme = 'light';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // === MOBILE MENU ===
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-menu');
    const links = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        const isOpen = menu.style.opacity === '1';
        menu.style.opacity = isOpen ? '0' : '1';
        menu.style.pointerEvents = isOpen ? 'none' : 'auto';
    };

    btn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', toggleMenu));

    // === SCROLL TO TOP & ACTIVE NAVIGATION (ScrollSpy) ===
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const sections = document.querySelectorAll('.section-spy');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('translate-y-20', 'opacity-0');
        } else {
            scrollToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary', 'dark:text-white', 'font-bold');
            link.classList.add('text-slate-600', 'dark:text-slate-400');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('text-primary', 'dark:text-white', 'font-bold');
                link.classList.remove('text-slate-600', 'dark:text-slate-400');
            }
        });
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === PROJECT FILTER LOGIC ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projects.forEach(project => {
                const categories = project.getAttribute('data-filter-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    project.style.display = 'block';
                    project.classList.add('reveal-on-scroll', 'is-visible');
                } else {
                    project.style.display = 'none';
                    project.classList.remove('reveal-on-scroll', 'is-visible');
                }
            });
        });
    });

    // === 3D TILT EFFECT ===
    if (window.matchMedia("(min-width: 768px)").matches) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3; 
                const rotateY = ((x - centerX) / centerX) * 3;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    // === PARALLAX EFFECT ===
    window.addEventListener('scroll', () => {
        const parallaxImages = document.querySelectorAll('.parallax-img');
        parallaxImages.forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            if (isVisible) {
                const speed = 0.08;
                const yPos = (window.innerHeight - rect.top) * speed;
                img.style.transform = `translateY(${yPos - 20}px) scale(1.1)`;
            }
        });
    });

    // === PROJECT MODAL LOGIC ===
    const modal = document.getElementById('project-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    const triggers = document.querySelectorAll('.project-trigger');

    const mTitle = document.getElementById('modal-title');
    const mCategory = document.getElementById('modal-category');
    const mImage = document.getElementById('modal-image');
    const mDesc = document.getElementById('modal-desc');
    const mLink = document.getElementById('modal-link');
    const mLinkText = document.getElementById('modal-link-text');
    const mLinkIcon = document.getElementById('modal-link-icon');
    const mTech = document.getElementById('modal-tech');

    const techTagClass = 'px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300';

    function renderModalTech(techList) {
        mTech.innerHTML = '';
        const items = (techList || '').split(',').map(t => t.trim()).filter(Boolean);
        items.forEach(name => {
            const span = document.createElement('span');
            span.className = techTagClass;
            span.textContent = name;
            mTech.appendChild(span);
        });
    }

    function openModal(data) {
        mTitle.textContent = data.title;
        mCategory.textContent = data.category;
        mImage.src = data.image;
        mImage.classList.toggle('object-contain', !!data.containImage);
        mImage.classList.toggle('object-cover', !data.containImage);
        mDesc.textContent = data.desc;
        renderModalTech(data.tech);

        if (data.link) {
            mLink.href = data.link;
            mLink.classList.remove('hidden');
            mLinkText.textContent = data.linkLabel || 'Visit Website';
            const isGitHub = data.link.includes('github.com');
            mLinkIcon.className = isGitHub ? 'fab fa-github ml-2' : 'fas fa-external-link-alt ml-2';
        } else {
            mLink.href = '#';
            mLink.classList.add('hidden');
        }

        modal.classList.remove('hidden');
        setTimeout(() => {
            modalBackdrop.classList.remove('opacity-0');
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden'; 
    }

    function hideModal() {
        modalBackdrop.classList.add('opacity-0');
        modalContent.classList.remove('scale-100', 'opacity-100');
        modalContent.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const data = {
                title: trigger.dataset.title,
                category: trigger.dataset.category,
                image: trigger.dataset.image,
                desc: trigger.dataset.desc,
                link: trigger.dataset.link || '',
                linkLabel: trigger.dataset.linkLabel || '',
                tech: trigger.dataset.tech || '',
                containImage: trigger.dataset.containImage === 'true' || trigger.dataset.filterCategory === 'datascience'
            };
            openModal(data);
        });
    });

    closeModal.addEventListener('click', hideModal);
    modalBackdrop.addEventListener('click', hideModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModal();
    });

    // === TOAST NOTIFICATION LOGIC ===
    const toastContainer = document.getElementById('toast-container');
    const contactForm = document.getElementById('contact-form');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        
        const icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
        const colorClass = type === 'success' ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'bg-red-500 text-white';

        toast.className = `flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm toast-enter toast-enter-active ${colorClass}`;
        toast.innerHTML = `${icon} <span>${message}</span>`;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.remove('toast-enter-active');
            toast.classList.add('toast-exit-active');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Intercept submission and forward real data via Web3Forms
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop standard browser page navigation
            
            const btn = this.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Update UI to show live processing state
            btn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Sending...';
            btn.disabled = true;

            // Automatically aggregate all name/value fields into a data object
            const formData = new FormData(this);

            // Dispatch a secure background network request
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast('Message sent successfully! We will contact you shortly.', 'success');
                    this.reset(); // Erase typed inputs on successful receipt
                } else {
                    showToast('Submission failed. Please check your form configuration.', 'error');
                }
            })
            .catch(error => {
                console.error('Web3Forms Error:', error);
                showToast('Network error. Please try again later.', 'error');
            })
            .finally(() => {
                // Restore button interactivity 
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        });
    }

    // === SCROLL REVEAL ANIMATION [MODERN] ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
    });

    // === MAGNETIC BUTTON EFFECT ===
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    if (window.matchMedia("(min-width: 768px)").matches) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // === SPOTLIGHT EFFECT LOGIC [NEW] ===
    const spotlightCards = document.querySelectorAll('.spotlight-card');

    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            
        });
    });
   // === CALIBRATED BLUE/WHITE MATRIX POINTER ENGINE ===
(function() {
    const uiDot = document.getElementById('cursor-dot');
    const uiRing = document.getElementById('cursor-ring');
    const uiGlow = document.getElementById('cursor-glow');

    let currentMouseX = 0, currentMouseY = 0;
    let computedRingX = 0, computedRingY = 0;
    let computedGlowX = 0, computedGlowY = 0;

    // Listen to mouse movement vectors continuously
    document.addEventListener('mousemove', (event) => {
        currentMouseX = event.clientX;
        currentMouseY = event.clientY;
    });

    function renderCursorFrame() {
        // 1. Sharp white center focus dot tracks instantaneously
        if (uiDot) {
            uiDot.style.left = currentMouseX + 'px';
            uiDot.style.top = currentMouseY + 'px';
        }

        // 2. Translucent outer cyber-ring tracks with a smooth lagging delay loop
        if (uiRing) {
            computedRingX += (currentMouseX - computedRingX) * 0.15;
            computedRingY += (currentMouseY - computedRingY) * 0.15;
            uiRing.style.left = computedRingX + 'px';
            uiRing.style.top = computedRingY + 'px';
        }

        // 3. Large soft blue shadow background aura trails fluidly behind
        if (uiGlow) {
            computedGlowX += (currentMouseX - computedGlowX) * 0.06;
            computedGlowY += (currentMouseY - computedGlowY) * 0.06;
            uiGlow.style.left = computedGlowX + 'px';
            uiGlow.style.top = computedGlowY + 'px';
        }

        requestAnimationFrame(renderCursorFrame);
    }
    // Fire up the animation calculation frame clock
    renderCursorFrame();

    // === HIGH-CONTRAST BLUE THEME HOVER STATE ACTIONS ===
    document.querySelectorAll('a, button, input, textarea, .proj-card, .bento-card, .tech-pill, .project-trigger').forEach(node => {
        node.addEventListener('mouseenter', () => {
            if (uiRing) {
                uiRing.style.width = '56px';
                uiRing.style.height = '56px';
                // Changes to a soft electric translucent blue fill on hover
                uiRing.style.backgroundColor = 'rgba(0, 210, 255, 0.06)'; 
                // Changes to a sharp vivid cyan border line on hover
                uiRing.style.borderColor = '#00d2ff'; 
            }
        });
        node.addEventListener('mouseleave', () => {
            if (uiRing) {
                uiRing.style.width = '34px';
                uiRing.style.height = '34px';
                // Restores standard deep blue background tint
                uiRing.style.backgroundColor = 'rgba(37, 99, 235, 0.03)'; 
                // Restores standard muted cyan border alpha outline
                uiRing.style.borderColor = 'rgba(0, 210, 255, 0.5)'; 
            }
        });
    });
})();