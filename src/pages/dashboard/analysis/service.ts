import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function symbolData() {
  let result = await request.get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c18tsg748v6om6p23rkg');
    const searchData = [];
for (let i = 0; i < result.length; i += 1) {
  searchData.push({
    index: i + 1,
    currency: result[i].currency,
    description: result[i].description,
    figi: result[i].figi,
    mic: result[i].mic,
    symbol: result[i].symbol,
    type: result[i].type,
  });
}
// let data = { searchData }
return { searchData };
}

export async function symbolChartData(symbol: string,
  from = 1615298999,
  to = new Date().getTime()) {
  return request(`https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=${from}&to=${to}&token=c18tsg748v6om6p23rkg`);
}
