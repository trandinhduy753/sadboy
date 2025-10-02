import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import 'dayjs/locale/vi'
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

const locale = {
  name: 'vi-custom',
  relativeTime: {
    future: 'trong %s',
    past: '%s trước',
    s: 'vài giây',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d năm'
  }
}

dayjs.locale(locale, null, true)
dayjs.locale('vi-custom') 
export default dayjs;

