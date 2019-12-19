<template>
  <el-cascader
    v-model="districtList"
    :placeholder="placeholder"
    :options="options"
    clearable
    :props="props"
    ref="cascader"
    class="cascader"
    @change="changeData"
    @active-item-change="handleItemChange"
  ></el-cascader>
</template>
<script>
import { getProvincesList, getCitysList, getAreasList } from '../api/login'
import { cityList } from '../base/base'
export default {
  props: {
    disabled: false,
    placeholder: { type: String, default: '请选择地区' },
    canAll: { type: Array, default: _ => [true, true, true] },
    address: { type: Array, default: _ => [] }
  },
  data () {
    return {
      options: [],
      districtList: [],
      props: {
        value: 'code',
        label: 'name',
        children: 'children'
      },
      cityList,
      list: [],
      arr: []
    }
  },
  created () {
    this.getRegion([])
  },
  watch: {
    // address (val) {
    //   val.forEach(val => {
    //     if (val) this.districtList.push(val + '')

    //   })
    // }
  },
  methods: {
    handleItemChange (val) {
      this.getCityList(val)
    },
    getProlist (list) {
      return list.map(item => {
        let obj =
        {
          code: item.provinceid,
          name: item.province,
          children: []
        }
        return obj
      })
    },
    getProlist1 (list) {
      return list.map(item => {
        let obj =
        {
          code: item.code,
          name: item.name,
          children: []
        }
        return obj
      })
    },
    getList (list) {
      return list.map(item => {
        let obj =
        {
          code: item.code,
          name: item.name
        }
        return obj
      })
    },
    getRegion (value) {
      getProvincesList().then(res => {
        let arr = this.getProlist(res.data)
        this.options = arr
        this.getCityList(value)
      })
    },
    getCityList (value) {
      let code = ''
      if (!value.length) {
        code = '110000'
      }
      else {
        code = value[0]
      }
      getCitysList({ code }).then(res => {
        let arr = []
        if (!this.disabled) {
          arr = this.getProlist1(res.data)
          this.getAreaList(value)
        }
        else {
          arr = this.getList(res.data)
        }
        this.options.forEach(item => {
          if (item.code == code) {
            item.children = arr
            return false
          }
        })

        let arr1 = []
        arr.forEach(item => {
          cityList.forEach(val => {
            if (item.name == val.name) {
              let obj = {
                name: val.name,
                code: item.code
              }
              arr1.push(obj)
            }
          })
        })
        console.log(arr1)
      })
    },
    getAreaList (value) {
      let code = ''
      if (!value[1]) {
        code = '110100'
      }
      else {
        code = value[1]
      }
      getAreasList({ code }).then(res => {
        let arr = res.data
        this.options.forEach(item => {
          if (item.code == value[0]) {
            console.log(item.name)
            this.list.push(item.name)
            item.children.forEach(val => {
              if (val.code == code) {
                this.list.push(val.name)
                val.children = arr
                this.arr = arr
                console.log(this.arr)
              }
            })
          }
        })
      })
    },
    changeData (val) {
      if (this.arr.length) {
        this.arr.forEach(item => {
          if (val[2] && item.code == val[2]) {
            this.list.push(item.name)
          }
        })
      }
      let arr = [...new Set(this.list)]
      console.log(arr)
      this.$emit('input', val)
      this.$emit('change', val)
      this.$emit('changeAddress', arr)
    }
  }
}
</script>

<style scoped>
.cascader {
  display: block;
  width: 100%!important;
}
</style>

