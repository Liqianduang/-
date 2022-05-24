var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ziliao:'',
    ta_openid:'',
    shifouguanzhu:'关注',
    ta_nickName:'',
    ta_avatarUrl:'',
    guanzhuobjectId:'',
    fensiobjectId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ta_openid=options.openid;
    this.setData({
      ta_openid:ta_openid
    })
    //查“openid”=openid的列
    const query = Bmob.Query("gerenziliao");
    query.equalTo("openid","==", ta_openid);
    query.find().then(res => {
      // console.log(res[0]);
      this.setData({
        ziliao:res[0],
        ta_nickName:res[0].nickName,
        ta_avatarUrl:res[0].avatarUrl
      })
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
    var openid=wx.getStorageSync('openid')
    var ta_openid=this.data.ta_openid;

    //查“openid”=openid的列
    const query2 = Bmob.Query("guanzhu");
    query2.equalTo("openid","==", openid);
    query2.equalTo("guanzhuopenid","==", ta_openid);
    query2.find().then(res => {
      // console.log(res[0]);
      if(res[0].guanzhuopenid==ta_openid){
        this.setData({
          shifouguanzhu:'取消关注'
        })
      }
      
    });
  },

  shifou_guanzhu(){
    var openid=wx.getStorageSync('openid');
    var ta_openid=this.data.ta_openid;
    if(this.data.shifouguanzhu=='关注'){
      const query3 = Bmob.Query('guanzhu');
      query3.set("openid",openid)
      query3.set("guanzhuopenid",ta_openid)
      query3.set("nickName",this.data.ta_nickName)
      query3.set("avatarUrl",this.data.ta_avatarUrl)
      query3.save().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
      const query4 = Bmob.Query('fensi');
      query4.set("openid",ta_openid)
      query4.set("fensiopenid",openid)
      query4.set("nickName",wx.getStorageSync('nickName'))
      query4.set("avatarUrl",wx.getStorageSync('avatarUrl'))
      query4.save().then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      });
    }else if(this.data.shifouguanzhu=='取消关注'){
      const query3 = Bmob.Query('guanzhu');
      query3.equalTo("openid","==", openid);
      query3.equalTo("guanzhuopenid","==", ta_openid);
      query3.find().then(res => {
        console.log(res[0]);
        query3.destroy(res[0].objectId).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        });
        // this.setData({
        //   guanzhuobjectId:res[0].objectId
        // })
      });
    
      const query4 = Bmob.Query('fensi');
      query4.equalTo("openid","==", ta_openid);
      query4.equalTo("fensiopenid","==", openid);
      query4.find().then(res => {
        console.log(res[0]);
        query4.destroy(res[0].objectId).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        });
        // this.setData({
        //   guanzhuobjectId:res[0].objectId
        // })
      });
    };
    this.onShow();
  },

  sixin(){
    var openid=wx.getStorageSync('openid');
    const query = Bmob.Query('xiaoxi_list');
    query.equalTo("openid","==", openid);
    query.equalTo("you_openid","==", this.data.ta_openid);
    query.find().then(res => {
      // console.log(res[0]);
      if(!res[0]){
        query.set("openid",openid)
        query.set("you_openid",this.data.ta_openid)
        query.set("you_nickName",this.data.ta_nickName)
        query.set("you_avatarUrl",this.data.ta_avatarUrl)
        query.save().then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        });
        query.set("openid",this.data.ta_openid)
        query.set("you_openid",openid)
        query.set("you_nickName",wx.getStorageSync('nickName'))
        query.set("you_avatarUrl",wx.getStorageSync('avatarUrl'))
        query.save().then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        });
      }
    });
    wx.navigateTo({
      url: '../duihua/duihua?you_openid='+this.data.ta_openid+''
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