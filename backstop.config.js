module.exports = {
  "id": "excel_url_test",
  "viewports": [
    {
      "label": "desktop",
      "width": 1920,
      "height": 1080
    }
  ],
  "scenarios": [
    {
      "label": "ExcelURL1",
      "url": "https://deeporion.com/about",
      "referenceUrl": "https://deeporion.com/about",
      "selectors": [
        "document"
      ],
      "misMatchThreshold": 0.1,
      "requireSameDimensions": true,
      "waitForSelector": "body",
      "delay": 2000,
      "postInteractionWait": 1000
    },
    {
      "label": "ExcelURL2",
      "url": "https://staging.deeporion.com/about",
      "referenceUrl": "https://staging.deeporion.com/about",
      "selectors": [
        "document"
      ],
      "misMatchThreshold": 0.1,
      "requireSameDimensions": true,
      "waitForSelector": "body",
      "delay": 2000,
      "postInteractionWait": 1000
    }
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts",
    "html_report": "backstop_data/html_report",
    "ci_report": "backstop_data/ci_report"
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
      "--disable-web-security",
      "--disable-features=VizDisplayCompositor",
      "--no-first-run",
      "--no-default-browser-check"
    ]
  },
  "asyncCaptureLimit": 5,
  "asyncCompareLimit": 50,
  "debug": false,
  "debugWindow": false
};