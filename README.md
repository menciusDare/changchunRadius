# vue-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
#Table组件
 1.dataName: []
    type: []
    detail: [
        {
            prop: '字段名称',
            label: '表头名称',
            width: '表格宽度- 可以传--px, 也可以传 auto',
            isCenter: '文字是否剧中 type: true false 默认为false',
            type: '
                内容的类型
                {
                    normal: '正常的文字类型'，
                    index: '为索引类型',
                    prence: '百分比类型',
                    rate: '带向上向下箭头的类型',
                    button: '按钮类型'
                }
            ',
            buttonList: 'button列表  [{name: '按钮名称', id: '按钮是什么按钮'}]'  
        }
    ]
 2. data : []  
 3. changeButton 表格按钮的方法
 
 


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
