import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function symbolData() {
  let result = await request.get(
    'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=c18tsg748v6om6p23rkg',
  );
  const searchData = [];
  for (let i = 0; i < result.length; i += 1) {
    searchData.push({
      index: parseInt(i) + 1,
      currency: result[i].currency,
      description: result[i].description,
      figi: result[i].figi,
      mic: result[i].mic,
      symbol: result[i].symbol,
      type: result[i].type,
      chartData: undefined,
    });
    if (i >= 0 && i <= 4) {
      searchData[i].chartData = await symbolChartData(result[i].symbol);
    }
  }
  // symbolChartData('AAPL');
  return { searchData };
}

export async function symbolChartData(
  symbol: string,
  from = 1305298999,
  to = Math.round(+new Date() / 1000),
) {
  let result = await request.get(
    `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=c18tsg748v6om6p23rkg`,
  );
  let finalChartData = [];
  if (result['s'] == 'ok') {
    for (let i = 0; i < result['c'].length; i++) {
      finalChartData.push({
        close: result['c'][i],
        high: result['h'][i],
        low: result['l'][i],
        open: result['o'][i],
        volume: result['v'][i],
        date: new Date(result['t'][i] * 1000),
      });
    }
  } else {
    finalChartData.push({
      close: undefined,
      high: undefined,
      low: undefined,
      open: undefined,
      volume: undefined,
      date: new Date(),
    });
  }

  console.log(symbol, finalChartData);
  return finalChartData;
}
