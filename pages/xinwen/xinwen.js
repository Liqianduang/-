// pages/xinwen/xinwen.js
var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsid:'',
    news:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({    
      newsid: options.newsid    
    });
    // console.log(this.data.newsid);
    wx.request({
      url: 'https://unidemo.dcloud.net.cn/api/news/36kr/'+this.data.newsid,
      success: (res) => {
        console.log(res.data);
        this.setData({
          news: res.data
        })
      },
    });
    //查“openid”=openid的列
    const query = Bmob.Query("xinwen");
    query.equalTo("newsid","==", this.data.newsid);
    query.find().then(res => {
      console.log(res);
      this.setData({
        content:res[0].content
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})