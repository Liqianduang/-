var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datatime:'',
    date:'',
    time:'',
    shouru:'0',
    zhichu:'0',
    zhangname:'',
    shouorzhi:'',
    openid:'22222'
  },
  bindDateChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date:e.detail.value
    })
  },
  bindTimeChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  formSubmit(e) {
    var shujv=e.detail.value;
    if(shujv.shouorzhi=="shou")
    this.setData({
      shouru: shujv.jine,
      zhichu: '0',
      datatime: this.data.date+' '+this.data.time
    })
    else
    this.setData({
      shouru:'0',
      zhichu:shujv.jine,
      datatime: this.data.date+' '+this.data.time
    });
    // console.log(this.data.datatime);
    const query = Bmob.Query('zhangdan');
    query.set("zhangname",shujv.zhangname)
    query.set("shouorzhi",shujv.shouorzhi)
    query.set("shouru",this.data.shouru)
    query.set("zhichu",this.data.zhichu)
    query.set("date",this.data.datatime)
    query.set("openid",wx.getStorageSync('openid'))
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