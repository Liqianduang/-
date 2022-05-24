// pages/zhumian/zhumian.js
var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    gongjv:["故事","新闻"],
    xinwen:'',
    gushi:'',

  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(this.data.gushi);
    //新闻
    wx.request({
      url: 'https://unidemo.dcloud.net.cn/api/news',
      success: (res) => {
        // console.log(res.data);
        this.setData({
          xinwen:res.data
        })
      },
    });

  //   //故事，查表
  //   const query = Bmob.Query("gushi");
  //   query.find().then(res => {
  //     console.log(res)
  //     this.setData({
  //       gushi: res
  //     })
  //   });
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
    //   //故事，查表
    const query = Bmob.Query("gushi");
    query.find().then(res => {
      console.log(res)
      this.setData({
        gushi: res
      })
    });
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