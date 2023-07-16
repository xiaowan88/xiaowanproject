// 获取购物车本地存储
function loca(){
    return JSON.parse(localStorage.getItem('trolley'));
}

// 页面映射
Mock.mock("/mock/tro", "get", function () {
    let tro = JSON.parse(localStorage.getItem('trolley'));
    if (tro == null || tro == [] || tro == '[]' || tro == undefined) {
        return false;
    }
    return tro;
})



// 商品的删除
Mock.mock("/api/del", "post", function (id) {
    let aid = JSON.parse(id.body)
    let bd = loca();
    for (let i = 0; i < bd.length; i++) {
        if (bd[i].id == aid) {
            if (confirm('您确定要删除这条数据吗？')) {
                bd.splice(i, 1);
                localStorage.setItem('trolley', JSON.stringify(bd))
            }
        }
    }
})