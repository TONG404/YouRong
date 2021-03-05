// pages/findpw/findpw1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:[
      {id: 0, text:"你喜欢什么颜色？"},
      {id: 1, text:"你的生日是什么时候？"},
      {id: 2, text:"你最喜欢吃什么？"},
      {id: 3, text:"你的偶像是谁？"},
      {id: 4, text:"你父亲的名字？"},
      {id: 5, text:"你母亲的名字？"},
      {id: 6, text:"你喜欢的动物？"},
    ],
  },

  nextTap: function() {
    wx.navigateTo({
      url: '../findpw2/findpw2'
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