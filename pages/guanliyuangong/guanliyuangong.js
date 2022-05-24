var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shenhe:'',
    yuangong:'',
    sousuo:'',
  },
  formSubmit(e){
    var sousuo=e.detail.value.sousuo;
    // console.log(sousuo);
    var openid=wx.getStorageSync('openid');
    var gongsi='';
    const query3 = Bmob.Query('gongguanrenzheng');
    query3.equalTo("openid", "==", openid);
    query3.find().then(res => {
      // console.log(res[0].xuexiao);
      gongsi=res[0].gongsi

      const query = Bmob.Query("yuangongrenzheng");
      query.equalTo("gongsi", "==", gongsi);
      const query1 = query.equalTo("xingming", '==', sousuo);
      const query2 = query.equalTo("sushe", '==', sousuo);
      query.or(query1, query2);
      query.find().then(res => {
        // console.log(res)
        this.setData({
          sousuo:res
        })
      });
    });
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
    var openid=wx.getStorageSync('openid');
    var gongsi='';
    const query3 = Bmob.Query('gongguanrenzheng');
    query3.equalTo("openid", "==", openid);
    query3.find().then(res => {
      // console.log(res[0].xuexiao);
      gongsi=res[0].gongsi

      const query = Bmob.Query('yuangongrenzheng');
      query.equalTo("gongsi", "==", gongsi);
      query.equalTo("shenfen", "==", '审核中');
      query.find().then(res => {
        // console.log(res);
        this.setData({
          shenhe:res
        })
      }); 
      const query2 = Bmob.Query('yuangongrenzheng');
      query2.equalTo("gongsi", "==", gongsi);
      query2.equalTo("shenfen", "==", '员工');
      query2.find().then(res => {
        // console.log(res);
        this.setData({
          yuangong:res
        })
      }); 
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