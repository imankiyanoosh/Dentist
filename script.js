// Quiz Data - Psychological Lead Conversion System
const quizData = [
    {
        id: 1,
        question: "What best describes your dental practice?",
        type: "radio",
        options: [
            { value: "general", label: "🦷 General Dentistry (Solo or small group)", icon: "🦷" },
            { value: "specialty", label: "🔧 Specialty Practice (Ortho, Oral Surgery, Perio, Endo)", icon: "🔧" },
            { value: "multi-location", label: "🏢 Multi-Location Practice (2+ offices)", icon: "🏢" },
            { value: "dso", label: "👥 DSO/Group Practice (Corporate structure)", icon: "👥" },
            { value: "new-practice", label: "🆕 New Practice (Less than 2 years)", icon: "🆕" }
        ]
    },
    {
        id: 2,
        question: "What's your practice's annual gross revenue?",
        type: "radio",
        dynamic: true,
        options: [
            { value: "300k-600k", label: "💰 $300K - $600K", icon: "💰" },
            { value: "600k-1.2m", label: "💰 $600K - $1.2M", icon: "💰" },
            { value: "1.2m-2.5m", label: "💰 $1.2M - $2.5M", icon: "💰" },
            { value: "2.5m-5m", label: "💰 $2.5M - $5M", icon: "💰" },
            { value: "5m-plus", label: "💰 $5M+", icon: "💰" }
        ]
    },
    {
        id: 3,
        question: "How is your practice currently structured for taxes?",
        type: "radio",
        options: [
            { value: "sole-prop", label: "📄 Sole Proprietorship (Schedule C)", icon: "📄" },
            { value: "single-llc", label: "🏢 Single-Member LLC (Disregarded entity)", icon: "🏢" },
            { value: "partnership", label: "🤝 Partnership/Multi-Member LLC", icon: "🤝" },
            { value: "s-corp", label: "🏛️ S-Corporation", icon: "🏛️" },
            { value: "c-corp", label: "🏦 C-Corporation", icon: "🏦" },
            { value: "not-sure", label: "❓ Not Sure/Need Guidance", icon: "❓" }
        ]
    },
    {
        id: 4,
        question: "What's your biggest frustration with your current tax situation?",
        type: "radio",
        dynamic: true,
        options: [
            { value: "paying-too-much", label: "😤 Paying too much in taxes", icon: "😤" },
            { value: "no-clarity", label: "📊 Lack of financial clarity", icon: "📊" },
            { value: "compliance-concerns", label: "⚖️ Compliance concerns", icon: "⚖️" },
            { value: "cant-plan-growth", label: "📈 Can't plan for growth effectively", icon: "📈" },
            { value: "no-retirement-planning", label: "💼 No proper retirement planning", icon: "💼" },
            { value: "inefficient-operations", label: "🔄 Inefficient financial operations", icon: "🔄" }
        ]
    },
    {
        id: 5,
        question: "Who currently handles your practice's finances?",
        type: "radio",
        options: [
            { value: "general-cpa", label: "👤 General CPA (No dental specialization)", icon: "👤" },
            { value: "large-firm", label: "🏢 Large Accounting Firm (Impersonal service)", icon: "🏢" },
            { value: "diy-software", label: "💻 DIY/Software Only (High risk)", icon: "💻" },
            { value: "bookkeeper-only", label: "👥 Bookkeeper Only (Limited scope)", icon: "👥" },
            { value: "dental-cpa", label: "🦷 Dental-Specialized CPA (Competitor)", icon: "🦷" },
            { value: "no-help", label: "❌ No Professional Help (Urgent need)", icon: "❌" }
        ]
    },
    {
        id: 6,
        question: "What's your 3-year goal for your practice?",
        type: "radio",
        options: [
            { value: "scale-multiple", label: "🚀 Scale to multiple locations", icon: "🚀" },
            { value: "maximize-income", label: "💰 Maximize personal income", icon: "💰" },
            { value: "early-retirement", label: "🏝️ Build wealth for early retirement", icon: "🏝️" },
            { value: "family-legacy", label: "👨‍👩‍👧‍👦 Create family legacy", icon: "👨‍👩‍👧‍👦" },
            { value: "sell-premium", label: "💼 Sell practice at premium", icon: "💼" },
            { value: "optimize-current", label: "🎯 Optimize current operations", icon: "🎯" }
        ]
    },
    {
        id: 7,
        question: "When do you want to start optimizing your practice finances?",
        type: "radio",
        urgency: true,
        options: [
            { value: "immediately", label: "🔥 Immediately (I'm losing money every day)", icon: "🔥", priority: "hot" },
            { value: "30-days", label: "📅 Within 30 days (Ready to make changes)", icon: "📅", priority: "warm" },
            { value: "next-quarter", label: "🗓️ Next quarter (Planning ahead)", icon: "🗓️", priority: "future" },
            { value: "exploring", label: "💭 Just exploring options (Learning phase)", icon: "💭", priority: "nurture" }
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

    // Header scroll effects
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

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

    // Mobile menu click handlers
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });
});

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    mobileNav.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Theme toggle functionality
function toggleTheme() {
    const footer = document.querySelector('.modern-footer');
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.querySelector('.theme-label');

    if (themeToggle.checked) {
        footer.setAttribute('data-theme', 'light');
        themeLabel.textContent = 'Light Mode';
        document.documentElement.style.setProperty('--bg-light', '#ffffff');
        document.documentElement.style.setProperty('--bg-white', '#f8fafc');
        document.documentElement.style.setProperty('--text-dark', '#1f2937');
    } else {
        footer.setAttribute('data-theme', 'dark');
        themeLabel.textContent = 'Dark Mode';
        document.documentElement.style.setProperty('--bg-light', '#f8fafc');
        document.documentElement.style.setProperty('--bg-white', '#ffffff');
        document.documentElement.style.setProperty('--text-dark', '#1f2937');
    }

    // Save theme preference
    localStorage.setItem('theme', themeToggle.checked ? 'light' : 'dark');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('theme-toggle');

    if (savedTheme === 'light') {
        themeToggle.checked = true;
        toggleTheme();
    }
}

