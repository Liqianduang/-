var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({
  data: {
    duihua:'',
    shifoulikai:true,
    you_openid:'',
    nickName:'',
    viewid:0,
    InputBottom: 0,
    shurukuang:'',
    shifouchonglai:false
  },
  formSubmit(e) {
    var me_duihua=e.detail.value.input;
    var openid=wx.getStorageSync('openid');
    var nickName=wx.getStorageSync('nickName');
    var avatarUrl=wx.getStorageSync('avatarUrl');
    const query = Bmob.Query('xiaoxi');
    query.set("openid",openid)
    query.set("you_openid",this.data.you_openid)
    query.set("nickName",nickName)
    query.set("avatarUrl",avatarUrl)
    query.set("me_duihua",me_duihua)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.setData({
      shurukuang:'',
      shifouchonglai:true
    });
  },
  cleanInput(e){
    this.setData({
      shurukuang:e.detail.value
    });
    return this.data.shurukuang;
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({    
      you_openid: options.you_openid    
    });
    const query = Bmob.Query("gerenziliao");
    query.equalTo("openid","==", options.you_openid);
    query.find().then(res => {
      this.setData({
        nickName:res[0].nickName,
      })
    });
  },
  //生命周期函数--监听页面显示
  onShow: function () {
    this.setData({
      shifoulikai: false,
      shurukuang:'',
      shifouchonglai:false
    });
    var duihua = new Array();
    var my_duihua = new Array();
    var you_duihua = new Array();
    var openid=wx.getStorageSync('openid');
    const query = Bmob.Query("xiaoxi");
    query.equalTo("openid","==", openid);
    query.equalTo("you_openid","==", this.data.you_openid);
    query.find().then(res => {
      my_duihua=res;
    });
    const query2 = Bmob.Query("xiaoxi");
    query2.equalTo("openid","==", this.data.you_openid);
    query2.equalTo("you_openid","==", openid);
    query2.find().then(res => {
      you_duihua=res;
    });
    var a = setInterval(()=> { 
      //循环执行代码 
      console.log("是否离开：",this.data.shifoulikai);
      const query = Bmob.Query("xiaoxi");
      query.equalTo("openid","==", openid);
      query.equalTo("you_openid","==", this.data.you_openid);
      query.find().then(res => {
        my_duihua=res;
      });
      const query2 = Bmob.Query("xiaoxi");
      query2.equalTo("openid","==", this.data.you_openid);
      query2.equalTo("you_openid","==", openid);
      query2.find().then(res => {
        you_duihua=res;
      });
      for(let myarr = 0 , youarr = 0 ; myarr < my_duihua.length && youarr<you_duihua.length; ) {
        if(my_duihua[myarr].updatedAt < you_duihua[youarr].updatedAt){
          duihua.push(my_duihua[myarr]);
          myarr++;
          if(myarr==my_duihua.length){
            for(;youarr<you_duihua.length;youarr++){
              duihua.push(you_duihua[youarr]);
            }
          };
        }                                 
        else if(my_duihua[myarr].updatedAt >= you_duihua[youarr].updatedAt){
          duihua.push(you_duihua[youarr]);
          youarr++;
          if(youarr==you_duihua.length){
            for(;myarr<my_duihua.length;myarr++){
              duihua.push(my_duihua[myarr]);
            }
          };
        }
      };
      this.setData({
        duihua:duihua,
        viewid:duihua.length-1
      });
      duihua=[];
      if(this.data.shifoulikai)
      { 
          clearInterval(a) ;
      }else if(this.data.shifouchonglai){
        clearInterval(a);
        this.onShow();
      }
    }, 500);
  },
  // 生命周期函数--监听页面隐藏
  onHide: function () {
    this.setData({
      shifoulikai:true
    });
  },
  //生命周期函数--监听页面卸载
  onUnload: function () {
    this.setData({
      shifoulikai:true
    });
  },
})