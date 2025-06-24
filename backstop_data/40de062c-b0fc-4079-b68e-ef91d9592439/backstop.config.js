module.exports = {
  "id": "visual_regression_test_40de062c-b0fc-4079-b68e-ef91d9592439",
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
      "label": "/_40de062c-b0fc-4079-b68e-ef91d9592439",
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
      "onReadyScript": "session_40de062c-b0fc-4079-b68e-ef91d9592439.js",
      "onBeforeScript": "session_40de062c-b0fc-4079-b68e-ef91d9592439_before.js"
    },
    {
      "label": "/forgot_40de062c-b0fc-4079-b68e-ef91d9592439",
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
      "onReadyScript": "session_40de062c-b0fc-4079-b68e-ef91d9592439.js",
      "onBeforeScript": "session_40de062c-b0fc-4079-b68e-ef91d9592439_before.js"
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/40de062c-b0fc-4079-b68e-ef91d9592439/bitmaps_reference",
    "bitmaps_test": "backstop_data/40de062c-b0fc-4079-b68e-ef91d9592439/bitmaps_test",
    "engine_scripts": "backstop_data/40de062c-b0fc-4079-b68e-ef91d9592439/engine_scripts",
    "html_report": "backstop_data/40de062c-b0fc-4079-b68e-ef91d9592439/html_report",
    "ci_report": "backstop_data/40de062c-b0fc-4079-b68e-ef91d9592439/ci_report"
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
      "--user-data-dir=/tmp/chrome-session-40de062c-b0fc-4079-b68e-ef91d9592439"
    ]
  },
  "asyncCaptureLimit": 3,
  "asyncCompareLimit": 10,
  "debug": false,
  "debugWindow": false
};