// Global theme toggle functionality
function toggleGlobalTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
        localStorage.setItem('globalTheme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        localStorage.setItem('globalTheme', 'dark');
    }
}

// Load saved global theme
function loadGlobalTheme() {
    const savedTheme = localStorage.getItem('globalTheme') || 'light';
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    body.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    loadGlobalTheme();
    loadTheme();
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

    // Update progress with animation
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    // Add pulse animation to progress bar
    progressBar.style.animation = 'progressPulse 0.5s ease-out';
    setTimeout(() => {
        progressBar.style.animation = '';
    }, 500);

    // Dynamic question text based on previous answers
    let dynamicQuestion = question.question;
    if (question.dynamic) {
        dynamicQuestion = getDynamicQuestionText(question, currentQuestionIndex);
    }

    // Create question HTML with enhanced styling
    let questionHTML = `
        <div class="question fade-in">
            <div class="question-header">
                <h4>${dynamicQuestion}</h4>
                ${question.urgency ? '<div class="urgency-indicator">⚡ This affects your immediate savings potential</div>' : ''}
            </div>
            <div class="question-options">
    `;

    question.options.forEach((option, index) => {
        const isSelected = quizAnswers[question.id] === option.value;
        const priorityClass = option.priority ? `priority-${option.priority}` : '';
        const delay = index * 0.1;

        questionHTML += `
            <div class="option ${isSelected ? 'selected' : ''} ${priorityClass}" 
                 onclick="selectOption(${question.id}, '${option.value.replace(/'/g, "\\'")}', this)"
                 style="animation-delay: ${delay}s">
                <div class="option-content">
                    <div class="option-icon">${option.icon || ''}</div>
                    <div class="option-text">
                        <input type="radio" name="question_${question.id}" value="${option.value}" ${isSelected ? 'checked' : ''}>
                        <label>${option.label}</label>
                    </div>
                    <div class="option-arrow">→</div>
                </div>
                <div class="option-glow"></div>
            </div>
        `;
    });

    questionHTML += `
            </div>
        </div>
    `;

    // Fade out old content, then fade in new content
    quizBody.style.opacity = '0';
    quizBody.style.transform = 'translateY(20px)';

    setTimeout(() => {
        quizBody.innerHTML = questionHTML;
        quizBody.style.opacity = '1';
        quizBody.style.transform = 'translateY(0)';

        // Trigger option animations
        const options = quizBody.querySelectorAll('.option');
        options.forEach((option, index) => {
            setTimeout(() => {
                option.classList.add('option-appear');
            }, index * 100);
        });
    }, 300);

    // Update navigation buttons
    prevBtn.style.display = currentQuestionIndex > 0 ? 'inline-flex' : 'none';
    nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? 'Get My Results 🎯' : 'Next Question →';

    // Update next button state
    updateNextButton();
}

