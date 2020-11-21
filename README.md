# 换书吧

换书吧项目文档

- 各项文档内容在开发过程中完善

## 1、template模板约定

```txt
所有的template模板放置目录：book下的template/下自建一个与模板同名的文件夹
```

## 2、测试接口

```js
wx.request({
      url: 'https://konggu.gxu.edu.cn/api/article/list',
      method: 'get',
      data: {
          node_id: 560,
      },
      header: {
          'content-type': 'application/json' // 默认值
      },
      success: function(res) {
          wx_this.setData({
              book: res.data.data.list,
          })
          console.log(wx_this.data.book)
      }
    })
url:固定的，这个是空谷获取文章列表的接口
method:固定get
data:传入一个node_id(数字)固定的，数字随机2-500
header:照抄
success回调函数:通过setData可以给data中的某个属性赋值，比如这是给book数组赋值
console.log(wx_this.data.book)打印返回值在console中查看见下图
```

![img](README.assets/0K8SD0AFFPEM2]FTTWUDQ.png)





