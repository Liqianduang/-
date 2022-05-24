var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ziliao:'',
    objectid:'',
  },

  formSubmit(e){
    var xinxi=e.detail.value;
    console.log('aimform发生了submit事件，携带数据为：', e.detail.value);
    const query = Bmob.Query('yuangongrenzheng');
    query.set('id', this.data.objectid) //需要修改的objectId
    query.set('sushe', xinxi.sushe)
    query.save().then(res => {
    // console.log(res)
    }).catch(err => {
    console.log(err)
    })
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000//持续的时间
    });
    setTimeout(() => {
      wx.navigateBack({
      delta: 1,
    })
    }, 1000);
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.objectid);
    var objectid=options.objectid;
    this.setData({
      objectid:objectid
    });
    const query = Bmob.Query('yuangongrenzheng');
    query.equalTo("objectId", "==", objectid);
    query.find().then(res => {
      this.setData({
        ziliao:res[0],
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