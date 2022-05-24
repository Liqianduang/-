var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({
  data: {
    shenhe:'',
  },
  onShow: function () {
    var openid=wx.getStorageSync('openid');
    var shenfen='';
    const query3 = Bmob.Query('shenfenrenzheng');
    query3.equalTo("openid", "==", openid);
    query3.find().then(res => {
      shenfen=res[0].shenfen
      if(shenfen=='学校管理员'){
        const query = Bmob.Query('xiaoguanrenzheng');
        query.equalTo("openid", "==", openid);
        query.find().then(res => {
          // console.log(res);
          const query2 = Bmob.Query('genghuansushe');
          query2.equalTo("didian", "==", res[0].xuexiao);
          query2.equalTo("shifoutongyi", "==", '是');
          query2.find().then(res => {
            this.setData({
              shenhe:res
            })
          }); 
        }); 
      }else if(shenfen=='公司管理员'){
        const query = Bmob.Query('gongguanrenzheng');
        query.equalTo("openid", "==", openid);
        query.find().then(res => {
          // console.log(res);
          const query2 = Bmob.Query('genghuansushe');
          query2.equalTo("didian", "==", res[0].gongsi);
          query2.equalTo("shifoutongyi", "==", '是');
          query2.find().then(res => {
            this.setData({
              shenhe:res
            })
          }); 
        });
      }
    }); 
  },
})