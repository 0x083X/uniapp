<template>
	<view class="wrap" v-for='(item,index) in articleData' @click="detail(item)">
		<view class="pic">
			<image :src="item.picurl" mode="widthFix"></image>
		</view>
		<view class="out">
			<text class="title" v-text="item.title"></text>
			<view class="msg" v-if="status == '0'">
				<text class="author" v-text="item.author"></text>
				<text class="views" v-text="item.hits"></text>
			</view>
			<view class="time" v-if="status == '1'">
				<text>浏览时间: {{item.looktime}}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onReady } from '@dcloudio/uni-app'
	import {ref,defineProps} from 'vue'
	import {ARTICLEDATA,LOCALSTORAGEARTICLEDATA} from '../../utils'
	const props = defineProps<{
		status : string ,
		articleData : ARTICLEDATA[] | LOCALSTORAGEARTICLEDATA[]
	}>()
	const detail = (item:ARTICLEDATA) => {
		uni.navigateTo({
			url:`/pages/articleDetail/articleDetail?cid=${item.classid}&id=${item.id}`
		})
	}
	onReady(() => {
		console.log("组件加载成功")
	})
</script>

<style lang="less">
	.wrap {
		margin-top: 120rpx;
		padding: 0 30rpx;
		height: 200rpx;
		display: flex;

		.pic {
			display: flex;
			align-items: center;
			width: 400rpx;
			height: 100%;

			image {
				width: 100%;
			}
		}

		.out {
			padding: 20rpx;
			.title {
				letter-spacing: 0;
				overflow: hidden;
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-line-clamp: 2;
				/*要显示的行数*/
				-webkit-box-orient: vertical;
				font-size: 40rpx;
				margin-bottom: 10rpx;
			}

			.msg {
				font-size: 25rpx;
					
				.author {
					margin-right: 20rpx;
				}
			}
		}
	}
</style>