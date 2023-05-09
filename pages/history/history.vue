<template>
	<view>	
		<view class="msg">
			<image src="../../static/history.png" mode="heightFix"></image>
			<h2>浏览历史</h2>
		</view>
	</view>
	<Article status='1' :articleData='localStorageArticleData'></Article>
</template>

<script setup lang="ts"> 
	import {ref} from 'vue'
	import Article from '../../components/article/article.vue'
	import { onReady,onLoad,onShow } from '@dcloudio/uni-app'
	import {ARTICLEDETAILDATA,LOCALSTORAGEARTICLEDATA} from '../../utils'

	const localStorageArticleData = ref<LOCALSTORAGEARTICLEDATA[]>([])
	const getData = () => {
		let arr:LOCALSTORAGEARTICLEDATA[] = uni.getStorageSync('history')
		localStorageArticleData.value = arr
	}
	onShow(() => {
		getData()
	})
	
</script>

<style lang="less">
	.msg {
		height: 400rpx;
		background-color: #aaa;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		image{
			height: 160rpx;
		}
	}
	
</style>
