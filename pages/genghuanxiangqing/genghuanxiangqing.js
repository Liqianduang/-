var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ziliao:'',
    xiangqing:'',
    genghuan_objectId:'',
    yuan_objectId:'',
    shenfen:'',
    xinsushe:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ta_openid=options.ta_openid;
    const query1 = Bmob.Query('shenfenrenzheng');
    query1.equalTo("openid", "==", wx.getStorageSync('openid'));
    query1.find().then(res => {
      if(res[0].shenfen=='学校管理员'){
        const query = Bmob.Query('xueshengrenzheng');
        query.equalTo("openid", "==", ta_openid);
        query.find().then(res => {
          this.setData({
            ziliao:res[0],
            yuan_objectId:res[0].objectId,
            shenfen:'学生'
          })
        }); 
        const query2 = Bmob.Query('genghuansushe');
        query2.equalTo("openid", "==", ta_openid);
        query2.find().then(res => {
          this.setData({
            xiangqing:res[0],
            genghuan_objectId:res[0].objectId,
            xinsushe:res[0].xinsushe
          })
        }); 
      }else if(res[0].shenfen=='公司管理员'){
        const query = Bmob.Query('yuangongrenzheng');
        query.equalTo("openid", "==", ta_openid);
        query.find().then(res => {
          this.setData({
            ziliao:res[0],
            yuan_objectId:res[0].objectId,
            shenfen:'员工'
          })
        }); 
        const query2 = Bmob.Query('genghuansushe');
        query2.equalTo("openid", "==", ta_openid);
        query2.find().then(res => {
          this.setData({
            xiangqing:res[0],
            genghuan_objectId:res[0].objectId,
            xinsushe:res[0].xinsushe
          })
        }); 
      }
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
   

})