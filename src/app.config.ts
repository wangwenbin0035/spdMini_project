export default {
  pages: [
    'pages/login/index',
    'pages/home/index',
    'pages/home/myInfo',
    'pages/CheckList/index',
    'pages/CheckList/productList',
    'pages/CheckList/moreDetail',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '药品SPD物流系统',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    list: [
      {
        text: '工作台',
        pagePath: 'pages/home/index',
        iconPath: 'assets/tab/gongzuotai.png',
        selectedIconPath: 'assets/tab/gongzuotai_selected.png'
      },
      {
        text: '我的',
        pagePath: 'pages/home/myInfo',
        iconPath: 'assets/tab/wode.png',
        selectedIconPath: 'assets/tab/wode_selected.png'
      }
    ],
    'color': '#000',
    'selectedColor': '#238962',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  }
}
