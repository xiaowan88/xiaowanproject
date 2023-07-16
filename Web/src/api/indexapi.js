// 获取商品数据
Mock.mock("/api/goods", "get", function () {
    let mess = JSON.parse(localStorage.getItem('messagegoods'));
    if (mess == null || mess == undefined || mess == [] || mess == '[]') {
        return false;
    }
    return mess;
})

function re() {
    let trolley1 = JSON.parse(localStorage.getItem('trolley')) || [];
    return trolley1;
}


// 获取本地用户
function use() {
    let us = JSON.parse(localStorage.getItem('user'));
    if (us == null) {
        return '欢迎访问户外运动专卖商城！';
    }
    return us[0].user;
}



// 头部轮播图等
Mock.mock("/mock/header", "get", function () {
    let message = JSON.parse(localStorage.getItem('message'));
    if (message === null) {
        return false;
    }
    return message;
})
Mock.mock("/mock/pic", "get", function () {
    let message = JSON.parse(localStorage.getItem('messagepic'));
    if (message === null) {
        return false;
    }
    return message;
})


// 中部
Mock.mock("/mock/center", "get", function () {
    let message = JSON.parse(localStorage.getItem('messagecenter'));
    if (message === null) {
        return false;
    }
    return message;
})



// 下部
Mock.mock("/mock/bottom", "get", function () {
    let message = JSON.parse(localStorage.getItem('messagebottom'));
    if (message === null) {
        return false;
    }
    return message;
})


// 雪碧图
Mock.mock("/mock/jlt", "get", function () {
    let message = JSON.parse(localStorage.getItem('messagejlt'));
    if (message === null) {
        return false;
    }
    return message;
})