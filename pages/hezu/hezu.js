var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:'',
    xiangqing:'',
    openid:'',
    avatarUrl:'',
    nickName:'',
    objectId:'',
  },
// 预览图片
previewImg: function (e) {
  //获取当前图片的下标
  var index = e.currentTarget.dataset.index;
  //所有图片
  var imgs = this.data.imgs;
  wx.previewImage({
    //当前显示图片
    current: imgs[index],
    //所有图片
    urls: imgs
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var objectId=options.objectId;
    this.setData({
      objectId:objectId
    })
    const query = Bmob.Query("hezu");
    query.equalTo("objectId","==", objectId);
    query.find().then(res => {
      // console.log(res);
      this.setData({
        xiangqing:res[0],
        openid:res[0].openid,
        imgs:res[0].tupian
      });

      const query2 = Bmob.Query("gerenziliao");
      query2.equalTo("openid","==", res[0].openid);
      query2.find().then(res => {
        // console.log(res);
        this.setData({
          avatarUrl:res[0].avatarUrl,
          nickName:res[0].nickName
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