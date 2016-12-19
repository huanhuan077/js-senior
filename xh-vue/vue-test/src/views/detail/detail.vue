<template>
  <div class="wrapper">
    <div class="header">
      <Swipe :options="swiperOption" :picArr="picArr"></Swipe>
    </div>
    <div class="session">
      <p v-text="doubleElevenProductDetail.name_detail"></p>
      <p class="grayColor" v-text="doubleElevenProductDetail.description"></p>
      <p class="grayColor">市场价：<span class="text-del" v-text="'￥'+priceM">5288</span></p>
      <div class="tips">现在下单送<span v-text="priceM*10 + '元'" class="fontWB"></span>体验金5天，两个工作日内到帐！</div>
    </div>
    <div class="session phone_info">
      <div>内存：<span v-text="doubleElevenProductDetail.ram+'G'" class="info_right"></span></div>
      <div class="marginT10 clearfix">颜色：
        <ul class="info_right">
          <li v-for="color in colors" v-on:click="select(color)" v-bind:class="{'selected': color === curColor}">
            {{color}}
          </li>
        </ul>
      </div>
      <div class="marginT10 clearfix">存入期限：
        <ul class="info_right">
          <li v-for="term in terms" v-on:click="selectTerm(term)" v-bind:class="{'selected': term == curTerm}">{{term}}月</li>
        </ul>
      </div>
      <div class="marginT10">存入金额：
        <span class="orangeColor info_right">
          <span class="number" v-text="displayAmount"></span>
        元</span>
      </div>
      <div class="marginT10" v-show="profit>0">另享收益：
        <span class="orangeColor info_right">
          <span class="number" v-text="profit"></span>元
        </span>
      </div>
      <div class="marginT10 clearfix" v-show="profit>0">实质收益：
        <span class="orangeColor info_right">
          <span class="number" v-text="displayRealProfit"></span>元
        </span>
      </div>
      <div class="grayColor fontS12">（手机市场价值+另收益）</div>
    </div>
    <DetailAdvantage></DetailAdvantage>
    <ul v-show="doubleElevenProductDetail.detail_info_src && doubleElevenProductDetail.detail_info_src.length > 0" class="detail_pic">
      <li v-for="detail in doubleElevenProductDetail.detail_info_src"><img :src="detail.name"></li>
    </ul>
    <div class="footer-btn">
      <div class="grayColor relative footer-btn-left">
        <div class="footer-left">
          <div class="floatL">
            数量：
          </div>
          <div class="floatL marginT10">
            <span class="minus size" v-on:click="count('minus')">-</span>
            <span class="number size grayColor" v-text="number"></span>
            <span class="plus size" v-on:click="count('plus')">+</span>
          </div>
        </div>
      </div>
      <router-link :to="{name: 'orderconfirm', params: {color: curColor, term: curTerm, realProfit: realProfit, profit: profit, moreProfit: moreProfit, curOldProfit: curOldProfit, amount: amount, number: number, pic: doubleElevenProductDetail.icon_src}}" class="btn footer-btn-right" data-statistics="text=双11商品详情页_存钱免费拿">
        存钱免费拿
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        colors: [],
        terms: [],
        curColor: '',
        curTerm: '',
        curOldProfit: 0,
        number: 1,
        amount: 0,
        displayAmount: 0,
        profit: 0,
        realProfit: 0,
        displayRealProfit: 0,
        moreProfit: 0,
        priceM: 0,
        picArr: []
      }
    }
  }
</script>