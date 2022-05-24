//index.js
const app = getApp()
var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: '',
    sexcolor: '',
    sex:'',
    shenfen:'',
    guanzhu:'0',
    fensi:'0',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  //生命周期函数--监听页面加载
  onLoad: function () {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    };
    var openid=wx.getStorageSync('openid');
    const query2 = Bmob.Query("guanzhu");
    query2.equalTo("openid","==", openid);
    query2.find().then(res => {
      this.setData({
        guanzhu:res
      })
    });
    const query3 = Bmob.Query("fensi");
    query3.equalTo("openid","==", openid);
    query3.find().then(res => {
      this.setData({
        fensi:res
      })
    });
  },
  //生命周期函数--监听页面显示
  onShow: function(){
    var openid=wx.getStorageSync('openid');
    const query = Bmob.Query("gerenziliao");
    query.equalTo("openid","==", openid);
    query.find().then(res => {
      this.setData({
        motto:res[0].gexingqianming,
        sex:res[0].xingbie,
        openid:openid
      })
      if(this.data.sex=='男'){
        this.setData({
          sexcolor:'#0099ff'
        })
      }else if(this.data.sex=='女'){
        this.setData({
          sexcolor:'#ee3800'
        })
      }
    });
    var openid=wx.getStorageSync('openid');
    const query4 = Bmob.Query("shenfenrenzheng");
    query4.equalTo("openid","==", openid);
    query4.find().then(res => {
      this.setData({
        shenfen:res[0].shenfen
      })
    });
  },
  getUserProfile(e) {
    // 使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('avatarUrl', this.data.userInfo.avatarUrl);
        wx.setStorageSync('nickName', this.data.userInfo.nickName)
      }
    })
  },
  getUserInfo(e) {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync('avatarUrl', this.data.userInfo.avatarUrl);
    wx.setStorageSync('nickName', this.data.userInfo.nickName)
  },
})