const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: '',
    nowWeather: '',
    nowWeatherBackground:''
  },
  onLoad() {
    this.getNow()
  },
  onPullDownRefresh(){
    // Here we pass in an anonymous function which calls wx.stopPullDownRefresh()
    // so getNow will call it when the request completes itself
    this.getNow(()=>{
        wx.stopPullDownRefresh()
    })
  },
  getNow(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市'
      },
      success: res => { // The statement success(res){} does not work. The program complains about null error of the variable this
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        this.setData({
          nowTemp: temp + '°',
          nowWeather: weatherMap[weather],
          nowWeatherBackground: '/images/' + weather + '-bg.png'
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: weatherColorMap[weather],
          animation: {
            duration: 400,
            timingFunc: 'easeIn'
          }
        })
      },
      complete: () => {
        callback && callback() // if callback function exists, execute callback()
      }
    })
  }
})