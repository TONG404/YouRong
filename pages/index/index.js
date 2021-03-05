//index.js

//Create on Tue July 07
//@author:liwantong

//获取应用实例
var app = getApp()
wx.cloud.init()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userpassword:"",
    user: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getpw:function(){
    wx.navigateTo({
      url: '../findpw1/findpw1'
    })
  },
  userIDInput: function(e){
    app.globalData.userID=e.detail.value
    console.log("输入的学号"+app.globalData.userID)
    console.log(typeof app.globalData.userID)
  },
  userPasswordInput: function(e){
    app.globalData.userpassword=e.detail.value
    console.log("输入的密码"+app.globalData.userpassword)
    console.log(typeof app.globalData.userpassword)
  },
  onTap:function(){
    /*跳转函数wx.navigateTo()、wx.redirectTo()、wx.switchTab()
    1、一次性跳转页面超过5层选择wx.redirectTo()
    2、跳转至tabBar页面选择wx.switchTab()*/ 

    if(app.globalData.userID==""){//输入为空直接返回
      return
    }

    var user
    wx.cloud.callFunction({
      name:"getUser",
      data:{
        a:app.globalData.userID
      }
    }).then((v)=>{
      user = v.result.data.length   //检查用户名是否存在
      console.log(user)
      console.log(typeof user)

      if(user==0)//数据库中不存在改用户
      {
      //   wx.cloud.callFunction({
      //     name:"addNewUser",
      //     data:{
      //       a:app.globalData.userID,    //调用本页面数据
      //       b:app.globalData.userpassword
      //     }
      // })
      wx.navigateTo({
        url: '../index2/index2',
     })
     return
    }

      var pswd
      wx.cloud.callFunction({
        name:"getUser",
        data:{
         a:app.globalData.userID
        }
      }).then((v)=>{
        pswd = v.result.data[0].password   //根据用户名取密码
        this.setData({
          password:pswd
        })
        console.log(pswd)
        console.log(typeof pswd)

        if(pswd==app.globalData.userpassword)//登录成功
        {
          wx.switchTab({
            url: '../recommend/recommend',
          })
        }
        else{//登录失败
          wx.showToast({
            title: '密码错误！',
            image:'../../images/error.png'
          })
        }
      })
    }) 
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
