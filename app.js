

document.addEventListener("DOMContentLoaded", () => {

    

    const body = document.body;
    const nav = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuBtn.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuBtn.classList.remove("active");
            });
        });
    }




    document.getElementById(
  "themeBtn"
).onclick = () => {

  document.body.classList.toggle(
    "light"
  );


  const theme =
    document.body.classList.contains("light")
      ? "light"
      : "dark";


  localStorage.setItem(
    "vybe-theme",
    theme
  );

};


if (
  localStorage.getItem("vybe-theme")
  === "light"
) {

  document.body.classList.add(
    "light"
  );

}



    function updateNavbar() {
        if (!nav) return;

        if (window.scrollY > 40) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();



    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navigationLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();


    const themeBtn =
        document.querySelector(".theme-toggle") ||
        document.querySelector("#themeToggle");

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            body.classList.toggle("light-theme");

            const isLight =
                body.classList.contains("light-theme");

            localStorage.setItem(
                "portfolioTheme",
                isLight ? "light" : "dark"
            );

            updateThemeIcon();
        });

        function updateThemeIcon() {
            const isLight =
                body.classList.contains("light-theme");

            if (themeBtn.querySelector("i")) {
                themeBtn.querySelector("i").className =
                    isLight
                        ? "fa-solid fa-moon"
                        : "fa-solid fa-sun";
            }
        }

        const savedTheme =
            localStorage.getItem("portfolioTheme");

        if (savedTheme === "light") {
            body.classList.add("light-theme");
        }

        updateThemeIcon();
    }


    

    const revealElements = document.querySelectorAll(
        ".reveal, .project-card, .skill-card, .stat-card, .timeline-item"
    );

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });




    const counters =
        document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target =
            parseInt(counter.dataset.target || counter.textContent);

        let current = 0;

        const duration = 1600;

        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

            const eased =
                1 - Math.pow(1 - progress, 3);

            current =
                Math.floor(target * eased);

            counter.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        counterObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.7
            }
        );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });



    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const filter =
                button.dataset.filter ||
                button.getAttribute("data-filter") ||
                "all";

            projectCards.forEach(card => {

                const categories =
                    card.dataset.category || "";

                if (
                    filter === "all" ||
                    categories
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                ) {

                    card.style.display = "";

                    setTimeout(() => {
                        card.classList.add("show");
                    }, 30);

                } else {

                    card.style.display = "none";
                }

            });

        });

    });



    const modal =
        document.querySelector(".project-modal") ||
        document.querySelector("#projectModal");

    const modalImage =
        document.querySelector(".modal-image");

    const modalTitle =
        document.querySelector(".modal-title");

    const modalDescription =
        document.querySelector(".modal-description");

    const modalClose =
        document.querySelector(".modal-close");

    const previewButtons =
        document.querySelectorAll(
            ".preview-btn, .project-preview"
        );


    function openProjectModal(card) {

        if (!modal) return;

        const image =
            card.querySelector("img");

        const title =
            card.querySelector("h3");

        const description =
            card.querySelector("p");

        if (modalImage && image) {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
        }

        if (modalTitle && title) {
            modalTitle.textContent =
                title.textContent;
        }

        if (modalDescription && description) {
            modalDescription.textContent =
                description.textContent;
        }

        modal.classList.add("active");

        body.classList.add("modal-open");
    }


    previewButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const card =
                button.closest(".project-card");

            if (card) {
                openProjectModal(card);
            }

        });

    });


    function closeProjectModal() {

        if (!modal) return;

        modal.classList.remove("active");

        body.classList.remove("modal-open");
    }


    if (modalClose) {
        modalClose.addEventListener(
            "click",
            closeProjectModal
        );
    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal ||
                    event.target.classList.contains(
                        "modal-overlay"
                    )
                ) {
                    closeProjectModal();
                }

            }
        );
    }


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeProjectModal();
            }

        }
    );



    const loadMoreBtn =
        document.querySelector(".load-more");

    const hiddenProjects =
        document.querySelectorAll(".project-card.hidden");

    if (loadMoreBtn) {

        loadMoreBtn.addEventListener(
            "click",
            () => {

                hiddenProjects.forEach(card => {
                    card.classList.remove("hidden");
                    card.style.display = "";
                });

                loadMoreBtn.style.display = "none";

            }
        );
    }


    const contactForm =
        document.querySelector("#contactForm") ||
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    contactForm.querySelector(
                        'input[name="name"]'
                    );

                const email =
                    contactForm.querySelector(
                        'input[name="email"]'
                    );

                const message =
                    contactForm.querySelector(
                        "textarea"
                    );

                if (
                    !name ||
                    !email ||
                    !message
                ) {
                    return;
                }

                if (
                    name.value.trim() === "" ||
                    email.value.trim() === "" ||
                    message.value.trim() === ""
                ) {

                    showNotification(
                        "Please fill all fields.",
                        "error"
                    );

                    return;
                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (
                    !emailPattern.test(
                        email.value.trim()
                    )
                ) {

                    showNotification(
                        "Please enter a valid email.",
                        "error"
                    );

                    return;
                }


                showNotification(
                    "Message sent successfully! 🚀",
                    "success"
                );

                contactForm.reset();

            }
        );
    }


    

    function showNotification(
        message,
        type = "success"
    ) {

        const oldNotification =
            document.querySelector(
                ".custom-notification"
            );

        if (oldNotification) {
            oldNotification.remove();
        }


        const notification =
            document.createElement("div");

        notification.className =
            `custom-notification ${type}`;

        notification.innerHTML = `
            <span>${message}</span>
            <button aria-label="Close">×</button>
        `;


        document.body.appendChild(
            notification
        );


        requestAnimationFrame(() => {
            notification.classList.add("show");
        });


        notification
            .querySelector("button")
            .addEventListener(
                "click",
                () => {
                    notification.remove();
                }
            );


        setTimeout(() => {

            notification.classList.remove("show");

            setTimeout(() => {
                notification.remove();
            }, 400);

        }, 3500);
    }



    const cursorGlow =
        document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        document.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;
                mouseY = event.clientY;

            }
        );


        function animateGlow() {

            glowX +=
                (mouseX - glowX) * 0.12;

            glowY +=
                (mouseY - glowY) * 0.12;


            cursorGlow.style.transform =
                `translate3d(${glowX}px, ${glowY}px, 0)`;


            requestAnimationFrame(
                animateGlow
            );
        }


        animateGlow();
    }

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent =
            new Date().getFullYear();
    });




    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const offset = 80;

                    const position =
                        target.offsetTop -
                        offset;

                    window.scrollTo({
                        top: position,
                        behavior: "smooth"
                    });

                }
            );

        });


    document
        .querySelectorAll(
            ".btn, button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                function(event) {

                    const ripple =
                        document.createElement(
                            "span"
                        );

                    ripple.className =
                        "ripple";

                    const rect =
                        this.getBoundingClientRect();

                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );

                    ripple.style.width =
                        `${size}px`;

                    ripple.style.height =
                        `${size}px`;

                    ripple.style.left =
                        `${event.clientX - rect.left - size / 2}px`;

                    ripple.style.top =
                        `${event.clientY - rect.top - size / 2}px`;


                    this.appendChild(ripple);


                    setTimeout(() => {
                        ripple.remove();
                    }, 600);

                }
            );

        });


    const typingElement =
        document.querySelector(
            ".typing-text"
        );

    if (typingElement) {

        const words = [
            "Web Developer",
            "Frontend Developer",
            "UI Designer",
            "Creative Coder"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex + 1
                    );

                charIndex++;


                if (
                    charIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1300
                    );

                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(
                        0,
                        charIndex - 1
                    );

                charIndex--;


                if (charIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;
                }

            }


            setTimeout(
                typeEffect,
                deleting ? 45 : 90
            );
        }


        typeEffect();
    }


    


    const heroArt =
        document.querySelector(".hero-art");

    if (
        heroArt &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    (window.innerWidth / 2 -
                        event.clientX) /
                    45;

                const y =
                    (window.innerHeight / 2 -
                        event.clientY) /
                    45;


                heroArt.style.transform =
                    `translate3d(${x}px, ${y}px, 0)`;

            }
        );
    }

    document
        .querySelectorAll(".project-card")
        .forEach(card => {

            const image =
                card.querySelector(
                    ".project-image img"
                );

            if (!image) return;


            card.addEventListener(
                "mouseenter",
                () => {

                    image.style.transform =
                        "scale(1.025)";

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    image.style.transform =
                        "scale(1)";

                }
            );

        });


    /* =========================
       IMAGE LOADING
    ========================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            if (image.complete) {
                image.classList.add(
                    "loaded"
                );
            } else {

                image.addEventListener(
                    "load",
                    () => {
                        image.classList.add(
                            "loaded"
                        );
                    }
                );

            }

            image.addEventListener(
                "error",
                () => {

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* =========================
       PAGE LOADED
    ========================= */

    setTimeout(() => {

        body.classList.add(
            "page-loaded"
        );

    }, 150);


    /* =========================
       BACK TO TOP
    ========================= */

    const backTop =
        document.querySelector(
            ".back-to-top"
        );

    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backTop.classList.add(
                        "show"
                    );

                } else {

                    backTop.classList.remove(
                        "show"
                    );

                }

            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    console.log(
        "%c HINA RANI PORTFOLIO ",
        "background:#baff3f;color:#050609;font-size:18px;font-weight:bold;padding:8px 14px;border-radius:6px;"
    );

    console.log(
        "Portfolio loaded successfully 🚀"
    );

});