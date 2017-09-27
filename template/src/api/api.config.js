
/*
Change these first two values to the appropriate dev and production API URL.
*/
const WAN_DEV = 'http://fossil.cchd.org:3000/wan';
const WAN_PROD = 'https://webapi.southernnevadahealthdistrict.org/wan';
/*
You can add more additional API URL here if there is a need to use other API's such as the FormsAPI.
*/


/*
NOTE:
Please do not use something like `process.env.NODE_ENV === 'production'` to determine the
the API url string endpoint. Because, `process.env.NODE_ENV` only gets set to 'production'
once you type `npm run build`. This means you can never really test the production
endpoints before officially deploying for production. Just uncomment the appropriate one
before `npm run dev` or `npm run build`.
*/
export const WAN_URL = 'http://fossil.cchd.org:3000/wan';
// export const WAN_URL = 'https://webapi.southernnevadahealthdistrict.org/wan';
