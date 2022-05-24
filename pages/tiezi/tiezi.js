var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yule:'',
    arr:'',
    hezu:'',
    sheyou:'',
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
    this.popup = this.selectComponent("#popup");
  },
  showPopup(e) {
    this.popup.showPopup();
    this.setData({
      objectid: e.currentTarget.dataset.objectid,
      arr:e.currentTarget.dataset.arr
    })
    // console.log(this.data.arr);
  },
 
  //取消事件
  _error() {
    // console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    // console.log('你点击了确定');
    if (this.data.arr.nickName) {
      const querydel = Bmob.Query('yule');
      querydel.destroy(this.data.objectid).then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      });
      setTimeout(() => {
        this.onShow();
      }, 300);
    }else if (this.data.arr.yiorwei) {
      const querydel = Bmob.Query('hezu');
      querydel.destroy(this.data.objectid).then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      });
      setTimeout(() => {
        this.onShow();
      }, 300);
    }else if (this.data.arr.didian) {
      const querydel = Bmob.Query('zhaosheyou');
      querydel.destroy(this.data.objectid).then(res => {
        // console.log(res)
      }).catch(err => {
        console.log(err)
      });
      setTimeout(() => {
        this.onShow();
      }, 300);
    };
    
    
    
    this.popup.hidePopup();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const query = Bmob.Query("yule");
    query.equalTo("openid","==", wx.getStorageSync('openid'));
    query.find().then(res => {
      // console.log(res);
      this.setData({
        yule:res,
      })
    });

    const query2 = Bmob.Query("hezu");
    query2.equalTo("openid","==", wx.getStorageSync('openid'));
    query2.find().then(res => {
      // console.log(res);
      this.setData({
        hezu:res,
      })
    });

    const query3 = Bmob.Query("zhaosheyou");
    query3.equalTo("openid","==", wx.getStorageSync('openid'));
    query3.find().then(res => {
      // console.log(res);
      this.setData({
        sheyou:res,
      })
    });
  },

  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = e.currentTarget.dataset.tupian;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
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