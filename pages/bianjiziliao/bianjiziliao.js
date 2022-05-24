// pages/bianjiziliao/bianjiziliao.js
var Bmob = require('../../dist/Bmob-2.2.5.min.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    avatarUrl:'',
    nikeName:'',
    xingbie:'',
    nianling:'',
    xingge:'',
    aihao:'',
    xiguan:'',
    diqu:'',
    gexingqianming:'',
    shifoukong: true,
    objectId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid=wx.getStorageSync('openid');
    var avatarUrl=wx.getStorageSync('avatarUrl');
    var nickName=wx.getStorageSync('nickName');
    this.setData({
      openid: openid,
      avatarUrl: avatarUrl,
      nickName: nickName
    })
    //查“openid”=openid的列
    const query = Bmob.Query("gerenziliao");
    query.equalTo("openid","==", openid);
    query.find().then(res => {
      // console.log(res);
      this.setData({
        objectId:res[0].objectId,
        xingbie:res[0].xingbie,
        nianling:res[0].nianling,
        xingge:res[0].xingge,
        aihao:res[0].aihao,
        xiguan:res[0].xiguan,
        diqu:res[0].diqu,
        gexingqianming:res[0].gexingqianming,
        shifoukong:res[0].shifoukong,
      })
      // console.log(res[0].objectId);
    });
    // console.log(this.data.shifoukong)
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

  },

  formSubmit(e) {
    // console.log('aimform发生了submit事件，携带数据为：', e.detail.value)
    var ziliao=e.detail.value
    this.setData({
      
    });
    if(this.data.shifoukong){
      // console.log(openid);
      this.setData({
        shifoukong: false
      })
      const query = Bmob.Query('gerenziliao');
      query.set("nickName",this.data.nickName)
      query.set("avatarUrl",this.data.avatarUrl)
      query.set("openid",this.data.openid)
      query.set("xingbie",ziliao.xingbie)
      query.set("nianling",ziliao.nianling)
      query.set("xingge",ziliao.xingge)
      query.set("aihao",ziliao.aihao)
      query.set("xiguan",ziliao.xiguan)
      query.set("diqu",ziliao.diqu)
      query.set("gexingqianming",ziliao.gexingqianming)
      query.set("shifoukong", false)
      query.save().then(res => {
        // console.log(res)
        this.setData({
          objectId:res.objectId
        })
      }).catch(err => {
        console.log(err)
      });

      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000//持续的时间
      })
      setTimeout(() => {
        wx.navigateBack({
        delta: 1,
      })
      }, 1000);
    }
    else{
      const query = Bmob.Query('gerenziliao');
      query.get(this.data.objectId).then(res => {
        // console.log(res)
        res.set("xingbie",ziliao.xingbie)
        res.set("nianling",ziliao.nianling)
        res.set("xingge",ziliao.xingge)
        res.set("aihao",ziliao.aihao)
        res.set("xiguan",ziliao.xiguan)
        res.set("diqu",ziliao.diqu)
        res.set("gexingqianming",ziliao.gexingqianming)
        res.save()
      }).catch(err => {
        console.log(err)
      })
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1000//持续的时间
      })
      setTimeout(() => {
        wx.navigateBack({
        delta: 1,
      })
      }, 1000);
    }
    
  }
})