// pages/timeTable/timeList/timeList.js

//Creat on 2020/07/13 23:30
//@auther:liwantong
//Change on 2020/07/16 

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  onCourseTap:function(event){
    // var cnum=event.currentTarget.dataset.cnum;
    // // console.log(postId);
    // wx.navigateTo({
    //   url: "../coursedetails/coursedetails?id="+cnum,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userID==""){
      wx.showToast({
        title: '请先登录',
        image:'../../images/error.png'
      })
    }
    else{
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1];   //当前页面路由
      var prevPage = pages[pages.length - 2];  //上一个页面路由
      console.log(prevPage.data.courses)
      this.setData({
        courses2:prevPage.data.courses
      })
      console.log(this.data.courses2)
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

  }
})