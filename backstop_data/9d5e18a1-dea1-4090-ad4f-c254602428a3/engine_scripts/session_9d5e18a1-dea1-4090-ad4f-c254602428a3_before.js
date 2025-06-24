
module.exports = async (page, scenario, vp) => {
    // Set unique session identifier
    await page.evaluateOnNewDocument((sessionId) => {
        window.backstopSessionId = sessionId;
    }, '9d5e18a1-dea1-4090-ad4f-c254602428a3');
};
