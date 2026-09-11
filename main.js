document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. PROJECT TECHNOLOGY FILTERING
    ========================================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-featured-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const selectedFilter =
                button.getAttribute("data-filter");


            projectCards.forEach(card => {

                const categories =
                    card.getAttribute("data-category")
                        ? card.getAttribute("data-category").split(" ")
                        : [];


                if (
                    selectedFilter === "all" ||
                    categories.includes(selectedFilter)
                ) {

                    card.style.display = "grid";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });



    /* =========================================================
       2. FOCUSSPACE POMODORO DEMO
    ========================================================= */

    const timerDisplay =
        document.getElementById("timer");

    const toggleBtn =
        document.getElementById("toggle-timer-btn");

    const timerStatus =
        document.getElementById("timer-status");


    let isRunning = false;

    let secondsLeft = 25 * 60;

    let timerInterval = null;


    function formatTime(sec) {

        const m =
            Math.floor(sec / 60)
                .toString()
                .padStart(2, "0");

        const s =
            (sec % 60)
                .toString()
                .padStart(2, "0");

        return `${m}:${s}`;
    }


    if (toggleBtn && timerDisplay) {

        toggleBtn.addEventListener("click", (e) => {

            e.preventDefault();


            if (!isRunning) {

                /*
                 * If the timer has completed,
                 * restart it from 25 minutes.
                 */

                if (secondsLeft === 0) {

                    secondsLeft = 25 * 60;

                    timerDisplay.textContent =
                        formatTime(secondsLeft);
                }

                isRunning = true;

                toggleBtn.innerHTML =
                    `<i class="fa-solid fa-pause"></i> Pause Timer Demo`;


                if (timerStatus) {

                    timerStatus.textContent =
                        "focus session running";

                }


                timerInterval =
                    setInterval(() => {

                        if (secondsLeft > 0) {

                            secondsLeft--;

                            timerDisplay.textContent =
                                formatTime(secondsLeft);

                        } else {

                            clearInterval(timerInterval);

                            timerInterval = null;

                            isRunning = false;


                            if (timerStatus) {

                                timerStatus.textContent =
                                    "focus session complete";

                            }


                            toggleBtn.innerHTML =
                                `<i class="fa-solid fa-rotate-right"></i> Restart Demo`;

                        }

                    }, 1000);


            } else {

                clearInterval(timerInterval);

                timerInterval = null;

                isRunning = false;


                if (timerStatus) {

                    timerStatus.textContent =
                        "focus session paused";

                }


                toggleBtn.innerHTML =
                    `<i class="fa-solid fa-play"></i> Resume Timer Demo`;

            }

        });

    }



    /* =========================================================
       3. FOCUSSPACE SOUNDSCAPE SELECTOR
    ========================================================= */

    window.playAmbient = function(soundType) {

        const soundChips =
            document.querySelectorAll(".sound-chip");


        soundChips.forEach(chip => {

            if (
                chip.textContent.trim() === soundType
            ) {

                chip.classList.add("active");

            } else {

                chip.classList.remove("active");

            }

        });

    };



    /* =========================================================
       4. IMAGE GALLERY MINI PREVIEW FILTER
    ========================================================= */

    const galleryChips =
        document.querySelectorAll(".gallery-chip");

    const galleryItems =
        document.querySelectorAll(".mini-gallery-item");


    galleryChips.forEach(chip => {

        chip.addEventListener("click", () => {

            galleryChips.forEach(c => {
                c.classList.remove("active");
            });

            chip.classList.add("active");


            const cat =
                chip.getAttribute("data-cat");


            galleryItems.forEach(item => {

                const itemCat =
                    item.getAttribute("data-cat");


                if (
                    cat === "all" ||
                    itemCat === cat
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

        });

    });



    /* =========================================================
       5. EDUGENIE PORTFOLIO MINI DEMO

       NOTE:
       This is only the portfolio preview.
       No OpenAI API key is used here.
    ========================================================= */

    const eduInput =
        document.getElementById("portfolio-course-input");

    const eduGenerateBtn =
        document.getElementById("portfolio-generate-btn");

    const eduOutput =
        document.getElementById("edugenie-preview-output");

    const eduSuggestionButtons =
        document.querySelectorAll(".edugenie-chip");


    function generateEduGeniePreview(topic) {

        if (!eduOutput) {
            return;
        }


        topic = topic.trim();


        if (!topic) {

            eduOutput.innerHTML = `
                <div class="edugenie-placeholder">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    <span>
                        Please enter a course topic.
                    </span>

                </div>
            `;

            return;
        }


        eduOutput.innerHTML = `

            <div class="mini-result-card">

                <div class="mini-result-title">

                    <i class="fa-solid fa-bullseye"></i>

                    Course Objective

                </div>

                <div class="mini-result-text">

                    Build a strong foundation in
                    ${escapeHTML(topic)}
                    with practical concepts and workflows.

                </div>

            </div>


            <div class="mini-result-card">

                <div class="mini-result-title">

                    <i class="fa-solid fa-list-check"></i>

                    Sample Syllabus

                </div>

                <div class="mini-result-text">

                    Fundamentals → Applied Concepts →
                    Advanced Practice

                </div>

            </div>


            <div class="mini-result-card">

                <div class="mini-result-title">

                    <i class="fa-solid fa-graduation-cap"></i>

                    Learning Outcomes

                </div>

                <div class="mini-result-text">

                    Analyze concepts, apply techniques
                    and evaluate practical solutions.

                </div>

            </div>

        `;
    }



    /* =========================================================
       6. GENERATE BUTTON
    ========================================================= */

    if (eduGenerateBtn) {

        eduGenerateBtn.addEventListener("click", () => {

            generateEduGeniePreview(
                eduInput ? eduInput.value : ""
            );

        });

    }



    /* =========================================================
       7. ENTER KEY FOR EDUGENIE
    ========================================================= */

    if (eduInput) {

        eduInput.addEventListener("keydown", (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                generateEduGeniePreview(
                    eduInput.value
                );

            }

        });

    }



    /* =========================================================
       8. QUICK SUGGESTION BUTTONS
    ========================================================= */

    eduSuggestionButtons.forEach(button => {

        button.addEventListener("click", () => {

            const topic =
                button.getAttribute("data-topic");


            if (eduInput) {

                eduInput.value = topic;

            }


            generateEduGeniePreview(topic);

        });

    });



    /* =========================================================
       9. HTML ESCAPE FUNCTION

       Prevents user-entered text from being interpreted
       as HTML inside the EduGenie preview.
    ========================================================= */

    function escapeHTML(text) {

        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }



    /* =========================================================
       10. INITIAL TIMER DISPLAY
    ========================================================= */

    if (timerDisplay) {

        timerDisplay.textContent =
            formatTime(secondsLeft);

    }



    /* =========================================================
       11. NAVBAR ACTIVE LINK
    ========================================================= */

    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(nav => {
                nav.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


/* =========================================================
   CERTIFICATE IMAGE PREVIEW & INTERACTION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // Select all certificate images
    const certificateImages = document.querySelectorAll(".certificate-image");

    // Add click event listener to open image in a new browser tab
    certificateImages.forEach(image => {
        image.addEventListener("click", () => {
            if (image.src) {
                window.open(image.src, "_blank");
            }
        });
    });
});