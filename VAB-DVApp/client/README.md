> # Some facts/important info that I came across while development

- [x] Equity is used as capital raised by a company, which is then used to purchase assets, invest in projects, and fund operations.
- [x] Equity capital is funds paid into a business by investors in exchange for common or preferred stock. This represents the core funding of a business, to which debt funding may be added. ... Owning a sufficient number of shares gives an investor some degree of control over the business in which the investment has been made.
- [x] example microsoft is a equity capital based company.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

> ## Scripts for alan ai dated 1 7 2021
intent('What does this app do?','What is this app about?','What is this?','Summary?','Brief?',
      reply('VAB-DV App, is a Voice Controlled Based Data Visualization App developed by Jasmeet Bali in the year 2021.')
      );
intent('Hi','Hello','Anyone their',
      reply('(Welcome|greetings|hello),this is a Data Visualization App. I am Alan your voice assistant for today,please let me know if i can be helpfull.'));

// API Keys
const RAPID_API_KEY='46aa5345acmshe462a710100f313p1fca24jsnab4e3ef67623';

// companies data [{company_name(p.source.value):data(object)}]
let companies_data = [];

// ||||||||||||| Stock time series search for specific symbol or company endpoint no-chart |||||||||||||

intent('search for $(source* (.*))',(p)=>{
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {keywords: p.source.value, function: 'SYMBOL_SEARCH', datatype: 'json'},
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    if(!p.source.value){
        p.play('(Please speak the phrase properly|you phrased your voice command wrong ,you have to say search for company name where company name can be like microsoft.)');
        return;
    }

    api.axios.request(options).then(function (response) {
        const result = response.data;
        if(result.bestMatches.length===0){
            p.play(`(Sorry|Apology),I cannot provide data for ${p.source.value}`);
            return;
        }
        const company_data = result.bestMatches;
        const company_name = p.source.value;
        const pushData={};
        pushData[company_name]=company_data;
        companies_data.push(pushData);

        p.play({command:'searchCompany',company_data});
        p.play(`Here is the (Best Search|precise) information regarding ${p.source.value.toUpperCase()}`);

    }).catch(function (error) {
        console.error(error);
        p.play('Sorry,please try searching for a different company like (microsoft|accenture|infosys)');
        return;
    });

});

// Equity related question what is equity
// FX currency_exchange_rate bid price and ask price no-chart
// FX_Daily FX prices set outputsize=full plot chart
// Technical Indicator for SMA monthly plot chart
// Digital_currency_daily with market cap plot chart
