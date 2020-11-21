// book/pages/release/release.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: '',
    flag: false,
    title: "",
    types: [{
        type: "出售",
        checked: false
      },
      {
        type: "交换",
        checked: false
      }
    ],
    returnType: "",
    subjects: [{
        subject: "理科",
        checked: false
      },
      {
        subject: "工科",
        checked: false
      },
      {
        subject: "文科",
        checked: false
      }
    ],
    returnSubject: "",
    introduce: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var wx_this = this
    wx.setNavigationBarTitle({
      title: '发布',
    })
  },

  uploadImg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          tempFilePaths: res.tempFilePaths,
          flag: true
        })
      }
    })
  },

  getTitle: function (event) {
    this.data.title = ""
    if (event.detail.value.length == 0) {
      return
    }
    this.data.title = event.detail.value
    // return event.detail.value
  },

  getType: function (event) {
    this.data.returnType = ""
    this.data.returnType = event.detail.value;
    // return event.detail.value
  },

  getSubject: function (event) {
    this.data.returnSubject = ""
    this.data.returnSubject = event.detail.value;
    // return event.detail.value
  },

  getIntroduce: function (event) {
    this.data.introduce = ""
    if (event.detail.value.length == 0) {
      return
    }
    this.data.introduce = event.detail.value;
    // return event.detail.value
  },

  release: function () {
    var that = this;
    if (that.data.title.length == 0) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
    } else if (that.data.returnType.length == 0) {
      wx.showToast({
        title: '请选择类型',
        icon: 'none'
      })
    } else if (that.data.returnSubject.length == 0) {
      wx.showToast({
        title: '请选择学科',
        icon: 'none'
      })
    } else if (that.data.introduce.length == 0) {
      wx.showToast({
        title: '请输入文字介绍',
        icon: 'none'
      })
    } else {
      wx.uploadFile({
        url: app.globalData.HOST + '/book/upload',
        filePath: that.data.tempFilePaths[0],
        name: 'file',
        success: function (res) {
          wx.request({
            url: app.globalData.HOST + '/book/add/',
            method: 'post',
            data: {
              book_picture: res.data,
              book_title: that.data.title,
              book_type: that.data.returnType,
              book_subject: that.data.returnSubject,
              book_detail: that.data.introduce,
              book_releaser_id: app.globalData.userInfo.userId,
            },
            success:function(res){
              if (res.data === 'Successful'){
                wx.showToast({
                  title: '发布成功！',
                  duration: 2000
                })
                wx.switchTab({
                  url: '/pages/main/index/index',
                })
              }else{
                wx.showToast({
                  title: '网络错误，请重新发布！',
                })
              }
            }
          })
        }
      })
    }
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
})