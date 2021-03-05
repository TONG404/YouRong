// miniprogram/pages/userinfo/userinfo.js

var app=getApp()
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xn: [
      {value: '*', name: '全部'},
      {value: '2018', name: '2018-2019'},
      {value: '2019', name: '2019-2020'},
      {value: '2020', name: '2020-2021'}
    ],
    xq: [
      {value: '', name: '全部'},
      {value: '1', name: '第一学期'},
      {value: '2', name: '第二学期'},
      {value: '3', name: '第三学期'}
    ],
    lx: [
      {value: -1, name: '全部'},
      {value: 0, name: '专业必修'},
      {value: 1, name: '专业选修'},
      {value: 2, name: '公共必修'},
      {value: 3, name: '公共选修'},
    ],
    allgrade:[],
    grade:[],
    gpa:""
  },

  jumpPage: function(){
    wx.navigateTo({
      url: '/pages/GPA/GPA',
    })
  },
  radiochange1:function(e){
    console.log('学年:',e.detail.value)
    console.log(typeof e.detail.value)
    this.setData({
      rxn:e.detail.value,
    })
  },
  radiochange2:function(e){
    console.log('学期:',e.detail.value)
    console.log(typeof e.detail.value)
    this.setData({
      rxq:e.detail.value,
    })
  },
  radiochange3:function(e){
    console.log('类型:',e.detail.value)
    console.log(typeof e.detail.value)
    this.setData({
      rlx:e.detail.value,
    })
  },
  require:function(e){
    if(app.globalData.userID==""){
      wx.showToast({
        title: '请先登录',
        image: './../../images/error.png'
      })
    }
    else{
    if(this.data.rxn!="*"&&this.data.rxq!=""&&parseInt(this.data.rlx)!=-1){//三个都不为特殊
      wx.cloud.callFunction({
        name:"gradeListByKSY",
        data:{
          a:app.globalData.userID,//学号
          b:parseInt(this.data.rlx),
          c:this.data.rxq,
          d:this.data.rxn
        }
      }).then((v)=>{
        console.log(v.result.data)
        this.setData({
          allgrade:v.result.data
        })
      })
    }
    else if(this.data.rxn=="*"&&this.data.rxq!=""&&parseInt(this.data.rlx)!=-1){//1为特殊，2/3不为特殊
      wx.cloud.callFunction({
        name:"gradeListByKS",
        data:{
          a:app.globalData.userID,
          b:parseInt(this.data.rlx),
          c:this.data.rxn
        }
      }).then((v)=>{
        console.log(v.result.data)
        this.setData({
          allgrade:v.result.data
        })
      })
    }
    else if(this.data.rxn!="*"&&this.data.rxq==""&&parseInt(this.data.rlx)!=-1){//2为特殊，1/3不为特殊
      wx.cloud.callFunction({
        name:"gradeListByKY",
        data:{
          a:app.globalData.userID,
          b:parseInt(this.data.rlx),
          c:this.data.rxn
        }
      }).then((v)=>{
        console.log(v.result.data)
        this.setData({
          allgrade:v.result.data
        })
      })
    }
    else if(this.data.rxn!="*"&&this.data.rxq!=""&&parseInt(this.data.rlx)==-1){//3为特殊，1/2不为特殊
      wx.cloud.callFunction({
        name:"gradeListBySY",
        data:{
          a:app.globalData.userID,
          b:this.data.rxq,
          c:this.data.rxn
        }
      }).then((v)=>{
        console.log(v.result.data)
        this.setData({
          allgrade:v.result.data
        })
      })
    }
    else if(this.data.rxn=="*"&&this.data.rxq==""&&parseInt(this.data.rlx)!=-1){//1/2为特殊，3不为特殊
      wx.cloud.callFunction({
        name:"gradeListByKind",
        data:{
          a:app.globalData.userID,
          b:parseInt(this.data.rlx)
        }
      }).then((v)=>{
        console.log(v.result.data)
        this.setData({
          allgrade:v.result.data
        })
      })
    }
    else if(this.data.rxn=="*"&&this.data.rxq!=""&&parseInt(this.data.rlx)==-1){//1/3为特殊，2不为特殊
      wx.cloud.callFunction({
        name:"gradeListBySemester",
        data:{
          a:app.globalData.userID,
          b:this.data.rxq
        }
      }).then((v)=>{
        console.log(v.result.data)
        this.setData({
          allgrade:v.result.data
        })
      })
    }
    else if(this.data.rxn!="*"&&this.data.rxq==""&&parseInt(this.data.rlx)==-1){//2/3为特殊，1不为特殊
      wx.cloud.callFunction({
        name:"gradeListByYear",
        data:{
          a:app.globalData.userID,
          b:this.data.rxn
        }
      }).then((v)=>{
        console.log(v.result.data)
        this.setData({
          allgrade:v.result.data
        })
      })
    }
    else if(this.data.rxn=="*"&&this.data.rxq==""&&parseInt(this.data.rlx)==-1){//三个都为特殊
      wx.cloud.callFunction({
        name:"gradeList",
        data:{
          a:app.globalData.userID
        }
      }).then((v)=>{
        console.log(v.result.data)
        this.setData({
          allgrade:v.result.data
        })
      })
    }
  }
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