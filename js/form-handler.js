// Form handling and HubSpot integration
document.addEventListener('DOMContentLoaded', function() {

    // Demo form handling
    const demoForm = document.getElementById('demoForm');

    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Collect form data
            const formData = new FormData(this);
            const formObject = {};

            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }

            // Submit to HubSpot (this would need to be configured with actual HubSpot portal ID and form GUID)
            submitToHubSpot(formObject)
                .then(response => {
                    showSuccessMessage();
                    this.reset();
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    showErrorMessage();
                })
                .finally(() => {
                    // Restore button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    }

    // HubSpot form submission function
    async function submitToHubSpot(formData) {
        // This is a placeholder for HubSpot integration
        // In production, you would replace this with actual HubSpot API calls
        // or use HubSpot's embedded forms

        const hubspotPortalId = 'YOUR_HUBSPOT_PORTAL_ID';
        const hubspotFormGuid = 'YOUR_HUBSPOT_FORM_GUID';

        // For now, we'll simulate a submission and log to console
        console.log('Form data to submit to HubSpot:', formData);

        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure randomly for demo purposes
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 1000);
        });

        /*
        // Actual HubSpot submission would look like this:
        const hubspotData = {
            fields: [
                { name: 'firstname', value: formData.firstName },
                { name: 'lastname', value: formData.lastName },
                { name: 'email', value: formData.email },
                { name: 'phone', value: formData.phone },
                { name: 'company', value: formData.company || '' },
                { name: 'region', value: formData.region },
                { name: 'current_machines', value: formData.currentMachines || '' },
                { name: 'preferred_time', value: formData.preferredTime },
                { name: 'preferred_day', value: formData.preferredDay },
                { name: 'additional_info', value: formData.additionalInfo || '' }
            ],
            context: {
                pageUri: window.location.href,
                pageName: document.title,
                hutk: getHubSpotCookie()
            }
        };

        const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormGuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hubspotData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
        */
    }

    // Get HubSpot tracking cookie
    function getHubSpotCookie() {
        const name = 'hubspotutk';
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <h3>Thank you for your interest!</h3>
                <p>We've received your demo request and will contact you within 24 hours to schedule your personalized demonstration.</p>
                <p>In the meantime, feel free to explore our <a href="specifications.html">detailed specifications</a> or <a href="pricing.html">pricing calculator</a>.</p>
            </div>
        `;

        const demoFormSection = document.querySelector('.demo-form-section');
        if (demoFormSection) {
            demoFormSection.appendChild(successMessage);
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Hide form
            const formContainer = document.querySelector('.form-container');
            if (formContainer) {
                formContainer.style.display = 'none';
            }
        }
    }

    // Show error message
    function showErrorMessage() {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-error-message';
        errorMessage.innerHTML = `
            <div class="error-content">
                <div class="error-icon">⚠</div>
                <h3>Submission Error</h3>
                <p>We're sorry, but there was an issue submitting your form. Please try again or contact us directly.</p>
                <div class="contact-alternatives">
                    <p><strong>Email:</strong> <a href="mailto:sales@grabbix.com">sales@grabbix.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:1300123456">1300 123 456</a></p>
                </div>
            </div>
        `;

        const formContainer = document.querySelector('.form-container');
        if (formContainer) {
            formContainer.appendChild(errorMessage);
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Auto-hide error message after 10 seconds
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.remove();
            }
        }, 10000);
    }

    // Enhanced form validation
    function enhancedValidation() {
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');

        if (emailField) {
            emailField.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email) {
                    // Check if email domain is valid
                    const domain = email.split('@')[1];
                    if (domain) {
                        // Add visual feedback for common business domains
                        const businessDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'];
                        const isBusinessEmail = !businessDomains.includes(domain.toLowerCase());

                        if (isBusinessEmail) {
                            this.classList.add('business-email');
                        } else {
                            this.classList.remove('business-email');
                        }
                    }
                }
            });
        }

        if (phoneField) {
            phoneField.addEventListener('input', function() {
                // Format phone number as user types
                let value = this.value.replace(/\D/g, '');
                if (value.length >= 10) {
                    // Format as (XX) XXXX-XXXX for Australian numbers
                    if (value.startsWith('61')) {
                        value = value.substring(2);
                    }
                    if (value.startsWith('0')) {
                        value = value.substring(1);
                    }
                    if (value.length === 9) {
                        this.value = `(${value.substring(0,2)}) ${value.substring(2,6)}-${value.substring(6)}`;
                    }
                }
            });
        }
    }

    enhancedValidation();

    // Form analytics tracking
    function trackFormInteraction(action, field) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_interaction', {
                action: action,
                field_name: field || 'unknown',
                form_name: 'demo_request'
            });
        }

        // HubSpot event tracking
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['trackEvent', {
                id: 'form_interaction',
                value: action
            }]);
        }
    }

    // Track form field interactions
    const formFields = document.querySelectorAll('#demoForm input, #demoForm select, #demoForm textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            trackFormInteraction('field_focus', this.name);
        });

        field.addEventListener('blur', function() {
            if (this.value.trim()) {
                trackFormInteraction('field_complete', this.name);
            }
        });
    });

    // Track form submission attempts
    if (demoForm) {
        demoForm.addEventListener('submit', function() {
            trackFormInteraction('form_submit_attempt');
        });
    }

    // Add progressive form enhancement
    function addProgressiveEnhancement() {
        // Add character counter to textarea
        const textarea = document.getElementById('additionalInfo');
        if (textarea) {
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.textAlign = 'right';
            counter.style.fontSize = '0.85rem';
            counter.style.color = '#666';
            counter.style.marginTop = '0.25rem';

            textarea.parentNode.appendChild(counter);

            function updateCounter() {
                const remaining = 500 - textarea.value.length;
                counter.textContent = `${remaining} characters remaining`;

                if (remaining < 50) {
                    counter.style.color = '#dc2626';
                } else if (remaining < 100) {
                    counter.style.color = '#f59e0b';
                } else {
                    counter.style.color = '#666';
                }
            }

            textarea.addEventListener('input', updateCounter);
            textarea.setAttribute('maxlength', '500');
            updateCounter();
        }

        // Add autocomplete enhancements
        const regionField = document.getElementById('region');
        if (regionField) {
            // Add tooltips for region selection
            const tooltip = document.createElement('div');
            tooltip.className = 'form-tooltip';
            tooltip.innerHTML = 'Select the primary region where you plan to operate your Grabbix machines';
            tooltip.style.fontSize = '0.85rem';
            tooltip.style.color = '#666';
            tooltip.style.marginTop = '0.25rem';
            regionField.parentNode.appendChild(tooltip);
        }
    }

    addProgressiveEnhancement();

    // Add form styling
    const formStyle = document.createElement('style');
    formStyle.textContent = `
        .form-success-message,
        .form-error-message {
            background-color: white;
            padding: 3rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            margin-top: 2rem;
            text-align: center;
        }

        .form-success-message {
            border-left: 4px solid var(--primary-green);
        }

        .form-error-message {
            border-left: 4px solid #dc2626;
        }

        .success-icon {
            width: 60px;
            height: 60px;
            background-color: var(--primary-green);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 1rem auto;
        }

        .error-icon {
            width: 60px;
            height: 60px;
            background-color: #dc2626;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 1rem auto;
        }

        .contact-alternatives {
            margin-top: 2rem;
            padding: 1rem;
            background-color: #f8f9fa;
            border-radius: 8px;
        }

        .contact-alternatives a {
            color: var(--primary-green);
            text-decoration: underline;
        }

        .business-email {
            border-color: var(--primary-green) !important;
        }

        .business-email:focus {
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }

        .character-counter.warning {
            color: #f59e0b !important;
        }

        .character-counter.danger {
            color: #dc2626 !important;
        }

        .form-tooltip {
            font-size: 0.85rem;
            color: #666;
            margin-top: 0.25rem;
        }

        /* Loading states */
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .btn:disabled:hover {
            transform: none;
            box-shadow: none;
        }
    `;

    document.head.appendChild(formStyle);

    // Add form auto-save functionality
    function addAutoSave() {
        const form = document.getElementById('demoForm');
        if (!form) return;

        const STORAGE_KEY = 'grabbix_demo_form_data';

        // Save form data to localStorage
        function saveFormData() {
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        }

        // Restore form data from localStorage
        function restoreFormData() {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    Object.keys(data).forEach(key => {
                        const field = form.querySelector(`[name="${key}"]`);
                        if (field) {
                            field.value = data[key];
                        }
                    });
                } catch (e) {
                    console.warn('Failed to restore form data:', e);
                }
            }
        }

        // Clear saved data
        function clearSavedData() {
            localStorage.removeItem(STORAGE_KEY);
        }

        // Auto-save on input
        form.addEventListener('input', debounce(saveFormData, 1000));
        form.addEventListener('change', saveFormData);

        // Restore data on page load
        restoreFormData();

        // Clear data on successful submission
        form.addEventListener('submit', function() {
            setTimeout(clearSavedData, 2000); // Clear after successful submission
        });

        // Show restored data notification
        if (localStorage.getItem(STORAGE_KEY)) {
            const notification = document.createElement('div');
            notification.className = 'form-notification';
            notification.innerHTML = '📝 We\'ve restored your previously entered information';
            notification.style.cssText = `
                background-color: #e0f2fe;
                color: #0277bd;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                font-size: 0.9rem;
                text-align: center;
            `;

            form.insertBefore(notification, form.firstChild);

            setTimeout(() => {
                notification.remove();
            }, 5000);
        }
    }

    addAutoSave();
});

// Utility function for debouncing (if not defined in main.js)
if (typeof debounce === 'undefined') {
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}