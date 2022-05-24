var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  data: {
    wo:'',
    xuesheng:'',
    yuangong:'',
    shenfen:'',
    openid:'',
    nickName:'',
    avatarUrl:'',
    objectid:'',
  },



  onShow: function () {
    const query = Bmob.Query("shenfenrenzheng");
    query.equalTo("openid","==", wx.getStorageSync('openid'));
    query.find().then(res => {
      // console.log(res);
      this.setData({
        wo:res[0],
      });
      if (res[0].shenfen=='学生') {
        const query2 = Bmob.Query("xueshengrenzheng");
        query2.equalTo("openid","==", wx.getStorageSync('openid'));
        query2.find().then(res => {
          const query1 = Bmob.Query("genghuansushe");
          query1.equalTo("didian","==", res[0].xuexiao);
          query1.equalTo("xinsushe","==", res[0].sushe);
          query1.equalTo("shifoutongyi","==", '否');
          query1.find().then(res => {
            this.setData({
              objectid:res[0].objectId
            })
            const query3 = Bmob.Query("gerenziliao");
            query3.equalTo("openid","==", res[0].openid);
            query3.find().then(res => {
              this.setData({
                openid:res[0].openid,
                nickName:res[0].nickName,
                avatarUrl:res[0].avatarUrl,
              })
            });
          });
          this.setData({
            xuesheng:res[0],
            shenfen:'学生'
          })
        });
      } else if (res[0].shenfen=='员工') {
        const query2 = Bmob.Query("yuangongrenzheng");
        query2.equalTo("openid","==", wx.getStorageSync('openid'));
        query2.find().then(res => {
          const query1 = Bmob.Query("genghuansushe");
          query1.equalTo("didian","==", res[0].gongsi);
          query1.equalTo("xinsushe","==", res[0].sushe);
          query1.equalTo("shifoutongyi","==", '否');
          query1.find().then(res => {
            this.setData({
              objectid:res[0].objectId
            })
            const query3 = Bmob.Query("gerenziliao");
            query3.equalTo("openid","==", res[0].openid);
            query3.find().then(res => {
              this.setData({
                openid:res[0].openid,
                nickName:res[0].nickName,
                avatarUrl:res[0].avatarUrl,
              })
            });
          });
          this.setData({
            yuangong:res[0],
            shenfen:'员工'
          })
        });
      }
    });
  },
  genghuansushe(){
    wx.navigateTo({
      url: '/pages/genghuansushe/genghuansushe?shenfen='+this.data.shenfen+'',
    })
  },
  tongyi(){
    const query = Bmob.Query('genghuansushe');
    query.get(this.data.objectid).then(res => {
      var zongrenshu=res.zongrenshu
      var tongyishu=res.tongyishu
      if(zongrenshu==tongyishu+1){
        const query = Bmob.Query('genghuansushe');
        query.set('id', this.data.objectid) 
        query.set('tongyishu', tongyishu+1)
        query.set('shifoutongyi', '是')
        query.save().then(res => {
          console.log(res,111)
        }).catch(err => {
          console.log(err)
        })
      }else{
        const query = Bmob.Query('genghuansushe');
        query.set('id', this.data.objectid) 
        query.set('tongyishu', tongyishu+1)
        query.save().then(res => {
          console.log(res,222)
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
    wx.showToast({
      title: '已同意',
      icon: 'success',
      duration: 2000//持续的时间
    });
  },
  jvjue(){
    const query = Bmob.Query('genghuansushe');
    query.destroy(this.data.objectid).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.setData({
      nickName:''
    });
    this.onShow();
    wx.showToast({
      title: '已拒绝',
      icon: 'success',
      duration: 2000//持续的时间
    });
  }
})