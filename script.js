
// Quiz Data
const quizData = [
    {
        id: 1,
        question: "What type of dental practice do you operate?",
        type: "radio",
        options: [
            { value: "general", label: "General Dentistry" },
            { value: "specialist", label: "Specialist (Orthodontist, Periodontist, etc.)" },
            { value: "multi", label: "Multi-specialty Practice" },
            { value: "group", label: "Group Practice/DSO" }
        ]
    },
    {
        id: 2,
        question: "What's your practice's approximate annual revenue?",
        type: "radio",
        options: [
            { value: "under500k", label: "Under $500K" },
            { value: "500k-1m", label: "$500K - $1M" },
            { value: "1m-2m", label: "$1M - $2M" },
            { value: "over2m", label: "Over $2M" }
        ]
    },
    {
        id: 3,
        question: "How do you currently handle your accounting?",
        type: "radio",
        options: [
            { value: "self", label: "I do it myself" },
            { value: "bookkeeper", label: "Local bookkeeper" },
            { value: "general-cpa", label: "General CPA (not dental-focused)" },
            { value: "dental-cpa", label: "Dental-specialized CPA" },
            { value: "none", label: "No formal accounting system" }
        ]
    },
    {
        id: 4,
        question: "What's your biggest financial challenge right now?",
        type: "radio",
        options: [
            { value: "taxes", label: "High tax burden" },
            { value: "cashflow", label: "Cash flow management" },
            { value: "compliance", label: "Staying compliant with regulations" },
            { value: "planning", label: "Financial planning and budgeting" },
            { value: "growth", label: "Funding practice growth" }
        ]
    },
    {
        id: 5,
        question: "How often do you review your financial statements?",
        type: "radio",
        options: [
            { value: "monthly", label: "Monthly" },
            { value: "quarterly", label: "Quarterly" },
            { value: "annually", label: "Annually" },
            { value: "rarely", label: "Rarely or never" }
        ]
    },
    {
        id: 6,
        question: "Do you have a proactive tax planning strategy?",
        type: "radio",
        options: [
            { value: "yes-comprehensive", label: "Yes, comprehensive year-round planning" },
            { value: "yes-basic", label: "Yes, basic annual planning" },
            { value: "sometimes", label: "Sometimes, when I remember" },
            { value: "no", label: "No, I just file taxes annually" }
        ]
    },
    {
        id: 7,
        question: "What are your main growth goals for the next 2 years?",
        type: "radio",
        options: [
            { value: "increase-revenue", label: "Increase revenue by 20%+" },
            { value: "expand-location", label: "Open additional location" },
            { value: "add-services", label: "Add new services/specialists" },
            { value: "improve-margins", label: "Improve profit margins" },
            { value: "exit-planning", label: "Plan for practice sale/retirement" }
        ]
    }
];

// Quiz State
let currentQuestionIndex = 0;
let quizAnswers = {};
let quizStarted = false;

// DOM Elements
const quizSection = document.getElementById('quiz');
const quizBody = document.getElementById('quiz-body');
const resultsSection = document.getElementById('results');
const contactFormSection = document.getElementById('contact-form');
const progressBar = document.getElementById('quiz-progress');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    totalQuestionsSpan.textContent = quizData.length;
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Handle form submission
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleFormSubmit);
    }
});

// Start Quiz
function startQuiz() {
    quizStarted = true;
    currentQuestionIndex = 0;
    quizAnswers = {};
    
    // Show quiz section
    quizSection.style.display = 'block';
    
    // Scroll to quiz section
    quizSection.scrollIntoView({ behavior: 'smooth' });
    
    // Show first question
    setTimeout(() => {
        displayQuestion();
    }, 500);
}

// Display Current Question
function displayQuestion() {
    const question = quizData[currentQuestionIndex];
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Create question HTML
    let questionHTML = `
        <div class="question">
            <h4>${question.question}</h4>
            <div class="question-options">
    `;
    
    question.options.forEach((option, index) => {
        const isSelected = quizAnswers[question.id] === option.value;
        questionHTML += `
            <div class="option ${isSelected ? 'selected' : ''}" onclick="selectOption(${question.id}, '${option.value.replace(/'/g, "\\'")}', this)">
                <input type="radio" name="question_${question.id}" value="${option.value}" ${isSelected ? 'checked' : ''}>
                <label>${option.label}</label>
            </div>
        `;
    });
    
    questionHTML += `
            </div>
        </div>
    `;
    
    quizBody.innerHTML = questionHTML;
    
    // Update navigation buttons
    prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-flex' : 'none';
    nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? 'Get My Results' : 'Next Question';
    
    // Update next button state
    updateNextButton();
}

