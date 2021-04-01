import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'realDark',
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  title: 'Console',
  pwa: false,
  iconfontUrl: '',
  menu: {
    locale: true,
  },
  headerHeight: 48,
  splitMenus: false,
  headerRender: false,
};

export type { DefaultSettings };

export default proSettings;
