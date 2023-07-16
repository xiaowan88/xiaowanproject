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
    let goodsarr = JSON.parse(localStorage.getItem('allgoodsplace')) || [];
    return goodsarr;
}

// 获取商品分类的本地存储
function locaclass() {
    return JSON.parse(localStorage.getItem('allgoodsclass'))
}

// 渲染下拉框
/* Mock.mock("/api/sel", "get", function () {
    return JSON.parse(localStorage.getItem('allgoodsclass'))
}) */



// 渲染页面
Mock.mock("/api/xr", "get", function () {
    let goodsarr = JSON.parse(localStorage.getItem('allgoodsplace')) || [];
    if (goodsarr.length == 0) {
        return true;
    } else if (goodsarr.length >= 1) {
        return goodsarr;
    }

})


// 数据的添加
Mock.mock("/api/add", "post", function (obj) {
    localStorage.setItem('allgoodsplace', obj.body);
    return true;
})



// 编辑
Mock.mock("/api/upda", "post", function (id) {
    let arr = [];
    let flag = false;
    for (let i = 0; i < loc().length; i++) {
        if (loc()[i].id == parseInt(id.body)) {
            arr = loc()[i];
            flag = true;
            break;
        }
    }
    return arr;
})


Mock.mock("/api/upd", "post", function (obj) {
    let bd = loc();
    let obja = JSON.parse(obj.body);
    let index;
    let flag = false;
    let garr = [];
    for (let i = 0; i < bd.length; i++) {
        if (bd[i].id == parseInt(obja.id)) {
            index = i;
            garr.push({
                id: obja.id,
                place: obja.place,
                classid: obja.classid
            })
            flag = true;
            break;
        }
    }
    bd[index] = garr[0];
    localStorage.setItem('allgoodsplace', JSON.stringify(bd));
    return true;
})


// 修改按钮
Mock.mock("/api/upd1", "post", function (id) {
    let bd = loc();
    let arr2;
    let id2 = JSON.parse(id.body)
    for (let i = 0; i < bd.length; i++) {
        if (bd[i].id == parseInt(id2)) {
            arr2 = bd[i];
            break;
        }
    }
    return arr2;
})

Mock.mock("/api/upd2", "post", function (id) {
    let bd = loc();
    let obja = JSON.parse(id.body);
    let index;
    let flag = false;
    let garr = [];
    for (let i = 0; i < bd.length; i++) {
        if (bd[i].id == parseInt(obja.id)) {
            index = i;
            garr.push({
                id: obja.id,
                place: obja.place,
                classid: obja.classid
            })
            flag = true;
            break;
        }
    }
    bd[index] = garr[0];
    localStorage.setItem('allgoodsplace', JSON.stringify(bd));
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
                localStorage.setItem('allgoodsplace', JSON.stringify(bd))
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
    localStorage.setItem('allgoodsplace', JSON.stringify(bd));
})