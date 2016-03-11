1. 每个人的代码要加上详细的注释，方便阅读，在自己写的代码段前属上自己的姓名和开发日期

2. 远程git仓库有两条分支，master和dev，master用于发布页面时用，dev用于开发时，大家开发的时候请提交到dev上合并，不要对master进行操作。开发时每个人自己开一条属于自己的分支，在自己的分支上开发，开发完后合并到dev上，然后删除自己的分支，对dev进行远程提交
刚开始第一次的git clone只会把master分支给clone出来，需要自己操作把dev分支同步到本地


3. 为了规范css命名和js命名 
	header的同学在header下面的class或者id的开头中加h
	main开头加m
	footer开头加f
	remind开头加r
	例如
	<div class="header">
		<div class = "h-xxx"></div>
	</div>
	在写sass和js的变量的时候也加上开头避免重复造成冲突。

4. myAnimate.js是一个我写的并不是很完善的js动画插件，想用可以用一下，里面有介绍怎么用

5. 切图的时候使用切一张1倍图和一张2倍图，使用background-image:image-set来设置背景图片