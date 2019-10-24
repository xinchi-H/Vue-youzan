import Foot from 'components/Foot.vue'

let mixin = {

    filters: {
        currency(price) {
            let priceStr = '' + price //把数字转化为字符串
            if (priceStr.indexOf('.') > -1) {
                let arr = priceStr.split('.')
                return arr[0] + '.' + (arr[1] + '0').substr(0, 2)
            } else {
                return priceStr + '.00'
            }
        }
    },
    components: {
        Foot
    },
}

export default mixin