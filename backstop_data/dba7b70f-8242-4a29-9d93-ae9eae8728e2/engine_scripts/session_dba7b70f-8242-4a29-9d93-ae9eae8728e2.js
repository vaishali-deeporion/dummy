
module.exports = async (page, scenario, vp) => {
    console.log('SCENARIO > ' + scenario.label);
    
    // Set session-specific data
    await page.evaluate((sessionId) => {
        window.sessionId = sessionId;
        localStorage.setItem('backstop-session', sessionId);
        localStorage.setItem('test-mode', 'visual-regression');
        
        // Add session-specific styling or behavior
        const style = document.createElement('style');
        style.textContent = `
            body::after {
                content: 'Session: ${sessionId}';
                position: fixed;
                bottom: 0;
                right: 0;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 2px 5px;
                font-size: 10px;
                z-index: 10000;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }, 'dba7b70f-8242-4a29-9d93-ae9eae8728e2');
    
    // Use compatible delay method
    await new Promise(resolve => setTimeout(resolve, 1000));
};
