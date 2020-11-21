//app.js
App({
  onLaunch: function () {
    if (wx.getStorageSync('userInfo').userId > 0) {
      this.globalData.userInfo = wx.getStorageSync('userInfo')
    } else {
      this.globalData.userInfo.userId = '';
      this.globalData.userInfo.nickName = '';
      this.globalData.userInfo.avatarUrl = '';
      this.globalData.userInfo.code = '';
    }

  },
  globalData: {
    userInfo: {
      userId: '',
      nickName: '',
      avatarUrl: '',
      code: ''
    },
    HOST: 'http://localhost:8080'

  }


})