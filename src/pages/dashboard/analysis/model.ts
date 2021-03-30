import type { Effect, Reducer } from 'umi';

import type { AnalysisData } from './data.d';
import { fakeChartData, symbolChartData, symbolData } from './service';

export type ModelType = {
  namespace: string;
  state: AnalysisData;
  effects: {
    fetch: Effect;
    fetchChartData: Effect;
  };
  reducers: {
    save: Reducer<AnalysisData>;
    clear: Reducer<AnalysisData>;
  };
};

const initState = {
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
};

const Model: ModelType = {
  namespace: 'dashboardAndanalysis',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(symbolData);
      console.log(response)
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchChartData(_, { call, put }) {
      const response = yield call(symbolChartData);
      console.log('s',response)
      yield put({
        type: 'save',
        payload: {
          salesData: response.chartData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
