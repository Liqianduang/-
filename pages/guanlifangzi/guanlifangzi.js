var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fangzi:'',

  },
  zuchu(e){
    // console.log(e.target.dataset.objectid);
    var objectid=e.target.dataset.objectid;
    const query = Bmob.Query('hezu');
    query.set('id', objectid) //需要修改的objectId
    query.set('yiorwei', '已')
    query.save().then(res => {
    console.log(res)
    }).catch(err => {
    console.log(err)
    });
    setTimeout(() => {
      this.onShow();
    }, 1000);
    
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
    const query = Bmob.Query("hezu");
    query.equalTo("openid","==", wx.getStorageSync('openid'));
    query.find().then(res => {
      // console.log(res);
      this.setData({
        fangzi:res,
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