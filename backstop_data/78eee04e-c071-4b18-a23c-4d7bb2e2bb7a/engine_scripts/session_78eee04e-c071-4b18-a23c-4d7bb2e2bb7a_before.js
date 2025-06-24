
module.exports = async (page, scenario, vp) => {
    // Set unique session identifier
    await page.evaluateOnNewDocument((sessionId) => {
        window.backstopSessionId = sessionId;
    }, '78eee04e-c071-4b18-a23c-4d7bb2e2bb7a');
};
