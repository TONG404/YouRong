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
    userpassword: "",
    user: [],
    usereamil: "",
    userkeyword: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  userEmailInput: function (e) {
    this.setData({
      usereamil: e.detail.value
    })
    console.log("输入的邮箱" + e.detail.value)
    console.log(typeof e.detail.value)
  },
  userKeywordInput: function (e) {
    this.setData({
      userkeyword: e.detail.value
    })
    console.log("输入的验证码" + e.detail.value)
    console.log(typeof e.detail.value)
  },

  getkey: function () {
    wx.cloud.callFunction({
      name: "sendEmail",
      data: {
        a: app.globalData.userID, //调用本页面数据
        b: app.globalData.userpassword,
        c:this.data.usereamil
      },
      success(res) {
        console.log("发送成功", res)
      },
      fail(res) {
        console.log("发送失败", res)
      }
    })
  },
  onTap: function () {
    /*跳转函数wx.navigateTo()、wx.redirectTo()、wx.switchTab()
    1、一次性跳转页面超过5层选择wx.redirectTo()
    2、跳转至tabBar页面选择wx.switchTab()*/
    if(this.data.userkeyword=="aw34edr5tfty87"){
      wx.switchTab({
        url: '../recommend/recommend',
      })
    }
   
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})