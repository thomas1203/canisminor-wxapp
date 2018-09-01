import '@tarojs/async-await';
import action from './utils/action';
import Taro, { Component } from '@tarojs/taro';
import Index from './routes/index';
import dva from './dva';
import models from './models';
import { Provider } from '@tarojs/redux';

import './index.scss';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onError(e, dispatch) {
    dispatch(action('sys/error', e));
  },
});
const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      'routes/index/index',
      'routes/discovery/discovery',
      'routes/more/more',
      'routes/answer/answer',
      'routes/question/question',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0068C4',
      navigationBarTitleText: 'taro知乎',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true,
    },
    tabBar: {
      color: '#626567',
      selectedColor: '#2A8CE5',
      backgroundColor: '#FBFBFB',
      borderStyle: 'white',
      list: [
        {
          pagePath: 'routes/index/index',
          text: '首页',
          iconPath: './asset/images/index.png',
          selectedIconPath: './asset/images/index_focus.png',
        },
        {
          pagePath: 'routes/discovery/discovery',
          text: '发现',
          iconPath: './asset/images/discovery.png',
          selectedIconPath: './asset/images/discovery_focus.png',
        },
        {
          pagePath: 'routes/more/more',
          text: '我的',
          iconPath: './asset/images/burger.png',
          selectedIconPath: './asset/images/burger_focus.png',
        },
      ],
    },
  };

  componentDidMount() {
    dvaApp.dispatch({ type: 'sys/test' });
  }

  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(dvaApp.start(<App />), document.getElementById('app'));
