# DrinkQ
Truth or Dare drinking game  

Other notes:  
- `spec.ts` files are angular unit test files for the corresponding `.ts` page  
- run tests with `npm test`

Google sheets can be converted to json via this endpoint:  
https://spreadsheets.google.com/feeds/cells/10fvtOzM30Xo5gi9O2gYjJxPpKNT_0Z46QolpVL1DOU0/1/public/full?alt=json  

Where the code after `...cells/` is your unique Google Sheets document code and the `/1/` is the sheet number of your document.  

For my purposes:
1. sheet 1 contains the question data
1. sheet 2 contains sheet information
1. sheet 3 contains unit test data

This is possible because you're able to publish to the web via Google Sheets (use the default settings when doing so).  