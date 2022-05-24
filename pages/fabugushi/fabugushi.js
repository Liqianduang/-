// pages/fabugushi/fabugushi.js
var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    content:''
  },
  formSubmit(e) {
    console.log('aimform发生了submit事件，携带数据为：', e.detail.value)
    var gushi=e.detail.value
    const query = Bmob.Query('gushi');
    query.set("title",gushi.title)
    query.set("content",gushi.content)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });

    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000//持续的时间
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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