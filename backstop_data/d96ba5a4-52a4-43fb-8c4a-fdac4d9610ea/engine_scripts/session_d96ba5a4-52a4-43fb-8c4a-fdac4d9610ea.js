
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
    }, 'd96ba5a4-52a4-43fb-8c4a-fdac4d9610ea');
    
    await page.waitForTimeout(1000);
};
