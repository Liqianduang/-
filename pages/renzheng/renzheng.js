var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({
  data: {
    TabCur: 0,
    scrollLeft:0,
    imgs:[],
    imgsid:[],
    shenfen:["学生","学校管理员","公司员工","公司管理员","房东"]
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  formSubmit(e){
    var xinxi=e.detail.value;
    const query = Bmob.Query('xueshengrenzheng');
    query.set("xingming",xinxi.xingming)
    query.set("xuehao",xinxi.xuehao)
    query.set("xuexiao",xinxi.xuexiao)
    query.set("nianji",xinxi.nianji)
    query.set("zhuanye",xinxi.zhuanye)
    query.set("sushe",xinxi.sushe)
    query.set("shenfen",'审核中')
    query.set("openid",wx.getStorageSync('openid'))
    query.set("xueshengzheng",this.data.imgsid)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    const query2 = Bmob.Query('shenfenrenzheng');
    query2.set("shenfen",'审核中')
    query2.set("openid",wx.getStorageSync('openid'))
    query2.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000//持续的时间
    });
    setTimeout(() => {
      wx.navigateBack({
      delta: 1,
    })
    }, 2000);
  },
  formSubmit2(e){
    var xinxi=e.detail.value;
    const query = Bmob.Query('xiaoguanrenzheng');
    query.set("xingming",xinxi.xingming)
    query.set("gonghao",xinxi.gonghao)
    query.set("xuexiao",xinxi.xuexiao)
    query.set("openid",wx.getStorageSync('openid'))
    query.set("tupian",this.data.imgsid)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    const query2 = Bmob.Query('shenfenrenzheng');
    query2.set("shenfen",'审核中')
    query2.set("openid",wx.getStorageSync('openid'))
    query2.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000//持续的时间
    });
    setTimeout(() => {
      wx.navigateBack({
      delta: 1,
    })
    }, 2000);
  },
  formSubmit3(e){
    var xinxi=e.detail.value;
    const query = Bmob.Query('yuangongrenzheng');
    query.set("xingming",xinxi.xingming)
    query.set("gongsi",xinxi.gongsi)
    query.set("gonghao",xinxi.gonghao)
    query.set("sushe",xinxi.sushe)
    query.set("shenfen",'审核中')
    query.set("openid",wx.getStorageSync('openid'))
    query.set("tupian",this.data.imgsid)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    const query2 = Bmob.Query('shenfenrenzheng');
    query2.set("shenfen",'审核中')
    query2.set("openid",wx.getStorageSync('openid'))
    query2.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000//持续的时间
    });
    setTimeout(() => {
      wx.navigateBack({
      delta: 1,
    })
    }, 2000);
  },
  formSubmit4(e){
    var xinxi=e.detail.value;
    const query = Bmob.Query('gongguanrenzheng');
    query.set("xingming",xinxi.xingming)
    query.set("gongsi",xinxi.gongsi)
    query.set("gonghao",xinxi.gonghao)
    query.set("openid",wx.getStorageSync('openid'))
    query.set("tupian",this.data.imgsid)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    const query2 = Bmob.Query('shenfenrenzheng');
    query2.set("shenfen",'审核中')
    query2.set("openid",wx.getStorageSync('openid'))
    query2.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000//持续的时间
    });
    setTimeout(() => {
      wx.navigateBack({
      delta: 1,
    })
    }, 2000);
  },
  formSubmit5(e){
    var xinxi=e.detail.value;
    const query = Bmob.Query('fangdongrenzheng');
    query.set("xingming",xinxi.xingming)
    query.set("openid",wx.getStorageSync('openid'))
    query.set("tupian",this.data.imgsid)
    query.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    const query2 = Bmob.Query('shenfenrenzheng');
    query2.set("shenfen",'审核中')
    query2.set("openid",wx.getStorageSync('openid'))
    query2.save().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    });
    wx.showToast({
      title: '提交成功',
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
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 1) {
      wx.showToast({
        title: '图片最大数为1',
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
          if (imgs.length >= 1) {
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
    wx.showToast({
      title: '上传中',
      icon: 'none',
      duration: 80000//持续的时间
    })
    wx.cloud.uploadFile({
      cloudPath: (new Date()).valueOf()+'.png', // 文件名
      filePath: filePath, // 文件路径
      success: res => {
        imgsid.push(res.fileID);
        that.setData({
          imgsid:imgsid
        })
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
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

  onLoad: function (options) {
    wx.cloud.init({
      env: 'lsy8507'
    })
  },
})