// Get dynamic question text based on previous answers
function getDynamicQuestionText(question, questionIndex) {
    const practiceType = quizAnswers[1];
    const revenue = quizAnswers[2];
    const structure = quizAnswers[3];

    switch(questionIndex) {
        case 1: // Revenue question
            switch(practiceType) {
                case 'specialty':
                    return "What's your specialty practice generating annually?";
                case 'multi-location':
                    return "Combined revenue across all locations?";
                case 'dso':
                    return "What's your organization's total annual revenue?";
                case 'new-practice':
                    return "What's your projected first-year revenue?";
                default:
                    return "What's your practice's annual gross revenue?";
            }
        case 3: // Pain point question
            if (revenue && (revenue.includes('2.5m') || revenue.includes('5m')) && (structure === 'sole-prop' || structure === 'single-llc')) {
                return "🚨 URGENT: Your current structure may be costing you $40K+ annually. What's your biggest frustration?";
            }
            return question.question;
        default:
            return question.question;
    }
}

// Select Option with enhanced animations
function selectOption(questionId, value, element) {
    // Remove selected class from all options in this question
    const allOptions = element.parentNode.querySelectorAll('.option');
    allOptions.forEach(opt => {
        opt.classList.remove('selected');
        opt.classList.remove('option-selected-animate');
    });

    // Add selected class to clicked option with animation
    element.classList.add('selected');
    element.classList.add('option-selected-animate');

    // Add ripple effect
    createRippleEffect(element);

    // Update radio button
    const radioButton = element.querySelector('input[type="radio"]');
    if (radioButton) {
        radioButton.checked = true;
    }

    // Store answer
    quizAnswers[questionId] = value;

    // Update next button with animation
    updateNextButton();

    // Add selection feedback
    const selectedIcon = element.querySelector('.option-icon');
    if (selectedIcon) {
        selectedIcon.style.animation = 'iconPulse 0.6s ease-out';
        setTimeout(() => {
            selectedIcon.style.animation = '';
        }, 600);
    }

    // Auto-advance after selection with improved timing
    setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
            nextQuestion();
        }
    }, 1200);
}

// Create ripple effect for option selection
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';

    element.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
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

