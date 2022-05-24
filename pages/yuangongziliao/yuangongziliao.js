var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ziliao:'',
    imgs:'',
    objectid:'',
    ta_openid:''
  },

  previewImg(){
    var imgs=this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[0],
      //所有图片
      urls: imgs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.ta_openid);
    var ta_openid=options.ta_openid;
    this.setData({
      ta_openid:ta_openid
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup");
  },
  shenhe(e) {
    this.popup.showPopup();
    this.setData({
      objectid: e.currentTarget.dataset.objectid
    })
    // console.log(this.data.objectid);
  },
  //取消事件
  _error() {
    // console.log('你点击了取消');
    const query = Bmob.Query('yuangongrenzheng');
    query.set('id', this.data.objectid) //需要修改的objectId
    query.set('shenfen', '员工')
    query.save().then(res => {
    // console.log(res)
    }).catch(err => {
    console.log(err)
    });
    const query2 = Bmob.Query("shenfenrenzheng");
    query2.equalTo("openid","==", this.data.ta_openid);
    query2.find().then(res => {
      // console.log(res)
      const query3 = Bmob.Query('shenfenrenzheng');
      query3.set('id', res[0].objectId) //需要修改的objectId
      query3.set('shenfen', '员工')
      query3.save().then(res => {
      // console.log(res)
      }).catch(err => {
      console.log(err)
      })
    });
    
    this.popup.hidePopup();
    wx.navigateBack({
      delta: 1,
    })
  },
  //确认事件
  _success() {
    // console.log('你点击了确定');
    const query = Bmob.Query('yuangongrenzheng');
    query.destroy(this.data.objectid).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    const query2 = Bmob.Query("shenfenrenzheng");
    query2.equalTo("openid","==", this.data.ta_openid);
    query2.find().then(res => {
      // console.log(res)
      const query3 = Bmob.Query('shenfenrenzheng');
      query3.destroy(res[0].objectId).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    });
    this.popup.hidePopup();
    wx.navigateBack({
      delta: 1,
    })
  },
  xiugai(e){
    wx.navigateTo({
      url:'../xiugaiyuangong/xiugaiyuangong?objectid='+e.currentTarget.dataset.objectid+''
    });
    // console.log(1111);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const query = Bmob.Query('yuangongrenzheng');
    query.equalTo("openid", "==", this.data.ta_openid);
    query.find().then(res => {
      // console.log(res);
      this.setData({
        ziliao:res[0],
        imgs:res[0].tupian
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