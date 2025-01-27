let currentImage;

// Function to open the popup form
function openForm(imageElement) {
    currentImage = imageElement;
    const popupForm = document.getElementById('popupForm');
    if (popupForm) {
        popupForm.style.display = 'block';
    } else {
        console.error("Popup form element not found");
    }
}

// Function to close the popup form
function closeForm() {
    const popupForm = document.getElementById('popupForm');
    if (popupForm) {
        popupForm.style.display = 'none';
    } else {
        console.error("Popup form element not found");
    }
}

// Function to unblur all images
function unblurAllImages() {
    $('.portfolio-image img').each(function() {
        $(this).addClass('unblur');
    });
}

// Function to handle WhatsApp message
function sendWhatsApp() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var bhk_type = document.getElementById("bhk_type").value;

    var message = "Lead%20Details:%0A" +
        "Name:%20" + encodeURIComponent(name) + "%0A" +
        "Email:%20" + encodeURIComponent(email) + "%0A" +
        "Phone:%20" + encodeURIComponent(phone) + "%0A" +
        "BHK%20Type:%20" + encodeURIComponent(bhk_type);

    var whatsappLink = document.getElementById("whatsapp-link");
    whatsappLink.href = "https://wa.me/919845339426?text=" + message;
    window.open(whatsappLink.href, "_blank");
}

// Unified form submission handler for both popup and main form
function handleFormSubmission(formElement, isPopup = false) {
    const submitButton = $(formElement).find("#submit-button");
    
    // Show spinner and disable submit button
    submitButton.html(
        '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...'
    ).prop("disabled", true);

    // Submit form data via AJAX
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbxTMsg0jYIPApi0kj6KKGo0fyuya-939CEqWJBqd_dLjh5UXqxfIjLNDzxZ0gyYDDeI8w/exec",
        data: $(formElement).serialize(),
        method: "POST",
        success: function (response) {
            // Unblur all images on successful form submission
            unblurAllImages();
            
            // If this is the popup form, close it
            if (isPopup) {
                closeForm();
            }
            
            // Reset form and button
            formElement.reset();
            submitButton.html("Send Message").prop("disabled", false);
            
            alert("Form submitted successfully!");
        },
        error: function (err) {
            alert("Something went wrong. Please try again.");
            submitButton.html("Send Message").prop("disabled", false);
        },
    });
}

// Event listeners
$(document).ready(function() {
    // Popup form submission
    $("#popupForm form").on("submit", function(e) {
        e.preventDefault();
        handleFormSubmission(this, true);
    });

    // Main contact form submission
    $("#submit-form").on("submit", function(e) {
        e.preventDefault();
        handleFormSubmission(this, false);
    });

    // Attach click event to all images to trigger the form popup
    $('.portfolio-image img').on('click', function() {
        openForm(this);
    });

    // Close form when clicking outside of it
    $(window).on('click', function(event) {
        if (event.target.id === 'popupForm') {
            closeForm();
        }
    });
}); 