// ULTRA ZOOM OUT ANIMATION
window.addEventListener("load", () => {

    const wrapper = document.querySelector(".wrapper");

    if (!wrapper) return;

    wrapper.style.transition = "none";
    wrapper.style.transform = "scale(3)";
    wrapper.style.opacity = "0";

    // Allow browser to apply starting zoom
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {

            wrapper.style.transition =
                "transform 2.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.5s ease";

            wrapper.style.transform = "scale(1)";
            wrapper.style.opacity = "1";

        });
    });

});

//start
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

let isPageTurning = false;

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {

        // Prevent repeated clicks during page animation
        if (isPageTurning) return;

        isPageTurning = true;

        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');

            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        }
        else {
            pageTurn.classList.add('turn');

            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }

        // Allow another click after the flip animation
        setTimeout(() => {
            isPageTurning = false;
        }, 1100);
    };
});

//contact me button
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}

//reverse 
let totalPages = pages.length;
let pageNumber =0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}
// PROFILE BUTTON - RETURN TO FIRST PAGE
//profile btn
const backProfileBtn = document.querySelector('.back-profile');

let isProfileAnimating = false;

backProfileBtn.onclick = (e) => {
    e.preventDefault();

    if (isProfileAnimating) return;
    isProfileAnimating = true;

    pages.forEach((_, index) => {
        const page = pages[pages.length - 1 - index];
        const delay = (index + 1) * 200 + 100;

        setTimeout(() => {
            page.classList.remove('turn');

            setTimeout(() => {
                page.style.zIndex = 10 + index;
            }, 500);

        }, delay);
    });

    setTimeout(() => {
        isProfileAnimating = false;
    }, pages.length * 200 + 1600);
};


//animation
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');

setTimeout(() => {
    coverRight.classList.add('turn');
}, 2100)

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800)

setTimeout(() => {
    pageLeft.style.zIndex = 20;
}, 3200)


pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;
        }, 500 )

    }, (index + 1) * 200 + 2100)
})


document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        const moreText = this.previousElementSibling.querySelector('.more-text');
        
        if (moreText.style.display === 'none' || moreText.style.display === '') {
            moreText.style.display = 'inline';
            this.textContent = 'Read Less';
        } else {
            moreText.style.display = 'none';
            this.textContent = 'Read More';
        }
    });
});

// Contact Form

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async function(e) {

    e.preventDefault();

    const submitButton =
        contactForm.querySelector('input[type="submit"]');

    submitButton.value = "Sending...";
    submitButton.disabled = true;

    const formData = new FormData(contactForm);

    try {

        const response = await fetch(
            "https://formsubmit.co/ajax/vonurbis26@gmail.com",
            {
                method: "POST",
                body: formData
            }
        );

        if (response.ok) {

            formMessage.textContent =
                "Message sent successfully!";

            formMessage.style.color = "green";

            contactForm.reset();

            // Remove success message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = "";
            }, 5000);

        } else {

            formMessage.textContent =
                "Something went wrong. Please try again.";

            formMessage.style.color = "red";

            // Remove error message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = "";
            }, 5000);

        }

    } catch (error) {

        formMessage.textContent =
            "Unable to send message. Please try again.";

        formMessage.style.color = "red";

        // Remove error message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = "";
        }, 5000);

    }

    submitButton.value = "Send Message";
    submitButton.disabled = false;

});
