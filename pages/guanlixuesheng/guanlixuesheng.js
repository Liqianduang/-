var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({
  data: {
    shenhe:'',
    xuesheng:'',
    sousuo:'',
  },
  formSubmit(e){
    var sousuo=e.detail.value.sousuo;
    var openid=wx.getStorageSync('openid');
    var xuexiao='';
    const query3 = Bmob.Query('xiaoguanrenzheng');
    query3.equalTo("openid", "==", openid);
    query3.find().then(res => {
      xuexiao=res[0].xuexiao
      const query = Bmob.Query("xueshengrenzheng");
      query.equalTo("xuexiao", "==", xuexiao);
      const query1 = query.equalTo("xingming", '==', sousuo);
      const query2 = query.equalTo("sushe", '==', sousuo);
      query.or(query1, query2);
      query.find().then(res => {
        this.setData({
          sousuo:res
        })
      });
    });
  },
  onShow: function () {
    var openid=wx.getStorageSync('openid');
    var xuexiao='';
    const query3 = Bmob.Query('xiaoguanrenzheng');
    query3.equalTo("openid", "==", openid);
    query3.find().then(res => {
      xuexiao=res[0].xuexiao
      const query = Bmob.Query('xueshengrenzheng');
      query.equalTo("xuexiao", "==", xuexiao);
      query.equalTo("shenfen", "==", '审核中');
      query.find().then(res => {
        this.setData({
          shenhe:res
        })
      }); 
      const query2 = Bmob.Query('xueshengrenzheng');
      query2.equalTo("xuexiao", "==", xuexiao);
      query2.equalTo("shenfen", "==", '学生');
      query2.find().then(res => {
        this.setData({
          xuesheng:res
        })
      }); 
    }); 
  },
})