bootstrap总结
1.1标题
Bootstrap标题样式进行了以下显著的优化重置：
1、重新设置了margin-top和margin-bottom的值， h1~h3重置后的值都是20px；h4~h6重置后的值都是10px。
2、所有标题的行高都是1.1（也就是font-size的1.1倍）,而且文本颜色和字体都继承父元素的颜色和字体。
3、固定不同级别标题字体大小，h1=36px，h2=30px，h3=24px，h4=18px，h5=14px和h6=12px。
副标题：small：font-size: 65%;

1.2段落
//文本
 p>small,p>strong,p>cite,p>em,p.lead 

//强调相关的类
.text-muted：提示，使用浅灰色（#999） 
.text-primary：主要，使用蓝色（#428bca） 
.text-success：成功，使用浅绿色(#3c763d) 
.text-info：通知信息，使用浅蓝色（#31708f） 
.text-warning：警告，使用黄色（#8a6d3b） 
.text-danger：危险，使用褐色（#a94442） 

//文本对齐 
.text-left：左对齐 
.text-center：居中对齐
.text-right：右对齐
.text-justify：两端对齐

1.3列表
//去点列表
ul.list-unstyled
//内联列表
ul.list-inline
//对于定义列表而言，Bootstrap并没有做太多的调整，只是调整了行间距，外边距和字体加粗效果。


1.4代码
<code></code>//单行内联代码
<pre></pre>//多行块代码
<kbd></kbd>//用户输入代码
pre.pre-scrollable//控制代码块区域最大高度为340px，一旦超出这个高度，就会在Y轴出现滚动条

1.5表格
table.table//基础表格
.table-striped//斑马线表格
.table-bordered//带边框的表格
.table-hover//鼠标悬停高亮的表格
.table-condensed//紧凑型表格
.table-responsive//响应式表格

2.1表单
表单主要功能是用来与用户做交流的一个网页控件，良好的表单设计能够让网页与用户更好的沟通。表单中常见的元素主要包括：文本输入框、下拉选择框、单选按钮、复选按钮、文本域和按钮等。其中每个控件所起的作用都各不相同，而且不同的浏览器对表单控件渲染的风格都各有不同。
在Bootstrap框架中要实现水平表单效果，必须满足以下两个条件：
1、在<form>元素是使用类名“form-horizontal”。
2、配合Bootstrap框架的网格系统。（网格布局会在以后的章节中详细讲解）
在<form>元素上使用类名“form-horizontal”主要有以下几个作用：
1、设置表单控件padding和margin值。
2、改变“form-group”的表现形式，类似于网格系统的“row”

//水平表单 
form.form-form-horizontal>div.form-group>label.col-sm-xx>input.form-control > form class="form-horizontal" role="form"> > 
<div class="form-group"> > <label for="inputEmail3" class="col-sm-2 control-label">邮箱</label> > <div class="col-sm-10"> > <input type="email" class="form-control" id="inputEmail3" placeholder="请输入您的邮箱地址">

//内联表单 
form.form-inline>div.form-group>label.col-sm-xx>input.form-control 

//input 
form[role='form']>div.form-group>input[type=''].form-control 

//表单控件(下拉选择框select) 
form[role='form']>div.form-group>select.form-control

 //textarea 
 form[role='form']>div.form-group>textarea.form-control 

 //radio,checkbox,大小,排列 
 form[role='form']>div.checkbox>lable.formcontrol>input[type='checkbox'].form-control lg checkbox-inline

 > input[type=“submit”]
 > input[type=“button”] 
 > input[type=“reset”] 
 > <button> .btn btn-primary,btn-warning,btn-success,btn-danger,btn-info,btn-link,btn-inverse

多标签支持
一般制作按钮除了使用<button>标签元素之外，还可以使用<input type="submit">和<a>标签等。同样，在Bootstrap框架中制作按钮时，除了刚才所说的这些标签元素之外，还可以使用在其他的标签元素上，唯一需要注意的是，要在制作按钮的标签元素上添加类名“btn”。如果不添加是不会有任何按钮效果。
块状按钮
从前面几节的内容中，大家可能发现了，每个示例中的按钮宽度都是依靠按钮文本和padding的值来决定。但有时候在制作按钮的时候需要按钮宽度充满整个父容器（width:100%），特别是在移动端的制作中。那么前面的方法我们都无法很好的实现，除非重新定义按钮的宽度。其实在Bootstrap中并不需要这样做，Bootstrap框架中提供了一个类名“btn-block”。
按钮状态——活动状态
Bootstrap框架针对按钮的状态做了一些特殊处理。在Bootstrap框架中针对按钮的状态效果主要分为两种：活动状态和禁用状态。
Bootstrap按钮的活动状态主要包括按钮的悬浮状态(:hover)，点击状态(:active)和焦点状态（:focus）几种。

2.2图片图标
img.img-responsive//响应式图片，主要针对于响应式设计 
img.img-rounded//圆角图片
img.img-circle//圆形图片
img.img-thumbnail//缩略图片 //在任何内联元素上应用所对应的样式即可： <span class="glyphicon glyphicon-xxx"></span>

3.1网格系统
工作原理:
div.container>div.row>div.col-md-x
Bootstrap框架的网格系统工作原理如下：
1、数据行(.row)必须包含在容器（.container）中，以便为其赋予合适的对齐方式和内距(padding)。如：
<div class="container">
<div class="row"></div>

2、在行(.row)中可以添加列(.column)，但列数之和不能超过平分的总列数，比如12。如：
<div class="container">
<div class="row">
<div class="col-md-4"></div>
<div class="col-md-8"></div>

3、具体内容应当放置在列容器（column）之内，而且只有列（column）才可以作为行容器(.row)的直接子元素

4、通过设置内距（padding）从而创建列与列之间的间距。然后通过为第一列和最后一列设置负值的外距（margin）来抵消内距(padding)的影响
//列偏移 .col-md-offset-x 
//列排序 .col-md-push-x,.col-md-pull-x


4.1菜单按钮及导航
//一般
div.dropdown>button.btn btn-default dropdown-toggle+span.carret+ul.dropdown-menu>li*x
//对齐
ul.pull-right,dropdown-menu-right
//下拉分割线
li.divider
//菜单标题
li.dropdown-header
//菜单状态
li.disabled,li.active

<div class="dropdown"> <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"> 下拉菜单 <span class="caret"></span> </button> <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">下拉菜单项</a></li> … <li role="presentation" class="divider"></li> <li role="presentation"><a role="menuitem" tabindex="-1" href="#">下拉菜单项</a></li>

4.2按钮组
//基本 div.btn-group>btn btn-default ...
//按钮工具栏 div.btn-group>btn btn-default ...>span.glyphicon glyphicon-align-left... 
//嵌套分组（加下拉） ... div.btn-group>button.btn btn-default dropdown-toggle>ul.dropdown-menu>li*x 
//垂直分组 div.btn-group-vertical... 
//等分按钮 div.btn-wrap>div. btn-group btn-group-justified>a.btn btn-defaul...

4.3导航
//基础样式
ul.nav nav-tabs>li>a

//胶囊型导航
ul.nav nav-pills>li>a

//垂直堆叠导航
ul.nav nav-tabs nav-stacked>li>a

//自适应导航
ul.nav nav-tabs nav-justified>li>a

//面包屑导航
ul.breadcrumb>li>a

5.1导航条
使用方法：
第一步：首先在制作导航的列表(<ul class=”nav”>)基础上添加类名“navbar-nav”
第二步：在列表外部添加一个容器（div），并且使用类名“navbar”和“navbar-default”

div.nav navbar-default>ul.nav navbar-nav>li.active>a

<div class="navbar navbar-default" role="navigation">
<ul class="nav navbar-nav">
<li class="active"><a href="##">网站首页</a></li>

//为导航条添加标题
div.navbar-header>a.navbar-brand

//固定式导航条
div.navbar-fixed-top，navbar-fixed-bottom

//反色 div.navbar navbar-inverse

//分页ul.pager,ul.pager>li.previousnextdisabled

//带页码的分页
ul.pagination pagination-lg>li


**5.2响应式**
<!--代码-->
<div class="navbar navbar-default" role="navigation">
<div class="navbar-header">
　<!-- .navbar-toggle样式用于toggle收缩的内容，即nav-collapse collapse样式所在元素 -->
<button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
<span class="sr-only">Toggle Navigation</span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
</button>
<!-- 确保无论是宽屏还是窄屏，navbar-brand都显示 -->
<a href="##" class="navbar-brand">慕课网</a>
</div>
<!-- 屏幕宽度小于768px时，div.navbar-responsive-collapse容器里的内容都会隐藏，显示icon-bar图标，当点击icon-bar图标时，再展开。屏幕大于768px时，默认显示。 -->
<div class="collapse navbar-collapse navbar-responsive-collapse example" id='example'>
<ul class="nav navbar-nav">
<li class="active"><a href="##">网站首页</a></li>
<li><a href="##">系列教程</a></li>
<li><a href="##">名师介绍</a></li>
<li><a href="##">成功案例</a></li>
<li><a href="##">关于我们</a></li>
</ul>
</div>
</div>


**5.3标签徽章**
//标签
span.label label-infodangersuccesslinkwarningdefault
//徽章
span.badge


**6.1其它内置组件**
//1.缩略图div.container>div.row>div.col-xs- col-md->a+div.caption

<div class="container"> <div class="row"> <div class="col-xs-6 col-md-3"> <a href="#" class="thumbnail"> <img src="http://img.mukewang.com/5434eba100014fe906000338.png" style="height: 180px; width: 100%; display: block;" alt="">
<div class="caption"> <h3>Bootstrap框架系列教程</h3> <p>

//2.警示框
div.alert alert-success... alert-dismissable(可关闭)

//进度条
div.progress>div.progress-bar progress-bar-success...
(动态条纹：在进度条“progress progress-striped”两个类的基础上再加入“active”类名)

//媒体对象--默认媒体对象
div.media>a.pull-left>img.media-object; div.meidia-body>h4.media-heading>div

//3.媒体对象列表
ul.meidia-list>li.media

//4.列表组
ul.list-group>li.list-grop-item>span.badge（带徽章）a(带连接)；
ele.list-group-item-heading>ele.list-group-item-text;
ele.list-group>ele.list-group-item active list-group-item-sccuess

//5.面板
div.panel panel-default>div.panel-heading+div.panel-body+div.panel-footer

**7.js插件**
导入jQuery版本库，因为Bootstrap的JavaScript插件依赖于jQuery  <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
 一次性导入所有Bootstrap的JavaScript插件（压缩版本）
<script src="js/bootstrap.min.js"></script>

> 默认情况之下，Bootstrap框架中以下组件使用了过渡动画效果： 
>模态弹出窗（Modal）的滑动和渐变效果； 
> 选项卡（Tab）的渐变效果； 
> 警告框（Alert）的渐变效果； 
> 图片轮播（Carousel）的滑动效果。


 **7.1模态弹出框结构**
div.modal-show>div.modal-dialog>div.modal-content>div.modal-header+div.modal-body+div.modal-footer
<div class="modal show">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal">
<span aria-hidden="true">×</span>
<span class="sr-only">Close</span></button>

