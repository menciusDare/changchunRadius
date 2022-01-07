// download url
export default function downloadFile(response) {
// debugger;
    console.log("下载文件",response)
    // let blob = new Blob([res.data],{type: "application/vnd.ms-excel"});
    // let  objectUrl = URL.createObjectURL(blob);
    //
    // window.location.href = objectUrl;

    //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
    // var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
    var blob = new Blob([response.data], { type: 'application/x-msdownload' });
    // var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    var downloadElement = document.createElement('a');
    var href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    var myDate= new Date();
    var year=myDate.getFullYear();    // 获取完整的年份(4位,1970-????)
    var month =myDate.getMonth()+1; 
    month=month<10? '0'+month:month;     // 获取当前月份(0-11,0代表1月)
    var date=myDate.getDate();   
    date=date<10? '0'+date:date;     // 获取当前日(1-31)
    var hours=myDate.getHours();
    hours=hours<10? '0'+hours:hours;        // 获取当前小时数(0-23)
    var minute=myDate.getMinutes();
    minute=minute<10? '0'+minute:minute;        // 获取当前小时数(0-23)
    // 获取当前分钟数(0-59)
    var seconds=myDate.getSeconds();  
    seconds=seconds<10? '0'+seconds:seconds;  
    var time=year+'-' + month +'-' + date+' '+ hours+ ':' +minute+ ':' +seconds;
    downloadElement.download = time+'.xls'; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放掉blob对象
};
