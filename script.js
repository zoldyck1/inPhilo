// Remove or comment out the header hide/show logic
/*
let lastScroll = 0;
const header = document.querySelector('.sticky-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
        // Scrolling down
        header.classList.add('hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
        // Scrolling up
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
});
*/

// Scroll to top functionality
const scrollToTopBtn = document.getElementById("scrollToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}); 

// Contact form handling
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (form && formMessage) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            formMessage.innerHTML = "Thank you! Your message has been sent.";
            formMessage.style.color = 'green';
            form.reset();
        })
        .catch(error => {
            formMessage.innerHTML = "Oops! There was a problem submitting your Message .";
            formMessage.style.color = 'red';
        });
    });
}

// Mobile scroll handling
function handleScroll() {
    if (window.innerWidth <= 768) { // Only for mobile devices
        const body = document.body;
        if (window.scrollY === 0) {
            body.classList.add('at-top');
        } else {
            body.classList.remove('at-top');
        }
    }
}

window.addEventListener('scroll', handleScroll);
handleScroll();
// Book categories and their pages mapping
const bookCategories = {
    philosophy: {
        title: "Philosophy",
        pages: [
            { name: "To Infinity and Beyond - Neil deGrasse Tyson", url: "philosophy-books/To Infinity and Beyond.html" },
            { name: "Knowledge and Its Limits - Timothy Williamson", url: "philosophy-books/knowledge-and-its-limits.html" },
            { name: "Causality and Modern Science - Mario Bunge", url: "philosophy-books/mario bunge.html" },
            { name: "The Philosophy of Philosophy - Timothy Williamson", url: "philosophy-books/philosophy-of-philosophy.html" },
            { name: "Epistemology - Michael Huemer", url: "philosophy-books/epistemology.html" },
            { name: "How to Read Wittgenstein", url: "philosophy-books/how-to-read-wittgenstein.html" },
            { name: "Causality Models, Reasoning and Inference", url: "philosophy-books/causality-models.html" },
            // Arabic books
            { name: "مشكلات الفلسفة - برتراند راسل", url: "philosophy-books/مشكلة-الفلسفف.html" },
            { name: "نظرية المعرفة - زكي نجيب محمود", url: "philosophy-books/نظرية-المعرفة-زكي نجيب.html" },
            { name: "النظرية المنطقية عند كارناب", url: "philosophy-books/كارناب.html" },
            { name: "نقد العقل العملي - كانط", url: "philosophy-books/كانط1.html" },
            { name: "نقد العقل المحض - كانط", url: "philosophy-books/كانط2.html" },
            { name: "تحقيقات فلسفية - فتغنشتاين", url: "philosophy-books/تحقيقات-فلسفية.html" },
            { name: "مسألة اللانهاية في الرياضيات - كانتور", url: "philosophy-books/مسألة اللانهاية في الرياضيات كانتور.html" }
        ]
    },
    logic: {
        title: "Logic",
        pages: [
            { name: "Introduction to Logic", url: "logic-books/introduction-to-logic.html" },
            { name: "A Mathematical Introduction to Logic - Herbert Enderton", url: "logic-books/a-mathematical-introduction-to-logic.html" },
            { name: "Modal Logic as Metaphysics - Timothy Williamson", url: "logic-books/modal-logic-as-metaphysics.html" },
            { name: "Symbolic Logic", url: "logic-books/SYMBOLIC LOGIC.html" },
            { name: "Philosophical Logic - John MacFarlan", url: "logic-books/Philosophical Logic by John MacFarlan.html" },
            { name: "Paraconsistent Logic", url: "logic-books/Paraconsistent-Logic-Consistency-Contradiction-and-Negation.html" }
        ]
    },
    science: {
        title: "Science",
        pages: [
            { name: "Time and the Metaphysics of Relativity", url: "pages-science/Time and the Metaphysics of Relativity.html" },
            { name: "Infinity, Causation, and Paradox", url: "pages-science/Infinity, Causation, and Paradox.html" },
            { name: "Time and Space - Second Edition by Barry Dainton", url: "pages-science/Time and Space Second edition by Barry Dainton.html" }
        ]
    },
    novels: {
        title: "Novels",
        pages: []  // Currently empty as shown in novels.html "Coming Soon"
    }
};

