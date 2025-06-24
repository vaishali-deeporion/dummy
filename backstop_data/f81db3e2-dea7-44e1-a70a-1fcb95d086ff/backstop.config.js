module.exports = {
  "id": "visual_regression_test_f81db3e2-dea7-44e1-a70a-1fcb95d086ff",
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
      "label": "/_f81db3e2-dea7-44e1-a70a-1fcb95d086ff",
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
      "onReadyScript": "session_f81db3e2-dea7-44e1-a70a-1fcb95d086ff.js",
      "onBeforeScript": "session_f81db3e2-dea7-44e1-a70a-1fcb95d086ff_before.js"
    },
    {
      "label": "/forgot_f81db3e2-dea7-44e1-a70a-1fcb95d086ff",
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
      "onReadyScript": "session_f81db3e2-dea7-44e1-a70a-1fcb95d086ff.js",
      "onBeforeScript": "session_f81db3e2-dea7-44e1-a70a-1fcb95d086ff_before.js"
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/f81db3e2-dea7-44e1-a70a-1fcb95d086ff/bitmaps_reference",
    "bitmaps_test": "backstop_data/f81db3e2-dea7-44e1-a70a-1fcb95d086ff/bitmaps_test",
    "engine_scripts": "backstop_data/f81db3e2-dea7-44e1-a70a-1fcb95d086ff/engine_scripts",
    "html_report": "backstop_data/f81db3e2-dea7-44e1-a70a-1fcb95d086ff/html_report",
    "ci_report": "backstop_data/f81db3e2-dea7-44e1-a70a-1fcb95d086ff/ci_report"
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
      "--user-data-dir=/tmp/chrome-session-f81db3e2-dea7-44e1-a70a-1fcb95d086ff"
    ]
  },
  "asyncCaptureLimit": 3,
  "asyncCompareLimit": 10,
  "debug": false,
  "debugWindow": false
};