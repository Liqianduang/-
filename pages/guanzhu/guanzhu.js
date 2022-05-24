var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guanzhu:'',
    objectId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.popup = this.selectComponent("#popup");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //查“openid”=openid的列
    var openid=wx.getStorageSync('openid');
    const query = Bmob.Query("guanzhu");
    query.equalTo("openid","==", openid);
    query.find().then(res => {
      // console.log(res[0]);
      this.setData({
        guanzhu:res
      })
      // console.log(this.data.guanzhu);
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

  },

    
  showPopup(e) {
    this.popup.showPopup();
    this.setData({
      objectId: e.currentTarget.dataset.objectid
    })
    // console.log(this.data.objectId);
  },
  //取消事件
  _error() {
    // console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    // console.log('你点击了确定');
    const querydel = Bmob.Query('guanzhu');
    querydel.destroy(this.data.objectId).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    this.onShow();
    this.popup.hidePopup();
  },
})