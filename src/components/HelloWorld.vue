<template>
  <el-container>
    <!-- 边框 -->
    <el-aside flex="main:center cross:center flow:top-wrap" width="30%">
      <div style="margin-bottom: 30px">
        <div style="margin-bottom: 16px">
          <el-input v-model="webkey" style="width: 260px">
            <template slot="prepend">密钥:</template>
          </el-input>
        </div>
        <el-button type="primary" @click="onSubmit('form')">登录</el-button>
      </div>
      <div style="margin-bottom: 30px">
        <el-input placeholder="请先登陆获取cookie" v-model="cookie_input" type="textarea" :readonly="true" :disabled="true" :autosize="{ minRows: 2, maxRows: 4 }" style="margin-bottom: 16px"  >
          <!-- :readonly="true" :disabled="true"  -->
        </el-input>
        <el-button type="danger" round @click="delCookie" disabled>清空</el-button><!-- disabled -->
      </div>
      <div v-for="(index) in 10" :key="index">
        <el-checkbox v-model="checkedCities[index]" checked disabled>
          {{`${priceList[index].ID}&nbsp&nbsp&nbsp价格:$${priceList[index].price}&nbsp&nbsp&nbsp余量:${priceList[index].Balance}`}}
        </el-checkbox>
      </div>
      <el-switch v-model="priceValue" active-color="#13ce66" inactive-color="#ff4949" active-text="自动查询价格列表" disabled style="margin-top: 16px"></el-switch>
    </el-aside>
    <!-- 边框 -->
    <!-- 主体 -->
    <el-main flex="main-cross:center flow:top-wrap">
      <el-card class="box-card" style="margin-bottom: 25px; width: 65%;">
        <div class="text item" style="text-align: left; text-size: 16px;">
          1）设置好帐号需要出售股票数量和出售股票类型<br>
          2）登录帐号<br>
          3）成功获取cookie值后，将自动获取后台数据<br>
          4）将根据最近十份发售的股票进行抢挂，一旦系统开放期中任意一份股票上市则根据用户的设置进行抢挂<br>
          <br>
          注：若登录后，右侧的cookie、价格、余量等出现&nbspnull&nbsp字母或无法正常显示，请刷新网页重试<br>
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp建议每一小时左右观察一次网页
        </div>
      </el-card>
      <div style="margin-bottom: 50px">
        <div style="margin-bottom: 25px">
          <el-switch v-model="violenceData" @change="violence()" active-color="#13ce66" inactive-color="#ff4949" active-text="暴力模式"></el-switch>
          <br>
          注：强制抢挂最近九份暂未开始售卖的股票<br>
          &nbsp&nbsp&nbsp开启后影响正常抢挂，风险未知，开启后20秒自动关闭
        </div>
        <div style="margin-bottom: 25px">
          <el-input v-model="Qty" style="width: 165px; margin-right: 10px;">
            <template slot="prepend">出售数量</template>
          </el-input>
          <el-input v-model="maxPrice" style="width: 165px" disabled>
            <template slot="prepend">最高价</template>
          </el-input>
          <div style="margin: 10px font-weight: bold ">
            注：不设置出售数量时，默认出售所有股票（数量为10的倍数）<br>
            根据近十份股票价格设置最高价，有低于最高价时也会自动抢挂
          </div>
        </div>
        <div style="margin-bottom: 25px">
          <el-radio v-model="sq" label="1" border>配套股</el-radio>
          <el-radio v-model="sq" label="2" border>重消股</el-radio>
        </div>
        <div style="margin-bottom: 16px">
          <el-switch v-model="salesValue" active-color="#13ce66" inactive-color="#ff4949" active-text="自动出售" disabled></el-switch>
        </div>
      </div>
      
      <div>
        <el-table :data="resStatus" align="center" height="520" style="margin-bottom: 16px">
          <el-table-column prop="id" label="#" width="65"></el-table-column>
          <el-table-column prop="time" label="日期" width="200"></el-table-column>
          <el-table-column prop="price" label="价格" width="65"></el-table-column>
          <el-table-column prop="count" label="数量" width="65"></el-table-column>
          <el-table-column prop="amount" label="总价（$）" width="90"></el-table-column>
          <el-table-column prop="status" label="状况" width="65"></el-table-column>
          <el-table-column prop="brief" label="简要" width="165"></el-table-column>
        </el-table>
        <el-switch v-model="statusValue" active-color="#13ce66" inactive-color="#ff4949" active-text="自动查询出售订单" disabled></el-switch>
      </div>
    </el-main>
    <!-- 主体 -->
  </el-container>
