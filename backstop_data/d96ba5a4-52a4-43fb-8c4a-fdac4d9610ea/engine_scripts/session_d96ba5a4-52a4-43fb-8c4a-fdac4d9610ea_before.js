
module.exports = async (page, scenario, vp) => {
    // Set unique session identifier
    await page.evaluateOnNewDocument((sessionId) => {
        window.backstopSessionId = sessionId;
    }, 'd96ba5a4-52a4-43fb-8c4a-fdac4d9610ea');
};
