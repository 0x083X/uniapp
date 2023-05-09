<template>
	<view class='dt-wrap'>
		<h2>{{articleDetailData.title}}</h2>
		<view class="dd">
			<text>编辑: {{articleDetailData.author}}</text>
			<text> 发布日期: {{ddate}}</text>
		</view>
		<rich-text :nodes="articleDetailData.content"></rich-text>
	</view>
</template>

<script setup lang="ts">
	import { defineProps, ref, onMounted } from 'vue'
	import { onReady,onLoad } from '@dcloudio/uni-app'
	import {ARTICLEDETAILDATA,LOCALSTORAGEARTICLEDATA} from '../../utils'
	const articleDetailData = ref<ARTICLEDETAILDATA>({})

	const getRouteData = (name : string) => { // => 微信小程序和H5获取 route中的query方式不同
		const page = getCurrentPages()
		const route = page[page.length - 1]
		return route.options ? route.options[name] : route.$page.options[name]
	}
	const ddate = ref()
	const getDate = (time : string | Date) => {	
		let date:Date ;
		if(typeof time != 'object' && typeof time == 'string') {
			date = new Date(parseInt(time) * 1000)
		}
		else if(time instanceof Date) {
			date = time
		}
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDay()
		let h = date.getHours()
		let m = date.getMinutes()
		let s = date.getSeconds()
		return year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
	}
		
	const updateContent = (content:string) => {
		articleDetailData.value.content = content.replace(/\<img/gi,'<img style="width:100%;height:auto;"')
	}
	
		
	const getMsg = (cid:string,id:string) => {
		uni.showLoading({
			title:'加载中'
		})
		uni.request({
			url: `https://ku.qingnian8.com/dataApi/news/detail.php?cid=${cid}&id=${id}`,
			success: (data) => {
				articleDetailData.value = data.data as ARTICLEDETAILDATA
				ddate.value = getDate(articleDetailData.value.posttime)
				updateContent(articleDetailData.value.content)
				uni.setNavigationBarTitle({
					title:articleDetailData.value.title
				})
				saveToHistory(articleDetailData.value)
				uni.hideLoading()
			}
		})
	}
	
	const saveToHistory = (val:ARTICLEDETAILDATA) => { // => 将内容存到localStorage中
		let arr:LOCALSTORAGEARTICLEDATA[] = uni.getStorageSync('history') || []  // => 初始化
		if(arr && arr.length != 0) {
			arr = arr.filter(item => {
				return item.id != val.id
			})
		}
		let item = {
			id : val.id,
			classid : val.classid ,
			picurl : val.picurl ,
			title : val.title ,
			looktime : getDate(new Date())
		}
		arr.unshift(item) // => 插入到第一个
		uni.setStorageSync('history',arr)
		
	}
	onLoad (() => {
		getMsg(getRouteData('cid'),getRouteData('id'))
	})
</script>

<style lang="less">
	.dd {
		font-size: 20rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		margin: 20rpx;
		background-color: #bbb;
		&>text:nth-of-type(1){
			float: left;
			margin-left: 20rpx;
		}
		&>text:last-of-type {
			float: right;
			margin-right: 20rpx;
		}
	}
</style>