/* =========================================================
   ESHMAL KHAN PORTFOLIO
   PREMIUM INTERACTIONS & ANIMATIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PAGE LOADER
    ===================================================== */

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }

        }, 700);

    });


    /* =====================================================
       02. NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    };

    window.addEventListener(
        "scroll",
        handleNavbarScroll,
        { passive: true }
    );

    handleNavbarScroll();


    /* =====================================================
       03. MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            const isOpen =
                navMenu.classList.contains("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            const icon =
                menuToggle.querySelector("i");

            if (icon) {

                icon.className = isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

            }

        });


        /* Close menu after clicking a link */

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.className =
                        "fa-solid fa-bars";

                }

            });

        });

    }


    /* =====================================================
       04. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-link");

    const updateActiveLink = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const target =
                link.getAttribute("href");

            if (
                target === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveLink,
        { passive: true }
    );

    updateActiveLink();


    /* =====================================================
       05. SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(anchor => {

            anchor.addEventListener("click", event => {

                const targetId =
                    anchor.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;

                const targetPosition =
                    target.offsetTop -
                    navbarHeight -
                    15;

                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });


    /* =====================================================
       06. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 700) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        };

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        updateBackToTop();


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       07. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-grid, " +
            ".education-card, " +
            ".experience-item, " +
            ".skill-category, " +
            ".service-card, " +
            ".review-card, " +
            ".social-card, " +
            ".contact-wrapper"
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       08. STAGGER ANIMATION FOR CARDS
    ===================================================== */

    const cardGroups = [
        ".skill-category",
        ".service-card",
        ".review-card"
    ];


    cardGroups.forEach(selector => {

        const cards =
            document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        });

    });


    /* =====================================================
       09. HERO VISUAL PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");

    const visualCard =
        document.querySelector(".visual-card");

    if (
        heroVisual &&
        visualCard &&
        window.matchMedia(
            "(min-width: 801px)"
        ).matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    ((x - centerX) /
                    centerX) * 4;

                const rotateX =
                    ((centerY - y) /
                    centerY) * 4;

                visualCard.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY - 4}deg)`;

            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                visualCard.style.transform =
                    "perspective(1200px) rotateY(-4deg)";

            }
        );

    }


    /* =====================================================
       10. MOUSE GLOW EFFECT
    ===================================================== */

    const glowSections =
        document.querySelectorAll(
            ".skill-category, " +
            ".service-card, " +
            ".review-card, " +
            ".experience-card"
        );


    glowSections.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                card.style.background = `
                    radial-gradient(
                        250px circle at
                        ${x}px ${y}px,
                        rgba(184,124,255,.09),
                        rgba(255,255,255,.022)
                    )
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.background = "";

            }
        );

    });


    /* =====================================================
       11. FLOATING CARDS
    ===================================================== */

    const floatingCards =
        document.querySelectorAll(
            ".floating-card"
        );


    floatingCards.forEach((card, index) => {

        let position = 0;

        const speed =
            index % 2 === 0
                ? 0.002
                : -0.0017;


        const animateFloating = time => {

            position =
                Math.sin(time * speed) * 8;

            card.style.marginTop =
                `${position}px`;

            requestAnimationFrame(
                animateFloating
            );

        };

        requestAnimationFrame(
            animateFloating
        );

    });


    /* =====================================================
       12. NUMBER COUNTER
    ===================================================== */

    const counters =
        document.querySelectorAll(
            ".stat-number"
        );


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting)
                        return;

                    const counter =
                        entry.target;

                    const text =
                        counter.textContent.trim();

                    const match =
                        text.match(
                            /(\d+)/
                        );

                    if (!match) return;

                    const target =
                        parseInt(
                            match[1],
                            10
                        );

                    const prefix =
                        text.substring(
                            0,
                            match.index
                        );

                    const suffix =
                        text.substring(
                            match.index +
                            match[0].length
                        );

                    let current = 0;

                    const duration = 1400;

                    const start =
                        performance.now();


                    const updateCounter =
                        currentTime => {

                            const progress =
                                Math.min(
                                    (currentTime - start) /
                                    duration,
                                    1
                                );

                            const eased =
                                1 -
                                Math.pow(
                                    1 - progress,
                                    3
                                );

                            current =
                                Math.floor(
                                    target * eased
                                );

                            counter.textContent =
                                prefix +
                                current +
                                suffix;


                            if (progress < 1) {

                                requestAnimationFrame(
                                    updateCounter
                                );

                            } else {

                                counter.textContent =
                                    text;

                            }

                        };


                    requestAnimationFrame(
                        updateCounter
                    );


                    counterObserver.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: .5
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       13. TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.querySelector(
            ".typing-text"
        );


    if (typingElement) {

        const words = [
            "Full Stack Developer",
            "Web Developer",
            "Freelancer"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;


        const typeEffect = () => {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                characterIndex++;

            } else {

                characterIndex--;

            }


            typingElement.textContent =
                currentWord.substring(
                    0,
                    characterIndex
                );


            let delay =
                deleting
                    ? 55
                    : 100;


            if (
                !deleting &&
                characterIndex ===
                currentWord.length
            ) {

                delay = 1500;

                deleting = true;

            }


            if (
                deleting &&
                characterIndex === 0
            ) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    words.length;

                delay = 400;

            }


            setTimeout(
                typeEffect,
                delay
            );

        };


        typeEffect();

    }


    /* =====================================================
       14. CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       15. LINK HOVER MAGNETIC EFFECT
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".primary-btn, " +
            ".linkedin-btn, " +
            ".nav-contact-btn"
        );


    magneticButtons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 801
                ) return;

                const rect =
                    button.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                button.style.transform =
                    `translate(${x * .08}px,
                               ${y * .08}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform = "";

            }
        );

    });


    /* =====================================================
       16. IMAGE / AVATAR FALLBACK
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.style.display =
                        "none";

                }
            );

        });


    /* =====================================================
       17. KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (navMenu) {

                    navMenu.classList.remove(
                        "open"
                    );

                }

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const icon =
                        menuToggle.querySelector(
                            "i"
                        );

                    if (icon) {

                        icon.className =
                            "fa-solid fa-bars";

                    }

                }

            }

        }
    );


    /* =====================================================
       18. DISABLE PARALLAX ON SMALL DEVICES
    ===================================================== */

    const mediaQuery =
        window.matchMedia(
            "(max-width: 800px)"
        );


    const resetMobileVisual = () => {

        if (
            mediaQuery.matches &&
            visualCard
        ) {

            visualCard.style.transform =
                "none";

        }

    };


    resetMobileVisual();

    mediaQuery.addEventListener(
        "change",
        resetMobileVisual
    );


    /* =====================================================
       19. CONSOLE BRANDING
    ===================================================== */

    console.log(
        "%c ESHMAL KHAN ",
        "background:#b87cff;color:#12091b;" +
        "padding:8px 14px;" +
        "border-radius:8px;" +
        "font-weight:bold;"
    );

    console.log(
        "Full Stack Developer / Freelancer"
    );

});