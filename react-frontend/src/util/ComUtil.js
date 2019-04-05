import moment from 'moment-timezone'
import Compressor from 'compressorjs'

export default class ComUtil {


    /*******************************************************
     두날짜 비교해서, 같은지 작은지 큰지 return
     @Param : sDate 일자(yyyy-mm-dd) : String
     @Return :
     -1: sDate1 < sDate2
     0 : sDate1 == sDate2
     1 : sDate1 > sDate2
     *******************************************************/
    static compareDate(sDate1, sDate2) {

        let date1 = this.getDate(sDate1);
        let date2 = this.getDate(sDate2);

        let dt1 = ((date1.getTime()/3600000)/24);
        let dt2 = ((date2.getTime()/3600000)/24);

        if (dt1 === dt2) return 0;
        if (dt1 < dt2) return -1;
        else return 1;
    }

    static getDate(sDate){
        let dateTo = sDate.replace(new RegExp('-', 'g'), '');

        let pYear 	= dateTo.substr(0,4);
        let pMonth 	= dateTo.substr(4,2) - 1;
        let pDay 	= dateTo.substr(6,2);

        return new Date(pYear, pMonth, pDay);
    }

    /*******************************************************
     UTC 날짜타입 => String 변환
     @Param : utcTime, formatter
     @Return : yyyy-MM-dd (formatter 형식에 맞게 반환)
     *******************************************************/
    static utcToString(utcTime, formatter) {

        const format = formatter ? formatter : "YYYY-MM-DD"

        const utcDate = moment(utcTime);
        return utcDate.tz(moment.tz.guess()).format(format)

        var d = new Date(utcTime);

        // UTC version of the date
        var yyyy = d.getUTCFullYear();
        var mmUTC = this.zeroPad(d.getUTCMonth() + 1);
        var ddUTC = this.zeroPad(d.getUTCDate());
        var hhUTC = this.zeroPad(d.getUTCHours());
        let minUTC = this.zeroPad(d.getUTCMinutes());

        return yyyy + '-' + mmUTC + '-' + ddUTC + ' ' + hhUTC + ':' + minUTC;
    }

    /*******************************************************
     날짜 및 시간-10보다 작은 숫자 호출시 앞에 0 format
     @Param : number
     @Return : number
     *******************************************************/
    static zeroPad(number) {
        if (number < 10) return '0' + number;
        else return number;
    }

    /*******************************************************
     날짜 포맷 세팅
     @Param : time
     @Return : yyyy-MM-ddThh:mm:00(년-월-일T시간:분:초)
     *******************************************************/
    static setDate(time) {
        let date = new Date();
        //return date.getFullYear() + '-' + this.zeroPad(date.getMonth() + 1) + '-' + this.zeroPad(date.getDate()) + 'T' + time + ":00";
        const localDate = date.getFullYear() + '-' + this.zeroPad(date.getMonth() + 1) + '-' + this.zeroPad(date.getDate()) + 'T' + time + ":00";

        return moment.tz(localDate, moment.tz.guess()).format()
    }

    /*******************************************************
     숫자에 comma 추가
     @Param : 1234567
     @Return : 1,234,567
     *******************************************************/
    static addCommas(number) {
        if (number === undefined ) {
            return;
        }
        return number.toLocaleString();
    }

    /*******************************************************
     시간에 분 추가
     @Param : dt, minutes
     @Return :
     *******************************************************/
    static addMinutes(dt, minutes) {
        return new Date(dt.getTime() + minutes*60000)
    }

    /*******************************************************
     이미지 파일을 받아 압축율을 적용
     @Param : { file, opacity }
     @Return : file
     *******************************************************/
    static imageCompressor({file, quality}) {
        return new Compressor(file, {
            quality: !quality && 0.6,       //압축률
            success(result) {},
            error(err) {
                console.log(err.message);
            },
        }).file;
    }

    /*******************************************************
     배송시작일 표시용 날짜 포맷
     @Param : yyyy-MM-dd(date)
     @Return : MM/dd(요일)
     *******************************************************/
    static simpleDate(date) {
        var week = ['일', '월', '화', '수', '목', '금', '토'];
        var dayOfWeek = week[new Date(date).getDay()];
        return date.substring(5,7) + '/' + date.substring(8,10) + '(' + dayOfWeek + ')';
    }


    /*******************************************************
     오브젝트의 attribute들의 value들을 copy,
     @Param : target - 타겟 오브젝트, copy가 필요한 attribute가 존재해야 함
     source - 소스 오브젝트
     *******************************************************/
    static objectAttrCopy(target, source) {
        for (let key in target) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];  //value만 copty
            }
        }
    }
}