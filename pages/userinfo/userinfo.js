// miniprogram/pages/userinfo/userinfo.js

//@auther 施雅昕

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:""
  },
  exit: function() {
    app.globalData.userID=""
    wx.navigateTo({
      url: '../index/index'
    })
  },
  jumpGradeTable: function(){
    wx.navigateTo({
      url: '../gradetable/gradetable',
    })
  },

  jumpNotes: function(){
    wx.navigateTo({
      url: '../notes/notes',
    })
  },

  jumpClassCollections: function(){
    wx.navigateTo({
      url: '../coursecollection/coursecollection',
    })
  },

  jumpClassHistory: function(){
    wx.navigateTo({
      url: '../classhistory/classhistory',
    })
  },

  jumpgetin:function(){
    wx.navigateTo({
      url: '../index/index',
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
    /*！！！异步加载*/ 
    var that=this
    that.setData({
      userID:app.globalData.userID
    })
    console.log("学号为："+this.data.userID)
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