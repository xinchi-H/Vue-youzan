import Address from "js/addressService.js";

export default {
    data() {
        return {
            name: '',
            tel: '',
            provinceValue: -1,
            cityValue: -1,
            districtValue: -1,
            address: '',
            id: '',
            type: '',
            instance: '',
            addressData: require('js/address.json'),
            cityList: null,
            districtList: null,
            provinceName: '',
            cityName: '',
            districtName: '',
        }
    },
    computed: {
        lists() {
            return this.$store.state.lists
        }
    },
    created() {
        let query = this.$route.query
        this.type = query.type
        this.instance = query.instance
        if (this.type === 'edit') {
            let ad = this.instance
            this.provinceValue = parseInt(ad.provinceValue)
            this.name = ad.name
            this.tel = ad.tel
            this.address = ad.address
            this.id = ad.id
            this.provinceName = ad.provinceName
            this.cityName = ad.cityName
            this.districtName = ad.districtName
        }
    },
    methods: {
        add() {
            //需要做非空和合法性合法性校验
            let {
                name, tel, provinceValue, provinceName, cityValue, cityName, districtValue, districtName, address
            } = this
            let data = {
                name, tel, provinceValue, provinceName, cityValue, cityName, districtValue, districtName, address
            }
            if (this.type === 'add') {
                // Address.add(data).then(res => {
                //     this.$router.go(-1) //回到上级页面
                // })
                this.$store.dispatch('addAction', data)
            }
            if (this.type === 'edit') {
                data.id = this.id
                // Address.update(data).then(res => {
                //     this.$router.go(-1) //回到上级页面
                // })
                this.$store.dispatch('updateAction', data)
            }
        },
        remove() {
            if (window.confirm('确认删除吗？')) {
                // Address.remove(this.id).then(res => {
                //     this.$router.go(-1)
                // })
                this.$store.dispatch('removeAction', this.id)
            }
        },
        setDefault() {
            // Address.setDefault(this.id).then(res => {
            //     this.$router.go(-1)
            // })
            this.$store.dispatch('setDefaultAction', this.id)
        },
    },
    watch: {
        lists: {
            handler() {
                this.$router.go(-1)
            },
            deep: true
        },
        provinceValue(val) {
            if (val === -1) return
            let list = this.addressData.list
            let index = list.findIndex(item => {
                return item.value === val
            })
            this.cityList = list[index].children
            this.cityValue = -1
            this.districtValue = -1

            if (this.type === 'edit') {
                this.cityValue = parseInt(this.instance.cityValue)
            }
        },
        cityValue(val) {
            if (val === -1) return
            let list = this.cityList
            let index = list.findIndex(item => {
                return item.value === val
            })
            this.districtList = list[index].children
            this.districtValue = -1

            if (this.type === 'edit') {
                this.districtValue = parseInt(this.instance.districtValue)
            }
        }
    }
}
