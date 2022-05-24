//yule.js
var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({
  data: {
    yule:[],
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    const query = Bmob.Query("yule");
    query.find().then(res => {
      var yule = new Array();
      var length=res.length;
      //按新旧时间排序
      for(var i=0;i<length;i++){
        yule.push(res[length-i-1])
      };
      this.setData({
        yule:yule,
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
  }
})