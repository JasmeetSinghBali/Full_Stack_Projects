intent('What does this app do?','What is this app about?','What is this?','Summary?','Brief?',
      reply('VCB-DV App, is a Voice Controlled Based Data Visualization App. developed by Jasmeet Bali in the year 2021 that can give finance related insights and information.')
      );

// Equity related question what is equity
intent('What is equity?','Equity','Equity capital?',
      reply('Equity capital is funds paid into a business by investors in exchange for common or preferred stock. This represents the core funding of a business, to which debt funding may be added. example microsoft is a equity capital based company.')
      );

// SMA related question
// here (what is|) means if user skips this 'what is' then also it will recoganize it as what is simple moving average
intent('Explain SMA?','SMA?','(What is|) simple moving average?',
      reply('A simple moving average or SMA calculates the average of a selected range of prices, usually closing prices, by the number of periods in that range. It is a technical indicator that can aid in determining if an asset price will continue or if it will reverse a bull or bear trend.')
      );

// TSMA related question
intent('Explain TSMA?','TSMA?',
      reply('TSMA is the phrase in the command for getting insights on Monthly Adjusted Stock Time Series for the equity specified.')
      );


// API Keys
const RAPID_API_KEY='RAPID-KEY-GOES-HERE';

// companies data [{company_name(p.source.value):data(object)}]
let companies_data;

// ------ Stock time series search for specific symbol or company endpoint no-chart -------

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
        companies_data = result.bestMatches;

        p.play({command:'searchCompany',company_data});
        p.play(`Here is the (Best Search|precise) results regarding ${p.source.value.toUpperCase()}`);

        p.play('Would you like me to read the symbols and region?');
        p.then(confirmation);

    }).catch(function (error) {
        console.error(error);
        p.play('Sorry,please try searching for a different company like (microsoft|accenture|infosys)');
        return;
    });

});

// Context/Dialog in which the user can either enter or come out of the conversion on the basis of the answer he/she gave when alan asked a context question
const confirmation = context(()=>{
    intent('yes',async(p)=>{
        for(let i=0;i<companies_data.length;i++){
            p.play({command:'highlight',company:companies_data[i]});
            p.play(`${companies_data[i]['1. symbol']} deals in currency ${companies_data[i]['8. currency']} located in the region of ${companies_data[i]['4. region']}`);
        }
    })
    intent('no',(p)=>{
        p.play('Sure, sounds good to me.');
    })
});



let fx_monthly_data;

// ||||||||||||| FX_Daily FX prices set outputsize=full plot chart |||||||||||||
intent('FXP from $(fsymbol* (.*)) to $(tsymbol* (.*))',(p)=>{
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {from_symbol: p.fsymbol.value, to_symbol: p.tsymbol.value, function: 'FX_MONTHLY', datatype: 'json'},
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    if(!p.fsymbol.value || !p.tsymbol.value){
        p.play('(Please refer the FX monthly Prices Card Command and speak the phrase properly.|you phrased your voice command wrong ,you have to say like , FXP from INR to USD )');
        return;
    }

    api.axios.request(options).then(function (response) {
        const result = response.data;
        if(!result['Meta Data']){
            p.play(`(Sorry|Apologies),I cannot provide data regarding ${p.fsymbol.value} & ${p.tsymbol.value} currency pair`);
            return;
        }

        fx_monthly_data = result;
        const company_data = result['Time Series FX (Monthly)'];
        const frmSymbol = p.fsymbol.value;
        const toSymbol = p.tsymbol.value;

        p.play({command:'fxMONTHLY',company_data,frmSymbol,toSymbol});
        p.play(`Here is the the realtime FX monthly time series as OHLC Candlestick Visualization  for the ${p.fsymbol.value} to ${p.tsymbol.value} FX currency pair specified by you.`);

    }).catch(function (error) {
        console.error(error);
        p.play('Sorry,please try searching for different currency pairs, like EUR to USD');
        return;
    });

});

let sma_monthly_data;
// ||||||||||||| Technical Indicator for SMA monthly plot chart |||||||||||||
intent('SMA for $(symbol* (.*))',(p)=>{
    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {
        interval: 'monthly',
        series_type: 'close',
        function: 'SMA',
        symbol: p.symbol.value,
        time_period: '60',
        datatype: 'json'
      },
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    if(!p.symbol.value){
        p.play('(Please refer the SMA Card Command and speak the phrase properly.|you phrased your voice command wrong ,you have to say like , SMA for MSFT )');
        return;
    }

    api.axios.request(options).then(function (response) {
        const result = response.data;


        if(!result['Meta Data']){
            p.play(`(Sorry|Apologies),I cannot provide data regarding ${p.symbol.value}`);
            return;
        }

        sma_monthly_data = result;
        const company_data = result['Technical Analysis: SMA'];
        const sma_symbol = p.symbol.value;


        p.play({command:'smaMONTHLY',company_data,sma_symbol});
        p.play(`Here is the the (realtime|precise) data visualization of Simple Moving Average technical indicator for a monthly timeframe, for the symbol ${p.symbol.value}.`);

    }).catch(function (error) {
        console.error(error);
        p.play('Sorry,please try searching for different company symbol, like MSFT');
        return;
    });

});


let tsma_monthly_data;
// |||||| Stock Time_series_monthly adjusted multiple lines plot chart ||||||||
intent('TSMA for $(symbol* (.*))',(p)=>{

    const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: {symbol: p.symbol.value, function: 'TIME_SERIES_MONTHLY_ADJUSTED', datatype: 'json'},
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    if(!p.symbol.value){
        p.play('(Please refer the TSMA Card Command and speak the phrase properly.|you phrased your voice command wrong ,you have to say like , TSMA for MSFT )');
        return;
    }

    api.axios.request(options).then(function (response) {
        const result = response.data;


        if(!result['Meta Data']){
            p.play(`(Sorry|Apologies),I cannot provide data regarding ${p.symbol.value}`);
            return;
        }

        tsma_monthly_data = result['Monthly Adjusted Time Series'];
        const company_data = result['Monthly Adjusted Time Series'];
        const tsma_symbol = p.symbol.value;


        p.play({command:'tsmaMONTHLY',company_data,tsma_symbol});
        p.play(`Here is the the (realtime|precise) data visualization for a monthly adjusted stock time series ,for the equity ${p.symbol.value} specified by you.`);

    }).catch(function (error) {
        console.error(error);
        p.play('Sorry,please try searching for different equity symbol, like MSFT');
        return;
    });

});



// Go Back intent
// searchCompany,tsmaMONTHLY,smaMONTHLY,fxMONTHLY
intent('(go|) back',(p)=>{
    p.play('(navigating to home|backtracking|going back)');
    p.play({command:'home'});
});
