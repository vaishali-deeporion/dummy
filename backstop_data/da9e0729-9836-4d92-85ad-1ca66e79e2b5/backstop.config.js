module.exports = {
  "id": "visual_regression_test_da9e0729-9836-4d92-85ad-1ca66e79e2b5",
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
      "label": "/_da9e0729-9836-4d92-85ad-1ca66e79e2b5",
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
      "onReadyScript": "session_da9e0729-9836-4d92-85ad-1ca66e79e2b5.js",
      "onBeforeScript": "session_da9e0729-9836-4d92-85ad-1ca66e79e2b5_before.js"
    },
    {
      "label": "/forgot_da9e0729-9836-4d92-85ad-1ca66e79e2b5",
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
      "onReadyScript": "session_da9e0729-9836-4d92-85ad-1ca66e79e2b5.js",
      "onBeforeScript": "session_da9e0729-9836-4d92-85ad-1ca66e79e2b5_before.js"
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/da9e0729-9836-4d92-85ad-1ca66e79e2b5/bitmaps_reference",
    "bitmaps_test": "backstop_data/da9e0729-9836-4d92-85ad-1ca66e79e2b5/bitmaps_test",
    "engine_scripts": "backstop_data/da9e0729-9836-4d92-85ad-1ca66e79e2b5/engine_scripts",
    "html_report": "backstop_data/da9e0729-9836-4d92-85ad-1ca66e79e2b5/html_report",
    "ci_report": "backstop_data/da9e0729-9836-4d92-85ad-1ca66e79e2b5/ci_report"
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
      "--user-data-dir=/tmp/chrome-session-da9e0729-9836-4d92-85ad-1ca66e79e2b5"
    ]
  },
  "asyncCaptureLimit": 3,
  "asyncCompareLimit": 10,
  "debug": false,
  "debugWindow": false
};