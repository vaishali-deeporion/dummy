report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/excel_url_test_ExcelURL1_0_document_0_desktop.png",
        "test": "../bitmaps_test/20250624-181713/excel_url_test_ExcelURL1_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "excel_url_test_ExcelURL1_0_document_0_desktop.png",
        "label": "ExcelURL1",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://deeporion.com/about",
        "referenceUrl": "https://deeporion.com/about",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 18.187503526292033,
          "misMatchPercentage": "18.19",
          "analysisTime": 268
        },
        "diffImage": "../bitmaps_test/20250624-181713/failed_diff_excel_url_test_ExcelURL1_0_document_0_desktop.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/excel_url_test_ExcelURL2_0_document_0_desktop.png",
        "test": "../bitmaps_test/20250624-181713/excel_url_test_ExcelURL2_0_document_0_desktop.png",
        "selector": "document",
        "fileName": "excel_url_test_ExcelURL2_0_document_0_desktop.png",
        "label": "ExcelURL2",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://staging.deeporion.com/about",
        "referenceUrl": "https://staging.deeporion.com/about",
        "expect": 0,
        "viewportLabel": "desktop",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 27.0869301512074,
          "misMatchPercentage": "27.09",
          "analysisTime": 291
        },
        "diffImage": "../bitmaps_test/20250624-181713/failed_diff_excel_url_test_ExcelURL2_0_document_0_desktop.png"
      },
      "status": "fail"
    }
  ],
  "id": "excel_url_test"
});