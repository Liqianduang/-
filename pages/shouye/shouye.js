var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({
  //页面的初始数据
  data: {
    shenfen:'',
    region: ['广东省', '广州市', '黄埔区'],
    hezu:'',
  },

  //选择地区
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    });
    this.onShow();
  },
  
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    var openid=wx.getStorageSync('openid');
    const query4 = Bmob.Query("shenfenrenzheng");
    query4.equalTo("openid","==", openid);
    query4.find().then(res => {
      this.setData({
        shenfen:res[0].shenfen
      })
    });
  },

  //生命周期函数--监听页面显示
  onShow: function () {
    const query = Bmob.Query("hezu");
    query.equalTo("diqu","==", this.data.region);
    query.equalTo("yiorwei","==", '未');
    query.find().then(res => {
      this.setData({
        hezu:res,
      })
    });
  },
})