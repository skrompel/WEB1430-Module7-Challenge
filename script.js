'use strict';

function validateInput(input) {
    const errorSpan = input.nextElementSibling;

    if(input.checkValidity()) {
        errorSpan.textContent = "";
    } else {
        errorSpan.textContent = input.title || "Invalid Input!";
    }
}

document.querySelectorAll('input, textarea').forEach(function(input) {
    input.addEventListener('input', function() {
        validateInput(input);
    });
});

document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    let valid = true;

    document.querySelectorAll('input').forEach(function(input) {
        validateInput(input);

        if(!input.checkValidity()) {
            valid = false;
        }
    })

    if(!valid) {
        event.preventDefault();
        alert("Form is not valid");
    }
});

document.getElementById('checkoutForm').addEventListener('reset', function () {
  this.querySelectorAll('.error').forEach(function (span) {
    span.textContent = '';
    });
});

if (!HTMLInputElement.prototype.checkValidity || !HTMLFormElement.prototype.checkValidity) {

  // Input polyfill
  if (!HTMLInputElement.prototype.checkValidity) {
    HTMLInputElement.prototype.checkValidity = function () {
      this.validationMessage = '';
      const val = this.value.trim();

      // Required check
      if (this.hasAttribute('required') && !val) {
        this.validationMessage = 'Please fill out this field.';
        return false;
      }

      // Pattern check
      if (this.hasAttribute('pattern') && val) {
        try {
          const pattern = this.getAttribute('pattern');
          const regex = new RegExp('^' + pattern + '$');
          if (!regex.test(val)) {
            this.validationMessage = this.title || 'Please match the requested format.';
            return false;
          }
        } catch (e) {
          console.warn('Invalid pattern:', pattern);
          return false;
        }
      }

      return true;
    };
  }
}