// Generate Results with Advanced Personalization
function generateResults() {
    const practiceType = quizAnswers[1];
    const revenue = quizAnswers[2];
    const structure = quizAnswers[3];
    const challenge = quizAnswers[4];
    const currentAdvisor = quizAnswers[5];
    const goals = quizAnswers[6];
    const urgency = quizAnswers[7];

    let potentialSavings = 5000;
    let assessmentScore = 60;
    let recommendations = [];
    let urgencyLevel = 'medium';

    // Calculate potential savings based on revenue and structure inefficiency
    const revenueMultiplier = getRevenueMultiplier(revenue);
    const structureMultiplier = getStructureInefficiencyMultiplier(structure, revenue);

    potentialSavings = Math.round(revenueMultiplier * structureMultiplier);

    // Calculate assessment score
    assessmentScore = calculateAssessmentScore();

    // Determine urgency level
    urgencyLevel = determineUrgencyLevel();

    // Generate personalized recommendations
    recommendations = generatePersonalizedRecommendations();

    let resultsHTML = `
        <div class="results-header-enhanced">
            <div class="assessment-score-container">
                <div class="score-circle ${getScoreClass(assessmentScore)}">
                    <div class="score-value">${assessmentScore}</div>
                    <div class="score-label">Financial Health Score</div>
                </div>
                <div class="score-description">
                    ${getScoreDescription(assessmentScore)}
                </div>
            </div>
        </div>

        <div class="savings-highlight ${urgencyLevel}">
            <div class="savings-icon">💰</div>
            <div class="savings-content">
                <h3>Estimated Annual Tax Savings</h3>
                <div class="savings-amount">$${potentialSavings.toLocaleString()}+</div>
                <p>${getSavingsDescription(potentialSavings, structure, revenue)}</p>
            </div>
        </div>
    `;

    recommendations.forEach((rec, index) => {
        resultsHTML += `
            <div class="result-item enhanced" style="animation-delay: ${index * 0.2}s">
                <div class="result-icon ${rec.priority || ''}">${rec.icon}</div>
                <div class="result-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                    ${rec.savings ? `<div class="additional-savings">Potential Additional Savings: $${rec.savings.toLocaleString()}</div>` : ''}
                </div>
                <div class="result-priority">${rec.timeframe || ''}</div>
            </div>
        `;
    });

    return resultsHTML;
}

// Calculate revenue-based multiplier
function getRevenueMultiplier(revenue) {
    switch(revenue) {
        case '300k-600k': return 8000;
        case '600k-1.2m': return 15000;
        case '1.2m-2.5m': return 28000;
        case '2.5m-5m': return 45000;
        case '5m-plus': return 75000;
        default: return 12000;
    }
}

// Calculate structure inefficiency multiplier
function getStructureInefficiencyMultiplier(structure, revenue) {
    const highRevenue = revenue && (revenue.includes('2.5m') || revenue.includes('5m'));

    switch(structure) {
        case 'sole-prop':
            return highRevenue ? 1.8 : 1.4; // Very inefficient for high revenue
        case 'single-llc':
            return highRevenue ? 1.6 : 1.2;
        case 'partnership':
            return 1.1;
        case 's-corp':
            return 1.0; // Baseline efficient
        case 'c-corp':
            return 1.1;
        case 'not-sure':
            return 1.5; // Assuming inefficient structure
        default:
            return 1.2;
    }
}

// Calculate overall assessment score
function calculateAssessmentScore() {
    let score = 50; // Base score

    // Structure efficiency
    const structure = quizAnswers[3];
    if (structure === 's-corp') score += 20;
    else if (structure === 'c-corp' || structure === 'partnership') score += 10;
    else if (structure === 'not-sure') score -= 20;
    else score -= 10;

    // Current advisor quality
    const advisor = quizAnswers[5];
    if (advisor === 'dental-cpa') score += 25;
    else if (advisor === 'general-cpa') score += 10;
    else if (advisor === 'no-help') score -= 30;
    else score -= 15;

    // Financial management
    const challenge = quizAnswers[4];
    if (challenge === 'paying-too-much') score -= 15;
    if (challenge === 'no-clarity') score -= 20;
    if (challenge === 'compliance-concerns') score -= 10;

    return Math.max(10, Math.min(100, score));
}

// Determine urgency level
function determineUrgencyLevel() {
    const urgency = quizAnswers[7];
    const structure = quizAnswers[3];
    const revenue = quizAnswers[2];

    if (urgency === 'immediately') return 'urgent';
    if ((structure === 'sole-prop' || structure === 'not-sure') && 
        (revenue && (revenue.includes('2.5m') || revenue.includes('5m')))) return 'urgent';
    if (urgency === '30-days') return 'high';
    return 'medium';
}

