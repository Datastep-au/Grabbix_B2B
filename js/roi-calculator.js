// ROI Calculator functionality
document.addEventListener('DOMContentLoaded', function() {

    // ROI Calculator elements
    const footTrafficSlider = document.getElementById('footTraffic');
    const conversionRateSlider = document.getElementById('conversionRate');
    const basketValueSlider = document.getElementById('basketValue');
    const profitMarginSlider = document.getElementById('profitMargin');

    const footTrafficValue = document.getElementById('footTrafficValue');
    const conversionRateValue = document.getElementById('conversionRateValue');
    const basketValueValue = document.getElementById('basketValueValue');
    const profitMarginValue = document.getElementById('profitMarginValue');

    const monthlyRevenueResult = document.getElementById('monthlyRevenue');
    const grossProfitResult = document.getElementById('grossProfit');
    const paybackPeriodResult = document.getElementById('paybackPeriod');

    // Check if calculator elements exist (only on pricing page)
    if (!footTrafficSlider) return;

    // Constants for calculation
    const INITIAL_INVESTMENT = 9999; // $8,999 + $1,000 roughly
    const MONTHLY_SOFTWARE_COST = 30;
    const TRANSACTION_FEE = 0.10;

    // Update slider values display
    function updateSliderValues() {
        if (footTrafficValue) footTrafficValue.textContent = footTrafficSlider.value;
        if (conversionRateValue) conversionRateValue.textContent = conversionRateSlider.value + '%';
        if (basketValueValue) basketValueValue.textContent = '$' + basketValueSlider.value;
        if (profitMarginValue) profitMarginValue.textContent = profitMarginSlider.value + '%';
    }

    // Calculate ROI based on current slider values
    function calculateROI() {
        const dailyFootTraffic = parseInt(footTrafficSlider.value);
        const conversionRate = parseFloat(conversionRateSlider.value) / 100;
        const avgBasketValue = parseFloat(basketValueSlider.value);
        const profitMargin = parseFloat(profitMarginSlider.value) / 100;

        // Calculate daily sales
        const dailySales = dailyFootTraffic * conversionRate;

        // Calculate daily revenue
        const dailyRevenue = dailySales * avgBasketValue;

        // Calculate monthly revenue (30 days)
        const monthlyRevenue = dailyRevenue * 30;

        // Calculate gross profit (revenue * profit margin)
        const grossProfit = monthlyRevenue * profitMargin;

        // Calculate monthly operating costs
        const monthlyTransactionFees = dailySales * 30 * TRANSACTION_FEE;
        const totalMonthlyCosts = MONTHLY_SOFTWARE_COST + monthlyTransactionFees;

        // Calculate net profit
        const netProfit = grossProfit - totalMonthlyCosts;

        // Calculate payback period
        const paybackPeriod = netProfit > 0 ? INITIAL_INVESTMENT / netProfit : 0;

        // Update display
        if (monthlyRevenueResult) {
            monthlyRevenueResult.textContent = formatCurrency(monthlyRevenue);
        }

        if (grossProfitResult) {
            grossProfitResult.textContent = formatCurrency(Math.max(0, grossProfit));
        }

        if (paybackPeriodResult) {
            if (paybackPeriod > 0 && paybackPeriod < 1000) {
                paybackPeriodResult.textContent = Math.ceil(paybackPeriod) + ' months';
            } else {
                paybackPeriodResult.textContent = 'N/A';
            }
        }

        // Add visual feedback for good/bad scenarios
        updateResultVisuals(paybackPeriod, grossProfit);
    }

    // Update visual feedback based on results
    function updateResultVisuals(paybackPeriod, grossProfit) {
        const resultCards = document.querySelectorAll('.result-card');

        resultCards.forEach(card => {
            card.classList.remove('good-result', 'poor-result');
        });

        if (paybackPeriod > 0 && paybackPeriod <= 18 && grossProfit > 500) {
            // Good scenario
            resultCards.forEach(card => {
                if (!card.classList.contains('highlighted')) {
                    card.classList.add('good-result');
                }
            });
        } else if (paybackPeriod > 36 || grossProfit < 200) {
            // Poor scenario
            resultCards.forEach(card => {
                if (!card.classList.contains('highlighted')) {
                    card.classList.add('poor-result');
                }
            });
        }
    }

    // Add event listeners to all sliders
    const sliders = [footTrafficSlider, conversionRateSlider, basketValueSlider, profitMarginSlider];

    sliders.forEach(slider => {
        if (slider) {
            // Update on input (real-time)
            slider.addEventListener('input', function() {
                updateSliderValues();
                calculateROI();
            });

            // Update on change (when slider is released)
            slider.addEventListener('change', function() {
                updateSliderValues();
                calculateROI();
            });
        }
    });

    // Initialize calculator
    updateSliderValues();
    calculateROI();

    // Add some helper text based on values
    function addContextualHelp() {
        const helpContainer = document.createElement('div');
        helpContainer.className = 'calculator-help';
        helpContainer.innerHTML = `
            <div class="help-section">
                <h4>Tips for better results:</h4>
                <ul id="calculatorTips">
                    <li>Higher foot traffic locations generally perform better</li>
                    <li>Conversion rates typically range from 3-8% in good locations</li>
                    <li>Average basket values depend on your product mix</li>
                    <li>Profit margins vary by product category</li>
                </ul>
            </div>
        `;

        const calculatorContainer = document.querySelector('.calculator-container');
        if (calculatorContainer) {
            calculatorContainer.appendChild(helpContainer);
        }
    }

    // Add contextual tips based on current values
    function updateContextualTips() {
        const tips = document.getElementById('calculatorTips');
        if (!tips) return;

        const dailyFootTraffic = parseInt(footTrafficSlider.value);
        const conversionRate = parseFloat(conversionRateSlider.value);
        const avgBasketValue = parseFloat(basketValueSlider.value);
        const profitMargin = parseFloat(profitMarginSlider.value);

        let newTips = [];

        if (dailyFootTraffic < 50) {
            newTips.push('Low foot traffic: Consider high-visibility locations like office lobbies or gyms');
        } else if (dailyFootTraffic > 300) {
            newTips.push('High foot traffic: Make sure to stock popular items and monitor inventory frequently');
        }

        if (conversionRate < 3) {
            newTips.push('Low conversion rate: Focus on product selection and competitive pricing');
        } else if (conversionRate > 10) {
            newTips.push('High conversion rate: Great! Consider expanding to multiple locations');
        }

        if (avgBasketValue < 4) {
            newTips.push('Low basket value: Add premium or combo products to increase average sale');
        } else if (avgBasketValue > 10) {
            newTips.push('High basket value: Excellent! Focus on maintaining product quality and variety');
        }

        if (profitMargin < 40) {
            newTips.push('Lower profit margin: Review your product sourcing and pricing strategy');
        } else if (profitMargin > 80) {
            newTips.push('High profit margin: Great margins! Ensure competitive pricing to maintain volume');
        }

        if (newTips.length === 0) {
            newTips.push('Your parameters look good! These are realistic values for a successful location.');
        }

        tips.innerHTML = newTips.map(tip => `<li>${tip}</li>`).join('');
    }

    // Add the help section
    addContextualHelp();

    // Update tips when sliders change
    sliders.forEach(slider => {
        if (slider) {
            slider.addEventListener('change', updateContextualTips);
        }
    });

    // Initial tips update
    setTimeout(updateContextualTips, 500);

    // Preset scenarios
    function setPresetScenario(scenario) {
        const presets = {
            realistic: {
                footTraffic: 120,
                conversionRate: 6,
                basketValue: 6,
                profitMargin: 60
            },
            optimistic: {
                footTraffic: 200,
                conversionRate: 8,
                basketValue: 8,
                profitMargin: 70
            }
        };

        const preset = presets[scenario];
        if (!preset) return;

        footTrafficSlider.value = preset.footTraffic;
        conversionRateSlider.value = preset.conversionRate;
        basketValueSlider.value = preset.basketValue;
        profitMarginSlider.value = preset.profitMargin;

        updateSliderValues();
        calculateROI();
        updateContextualTips();
    }

    // Add preset buttons if desired
    function addPresetButtons() {
        const presetContainer = document.createElement('div');
        presetContainer.className = 'preset-scenarios';
        presetContainer.innerHTML = `
            <h4>Try these scenarios:</h4>
            <div class="preset-buttons">
                <button class="btn btn-secondary btn-small" onclick="roiCalculator.setPreset('realistic')">Realistic</button>
                <button class="btn btn-secondary btn-small" onclick="roiCalculator.setPreset('optimistic')">Optimistic</button>
            </div>
        `;

        const calculatorHeader = document.querySelector('.calculator-header');
        if (calculatorHeader) {
            calculatorHeader.appendChild(presetContainer);
        }
    }

    // Make setPresetScenario available globally
    window.roiCalculator = {
        setPreset: setPresetScenario
    };

    // Add preset buttons
    addPresetButtons();

    // Add CSS for calculator enhancements
    const calculatorStyle = document.createElement('style');
    calculatorStyle.textContent = `
        .calculator-help {
            grid-column: 1 / -1;
            margin-top: 2rem;
            padding: 2rem;
            background-color: var(--light-gray);
            border-radius: 12px;
        }

        .calculator-help h4 {
            color: var(--primary-green);
            margin-bottom: 1rem;
        }

        .calculator-help ul {
            list-style: none;
            padding-left: 0;
        }

        .calculator-help li {
            padding: 0.5rem 0;
            position: relative;
            padding-left: 2rem;
        }

        .calculator-help li::before {
            content: "💡";
            position: absolute;
            left: 0;
        }

        .preset-scenarios {
            margin-top: 1rem;
            text-align: center;
        }

        .preset-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1rem;
        }

        .btn-small {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
        }

        .good-result {
            background-color: #dcfce7 !important;
            border-left: 4px solid var(--primary-green);
        }

        .poor-result {
            background-color: #fef2f2 !important;
            border-left: 4px solid #dc2626;
        }

        @media (max-width: 768px) {
            .preset-buttons {
                flex-direction: column;
                align-items: center;
            }
        }
    `;

    document.head.appendChild(calculatorStyle);

    // Add loading animation when calculating
    function showCalculating() {
        const results = document.querySelectorAll('.result-value');
        results.forEach(result => {
            result.style.opacity = '0.5';
        });

        setTimeout(() => {
            results.forEach(result => {
                result.style.opacity = '1';
            });
        }, 300);
    }

    // Debounce calculations for better performance
    const debouncedCalculate = debounce(() => {
        showCalculating();
        calculateROI();
        updateContextualTips();
    }, 100);

    // Update event listeners to use debounced function
    sliders.forEach(slider => {
        if (slider) {
            slider.removeEventListener('input', calculateROI);
            slider.addEventListener('input', function() {
                updateSliderValues();
                debouncedCalculate();
            });
        }
    });
});

// Utility function for formatting currency (if not already defined in main.js)
if (typeof formatCurrency === 'undefined') {
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-AU', {
            style: 'currency',
            currency: 'AUD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}