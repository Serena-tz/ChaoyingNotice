结合ajax+vue的乞丐版完成首页、搜索页、我的页面的开发

1、首页
    有4个板块，每个板块对应一个json文件
    index-slide.json  ---对应轮播图
    index-hot.json    ---对应热门超英
    index-yugao.json  ---对应热门预告
    index-guss-u-like.json --对应猜你喜欢

2、搜索页
    有一个json，对应search.json

3、我的
    无数据文件

提示：
    1.不需要切图，电影图片全部来自于外链图片
    2.对应的图标使用图标字体
    3.先将json通过ajax加载进来，并且赋值给vue的data属性再去通过vue的指令来遍历生成结构。
    4.滚动条不需要使用JS，只需要使用css的overflow-x属性即可
    5.如果不太熟悉，可以先用传统方式写，再改为vue的方式