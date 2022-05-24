var Bmob = require('../../dist/Bmob-2.2.5.min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[],
    imgsid:[],
    shenfen:'',
  },
  formSubmit(e){
    var xinxi=e.detail.value;
    if(this.data.shenfen=='学生'){
      const query2 = Bmob.Query('xueshengrenzheng');
      query2.equalTo("sushe", "==", xinxi.xinsushe);
      query2.find().then(res => {
        var zongrenshu=res.length;
        const query1 = Bmob.Query('xueshengrenzheng');
        query1.equalTo("openid", "==", wx.getStorageSync('openid'));
        query1.find().then(res => {
          const query = Bmob.Query('genghuansushe');
          query.set("xinsushe",xinxi.xinsushe)
          query.set("shifoutongyi",'否')
          query.set("zongrenshu",zongrenshu)
          query.set("tongyishu",0)
          query.set("didian",res[0].xuexiao)
          query.set("openid",wx.getStorageSync('openid'))
          query.set("tupian",this.data.imgsid)
          query.save().then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        });
      }); 
    }else if(this.data.shenfen=='员工'){
      const query2 = Bmob.Query('yuangongrenzheng');
      query2.equalTo("sushe", "==", xinxi.xinsushe);
      query2.find().then(res => {
        var zongrenshu=res.length;
        const query1 = Bmob.Query('yuangongrenzheng');
        query1.equalTo("openid", "==", wx.getStorageSync('openid'));
        query1.find().then(res => {
          const query = Bmob.Query('genghuansushe');
          query.set("xinsushe",xinxi.xinsushe)
          query.set("shifoutongyi",'否')
          query.set("zongrenshu",zongrenshu)
          query.set("tongyishu",0)
          query.set("didian",res[0].gongsi)
          query.set("openid",wx.getStorageSync('openid'))
          query.set("tupian",this.data.imgsid)
          query.save().then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }); 
      }); 
    }
    
    wx.showToast({
      title: '提交申请成功',
      icon: 'success',
      duration: 1000//持续的时间
    });
    setTimeout(() => {
      wx.navigateBack({
      delta: 1,
    })
    }, 1000);
  },

  // 上传图片
  chooseImg: function (e) {
    // console.log(e);
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 3) {
      wx.showToast({
        title: '图片最大数为3',
        icon: 'none',
        duration: 2000//持续的时间
      })
      return false;
    };
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
          if (imgs.length >= 3) {
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
        
        // console.log(imgs);
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
        // get resource ID
        // console.log(res.fileID)
        imgsid.push(res.fileID);
        that.setData({
          imgsid:imgsid
        })

        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1500//持续的时间
        })
        // console.log(that.data.imgsid);
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
    // console.log(this.data.imgsid);
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
    // console.log(this.data.imgsid);
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shenfen:options.shenfen
    }),
    wx.cloud.init({
      env: 'lsy8507'
    })
  },
})