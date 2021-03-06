// pages/fx/classify/details/details.js
Page({
  data: {
    height: '',
    booklist:[],
    param:'',
    bool:true,
    page:0,
    limit:10,
    isLoadmore:false,
    hasnext: true,
    loading: true,
    loadshow: true
  },

  onLoad: function (options) {
    this.setData({
      param: options.param
    })
    this.loadmore();
  },
  loadmore() {
    let that = this;
    let { page, limit, param } = this.data;
    this.setData({
      page: page,
      limit: limit,
      isLoadmore: true
    })
      if (this.data.hasnext) {
        let url = `https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=${param}&minor=&start=${page}&limit=10`;
        wx.request({
          url: url,
          success: function (res) {
            let arr = that.data.booklist;
            arr.push(...res.data.books)
            that.setData({
              page: page+10,
              booklist: arr,
              isLoadmore: false,
              canload: true,
              loadshow: false
            })
          }
        })
      }
  },
  seeBookDet(event){
    var id = event.detail;
    wx.navigateTo({
      url: '../../details/details?id=' + id
    })
  },
  showLoading: function () {
    wx.showToast({
      title: '加载中...',
      icon: 'loading'
    });
  }
})