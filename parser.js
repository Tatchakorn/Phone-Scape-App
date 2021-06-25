const nightmare = require("nightmare")({ waitTimeout: 120000 });
const binance_url = "https://p2p.binance.com/en/trade/buy/USDT"
const bitkub_url = "https://www.bitkub.com/market/USDT";

/* 
select Fiat Button: #C2Cfiatfilter_searhbox_fiat
Buy button: .css-1bgspcv>.css-xbxtuo
Sell button: .css-1bgspcv>.css-yxrkwa

Fiat THB: #THB
(FindAll) 
  (Buy)
    List of Advertisers: .css-16g55fu>.css-cjwhpx>.css-vurnku>.css-79tjl5
    List of Advertisers' name: #C2Cofferlistsell_link_merchant
    List of Advertisers' price: .css-4ptx7h>.css-1kj0ifu>.css-1m1f8hn
  (Sell)
    List of Advertisers: .css-vurnku>.css-79tjl5
    List of Advertisers' name: #C2Cofferlistbuy_link_merchantdetail
    List of Advertisers' price: .css-1kj0ifu>.css-1m1f8hn
*/

module.exports = {
  getDataBinance: async () => {
    try {
      const buyResult = await nightmare
                        .goto(binance_url)
                        .wait(".css-vurnku>.css-79tjl5") // Delay
                        .click("#THB") // Select THB
                        .wait("#C2Cofferlistsell_link_merchant")
                        .evaluate(() => {
                          let price_arr = []
                          let prices = document.querySelectorAll(".css-4ptx7h>.css-1kj0ifu>.css-1m1f8hn");
                          
                          prices.forEach((elem) => {
                            price_arr.push(elem.innerText);
                          });
                          return price_arr[1];
                        });
  
      const sellResult = await nightmare
                          .click(".css-1bgspcv>.css-yxrkwa") // ---- sell button ----
                          .wait("#C2Cofferlistbuy_link_merchantdetail")
                          .wait(1000)
                          .evaluate(() => {
                            let price_arr = []
  
                            let prices = document.querySelectorAll(".css-1kj0ifu>.css-1m1f8hn");
                            prices.forEach((elem) => {
                              price_arr.push(elem.innerText);
                            });
                            return price_arr[1];
                          })
      await nightmare.end();
      console.log(`Buy: ${buyResult}`);
      console.log(`Sell: ${sellResult}`);
      return [buyResult, sellResult]
    } catch(err) {
      throw err;
    }
  }
  
};