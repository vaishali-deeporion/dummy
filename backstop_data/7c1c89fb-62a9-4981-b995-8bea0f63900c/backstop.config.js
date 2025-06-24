module.exports = {
  "id": "visual_regression_test_7c1c89fb-62a9-4981-b995-8bea0f63900c",
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
      "label": "/_7c1c89fb-62a9-4981-b995-8bea0f63900c",
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
      "onReadyScript": "session_7c1c89fb-62a9-4981-b995-8bea0f63900c.js",
      "onBeforeScript": "session_7c1c89fb-62a9-4981-b995-8bea0f63900c_before.js"
    },
    {
      "label": "/forgot_7c1c89fb-62a9-4981-b995-8bea0f63900c",
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
      "onReadyScript": "session_7c1c89fb-62a9-4981-b995-8bea0f63900c.js",
      "onBeforeScript": "session_7c1c89fb-62a9-4981-b995-8bea0f63900c_before.js"
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/7c1c89fb-62a9-4981-b995-8bea0f63900c/bitmaps_reference",
    "bitmaps_test": "backstop_data/7c1c89fb-62a9-4981-b995-8bea0f63900c/bitmaps_test",
    "engine_scripts": "backstop_data/7c1c89fb-62a9-4981-b995-8bea0f63900c/engine_scripts",
    "html_report": "backstop_data/7c1c89fb-62a9-4981-b995-8bea0f63900c/html_report",
    "ci_report": "backstop_data/7c1c89fb-62a9-4981-b995-8bea0f63900c/ci_report"
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
      "--user-data-dir=/tmp/chrome-session-7c1c89fb-62a9-4981-b995-8bea0f63900c"
    ]
  },
  "asyncCaptureLimit": 3,
  "asyncCompareLimit": 10,
  "debug": false,
  "debugWindow": false
};