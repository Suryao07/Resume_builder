// Template rendering functions
function renderResume(data, container) {
    // Ensure container is empty
    container.innerHTML = '';
    
    // Create modern template structure - enhanced for better responsiveness and A4 size with pagination support
    const resumeHTML = `
        <div class="p-4 md:p-6 bg-white w-full" style="box-sizing: border-box; min-height: 100%; letter-spacing: 0.01em; word-spacing: 0.05em; line-height: 1.4;">
            <!-- Header Section - Full width layout -->
            <div class="flex flex-col md:flex-row items-center mb-6 pb-6 border-b border-gray-300 w-full">
                ${data.photo ? `
                    <div class="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                        <img src="${data.photo}" alt="${data.personal.fullName}" class="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200">
                    </div>
                ` : ''}
                
                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-1">${data.personal.fullName || 'Your Name'}</h1>
                    <h2 class="text-lg md:text-xl text-gray-600 mb-3">${data.personal.title || 'Your Title'}</h2>
                    
                    <div class="flex flex-col md:flex-row flex-wrap justify-center md:justify-start text-sm text-gray-600 gap-y-2">
                        ${data.personal.email ? `
                            <div class="flex items-center md:mr-4 justify-center md:justify-start">
                                <i class="fas fa-envelope mr-2 text-gray-500"></i>
                                <span class="text-sm overflow-hidden overflow-ellipsis">${data.personal.email}</span>
                            </div>
                        ` : ''}
                        
                        ${data.personal.phone ? `
                            <div class="flex items-center md:mr-4 justify-center md:justify-start">
                                <i class="fas fa-phone mr-2 text-gray-500"></i>
                                <span>${data.personal.phone}</span>
                            </div>
                        ` : ''}
                        
                        ${data.personal.location ? `
                            <div class="flex items-center md:mr-4 justify-center md:justify-start">
                                <i class="fas fa-map-marker-alt mr-2 text-gray-500"></i>
                                <span>${data.personal.location}</span>
                            </div>
                        ` : ''}
                        
                        ${data.personal.website ? `
                            <div class="flex items-center justify-center md:justify-start">
                                <i class="fas fa-globe mr-2 text-gray-500"></i>
                                <span class="text-sm overflow-hidden overflow-ellipsis">${data.personal.website}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <!-- Two-column layout for better space utilization -->
            <div class="flex flex-col md:flex-row w-full">
                <!-- Left column (wider) -->
                <div class="w-full md:w-2/3 md:pr-6">
                    <!-- Summary Section -->
                    ${data.summary ? `
                        <div class="mb-6" style="page-break-inside: avoid;">
                            <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-200">Professional Summary</h2>
                            <p class="text-gray-600 text-sm md:text-base" style="line-height: 1.5;">${formatText(data.summary)}</p>
                        </div>
                    ` : ''}
                    
                    <!-- Experience Section - Enhanced for mobile -->
                    ${data.experience && data.experience.length > 0 ? `
                        <div class="mb-6">
                            <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-200">Work Experience</h2>
                            ${data.experience.map(job => `
                                <div class="mb-4" style="page-break-inside: avoid; margin-bottom: 1.25em;">
                                    <div class="flex flex-col md:flex-row md:justify-between mb-1">
                                        <h3 class="font-bold text-gray-800 text-sm md:text-base">${job.position}</h3>
                                        <p class="text-gray-600 text-xs md:text-sm">${formatDate(job.startDate)} - ${formatDate(job.endDate)}</p>
                                    </div>
                                    <p class="text-gray-700 mb-1 text-sm md:text-base">${job.company}</p>
                                    ${job.description ? `<div class="text-gray-600 text-xs md:text-sm" style="line-height: 1.5;">${formatText(job.description)}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <!-- Projects or Custom Fields Section -->
                    ${data.customFields && data.customFields.length > 0 ? 
                        data.customFields.map(field => `
                            <div class="mb-6" style="page-break-inside: avoid; margin-bottom: 1.25em;">
                                <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-200">${field.name}</h2>
                                <div class="text-gray-600 text-xs md:text-sm" style="line-height: 1.5;">${formatText(field.content)}</div>
                            </div>
                        `).join('')
                    : ''}
                </div>
                
                <!-- Right column (narrower) -->
                <div class="w-full md:w-1/3 mt-6 md:mt-0">
                    <!-- Skills Section - Improved wrapping for mobile -->
                    ${data.skills && data.skills.length > 0 ? `
                        <div class="mb-6" style="page-break-inside: avoid;">
                            <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-200">Skills</h2>
                            <div class="flex flex-wrap gap-2" id="skills-container" style="line-height: 1.8;">
                                ${data.skills.map(skill => `<span class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs md:text-sm" style="display: inline-block; margin-bottom: 0.3em;">${skill}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Education Section - Enhanced for mobile -->
                    ${data.education && data.education.length > 0 ? `
                        <div class="mb-6">
                            <h2 class="text-lg md:text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-200">Education</h2>
                            ${data.education.map(edu => `
                                <div class="mb-4" style="page-break-inside: avoid; margin-bottom: 1.25em;">
                                    <div class="flex flex-col md:flex-row md:justify-between mb-1">
                                        <h3 class="font-bold text-gray-800 text-sm md:text-base">${edu.degree}</h3>
                                        <p class="text-gray-600 text-xs md:text-sm">${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}</p>
                                    </div>
                                    <p class="text-gray-700 mb-1 text-sm md:text-base">${edu.school}</p>
                                    ${edu.description ? `<p class="text-gray-600 text-xs md:text-sm" style="line-height: 1.5;">${formatText(edu.description)}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = resumeHTML;
    
    // Apply mobile-friendly and print-friendly styles directly to the container
    container.style.width = '100%';
    container.style.maxWidth = '210mm'; // A4 width
    container.style.margin = '0 auto';
    container.style.boxSizing = 'border-box';
    container.style.overflowX = 'hidden';
    container.style.letterSpacing = '0.01em'; 
    container.style.wordSpacing = '0.05em';
    
    // Add print-specific styles
    const printStyle = document.createElement('style');
    printStyle.innerHTML = `
        @media print {
            #resumePreview {
                width: 210mm;
                padding: 15mm;
                margin: 0;
                box-sizing: border-box;
                background-color: white;
                letter-spacing: 0.01em;
                word-spacing: 0.05em;
                line-height: 1.4;
            }
            
            @page {
                size: A4;
                margin: 0;
            }
            
            h2 {
                page-break-after: avoid;
            }
            
            h1, h2, h3, h4 {
                page-break-after: avoid;
            }
            
            div, p, table {
                page-break-inside: auto;
            }
            
            ul, ol, dl {
                page-break-before: avoid;
            }
        }
    `;
    document.head.appendChild(printStyle);
}

// Helper function to format dates
function formatDate(dateString) {
    if (!dateString) return '';
    if (dateString === 'Present') return 'Present';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (e) {
        return dateString;
    }
}

// Helper function to format text (handle bullet points, etc.)
function formatText(text) {
    if (!text) return '';
    
    // Replace line breaks with <br>
    let formatted = text.replace(/\n/g, '<br>');
    
    // Convert markdown-style bullet points to HTML
    formatted = formatted.replace(/^[\s-]*[-*][\s]+(.*)/gm, '<li>$1</li>');
    
    // Wrap lists in <ul> tags
    if (formatted.includes('<li>')) {
        formatted = '<ul class="list-disc pl-4 md:pl-5">' + formatted + '</ul>';
    }
    
    return formatted;
}

// Warning before refresh
window.addEventListener('beforeunload', function(e) {
    e.preventDefault();
    e.returnValue = '';
}); 