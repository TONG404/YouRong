// miniprogram/pages/GPA/GPA.js
var app=getApp()
Page({

  /**
   * 页面的初始数据s
   */
  data: {
    allgrade2:[],
    allgpa:"",
    zxf:""
  },
  
  jisuan:function(){
      var courses = []
      courses = this.data.allgrade2
      console.log(courses)
      var sumXF = 0.0 //sum(学分)
      var sumJD_CJ = 0.0 //sum(绩点×成绩)
      courses.forEach(element => {
        var xf = parseFloat(element.xuefen)//学分
        console.log(xf)
        var cj = parseFloat(element.grade)//成绩
        console.log(cj)
        sumXF = sumXF+xf
        if(0<=cj && cj<60){
          sumJD_CJ = sumJD_CJ + 0*xf
        }else if(60<=cj && cj<=63){
          sumJD_CJ = sumJD_CJ + 1.0*xf
        }else if(64<=cj && cj<=67){
          sumJD_CJ = sumJD_CJ + 1.5*xf
        }else if(68<=cj && cj<=71){
          sumJD_CJ = sumJD_CJ + 2.0*xf
        }else if(72<=cj && cj<=74){
          sumJD_CJ = sumJD_CJ + 2.3*xf
        }else if(75<=cj && cj<=77){
          sumJD_CJ = sumJD_CJ + 2.7*xf
        }else if(78<=cj && cj<=81){
          sumJD_CJ = sumJD_CJ + 3.0*xf
        }else if(82<=cj && cj<=84){
          sumJD_CJ = sumJD_CJ + 3.3*xf
        }else if(85<=cj && cj<=89){
          sumJD_CJ = sumJD_CJ + 3.7*xf
        }else if(90<=cj && cj<=100){
          sumJD_CJ = sumJD_CJ + 4.0*xf
        }
      });
      console.log(sumJD_CJ)
      console.log(sumXF)
      console.log(sumJD_CJ/sumXF)
      this.setData({
        allgpa:sumJD_CJ/sumXF
      })
      wx.cloud.callFunction({
        name:"getGradeBySID",
        data:{
          a:app.globalData.userID
        }
      }).then((v)=>{
        console.log(v.result.data)
        var totalCredit = 0  //总学分
        v.result.data.forEach(element=>{
          if(element.grade>=60){
          totalCredit = totalCredit+parseFloat(element.xuefen)
          }
        })
        this.setData({
          zxf:totalCredit
        })
        console.log(totalCredit)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面路由
    var prevPage = pages[pages.length - 2];  //上一个页面路由
    console.log(prevPage.data.allgrade)
    this.setData({
      allgrade2:prevPage.data.allgrade
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