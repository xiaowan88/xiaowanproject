function re() {
    let trolley1 = JSON.parse(localStorage.getItem('trolley')) || [];
    return trolley1;
}

// 获取商品的数据
Mock.mock("/api/goods", "get", function () {
    let mess = JSON.parse(localStorage.getItem('messagegoods'))
    if (mess == null || mess == undefined || mess == [] || mess == '[]') {
        return false;
    }
    return mess;
})




// 购物车
Mock.mock("/mock/tro", "post", function (res) {
    let mes = JSON.parse(localStorage.getItem('messagegoods')) || [];
    let trolley1 = JSON.parse(localStorage.getItem('trolley')) || [];
    for (let i = 0; i < trolley1.length; i++) {
        if (JSON.parse(res.body).id == trolley1[i].id) {
            return false;
        }
    }
    for (let i = 0; i < mes.length; i++) {
        if (mes[i].id == JSON.parse(res.body).id) {
            trolley1.push(mes[i]);
            localStorage.setItem('trolley', JSON.stringify(trolley1));
            return true;
        }
    }
})


// 分类表格映射
Mock.mock("/mock/tab", "get", function () {
    let allgoodsclass = JSON.parse(localStorage.getItem('allgoodsclass'))
    if (allgoodsclass == null || allgoodsclass == undefined || allgoodsclass == [] || allgoodsclass == '[]') {
        return false;
    }
    return allgoodsclass;
})

// 产地表格映射
Mock.mock("/mock/tab1", "get", function () {
    let allgoodsclass = JSON.parse(localStorage.getItem('allgoodsplace'))
    if (allgoodsclass == null || allgoodsclass == undefined || allgoodsclass == [] || allgoodsclass == '[]') {
        return false;
    }
    return allgoodsclass;
})


// 筛选
Mock.mock("/mock/fliter", "get", function () {
    return JSON.parse(localStorage.getItem('messagegoods'))
})


// 搜索
Mock.mock("/mock/search1", "post", function (res) {
    let goods = JSON.parse(localStorage.getItem('messagegoods'));
    let flag = false;
    let arr = [];
    for (let i = 0; i < goods.length; i++) {
        if (goods[i].name == JSON.parse(res.body).content) {
            arr.push(goods[i]);
            flag = true;
            break;
        }
    }
    if (flag === true) {
        return arr;
    }
    return false;
})