// Select Option
function selectOption(questionId, value, element) {
    // Remove selected class from all options in this question
    const allOptions = element.parentNode.querySelectorAll('.option');
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
    
    // Update radio button
    const radioButton = element.querySelector('input[type="radio"]');
    if (radioButton) {
        radioButton.checked = true;
    }
    
    // Store answer
    quizAnswers[questionId] = value;
    
    // Update next button
    updateNextButton();
    
    // Auto-advance after selection (optional, for better UX)
    setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
            nextQuestion();
        }
    }, 800);
}

// Update Next Button State
function updateNextButton() {
    const currentQuestion = quizData[currentQuestionIndex];
    const hasAnswer = quizAnswers[currentQuestion.id];
    
    nextBtn.disabled = !hasAnswer;
    nextBtn.style.opacity = hasAnswer ? '1' : '0.5';
}

// Previous Question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Next Question
function nextQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    
    if (!quizAnswers[currentQuestion.id]) {
        alert('Please select an answer before continuing.');
        return;
    }
    
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Quiz completed, show results
        showResults();
    }
}

// Show Results
function showResults() {
    // Hide quiz section
    quizSection.style.display = 'none';
    
    // Generate personalized results
    const results = generateResults();
    
    // Display results
    const resultsContent = document.getElementById('results-content');
    resultsContent.innerHTML = results;
    
    // Show results section
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate Results
function generateResults() {
    const revenue = quizAnswers[2];
    const accounting = quizAnswers[3];
    const challenge = quizAnswers[4];
    const taxPlanning = quizAnswers[6];
    
    let potentialSavings = 5000;
    let recommendations = [];
    
    // Calculate potential savings based on revenue
    switch(revenue) {
        case 'under500k':
            potentialSavings = 8000;
            break;
        case '500k-1m':
            potentialSavings = 15000;
            break;
        case '1m-2m':
            potentialSavings = 25000;
            break;
        case 'over2m':
            potentialSavings = 40000;
            break;
        default:
            potentialSavings = 12000;
    }
    
    // Add recommendations based on answers
    if (accounting === 'self' || accounting === 'none') {
        recommendations.push({
            icon: '📊',
            title: 'Professional Accounting Setup',
            description: 'Implementing proper accounting systems could save you 10+ hours per month and ensure compliance.'
        });
    }
    
    if (taxPlanning === 'no' || taxPlanning === 'sometimes') {
        recommendations.push({
            icon: '💰',
            title: 'Proactive Tax Strategy',
            description: 'Year-round tax planning could reduce your tax burden by 15-30% compared to reactive filing.'
        });
    }
    
    if (challenge === 'cashflow') {
        recommendations.push({
            icon: '📈',
            title: 'Cash Flow Optimization',
            description: 'Better cash flow management can improve your working capital by 20-40%.'
        });
    } else if (challenge === 'compliance') {
        recommendations.push({
            icon: '✅',
            title: 'Compliance Assurance',
            description: 'Specialized healthcare accounting ensures you stay compliant with all regulations.'
        });
    }
    
    // Add growth-based recommendation
    const growth = quizAnswers[7];
    if (growth === 'increase-revenue' || growth === 'expand-location') {
        recommendations.push({
            icon: '🚀',
            title: 'Growth Financial Planning',
            description: 'Strategic financial planning can help you achieve your growth goals 2x faster.'
        });
    }
    
    let resultsHTML = `
        <div class="result-item">
            <div class="result-icon">💡</div>
            <div class="result-text">
                <h4>Estimated Annual Tax Savings</h4>
                <p>Based on your practice profile, you could potentially save <strong>$${potentialSavings.toLocaleString()}+</strong> annually through proper tax planning and accounting optimization.</p>
            </div>
        </div>
    `;
    
    recommendations.forEach(rec => {
        resultsHTML += `
            <div class="result-item">
                <div class="result-icon">${rec.icon}</div>
                <div class="result-text">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </div>
            </div>
        `;
    });
    
    return resultsHTML;
}

// Show Contact Form
function showContactForm() {
    contactFormSection.style.display = 'block';
    contactFormSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Add quiz answers to submission
    data.quizAnswers = quizAnswers;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="loading"></span> Scheduling...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        alert('Thank you! We\'ll contact you within 24 hours to schedule your free consultation.');
        
        // Reset form
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide contact form
        contactFormSection.style.display = 'none';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return re.test(phone);
}

// Add real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value && !validatePhone(this.value)) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '';
            }
        });
    }
});
