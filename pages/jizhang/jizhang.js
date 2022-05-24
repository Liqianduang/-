var Bmob = require('../../dist/Bmob-2.2.5.min.js');
var util = require('../../utils/util.js'); 

Page({
  data: {
    TabCur: 0,
    gongjv:["进账","支出"],
    zhishujv:'',
    shoushujv:'',
    zongshouru:0.0,
    zongzhichu:0.0,
    shouru:0,
    zhichu:0,
    zhangname:'',
    shouorzhi:'',
    time:'',
    openid:'',
    objectid:''
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  onLoad: function (options) {
    this.setData({
      time: util.formatTime(new Date()),
      openid:wx.getStorageSync('openid')
    });
  },
  onReady: function () {
    this.popup = this.selectComponent("#popup");
  },
  showPopup(e) {
    this.popup.showPopup();
    this.setData({
      objectid: e.currentTarget.dataset.objectid
    })
  },
  //取消事件
  _error() {
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    const querydel = Bmob.Query('zhangdan');
    querydel.destroy(this.data.objectid).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    setTimeout(() => {
      this.onShow();
    }, 300);
    this.popup.hidePopup();
  },
  onShow: function () {
    const query = Bmob.Query("zhangdan");
    query.equalTo("openid","==", this.data.openid);
    query.equalTo("shouorzhi", "==", "shou");
    query.find().then(res => {
      var zongshouru=0;
      for (var index in res) {
        zongshouru+=Number(res[index].shouru);
      }
      this.setData({
        shoushujv:res,
        zongshouru:zongshouru
      })
    });
    const query2 = Bmob.Query("zhangdan");
    query2.equalTo("openid","==", this.data.openid);
    query2.equalTo("shouorzhi", "==", "zhi");
    query2.find().then(res => {
      var zongzhichu=0;
      for (var index in res) {
        zongzhichu+=Number(res[index].zhichu);
      }
      this.setData({
        zhishujv:res,
        zongzhichu:zongzhichu
      })
    });
  },
})