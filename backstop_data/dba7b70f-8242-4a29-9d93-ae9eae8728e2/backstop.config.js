module.exports = {
  "id": "visual_regression_test_dba7b70f-8242-4a29-9d93-ae9eae8728e2",
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
      "label": "/_dba7b70f-8242-4a29-9d93-ae9eae8728e2",
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
      "onReadyScript": "session_dba7b70f-8242-4a29-9d93-ae9eae8728e2.js",
      "onBeforeScript": "session_dba7b70f-8242-4a29-9d93-ae9eae8728e2_before.js"
    },
    {
      "label": "/forgot_dba7b70f-8242-4a29-9d93-ae9eae8728e2",
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
      "onReadyScript": "session_dba7b70f-8242-4a29-9d93-ae9eae8728e2.js",
      "onBeforeScript": "session_dba7b70f-8242-4a29-9d93-ae9eae8728e2_before.js"
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/dba7b70f-8242-4a29-9d93-ae9eae8728e2/bitmaps_reference",
    "bitmaps_test": "backstop_data/dba7b70f-8242-4a29-9d93-ae9eae8728e2/bitmaps_test",
    "engine_scripts": "backstop_data/dba7b70f-8242-4a29-9d93-ae9eae8728e2/engine_scripts",
    "html_report": "backstop_data/dba7b70f-8242-4a29-9d93-ae9eae8728e2/html_report",
    "ci_report": "backstop_data/dba7b70f-8242-4a29-9d93-ae9eae8728e2/ci_report"
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
      "--user-data-dir=/tmp/chrome-session-dba7b70f-8242-4a29-9d93-ae9eae8728e2"
    ]
  },
  "asyncCaptureLimit": 3,
  "asyncCompareLimit": 10,
  "debug": false,
  "debugWindow": false
};