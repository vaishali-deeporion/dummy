
module.exports = async (page, scenario, vp) => {
    // Set unique session identifier
    await page.evaluateOnNewDocument((sessionId) => {
        window.backstopSessionId = sessionId;
    }, 'da9e0729-9836-4d92-85ad-1ca66e79e2b5');
};
