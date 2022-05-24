var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    didian:'',
    sheyou:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid=wx.getStorageSync('openid');
    const query4 = Bmob.Query("shenfenrenzheng");
    query4.equalTo("openid","==", openid);
    query4.find().then(res => {
      // console.log(res[0].shenfen);
      if (res[0].shenfen=='学生') {
        const query = Bmob.Query("xueshengrenzheng");
        query.equalTo("openid","==", wx.getStorageSync('openid'));
        query.find().then(res => {
            // console.log(res);
            this.setData({
              didian:res[0].xuexiao
            })
        });
      }else if (res[0].shenfen=='员工') {
        const query = Bmob.Query("yuangongrenzheng");
        query.equalTo("openid","==", wx.getStorageSync('openid'));
        query.find().then(res => {
            // console.log(res);
            this.setData({
              didian:res[0].gongsi
            })
        });
      }
    });
    const query2 = Bmob.Query("gerenziliao");
    query2.equalTo("openid","==", wx.getStorageSync('openid'));
    query2.find().then(res => {
        // console.log(res);
        const query3 = Bmob.Query("zhaosheyou");
        query3.equalTo("sex","==", res[0].xingbie);
        query3.find().then(res => {
          // console.log(res)
          this.setData({
            sheyou:res
          })
        });
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