
module.exports = async (page, scenario, vp) => {
    // Set unique session identifier
    await page.evaluateOnNewDocument((sessionId) => {
        window.backstopSessionId = sessionId;
    }, '2d6fdb20-2b55-4286-863a-915d59ccf684');
};
