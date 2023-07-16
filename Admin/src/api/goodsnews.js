// 获取本地存储用户名用来渲染页面的登录用户
function admin() {
    let usarr = JSON.parse(localStorage.getItem('user')) || [];
    for (let i = 0; i < usarr.length; i++) {
        let ad = usarr[i].user;
        return ad;
    }

}

// 获取本地存储数据
function loc() {
    let goodsarr = JSON.parse(localStorage.getItem('goodsnews')) || [];
    return goodsarr;
}



// 渲染页面
Mock.mock("/api/xr", "get", function () {
    let goodsarr = JSON.parse(localStorage.getItem('goodsnews')) || [];
    if (goodsarr.length == 0) {
        return true;
    } else if (goodsarr.length >= 1) {
        return goodsarr;
    }

})


// 数据的添加
Mock.mock("/api/add", "post", function (obj) {
    localStorage.setItem('goodsnews', obj.body);
    return true;
})



// 查询
Mock.mock("/api/iqe", "post", function (id) {
    let aid = JSON.parse(id.body)
    let bd = loc();
    let cxarr = [];
    for (let i = 0; i < bd.length; i++) {
        if (bd[i].name == aid.na) {
            cxarr.push(bd[i]);
        }
    }
    return cxarr;
})


// 删除
Mock.mock("/api/del", "post", function (id) {
    let aid = JSON.parse(id.body)
    let bd = loc();
    for (let i = 0; i < bd.length; i++) {
        if (bd[i].id == aid) {
            if (confirm('您确定要删除这条数据吗？')) {
                bd.splice(i, 1);
                localStorage.setItem('goodsnews', JSON.stringify(bd))
            }
        }
    }
})


// 批量删除
Mock.mock("/api/del1", "post", function (id) {
    let aid = JSON.parse(id.body);
    let bd = loc();
    for (let i = 0; i < aid.length; i++) {
        for (let j = 0; j < bd.length; j++) {
            if (bd[j].id == parseInt(aid[i])) {
                bd.splice(j, 1);
            }
        }
    }
    localStorage.setItem('goodsnews', JSON.stringify(bd));
})