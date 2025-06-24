
module.exports = async (page, scenario, vp) => {
    // Set unique session identifier
    await page.evaluateOnNewDocument((sessionId) => {
        window.backstopSessionId = sessionId;
    }, 'f81db3e2-dea7-44e1-a70a-1fcb95d086ff');
};
