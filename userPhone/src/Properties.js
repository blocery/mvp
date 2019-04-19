import DeviceInfo from 'react-native-device-info'

export const Server = {
    getServerURL: function() {
        // return DeviceInfo.isEmulator() ? 'http://localhost:3000/main/recommend' : 'http://210.92.91.225:8080/main/recommend'
        return DeviceInfo.isEmulator() ? 'http://localhost:3000' : 'http://210.92.91.225:8080'
    },
    getMainPage: function() {
        return DeviceInfo.isEmulator() ? (this.getServerURL() + '/main/recommend') : this.getServerURL() //서버에서는 main이 /임
        // return DeviceInfo.isEmulator() ? 'http://localhost:3000/producer' : 'http://210.92.91.225:8080/'
    },
    getGoodsPage: function() {
        return DeviceInfo.isEmulator() ? (this.getServerURL() + '/main/resv') : (this.getServerURL()+'/resv')
    },
    getDiaryPage: function() {
        return DeviceInfo.isEmulator() ? (this.getServerURL() + '/main/farmDiary') : (this.getServerURL()+'/farmDiary')
    },
    getMyPage: function() {
        return DeviceInfo.isEmulator() ? (this.getServerURL() + '/mypage') : (this.getServerURL()+'/mypage') //TODO mypage 개발 후 변경필요
    }

};
