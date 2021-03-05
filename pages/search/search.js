// pages/search/search.js

wx.cloud.init()
Page({

  onShareAppMessage() {
    return {
      title: 'checkbox',
      path: 'page/component/pages/checkbox/checkbox'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    grade: [{
        value: '2020',
        name: '2020'
      },
      {
        value: '2019',
        name: '2019'
      },
      {
        value: '2018',
        name: '2018'
      },
      {
        value: '2017',
        name: '2017'
      }
    ],
    /*    college:[
          {value: 'c1', name: '人文科学学部'},
          {value: 'c2', name: '社会科学学部'},
          {value: 'c3', name: '理学部'},
          {value: 'c4', name: '工学部'},
          {value: 'c5', name: '信息科学学部'},
          {value: 'c6', name: '大学英语部'}，
          {value: 'c6', name: '医学部'},
          {value: 'c7', name: '教务处'},
        ],
        */
    area: [{
        value: '1区', name: '1区'
      },
      {
        value: '2区',
        name: '2区'
      },
      {
        value: '3区',
        name: '3区'
      },
      {
        value: '4区',
        name: '4区'
      },
    ],
    kind: [{
        value: 0,
        name: '专业必修'
      },
      {
        value: 1,
        name: '专业选修'
      },
      {
        value: 2,
        name: '公共必修'
      },
      {
        value: 3,
        name: '公共选修'
      },
    ],
    yield: [{
        value: '空',
        name: '无'
      },
      {
        value: '中华文化与世界文明',
        name: '中华文化与世界文明'
      },
      {
        value: '科学精神与生命关怀',
        name: '科学精神与生命关怀'
      },
      {
        value: '社会科学与现代社会',
        name: '社会科学与现代社会'
      },
      {
        value: '艺术体验与审美鉴赏',
        name: '艺术体验与审美鉴赏'
      },

    ],
    weekday: [{
        value: '星期一',
        name: '星期一'
      },
      {
        value: '星期二',
        name: '星期二'
      },
      {
        value: '星期三',
        name: '星期三'
      },
      {
        value: '星期四',
        name: '星期四'
      },
      {
        value: '星期五',
        name: '星期五'
      },
      {
        value: '星期六',
        name: '星期六'
      },
      {
        value: '星期日',
        name: '星期日'
      },
    ],
    sksj: [{
        value: 1,
        name: '1'
      },
      {
        value: 2,
        name: '2'
      },
      {
        value: 3,
        name: '3'
      },
      {
        value: 4,
        name: '4'
      },
      {
        value: 5,
        name: '5'
      },
      {
        value: 6,
        name: '6'
      },
      {
        value: 7,
        name: '7'
      },
      {
        value: 8,
        name: '8'
      },
      {
        value: 9,
        name: '9'
      },
      {
        value: 10,
        name: '10'
      },
      {
        value: 11,
        name: '11'
      },
      {
        value: 12,
        name: '12'
      },
      {
        value: 13,
        name: '13'
      },
    ],
    search_key: "",
    search_result: "",
    idx: ""
  },
  searchform: function (e) {
    this.setData({
      search_key: e.detail.value
    })
    console.log("输入的课程名" + this.data.search_key)
    console.log(typeof this.data.search_key)
  },

  search: function (e) {
    if (this.data.search_key != "") {
      wx.cloud.callFunction({
        name: "getCourseByName",
        data: {
          a: this.data.search_key,
        }
      }).then((v) => {
        console.log(v.result.data)
        this.setData({
          search_result: v.result.data
        })
      })
      return
    } else {
      wx.cloud.callFunction({
        name: "getCourse",
        data: {
          a: this.data.cgrade[0],
          b: this.data.carea[0],
          c: parseInt(this.data.ckind[0]),
          d: this.data.cyield[0],
          e: this.data.cweek[0],
          f: parseInt(this.data.csksj[0])
        }
      }).then((v) => {
        console.log(v.result.data)
        this.setData({
          search_result: v.result.data
        })

      })

      return
    }
  },

  search_key: function (e) {
    this.setData({
      search_key: e.detail.value
    })
  },
  checkboxChange1: function (e) {
    console.log('年级：', e.detail.value)
    this.setData({
      cgrade: e.detail.value,
    })
  },
  checkboxChange2: function (e) {
    console.log('上课地点：', e.detail.value)
    this.setData({
      carea: e.detail.value,
    })
  },
  checkboxChange3: function (e) {
    console.log('课程类型：', e.detail.value)
    console.log(typeof e.detail.value)
    this.setData({
      ckind: e.detail.value,
    })
  },
  checkboxChange4: function (e) {
    console.log('公选课程分类：', e.detail.value)
    this.setData({
      cyield: e.detail.value,
    })
  },
  checkboxChange5: function (e) {
    console.log('上课日期：', e.detail.value)
    this.setData({
      cweek: e.detail.value,
    })
  },
  checkboxChange6: function (e) {
    console.log('上课节次：', e.detail.value)
    this.setData({
      csksj: e.detail.value,
    })
  },
  onCourseTap: function (event) {
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