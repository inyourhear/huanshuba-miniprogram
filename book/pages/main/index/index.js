// book/pages/main/index/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bookLeftList: [],
    bookRightList: [],
    page_num: 0,
    stop: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '首页',
    })
    var that = this;
    that.getBookList();
  },

  /**
   * 点击搜索
   */
  search: function (event) {
    var query = event.detail.value
    wx.navigateTo({
      url: '../search/result?query=' + query
    })
  },

  /**
   * 获取书籍列表
   */
  getBookList: function () {
    var that = this;
    wx.request({
      url: app.globalData.HOST + '/book/page/' + that.data.page_num,
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var left = new Array();
        var right = new Array();
        for (let item = 0; item < res.data.length; item++) {
          if (item % 2 == 0) {
            left.push(res.data[item])
          } else {
            right.push(res.data[item])
          }
        }
        that.setData({
          bookLeftList: left,
          bookRightList: right
        })
      }
    })
  },

  /**
   * 用户点击书籍
   */
  getDetailClick: function (event) {
    wx.navigateTo({
      url: '../detail/detail?book_id=' + event.currentTarget.dataset.id,
    })
  },

  /**
   * 用户上滑到底时加载新的书籍
   */
  onReachBottom: function () {
    var that = this;
    if (that.data.stop){
      that.data.page_num++;
      that.moreBook(that.data.page_num)
    }else{
      wx.showToast({
        title: '没有更多了',
        icon: 'none'
      })
    }
  },

  /**
   * 获取更多的书籍
   */
  moreBook: function (page_num) {
    wx.showNavigationBarLoading();
    var that = this
    wx.request({
      url: app.globalData.HOST + '/book/page/' + page_num,
      method: 'get',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.length < 10) {
          that.setData({
            stop: false
          })
        }
        var left = new Array();
        var right = new Array();
        for (let item = 0; item < res.data.length; item++) {
          if (item % 2 == 0) {
            left.push(res.data[item])
          } else {
            right.push(res.data[item])
          }
        }
        let array_left = left
        let array_right = right
        let prev_array_left = that.data.bookLeftList
        let prev_array_right = that.data.bookRightList
        that.setData({
          bookLeftList: Array.from(new Set(prev_array_left.concat(array_left))),
          bookRightList: Array.from(new Set(prev_array_right.concat(array_right))),
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})