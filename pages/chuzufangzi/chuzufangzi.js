var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
    imgs:[],
    imgsid:[],
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  formSubmit(e){
    var xinxi=e.detail.value;
    console.log('aimform发生了submit事件，携带数据为：', e.detail.value);
    // console.log(this.data.imgs);
    const query = Bmob.Query('hezu');
    query.set("shiting",xinxi.shiting)
    query.set("fangzu",xinxi.fangzu)
    query.set("shuoming",xinxi.shuoming)
    query.set("diqu",this.data.region)
    query.set("yiorwei",'未')
    query.set("openid",wx.getStorageSync('openid'))
    query.set("tupian",this.data.imgsid)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000//持续的时间
    });
    setTimeout(() => {
      wx.navigateBack({
      delta: 1,
    })
    }, 2000);
    
  },

  // 上传图片
  chooseImg: function (e) {
    // console.log(e);
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 3) {
      wx.showToast({
        title: '图片最大数为3',
        icon: 'none',
        duration: 2000//持续的时间
      })
      return false;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // console.log(res);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        var imgsid = that.data.imgsid;
        // console.log(tempFilePaths + '----');
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 3) {
            that.setData({
              imgs: imgs,
              imgsid: imgsid,
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
            that.uploadFile(tempFilePaths[i]);

          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs,
        });
      }
    });
  },
  //上传操作
  uploadFile(filePath) {
    var that = this;
    var imgsid = that.data.imgsid;
    wx.cloud.uploadFile({
      cloudPath: (new Date()).valueOf()+'.png', // 文件名
      filePath: filePath, // 文件路径
      success: res => {
        // get resource ID
        // console.log(res.fileID)
        imgsid.push(res.fileID);
        that.setData({
          imgsid:imgsid
        })
        // console.log(that.data.imgsid);
      },
      fail: err => {
        // handle error
      }
    })
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var imgsid = this.data.imgsid;
    var index = e.currentTarget.dataset.index;
    // console.log(this.data.imgsid);
    wx.cloud.deleteFile(
      {
          fileList: [imgsid[index]],
          success(){
            wx.showToast({title: '删除成功',})
          },
          fail(){
            wx.showToast({title: '删除失败',}) 
          },
          complete(){}
      }
    );
    imgs.splice(index, 1);
    imgsid.splice(index, 1);
    this.setData({
      imgs: imgs,
      imgsid: imgsid
    });
    // console.log(this.data.imgsid);
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
    wx.cloud.init({
      env: 'lsy8507'
    })
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