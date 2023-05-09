export type ARTICLEDETAILDATA = { // => 文章内容
		id : string,
		title : string,
		picurl : string,
		posttime : string,
		classid : string,
		author : string,
		hits : string,
		content : string
	}
export type LOCALSTORAGEARTICLEDATA = { // => 存在localStorage中的文章信息
		id : string ,
		classid : string ,
		picurl : string ,
		title : string ,
		looktime : string
	}
	export type NAVSDATA = {
		id : number,
		classname : string
	}
	export type ARTICLEDATA = {
		author : string,
		classid : string,
		hits : string,
		id : string,
		picurl : string,
		posttime : string,
		title : string,
	}