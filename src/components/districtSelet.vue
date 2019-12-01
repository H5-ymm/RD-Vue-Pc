<template>
  <el-cascader
    v-model="districtList"
    :placeholder="placeholder"
    :options="options"
    clearable
    :props="props"
    class="cascader"
    @change="changeData"
    @active-item-change="handleItemChange">
  </el-cascader>
</template>
<script>
import { getProvincesList, getCitysList, getAreasList } from '../api/login'
export default {
  props: {
    value: { type: Array, default: _ => [] },
    disabled: false,
    placeholder: { type: String, default: '请选择地区' },
    canAll: { type: Array, default: _ => [true, true, true] },
  },
  data() {
    return {
      options: [],
      districtList: [],
      props: {
        value: 'code',
        label: 'name',
        children: 'children'
      }
    }
  },
  created() {
    this.value.forEach(val => {
      if (val) this.districtList.push(parseInt(val))
    })
    // this.getRegion([100000],_ => {
    //   if (this.districtList[0]) {
    //     this.getRegion([this.districtList[0]], _ => {
    //       if (this.districtList[0] && this.districtList[1]) {
    //         this.getRegion([this.districtList[0], this.districtList[1]], _ => {
    //           if (this.districtList[0] && this.districtList[1] && this.districtList[2]) {
    //             this.getRegion([this.districtList[0], this.districtList[1], this.districtList[2]])
    //           }
    //         })
    //       }
    //     })
    //   }
    // })
    this.getRegion([])
  },
  methods: {
    handleItemChange(val) {
      console.log(val);
      // this.districtList = val
      this.getCityList(val)
    },
    getProlist(list) {
      return list.map(item => {
        let obj= 
        {
          code: item.provinceid,
          name: item.province,
          children: []
        }
        return obj
      })
    },
    getProlist1(list) {
      return list.map(item => {
        let obj= 
        {
          code: item.code,
          name: item.name,
          children: []
        }
        return obj
      })
    },
    getRegion(value) {
      getProvincesList().then(res=>{
        let arr = this.getProlist(res.data)
        this.options = arr
        this.getCityList(value)
      })
    },
    getCityList(value){
        let code = ''
        if (!value.length) {
          code = '110000'
        }
        else {
          code = value[0]
        }
        console.log(code)
        getCitysList({code}).then(res =>{
          let arr = this.getProlist1(res.data)
          this.options.forEach(item => {
            console.log(item.code == code)
            if (item.code == code) {
              console.log(arr)
              item.children = arr
              return false
            }
          })
          this.getAreaList(value)
        })
    },
    getAreaList(value) {
        let code = ''
        if (!value[1]) {
          code = '110100'
        }
        else {
          code = value[1]
        }
      getAreasList({code}).then(res =>{
        let arr = res.data
        this.options.forEach(item => {
            if (item.code == value[0]) {
                item.children.forEach(val =>{
                  if (val.code == code) {
                    val.children = arr
                  }
                })
              }
          })
        // this.options[0].children[0].children = arr
        console.log(this.options)
      })
    },
    changeData(val) {
      this.$emit('input', val)
      this.$emit('change', val)
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

