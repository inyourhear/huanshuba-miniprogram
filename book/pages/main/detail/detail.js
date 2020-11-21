// book/pages/main/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id: '',
    avatarUrl: '',
    nickname: '',
    book_title: '',
    book_type: '',
    book_detail: '',
    book_releaser_id: '',
    book_picture: '',
    noteList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      book_id: options.book_id
    })
    that.getBookDetail(options.book_id);    
    that.getNoteList(options.book_id);
  },

  note:function(event){
    var that = this;
    wx.request({
      url: app.globalData.HOST + '/note/add/',
      method: 'post',
      data: {
        note_book_id: that.data.book_id,
        note_sender_id: app.globalData.userInfo.userId,
        note_receiver_id: that.data.book_releaser_id,
        note_content:  event.detail.value
      },
      success:function(res){
          wx.redirectTo({
            url: '/pages/main/detail/detail?book_id=' + that.data.book_id,
          })      
      }
    })
  },

  getBookDetail:function(book_id){
    var that = this;
    wx.request({
      url: app.globalData.HOST + '/book/detail/' + book_id,
      method: 'get',
      success:function(res){
        that.setData({
          book_detail: res.data.book_detail,
          book_title: res.data.book_title,
          book_picture: res.data.book_picture,
          book_releaser_id: res.data.book_releaser_id,
          book_title: res.data.book_title,
          book_type: res.data.book_type
        })
        that.getReleaserInfo(res.data.book_releaser_id)
      }
    })
  },

  getReleaserInfo:function(book_releaser_id){
    var that = this;
    wx.request({
      url: app.globalData.HOST + '/user/userinfo/' + book_releaser_id,
      method: 'GET',
      success:function(res){
        that.setData({
          nickname: res.data.nickname,
          avatarUrl: res.data.user_photo
        })
      }
    })
  },

  getNoteList:function(book_id){
    var that = this;
    wx.request({
      url: app.globalData.HOST + '/note/book/' + book_id,
      method: 'GET',
      success:function(res){
        that.setData({
          noteList: res.data
        })
      }
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