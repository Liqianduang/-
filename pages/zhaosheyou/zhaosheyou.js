var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ziliao:'',
    didian:'',
  },
  formSubmit(e){
    var xinxi=e.detail.value;
    console.log('aimform发生了submit事件，携带数据为：', e.detail.value);
    // console.log(this.data.imgs);
    const query = Bmob.Query('zhaosheyou');
    query.set("sex",xinxi.sex)
    query.set("yaoqiu",xinxi.yaoqiu)
    query.set("didian",this.data.didian)
    query.set("openid",wx.getStorageSync('openid'))
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    wx.showToast({
      title: '发布成功',
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
    const query = Bmob.Query("shenfenrenzheng");
    query.equalTo("openid","==", wx.getStorageSync('openid'));
    query.find().then(res => {
      if (res[0].shenfen=='学生') {
        const query = Bmob.Query("xueshengrenzheng");
        query.equalTo("openid","==", wx.getStorageSync('openid'));
        query.find().then(res => {
            console.log(res);
            this.setData({
              didian:res[0].xuexiao
            })
        });
      }else if (res[0].shenfen=='员工') {
        const query = Bmob.Query("yuangongrenzheng");
        query.equalTo("openid","==", wx.getStorageSync('openid'));
        query.find().then(res => {
            console.log(res);
            this.setData({
              didian:res[0].gongsi
            })
        });
      }
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