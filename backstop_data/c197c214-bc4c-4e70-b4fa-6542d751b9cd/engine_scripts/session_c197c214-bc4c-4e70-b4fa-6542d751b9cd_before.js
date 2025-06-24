
module.exports = async (page, scenario, vp) => {
    // Set unique session identifier
    await page.evaluateOnNewDocument((sessionId) => {
        window.backstopSessionId = sessionId;
    }, 'c197c214-bc4c-4e70-b4fa-6542d751b9cd');
};
