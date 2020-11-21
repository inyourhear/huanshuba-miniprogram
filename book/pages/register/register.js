// book/pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentId:''
  },
  formSubmit(e) {
    this.setData({
        studentId:e.detail.value
    })
    if(this.data.studentId.input.length != 10)
    {
      wx.showToast({
        title: '学号错误',
        icon:'none'
      })
      return
    }

    // 学号正确，提交    
      // console.log('form发生了submit事件，携带数据为：',this.data.studentId)
      wx.switchTab({
        url: '/pages/main/index/index',
      })
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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