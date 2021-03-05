// miniprogram/pages/coursecollection/coursecollection.js
    //调用函数getCourseByID取课程信息，调用时在查询函数的then里

var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lx: [
      {value: "-1", name: '全部'},
      {value: "0", name: '专业必修'},
      {value: "1", name: '专业选修'},
      {value: "2", name: '公共必修'},
      {value: "3", name: '公共选修'},
    ],
    collectcourse1:[], /*收藏夹中所有类型的课程 */
    collectcourse2:[],  /*收藏夹中最后显示的课程 */
    collectcourse3:[]  /*收藏夹中特定类型的课程 */
  },

  onCourseTap: function (event) {
    var that = this;
    that.setData({
      idx: JSON.stringify(event.currentTarget.dataset.index)
    })
    this.setData({
      cnum: this.data.collectcourse2[this.data.idx]._id
    })

    console.log(this.data.cnum);
    wx.navigateTo({
      url: "../coursedetails/coursedetails?id=" + this.data.cnum,
    })
  },

  radiochange:function(e){
    console.log('课程类型:',e.detail.value)
    console.log(typeof e.detail.value)
    this.setData({
      rlx:e.detail.value,
    })
    if(this.data.rlx!="-1")
    {
      this.data.collectcourse1.forEach(e=>{
        if(e.kind==this.data.rlx)
        {
          this.data.collectcourse3.push(e)
        }
      }) 
      this.setData({ collectcourse2: this.data.collectcourse3})
    }
    else{
      this.setData({ collectcourse2: this.data.collectcourse1})
    }
    console.log(this.data.collectcourse2)
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
    wx.cloud.callFunction({
      name:"getFavorites",
      data:{
      a:app.globalData.userID
    }
  }).then((v)=>{
    console.log(v.result.data)
    this.setData({
      collectcourse:v.result.data,
      collectcourse1:[],
      collectcourse2:[],
      collectcourse3:[],
    })
    v.result.data.forEach(e=>{
      wx.cloud.callFunction({
        name:"getCourseByID",
        data:{
          a:e.cid
        }
      }).then((u)=>{
        //console.log(u.result.data[0])
        var that=this;
        that.data.collectcourse1.push(u.result.data[0])
        console.log(this.data.collectcourse1)
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