# CS472

## Testing Locally (Frontend)

1. Clone/pull the repo (`cd cs472`)
2. Navigate to the frontend directory (`cd frontend`)
3. Install dependencies using `npm install`

Once the above is done, local testing can be done using a [development](#development-build) or [production](#production-build) build.

### Minimum requirements

This repository requires Node.js 10.8.3 or later. Please update your Node.js version to ensure compatibility."
`npm install npm@10.8.3`

### Development Build

To test, navigate to the frontend directory and run `ng serve`. Then navigate to `http://localhost:4200/`.
Note: You must have the Angular installed in order to use the above command. Refer to the initial section in the `Frontend Development Guide` to properly setup your environment.

### Production Build

To test, first install a web server (such as lite-server).

`npm install -g lite-server`

Navigate to the frontend directory and run `ng build`. Then run `lite-server --baseDir="dist/Toebeans/browser"`.
