// miniprogram/pages/classhistory/classhistory.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history1: [],
    courses:[]
  },

  onCourseTap: function (event) {
    var that = this;
    that.setData({
      idx: JSON.stringify(event.currentTarget.dataset.index)
    })
    this.setData({
      cnum: this.data.courses[this.data.idx]._id
    })

    console.log(this.data.cnum);
    wx.navigateTo({
      url: "../coursedetails/coursedetails?id=" + this.data.cnum,
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
    if(app.globalData.userID==""){
      wx.showToast({
        title: '请先登录!',
        image: '../../images/error.png'
      })
      return
    }
    else{
    //获取浏览记录
    wx.cloud.callFunction({
      name: "orderHistory",
      data: {
        a: app.globalData.userID
      }
    }).then((v) => {
      var history = []
      if (v.result.data.length >= 10) {
        history = v.result.data.slice(0, 10)
      } else {
        history = v.result.data
      }
      console.log(history)
      this.setData({
        history1: history,
        courses:[]
      })
      var temp=[]
      //遍历history1
      this.data.history1.forEach(element=>{
        wx.cloud.callFunction({
          name:"getCourseByID",
          data:{
            a:element.cid
          }
        }).then((w)=>{
          var c = w.result.data[0]
          c["order"]=element.order
          temp.push(c)
          console.log(element.order)

          temp.sort(function(a,b){return (a.order>b.order)?-1:1})
          this.setData({
            courses:temp
          })
          console.log(this.data.courses)
        })
      })
    })
  }
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