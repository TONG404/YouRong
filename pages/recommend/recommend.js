// pages/recommend.js

//Create on Tue July 08
//@author:liwantong

Page({

  /**
   * 页面的初始数据
   */
  data: {
    startY: 0,
    endY: 0,
    iCenter: 3,
    datas: [{
      id: 1,
      zIndex: 10,
      opacity: 1,
      top: 0,
      animation: null,
      color:"#76CCF1"
    },
    {
      id: 2,
      zIndex: 8,
      opacity: 0.8,
      top: 24,
      animation: null,
      color:"#60AADB"
    },
    {
      id: 3,
      zIndex: 6,
      opacity: 0.6,
      top: 44,
      animation: null,
      color:"#9CABD7"
    },
    {
      id: 4,
      zIndex: 4,
      opacity: 0.5,
      top: 60,
      animation: null,
      color:"#DFABCD"
    },
    {
      id: 5,
      zIndex: 2,
      opacity: 0.4,
      top: 72,
      animation: null,
      color:"#F3D4E5"
    },
    ],
    order: []
  },

  CourseTap:function(event){
    var that = this;
    that.setData({
      idx: JSON.stringify(event.currentTarget.dataset.index)
    })
    console.log(this.data.idx)
    this.setData({
      cnum: this.data.hotcourse[this.data.idx]._id
    })

    console.log(this.data.cnum);
    wx.navigateTo({
      url: "../coursedetails/coursedetails?id=" + this.data.cnum,
    })
  },
  search:function(){
  wx.navigateTo({
    url: '../search/search',
})
  },
  test:function(){
    wx.showToast({
      title: '请重新输入！',
    })
  },
  jumpNotice1: function(){
    wx.navigateTo({
      url: '../notice1/notice1',
    })
  },

  jumpNotice2: function(){
    wx.navigateTo({
      url: '../notice2/notice2',
    })
  },

  jumpNotice3: function(){
    wx.navigateTo({
      url: '../notice3/notice3',
    })
  },

  jumpNotice4: function(){
    wx.navigateTo({
      url: '../notice4/notice4',
    })
  },
  
  move: function () {
    var datas = this.data.datas;
    /*图片分布*/
    for (var i = 0; i < datas.length; i++) {
      var data = datas[i];
      var animation = wx.createAnimation({
        duration: 200
      });
      animation.translateY(data.top).step();
      this.setData({
        ["datas[" + i + "].animation"]: animation.export(),
        ["datas[" + i + "].zIndex"]: data.zIndex,
        ["datas[" + i + "].opacity"]: data.opacity,
      })
    }
  },
    /**左箭头 */
    top: function () {
      //
      var last = this.data.datas.pop(); //获取数组的最后一个
      this.data.datas.unshift(last);//放到数组的第一个
      var orderFirst = this.data.order.shift();
      this.data.order.push(orderFirst);
      this.move();
    },
    /** */
    down: function () {
      var first = this.data.datas.shift(); //获取数组的第一个
      this.data.datas.push(first);//放到数组的最后一个位置
      var orderLast = this.data.order.pop();
      this.data.order.unshift(orderLast);
      this.move();
    },
    /**点击某项 */
    choose: function (e) {
      var that = this;
      var id = e.currentTarget.dataset.id;
      var order = that.data.order;
      var index = 0;
      for (var i = 0; i < order.length; i++) {
        if (id == order[i]) {
          index = i;
          break;
        }
      }
      if (index < that.data.iCenter) {
        for (var i = 0; i < that.data.iCenter - index; i++) {
          this.data.datas.push(this.data.datas.shift()); //获取第一个放到最后一个
          this.data.order.unshift(this.data.order.pop());
          // this.right()  
        }
      } else if (index > that.data.iCenter) {
        for (var i = 0; i < index - that.data.iCenter; i++) {
          this.data.datas.unshift(this.data.datas.pop()); //获取最后一个放到第一个
          this.data.order.push(this.data.order.shift());
          // this.left();
        }
      }
      this.move();
    },
    /**新的排列复制到新的数组中 */
    __set__: function () {
      var that = this;
      var order = that.data.order;
      var datas = that.data.datas;
      for (var i = 0; i < datas.length; i++) {
        that.setData({
          ["order[" + i + "]"]: datas[i].id
        })
      }
    },
    //手指触发开始移动
    moveStart: function (e) {
      console.log(e);
      var startY = e.changedTouches[0].pageY;
      this.setData({
        startY: startY
      });
    },
    //手指触摸后移动完成触发事件
    moveItem: function (e) {
      console.log(e);
      var that = this;
      var endY = e.changedTouches[0].pageY;
      this.setData({
        endY: endY
      });
      //计算手指触摸偏移剧距离
      var moveY = this.data.startY - this.data.endY;
      //向左移动
      if (moveY > 10) {
        this.top();
      }
      if (moveY < -10) {
        this.down();
      }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.__set__();
    this.move();
    wx.cloud.callFunction({
      name:"orderCourseByClickTime",
      data:{}
    }).then((v)=>{
      console.log(v.result.data.slice(0,5))
      this.setData({
        hotcourse:v.result.data.slice(0,5)
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
})