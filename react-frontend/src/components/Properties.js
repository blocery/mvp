
export const Server = {
    getRestAPIHost: function() {
        return window.location.hostname == 'localhost' ? 'http://localhost:8080/restapi' : '/restapi'
    },
    getGethServer: function() {
        return "http://210.92.91.236:8545";
    },
    getServerURL: function() {
        return window.location.hostname == 'localhost' ? 'http://localhost:8080' : ''
    },
    getImageURL: function() {
        return  window.location.hostname == 'localhost' ?'http://localhost:8080/images/' : '/images/'
    },
    getThumbnailURL: function() {
        return  window.location.hostname == 'localhost' ?'http://localhost:8080/thumbnails/' : '/thumbnails/'
    },
    ERROR: 100
}

export const Const = {
    GAS_LIMIT: 500000
}

export const User = {
    admin: '관리자',
    consumer: '소비자',
    producer: '생산자'
}

export const MenuList = [
    //admin
    {userType: 'admin', href: 'dashboardAdmin', name: '홈'},
    {userType: 'admin', href: 'saleAdmin', name: '판매업체'},
    {userType: 'admin', href: 'productAdmin', name: '생산업체'},
    {userType: 'admin', href: 'consumerAdmin', name: '소비자'},
    {userType: 'admin', href: 'iotListAdmin', name: 'IoT디바이스 현황'},
    {userType: 'admin', href: 'tokenListAdmin', name: '전체토큰 현황'},
    //consumer
    {userType: 'consumer', href: 'dashboardConsumer', name: '홈'},
    {userType: 'consumer', href: 'purchaseReg', name: '구입상품 등록'},
    {userType: 'consumer', href: 'purchaseList', name: '구입상품 목록'},
    {userType: 'consumer', href: 'consumerInfoUpdate', name: '내정보수정'},
    //producer
    {userType: 'producer', href: 'dashboardProducer', name: '대시보드'},
    {userType: 'producer', href: 'standardGoodsList', name: '기준상품목록'},
    {userType: 'producer', href: 'standardGoodsReg', name: '기준상품등록'},
    {userType: 'producer', href: 'goodsList', name: '상품목록'},
    {userType: 'producer', href: 'goodsReg', name: '상품등록'},
    {userType: 'producer', href: 'goodsListByDaily', name: '일자별상품집계'},
    {userType: 'producer', href: 'barcodePrint', name: '바코드출력'}
]