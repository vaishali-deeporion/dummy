
module.exports = async (page, scenario, vp) => {
    // Set unique session identifier
    await page.evaluateOnNewDocument((sessionId) => {
        window.backstopSessionId = sessionId;
    }, '6a71bcf9-753b-4c59-9de2-e15fa11f651d');
};