// Generate personalized recommendations
function generatePersonalizedRecommendations() {
    const recommendations = [];
    const structure = quizAnswers[3];
    const revenue = quizAnswers[2];
    const advisor = quizAnswers[5];
    const challenge = quizAnswers[4];
    const goals = quizAnswers[6];

    // Structure optimization
    if (structure === 'sole-prop' || structure === 'single-llc') {
        recommendations.push({
            icon: '🏛️',
            title: 'S-Corporation Election',
            description: 'Converting to S-Corp status could save you thousands in self-employment taxes annually.',
            priority: 'urgent',
            timeframe: 'Immediate',
            savings: 15000
        });
    }

    // Tax planning
    if (challenge === 'paying-too-much') {
        recommendations.push({
            icon: '📊',
            title: 'Advanced Tax Strategy Implementation',
            description: 'Dental-specific deductions and strategic planning could reduce your tax burden by 25-40%.',
            priority: 'high',
            timeframe: '30 days',
            savings: 25000
        });
    }

    // Professional guidance
    if (advisor === 'no-help' || advisor === 'diy-software') {
        recommendations.push({
            icon: '🦷',
            title: 'Dental-Specialized CPA Partnership',
            description: 'Working with a dental industry expert ensures you capture every available deduction and stay compliant.',
            priority: 'urgent',
            timeframe: 'Immediate'
        });
    }

    // Growth planning
    if (goals === 'scale-multiple' || goals === 'maximize-income') {
        recommendations.push({
            icon: '🚀',
            title: 'Growth-Focused Financial Strategy',
            description: 'Strategic entity structuring and cash flow optimization to fuel your expansion plans.',
            priority: 'medium',
            timeframe: '60 days'
        });
    }

    // Retirement planning
    if (goals === 'early-retirement' || goals === 'family-legacy') {
        recommendations.push({
            icon: '🏝️',
            title: 'Wealth Building & Retirement Strategy',
            description: 'Advanced retirement planning and wealth preservation strategies for dental professionals.',
            priority: 'high',
            timeframe: '90 days'
        });
    }

    return recommendations.slice(0, 4); // Limit to top 4 recommendations
}

// Helper functions for score and savings descriptions
function getScoreClass(score) {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'needs-improvement';
    return 'critical';
}

function getScoreDescription(score) {
    if (score >= 80) return 'Excellent financial health with optimized structures in place.';
    if (score >= 60) return 'Good foundation with room for significant optimization.';
    if (score >= 40) return 'Several areas need attention to maximize your practice potential.';
    return 'Critical issues detected - immediate professional guidance recommended.';
}

function getSavingsDescription(savings, structure, revenue) {
    if (savings > 40000) {
        return 'Your current structure is costing you significantly. Immediate optimization could transform your practice finances.';
    } else if (savings > 20000) {
        return 'Substantial savings opportunities identified through proper tax planning and structure optimization.';
    } else {
        return 'Good optimization potential through strategic planning and dental-specific deductions.';
    }
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
    if (e.target.matches('a[href^="#"]') && e.target.getAttribute('href') !== '#') {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Modal Functions
function openModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Resource Download Function
function downloadResource(resourceType) {
    // Show alert for demo purposes - in real implementation, this would trigger actual downloads
    const resourceNames = {
        'tax-guide': 'Dental Practice Tax Planning Guide 2024',
        'cash-flow': 'Cash Flow Calculator Template',
        'kpi-checklist': 'Financial KPIs Checklist',
        'compliance': 'Compliance Checklist',
        'valuation-guide': 'Practice Valuation Guide',
        'expense-kit': 'Expense Optimization Kit'
    };

    const resourceName = resourceNames[resourceType] || 'Resource';
    alert(`Thank you for your interest! The "${resourceName}" download would begin here. In a live implementation, this would provide the actual file download.`);

    // Track the download request (you could integrate with analytics here)
    console.log(`Resource download requested: ${resourceType}`);
}

// Quick Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const quickContactForm = document.querySelector('.quick-contact-form');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(e.target);
            const inputs = e.target.querySelectorAll('input, textarea');

            // Show loading state
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');

                // Reset form
                inputs.forEach(input => input.value = '');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
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