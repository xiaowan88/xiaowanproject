function messg() {
    return JSON.parse(localStorage.getItem('messagebottom')) || [];
}

// 添加数据
Mock.mock("/mock/lbt", "post", function (res) {
    let mess = messg();
    let res1 = JSON.parse(res.body);
    console.log(res1);
    mess.push({
        id: mess.length ? mess[mess.length - 1].id + 1 : 1,
        images: res1.images,
        title: res1.title,
        brief: res1.brief,
        time: new Date().toLocaleDateString()
    })
    localStorage.setItem('messagebottom', JSON.stringify(mess));
})

// 渲染页面
Mock.mock("/mock/hq", "post", function () {
    return JSON.parse(localStorage.getItem('messagebottom'));
})


// 删除
Mock.mock("/mock/del", "post", function (res) {
    let message = JSON.parse(localStorage.getItem('messagebottom'));
    for (let i = 0; i < message.length; i++) {
        if (message[i].id == res.body) {
            if (confirm('您确定要删除这条数据吗？')) {
                message.splice(i, 1);
                localStorage.setItem('messagebottom', JSON.stringify(message))
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
        if (bd[i].id == parseInt(obja.id)) {
            index = i;
            garr.push({
                id: obja.id,
                images: obja.images,
                title: obja.title,
                brief: obja.brief,
                time: obja.time
            })
            flag = true;
            break;
        }
    }
    bd[index] = garr[0];
    localStorage.setItem('messagebottom', JSON.stringify(bd));
})


// 批量删除
Mock.mock("/api/del1", "post", function (id) {
    let aid = JSON.parse(id.body);
    let bd = messg();
    for (let i = 0; i < aid.length; i++) {
        for (let j = 0; j < bd.length; j++) {
            if (bd[j].id == parseInt(aid[i])) {
                bd.splice(j, 1);
            }
        }
    }
    localStorage.setItem('messagebottom', JSON.stringify(bd));
})