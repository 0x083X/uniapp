<template>
	<scroll-view class="navs" scroll-x="true">
		<view v-for="(item,index) in navs" :key="item.id" class="nv-item" @click="gm(item)"
			:class="{nvSelect: item.id == selectNav}">{{item.classname}}</view>
	</scroll-view>
	<Article status='0' :articleData='articleData'></Article>
	<view v-if="m == 1">正在加载中</view>
	<view v-if="m == 2">已经到底了</view>
</template>

<script setup lang="ts">
	import {
		ref
	} from 'vue'
	import {
		onReady, onLoad, onReachBottom
	} from '@dcloudio/uni-app'
	import Article from '../../components/article/article.vue'
	import {NAVSDATA,ARTICLEDATA} from '../../utils'
	const navs = ref<NAVSDATA[]>([])
	const articleData = ref<ARTICLEDATA[]>([])
	const selectNav = ref<number>() // => 选中的navs标签 
	const reset = () => { // => 重置数据
		pageNum.value = 1 // => 重置页数
		articleData.value = [] // => 重置
	}
	const gm = (item : NAVSDATA) => {
		selectNav.value = item.id
		reset()
		getMsg(item.id, pageNum.value)
	}
	const pageNum = ref<number>(1) // => 页数
	const m = ref<number>(0) // => flag / 正在加载还是已经到底
	const getMsg = (cid : number, page : number) => {
		m.value = 1
		uni.request({
			url: `https://ku.qingnian8.com/dataApi/news/newslist.php?page=${page}`,
			data: {
				'cid': cid.toString() // => 请求数据时带上cid
			},
			success(data) {
				if ((<Array<ARTICLEDATA[]>>data.data).length == 0)
					m.value = 2 // => 显示已经无数据
				else m.value = 0
				articleData.value = articleData.value.concat(data.data as ARTICLEDATA[])
			}
		})
	}
	onLoad(() => {
		uni.request({
			url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
			success(data) {
				selectNav.value = data.data[0].id
				navs.value = data.data as NAVSDATA[]
				getMsg(selectNav.value, pageNum.value)
			}
		})
	})
	onReachBottom(() => {
		pageNum.value++
		getMsg(selectNav.value, pageNum.value)
	})
</script>

<style lang="less">
	.navs {
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 5;
		white-space: nowrap;
		width: 100%;
		background-color: #aaa;

		& view.nv-item {
			text-align: center;
			width: 180rpx;
			font-size: 40rpx;
			display: inline-block;
			height: 100rpx;
			line-height: 100rpx;
		}

		& view.nvSelect {
			background-color: #aff;
		}
	}
</style>