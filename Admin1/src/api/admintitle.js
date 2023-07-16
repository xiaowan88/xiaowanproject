function messg() {
    return JSON.parse(localStorage.getItem('message')) || [];
}

Mock.mock("/mock/lbt", "post", function (res) {
    let mess = messg();
    if (mess.length > 0) {
        return false;
    }
    let res1 = JSON.parse(res.body);
    mess.push({
        id: mess.length ? mess[mess.length - 1].id + 1 : 1,
        title: res1.title,
        http: res1.http
    })
    localStorage.setItem('message', JSON.stringify(mess));
})

// 渲染页面
Mock.mock("/mock/hq", "post", function () {
    return JSON.parse(localStorage.getItem('message'));
})


// 删除
Mock.mock("/mock/del", "post", function (res) {
    let message = JSON.parse(localStorage.getItem('message'));
    for (let i = 0; i < message.length; i++) {
        if (message[i].id == res.body) {
            if (confirm('您确定要删除这条数据吗？')) {
                message.splice(i, 1);
                localStorage.setItem('message', JSON.stringify(message))
            }
        }
    }
})



// 修改
Mock.mock("/api/upda", "post", function (id) {
    let id1 = JSON.parse(id.body).id;
    let arr = [];
    let flag = false;
    for (let i = 0; i < messg().length; i++) {
        if (messg()[i].id == id1) {
            arr = messg()[i];
            flag = true;
            break;
        }
    }
    return arr;
})


Mock.mock("/mock/upd", "post", function (obj) {
    let bd = messg();
    let obja = JSON.parse(obj.body);
    let index;
    let flag = false;
    let garr = [];
    for (let i = 0; i < bd.length; i++) {
        if (bd[i].id == parseInt(obja.uid)) {
            index = i;
            garr.push({
                id: obja.uid,
                title: obja.title,
                http: obja.http
            })
            flag = true;
            break;
        }
    }
    bd[index] = garr[0];
    localStorage.setItem('message', JSON.stringify(bd));
    return true;
})