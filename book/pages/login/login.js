// book/pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: wx.getStorageSync('userInfo').userId
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSession();
    // 判断用户是否登录
    if (!this.data.userId) {
      this.getSession();
    } else {
      wx.switchTab({
        url: '/pages/main/index/index',
      })
    }
  },

  // 获取登录的code
  getSession() {
    wx.login({
      timeout:10000,
      success: function(res) {
        if (res.code) {
          app.globalData.userInfo.code = res.code;
        }
      }
    })
  },

  getUserInfo(e) {
    app.globalData.userInfo.nickName = e.detail.userInfo.nickName;
    app.globalData.userInfo.avatarUrl = e.detail.userInfo.avatarUrl;
    wx.request({
      url: app.globalData.HOST + '/user/login/',
      method: 'post',
      data: {
        code: app.globalData.userInfo.code,
        nickname: app.globalData.userInfo.nickName,
        user_photo: app.globalData.userInfo.avatarUrl
      },
      success: function (res) {
        app.globalData.userInfo.userId = res.data.body;
        wx.setStorageSync('userInfo', app.globalData.userInfo)
      }
    })
    wx.navigateTo({
      url: '/pages/register/register',
    })
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

  }
})