// Enhanced search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('bookSearch');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        // Create dropdown container for search results
        const searchResultsDropdown = document.createElement('div');
        searchResultsDropdown.className = 'search-results-dropdown';
        searchInput.closest('.search-container').appendChild(searchResultsDropdown);

        function performSearch() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            searchResultsDropdown.innerHTML = '';
            
            if (searchTerm === '') {
                searchResultsDropdown.style.display = 'none';
                return;
            }

            let results = [];

            // Search through categories and their pages
            Object.entries(bookCategories).forEach(([category, data]) => {
                // Search category titles
                if (data.title.toLowerCase().includes(searchTerm)) {
                    results.push({
                        title: data.title,
                        type: 'category',
                        url: `${category}.html`,
                        relevance: 3
                    });
                }

                // Search through pages in each category
                data.pages.forEach(page => {
                    if (page.name.toLowerCase().includes(searchTerm)) {
                        results.push({
                            title: page.name,
                            category: data.title,
                            type: 'book',
                            url: page.url,
                            relevance: page.name.toLowerCase().startsWith(searchTerm) ? 2 : 1
                        });
                    }
                });
            });

            // Sort results by relevance
            results.sort((a, b) => b.relevance - a.relevance);

            // Display results
            if (results.length > 0) {
                searchResultsDropdown.style.display = 'block';
                results.forEach(result => {
                    const div = document.createElement('div');
                    div.className = 'search-result-item';
                    
                    const icon = result.type === 'category' ? 
                        '<i class="fas fa-folder"></i>' : 
                        '<i class="fas fa-book"></i>';
                    
                    div.innerHTML = `
                        ${icon} 
                        <span class="result-title">${highlightMatch(result.title, searchTerm)}</span>
                        ${result.category ? `<span class="result-category">${result.category}</span>` : ''}
                    `;
                    
                    div.addEventListener('click', () => {
                        window.location.href = result.url;
                    });
                    
                    searchResultsDropdown.appendChild(div);
                });
            } else {
                const div = document.createElement('div');
                div.className = 'search-result-item no-results';
                div.innerHTML = `<i class="fas fa-info-circle"></i> No results found for "${searchTerm}"`;
                searchResultsDropdown.appendChild(div);
            }
        }

        function highlightMatch(text, searchTerm) {
            const regex = new RegExp(`(${searchTerm})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }

        // Event listeners
        searchInput.addEventListener('input', performSearch);
        searchButton.addEventListener('click', performSearch);
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResultsDropdown.contains(e.target)) {
                searchResultsDropdown.style.display = 'none';
            }
        });

        // Add keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            const items = searchResultsDropdown.querySelectorAll('.search-result-item');
            const current = searchResultsDropdown.querySelector('.search-result-item.selected');
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    if (!current && items.length) {
                        items[0].classList.add('selected');
                    } else if (current && current.nextElementSibling) {
                        current.classList.remove('selected');
                        current.nextElementSibling.classList.add('selected');
                    }
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    if (current && current.previousElementSibling) {
                        current.classList.remove('selected');
                        current.previousElementSibling.classList.add('selected');
                    }
                    break;
                    
                case 'Enter':
                    if (current) {
                        e.preventDefault();
                        current.click();
                    }
                    break;
                    
                case 'Escape':
                    searchResultsDropdown.style.display = 'none';
                    break;
            }
        });
    }
});
// Book list scrolling functionality
function initializeBookScroller(containerId, leftBtnId, rightBtnId, indicatorsId) {
    const container = document.getElementById(containerId);
    const bookList = container.querySelector('.book-list');
    const scrollLeftBtn = document.getElementById(leftBtnId);
    const scrollRightBtn = document.getElementById(rightBtnId);
    const indicators = document.getElementById(indicatorsId).getElementsByClassName('scroll-dot');
    
    let scrollPosition = 0;
    const scrollAmount = 200; // Reduced from 300 to 200 for smaller steps
    
    function updateScrollButtons() {
        scrollLeftBtn.style.display = scrollPosition <= 0 ? 'none' : 'block';
        scrollRightBtn.style.display = 
            scrollPosition >= (bookList.scrollWidth - bookList.clientWidth - 50) ? 'none' : 'block';
    }

    function updateScrollDots() {
        const scrollPercentage = scrollPosition / (bookList.scrollWidth - bookList.clientWidth);
        const activeDotIndex = Math.round(scrollPercentage * (indicators.length - 1));
        
        Array.from(indicators).forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    // Add mousewheel/trackpad horizontal scroll support
    let lastScrollLeft = bookList.scrollLeft;
    
    bookList.addEventListener('wheel', (e) => {
        if (e.deltaX !== 0) {
            e.preventDefault();
            const scrollSpeed = 1.5; // Adjust this value to match touchpad sensitivity
            const newScrollLeft = lastScrollLeft + (e.deltaX * scrollSpeed);
            
            bookList.style.scrollBehavior = 'auto';
            bookList.scrollLeft = newScrollLeft;
            lastScrollLeft = bookList.scrollLeft;
            scrollPosition = lastScrollLeft;
            
            updateScrollButtons();
            updateScrollDots();
        }
    });

    // Reset scroll behavior for button clicks
    scrollLeftBtn.addEventListener('click', () => {
        bookList.style.scrollBehavior = 'smooth';
        scrollPosition = Math.max(0, scrollPosition - scrollAmount);
        bookList.scrollLeft = scrollPosition;
        lastScrollLeft = scrollPosition;
        updateScrollButtons();
        updateScrollDots();
    });

    scrollRightBtn.addEventListener('click', () => {
        bookList.style.scrollBehavior = 'smooth';
        scrollPosition = Math.min(
            bookList.scrollWidth - bookList.clientWidth,
            scrollPosition + scrollAmount
        );
        bookList.scrollLeft = scrollPosition;
        lastScrollLeft = scrollPosition;
        updateScrollButtons();
        updateScrollDots();
    });

    // Initialize scroll buttons visibility
    updateScrollButtons();
    updateScrollDots();
}

// Initialize both scrollers when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('english-books')) {
        initializeBookScroller('english-books', 'scrollLeftEnglish', 'scrollRightEnglish', 'english-indicators');
        initializeBookScroller('arabic-books', 'scrollLeftArabic', 'scrollRightArabic', 'arabic-indicators');
    }
    if (document.getElementById('logic-books')) {
        initializeBookScroller('logic-books', 'scrollLeftLogic', 'scrollRightLogic', 'logic-indicators');
    }
    if (document.getElementById('science-books')) {
        initializeBookScroller('science-books', 'scrollLeftScience', 'scrollRightScience', 'science-indicators');
    }
});