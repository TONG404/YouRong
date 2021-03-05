// pages/TimeTable/timeTable.js

//Create on Tue July 09
//@author:liwantong

var courseData = require('../../data/course.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  array:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'],
  courses:[],
  week:"",
  },
  showCardView: function (event) {
    // var cnum=event.currentTarget.dataset.cnum;
    // // console.log(postId);
    // wx.navigateTo({
    //   url: "../coursedetails/coursedetails?id="+cnum,
    // })
    var that = this;
    that.setData({
      idx: JSON.stringify(event.currentTarget.dataset.index)
    })
    this.setData({
      cnum: this.data.search_result[this.data.idx]._id
    })

    console.log(this.data.cnum);
    wx.navigateTo({
      url: "../coursedetails/coursedetails?id=" + this.data.cnum,
    })
  },
  addcourse: function(e){
    wx.navigateTo({ 
      url: '../setSubject/setSubject',
    });
  },
  timelist:function(){
    wx.navigateTo({
      url: '../timeList/timeList',
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      week: e.detail.value
    })
  },

  importcourse:function(){
    if(app.globalData.userID==""){
      wx.showToast({
        title: '请先登录',
        image:'../../images/error.png'
      })
    }
    else{
    wx.cloud.callFunction({
      name:'getStudentCourse',
      data:{
        a:app.globalData.userID
      }
    }).then((v)=>{
      console.log(v.result.data[0].courses)
      // wx.setStorageSync({
      //   key:app.globalData.userID,
      //   data:{
      //     usercourses:v.result.data[0].courses
      //   }
      // })
      this.setData({
        courses:v.result.data[0].courses,
      })
      for(var index in v.result.data[0].courses){
        this.setData({
          day1:v.result.data[0].courses[index][6][0],
          day2:v.result.data[0].courses[index][6][1],
          day3:v.result.data[0].courses[index][6][2],
          day4:v.result.data[0].courses[index][6][3],
          day5:v.result.data[0].courses[index][6][4],
          day6:v.result.data[0].courses[index][6][5],
          day7:v.result.data[0].courses[index][6][6],
        })
      }
      //可以for循环，一天最多五节课
      for(var index in v.result.data[0].courses){
        if(v.result.data[0].courses[index][6][0].length!=0){
          this.setData({
            course1:v.result.data[0].courses[0]
          })
        }
      }
      for(var index in v.result.data[0].courses){
        if(v.result.data[0].courses[index][6][1].length!=0){
          this.setData({
            course2:v.result.data[0].courses[0]
          })
        }
      }
      for(var index in v.result.data[0].courses){
        if(v.result.data[0].courses[index][6][2].length!=0){
          this.setData({
            course3:v.result.data[0].courses[0]
          })
        }
      }
      for(var index in v.result.data[0].courses){
        if(v.result.data[0].courses[index][6][3].length!=0){
          this.setData({
            course4:v.result.data[0].courses[0]
          })
        }
      }
      for(var index in v.result.data[0].courses){
        if(v.result.data[0].courses[index][6][4].length!=0){
          this.setData({
            course5:v.result.data[0].courses[0]
          })
        }
      }
      for(var index in v.result.data[0].courses){
        if(v.result.data[0].courses[index][6][5].length!=0){
          this.setData({
            course6:v.result.data[0].courses[0]
          })
        }
      }
      for(var index in v.result.data[0].courses){
        if(v.result.data[0].courses[index][6][6].length!=0){
          this.setData({
            course7:v.result.data[0].courses[0]
          })
        }
      }
    })
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorageSync({
      key:app.globalData.userID,
      success:function(res){
        console.log("用户课程为："+res.data.usercourses)
        usercourses=res.data.usercourses
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