/**
 * User Edit Profile JavaScript Module
 * Handles avatar preview and form validation for user profile editing
 */

// Avatar Preview Functionality
function initAvatarPreview() {
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");

  if (avatarInput && avatarPreview) {
    avatarInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      
      if (file) {
        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
          alert("Dozvoljena su samo JPG, PNG i GIF formatovanja!");
          this.value = "";
          return;
        }

        // Validate file size (5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          alert("Fajl ne sme biti veći od 5MB!");
          this.value = "";
          return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = function (e) {
          avatarPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// Form Validation Functionality
function initFormValidation() {
  const form = document.querySelector("form");
  
  if (form) {
    form.addEventListener("submit", function (event) {
      const newPassword = document.querySelector('input[name="newPassword"]');
      const confirmPassword = document.querySelector('input[name="confirmPassword"]');
      const currentPassword = document.querySelector('input[name="currentPassword"]');

      // Password validation
      if (newPassword && confirmPassword) {
        if (newPassword.value && newPassword.value !== confirmPassword.value) {
          alert("Nova lozinka i potvrda lozinke se ne slažu!");
          event.preventDefault();
          return false;
        }

        if (newPassword.value && (!currentPassword || !currentPassword.value)) {
          alert("Morate uneti trenutnu lozinku za promenu lozinke!");
          event.preventDefault();
          return false;
        }
      }

      // Additional validation can be added here
      return true;
    });
  }
}

// Real-time password validation
function initPasswordValidation() {
  const newPassword = document.querySelector('input[name="newPassword"]');
  const confirmPassword = document.querySelector('input[name="confirmPassword"]');
  
  if (newPassword && confirmPassword) {
    confirmPassword.addEventListener("input", function () {
      if (newPassword.value && confirmPassword.value) {
        if (newPassword.value !== confirmPassword.value) {
          confirmPassword.setCustomValidity("Lozinke se ne slažu");
        } else {
          confirmPassword.setCustomValidity("");
        }
      }
    });
  }
}

// Initialize all functions when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initAvatarPreview();
  initFormValidation();
  initPasswordValidation();
  
  console.log("✅ User Edit Profile module loaded successfully");
});