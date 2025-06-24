module.exports = {
  "id": "visual_regression_test_15fb4fc3-2832-4a4b-8862-1a944d240343",
  "viewports": [
    {
      "label": "phone",
      "width": 375,
      "height": 667
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    },
    {
      "label": "desktop",
      "width": 1920,
      "height": 1080
    }
  ],
  "scenarios": [
    {
      "label": "/_15fb4fc3-2832-4a4b-8862-1a944d240343",
      "url": "https://hiring.staging.deeporion.com/",
      "referenceUrl": "https://hiring.staging.deeporion.com/",
      "selectors": [
        "document"
      ],
      "misMatchThreshold": 0.1,
      "requireSameDimensions": true,
      "waitForSelector": "body",
      "delay": 2000,
      "postInteractionWait": 1000,
      "onReadyScript": "session_15fb4fc3-2832-4a4b-8862-1a944d240343.js",
      "onBeforeScript": "session_15fb4fc3-2832-4a4b-8862-1a944d240343_before.js"
    },
    {
      "label": "/forgot_15fb4fc3-2832-4a4b-8862-1a944d240343",
      "url": "https://hiring.staging.deeporion.com/forgot",
      "referenceUrl": "https://hiring.staging.deeporion.com/forgot",
      "selectors": [
        "document"
      ],
      "misMatchThreshold": 0.1,
      "requireSameDimensions": true,
      "waitForSelector": "body",
      "delay": 2000,
      "postInteractionWait": 1000,
      "onReadyScript": "session_15fb4fc3-2832-4a4b-8862-1a944d240343.js",
      "onBeforeScript": "session_15fb4fc3-2832-4a4b-8862-1a944d240343_before.js"
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/15fb4fc3-2832-4a4b-8862-1a944d240343/bitmaps_reference",
    "bitmaps_test": "backstop_data/15fb4fc3-2832-4a4b-8862-1a944d240343/bitmaps_test",
    "engine_scripts": "backstop_data/15fb4fc3-2832-4a4b-8862-1a944d240343/engine_scripts",
    "html_report": "backstop_data/15fb4fc3-2832-4a4b-8862-1a944d240343/html_report",
    "ci_report": "backstop_data/15fb4fc3-2832-4a4b-8862-1a944d240343/ci_report"
  },
  "report": [
    "browser"
  ],
  "engine": "puppeteer",
  "engineOptions": {
    "args": [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--user-data-dir=/tmp/chrome-session-15fb4fc3-2832-4a4b-8862-1a944d240343"
    ]
  },
  "asyncCaptureLimit": 3,
  "asyncCompareLimit": 10,
  "debug": false,
  "debugWindow": false
};