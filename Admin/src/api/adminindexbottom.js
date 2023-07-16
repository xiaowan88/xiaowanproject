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
    let goodsarr = JSON.parse(localStorage.getItem('messagebottom')) || [];
    return goodsarr;
}


// 渲染页面
Mock.mock("/api/xr", "get", function () {
    let goodsarr = JSON.parse(localStorage.getItem('messagebottom')) || [];
    if (goodsarr == null || goodsarr == [] || goodsarr == '[]' || goodsarr == undefined) {
        return false;
    }
    return goodsarr;
})


// 数据的添加
Mock.mock("/api/add", "post", function (obj) {
    let lo = loc();
    let obja = JSON.parse(obj.body);
    lo.push({
        id: lo.length ? lo[lo.length - 1].id + 1 : 1,
        pic: obja.pic,
        name: obja.name,
        bf: obja.bf,
        time: new Date().toLocaleDateString()
    })
    localStorage.setItem('messagebottom', JSON.stringify(lo));
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
                pic: obja.pic,
                name: obja.name,
                bf: obja.bf,
                time: new Date().toLocaleDateString()
            })
            flag = true;
            break;
        }
    }
    bd[index] = garr[0];
    localStorage.setItem('messagebottom', JSON.stringify(bd));
    return true;
})


// 删除
Mock.mock("/api/del", "post", function (id) {
    let aid = JSON.parse(id.body)
    let bd = loc();
    for (let i = 0; i < bd.length; i++) {
        if (bd[i].id == aid) {
            if (confirm('您确定要删除这条数据吗？')) {
                bd.splice(i, 1);
                localStorage.setItem('messagebottom', JSON.stringify(bd))
            }
        }
    }
})