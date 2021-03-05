// miniprogram/pages/coursedetails/coursedetails.js

//@auther 施雅昕

//Change on 2020/7/16     liwantong

var courseData = require('../../data/course.js')
var app = getApp()
Page({
  // 页面的初始数据
  data: {
    total: "",
    cid: "0e57c1d45f17b12200235f33566cdb3c",
    commends: [],
    commend: "",
    CBtn:""
  },
  commentInput: function (e) {
    this.setData({
      commend: e.detail.value
    })
  },

  send: function () {
    wx.cloud.callFunction({
      name: "addCourseRemark",
      data: {
        a: this.data.cid,
        b: this.data.commend,
      }
    }).then((w) => {
      var that = this
      that.onLoad()
    })
  },
  collect:function(e){
    var sid = app.globalData.userID
    var cid = this.data.cid
    var already = false
    wx.cloud.callFunction({
      name:"getFavorites",//首先查询改学生是否已经收藏过该课程
      data:{
        a:sid
      }
    }).then((v)=>{
      console.log(v.result.data)
      v.result.data.forEach(element=>{
        if(element.cid==cid && !already){
          console.log("该用户已经收藏过该课程")
          already = true
          this.setData({
            CBtn:"加入收藏"
          })
        }
      })

      if(already){
        wx.cloud.callFunction({
          name:"removeFromFavorites",
          data:{
            a:sid,
            b:cid
          }
        })
        wx.showToast({
          title: '取消收藏成功！',
        })
        return
      }
      wx.cloud.callFunction({
        name:"getCourseByID",//再查询该课程的kind
        data:{
          a:cid
        }
      }).then((w)=>{
        var ckind = w.result.data[0].kind
        console.log(ckind)
        wx.cloud.callFunction({
          name:"addFavorites",
          data:{
            a:sid,
            b:cid,
            c:""+ckind//ckind
          }
        }).then((u)=>{
          console.log("成功收藏")
          console.log(u.result.data)
          this.setData({
            CBtn:"取消收藏"
          })
        })
        wx.showToast({
          title: '收藏成功！',
        })
        wx.cloud.callFunction({
          name:"clicktimePlusOne",
          data:{
            a:this.data.cid,
            b:5
          }
        })
      })
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var cnum=options.id;
    //this.setData(       //获取数据数组里的数据
    //  {
    //  coursedata:courseData.courseList[cnum] //corsedata为设置的JS的对象
    //  }
    //);
    //let that=this;
    //console.log(options);
    //this.setData({
    //  total:options.total
    //})
    //点击增加该课程CLICKTIME
    wx.cloud.callFunction({
      name:"clicktimePlusOne",
      data:{
        a:this.data.cid,
        b:1
      }
    })

    //收藏按钮显示内容判断
    var exsist=false
    wx.cloud.callFunction({
      name:"getFavorites",
      data:{
        a:app.globalData.userID
      }
    }).then((v)=>{
      console.log(v.result.data)
      v.result.data.forEach(e=>{
        if((e.cid==this.data.cid)&&(!exsist)){
          exsist=true
        }
      })
      console.log("exsist的值"+exsist)
      if(exsist){
        this.setData({
          CBtn:"取消收藏"
        })
      }
      else{
        this.setData({
          CBtn:"加入收藏"
        })
      }
    })

    //加载评论区
    wx.cloud.callFunction({
      name:"getCourseRemark",
      data:{
        a:this.data.cid
      }
    }).then((v)=>{
      if(v.result.data.length==0){
        wx.cloud.callFunction({
          name:"addNewCourseRemark",
          data:{
            a:this.data.cid
          }
        }).then((u)=>{
          console.log("新插入")
        })
      }
      else{
        console.log(v.result.data)
      }
    })

    //根据课程ID调用课程名
    wx.cloud.callFunction({
      name:"getCourseByID",
      data:{
        a:this.data.cid
      }
    }).then((v)=>{
      console.log(v.result.data)
          //获取各分数段人数
    wx.cloud.callFunction({
      name:"getGradeInfoByCT",
      data:{
        a:v.result.data[0].name,
        b:v.result.data[0].teacher
      }
    }).then((u)=>{
        console.log(u.result.data[0].info)
    })
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
});