</template>

<script>
  import * as postAPI from '@/api/post' // 引入axios
  export default {
    data () {
      return {
        checkedCities: {},
        // lwn5555---qmy720419
        // lzl8888---lzl667095
        webkey: '',
        cookie_input: '', // cooke输入框
        violenceData: '', // 暴力模式
        sq: '1', // 出售股票类型
        Qty: '', // 出售数量
        maxPrice: '', // 最高价
        salesValue: true, // 开启自动出售
        priceValue: true, // 开启自动查询价格列表
        statusValue: true, // 开启自动查询出售状态
        // 价格列表
        priceList: {
          1: {ID: '等待加载...', price: '...', Balance: '...'},
          2: {ID: '等待加载...', price: '...', Balance: '...'},
          3: {ID: '等待加载...', price: '...', Balance: '...'},
          4: {ID: '等待加载...', price: '...', Balance: '...'},
          5: {ID: '等待加载...', price: '...', Balance: '...'},
          6: {ID: '等待加载...', price: '...', Balance: '...'},
          7: {ID: '等待加载...', price: '...', Balance: '...'},
          8: {ID: '等待加载...', price: '...', Balance: '...'},
          9: {ID: '等待加载...', price: '...', Balance: '...'},
          10: {ID: '等待加载...', price: '...', Balance: '...'}
        },
        // 出售状态
        resStatus: []
      }
    },
    // 页面加载完成是时自动开始查询
    mounted () {
      if (this.statusValue) {
        this.status()
      }
      if (this.priceValue) {
        this.price()
      }
    },
    // 侦听按钮发生改变时，改变查询状态
    watch: {
      cookie_input (val) {
        if (val.length >= 10) {
          console.log('cookie is ok')
          this.sales()
        }
      },
      salesValue (val) {
        if (val) {
          this.sales()
        }
      }
    },
    methods: {
      onSubmit (form) {
        let payload = {
          webkey: this.webkey
        }
        // 拼接表单post密钥，后台登录获取cookie，成功返回cookie，否则弹窗警告
        postAPI.post(payload).then((resLoginStatus) => {
          if (resLoginStatus.status === 302) {
            this.cookie_input = resLoginStatus.cookie
          } else if (resLoginStatus.status === '500') {
            this.open(resLoginStatus.status)
          } else if (resLoginStatus.status === '0') {
            this.open(resLoginStatus.status)
          }
        })
      },
      // 带登录成功后的cookie post请求sales
      sales () {
        setInterval(() => {
          // 判断时候获取到价格ID
          if (Number(this.priceList[9].ID)) {
          // if (this.priceList[9].ID) {
            // 提取ID值
            let temp = this.priceList
            let ID = []
            for (let index in temp) {
              ID.push(temp[index].ID)
            }
            let payload = {
              cookie: this.cookie_input,
              violence: this.violenceData,
              sq: this.sq,
              ID: ID,
              Qty: this.Qty,
              maxPrice: this.maxPrice
            }
            postAPI.sales(payload).then((resSales) => {
              this.resSales = resSales
            })
          }
        }, 2000)
      },
      // 暴力模式开启二十秒后自动关闭
      violence () {
        setTimeout(() => {
          this.violenceData = false
        }, 20000)
      },
      // 带登录成功后的cookie post请求销售状态
      price () {
        setInterval(() => {
          if (this.cookie_input.length >= 10) {
            let cookie = { cookie: this.cookie_input }
            postAPI.priceList(cookie).then((resPrice) => {
              this.priceList = resPrice
              this.maxPrice = Number(resPrice['10'].price) + Number(0.01)
            })
          }
        }, 10000)
      },
      status () {
        setInterval(() => {
          if (this.cookie_input.length >= 10) {
            let cookie = { cookie: this.cookie_input }
            postAPI.status(cookie).then((resStatus) => {
              this.resStatus = resStatus
            })
          }
        }, 15000)
      },
      // 弹窗警告
      open (loginStatus) {
        if (loginStatus === '500') {
          this.$alert('请检查帐号密码是否正确！', '出错了', {
            confirmButtonText: '确定'
          })
        } else {
          this.$alert('请检查密钥', '出错了', {
            confirmButtonText: '确定'
          })
        }
      },
      // 清空input中的coolie数据
      delCookie () {
        this.cookie_input = ''
      }
    }
  }
</script>
