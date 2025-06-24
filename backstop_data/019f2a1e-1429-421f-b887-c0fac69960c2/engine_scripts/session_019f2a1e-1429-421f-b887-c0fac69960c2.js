
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
    }, '019f2a1e-1429-421f-b887-c0fac69960c2');
    
    await page.waitForTimeout(1000);
};
