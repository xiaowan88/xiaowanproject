// 强制登录
let cookie = document.cookie;
let cookiearr = cookie.split(';');
let fl = false;
for (let i = 0; i < cookiearr.length; i++) {
    let trim = cookiearr[i].trim();
    let user = 'user=';
    if (trim.startsWith(user)) {
        fl = true;
        break;
    }
}
if (fl == false) {
    location.href = '/Admin1/src/views/admin.html';
}

document.querySelector('#act').style.color = '#0075ff';


// 实例化模态框
let myModal = new bootstrap.Modal(document.querySelector('#exampleModal'));
let myModal1 = new bootstrap.Modal(document.querySelector('#exampleModal1'));


add.onclick = function () {
    let form = document.querySelector('.form-add');
    let data = serialize(form, { hash: true, empty: true });
    axios.post("/mock/lbt", data).then(res => {
        form.reset();
        myModal.toggle();
        reLoad2();
    }).catch(err => {
        console.log('err', err);
    })
}



function reLoad2() {
    //var pageNumber = $("#dataTable").bootstrapTable("getOptions").pageNumber; // 获取当前页码
    $("table").bootstrapTable('refreshOptions', { pageNumber: 1 }); // pageNumber:1, 指定页码
}
// 渲染页面
render();
function render() {
    $("#table").bootstrapTable({
        url: "/mock/hq",
        method: "post",
        dataType: "json",
        toolbar: "#serverToolbar",
        pagination: true,
        pageNumber: 1,
        // pageList: [8],
        search: true,
        uniqueId: "id",
        columns: [
            {
                field: "checked",
                checkbox: true,
                align: 'center',
                /* formatter: function (value, row, index) {
                    return [`
                    <input type="checkbox" value="${row.id}">
                    `]
                } */
            },
            {
                field: "title",
                title: "商品标题",
                align: 'center'

            },
            {
                field: "id",
                title: "操作",
                align: 'center',
                formatter: function (value, row, index) {
                    return [`
                <button onclick='update(${row.id})' type="button" class="btn btn-secondary">修改</button>
                <button onclick='del(${row.id})' type="button" class="btn btn-danger">删除</button>
                `]
                }
            }
        ]
    })
}
// 删除
function del(res) {
    axios.post("/mock/del", res).then(res => {
        reLoad2();
    }).catch(err => {
        console.log('err', err);
    })
}


// 修改
function update(res) {
    myModal1.toggle();
    let obj = {
        id: res
    }
    $.ajax({
        type: "post",
        url: "/api/upda",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (res) {
            let keys = Object.keys(res);
            keys.forEach(key => {
                if (key === 'images') {
                    document.querySelector('.updateimg').innerHTML = `<img src="/Admin1/public/images/${res[key]}" />`;
                } else {
                    document.querySelector(`.form-update #${key}`).value = res[key];
                }
            })
        }
    })
}


updata.onclick = function () {
    let form = document.querySelector('.form-update');
    let data = serialize(form, { hash: true, empty: true });
    axios.post("/mock/upd", data).then(res => {
        myModal1.toggle();
        reLoad2();
    }).catch(err => {
        console.log('err', err);
    })

}



// 批量删除
up.onclick = function () {
    let chll = document.querySelectorAll('[name=btSelectItem]:checked');
    if (chll.length == 0) {
        // myModal2.hide();
        alert('请选择要删除的数据!');
        return;
    }
    let idd = [];
    for (let i = 0; i < chll.length; i++) {
        if (chll[i].checked == true) {
            // console.log(chll[i].parentNode.parentNode.parentNode.dataset.uniqueid);
            idd.push(chll[i].parentNode.parentNode.parentNode.dataset.uniqueid);
        }
    }
    $.ajax({
        type: "post",
        url: "/api/del1",
        data: JSON.stringify(idd),
        dataType: "json",
        success: function (res) {
            reLoad2();
        }
    })
}


// 修改按钮

upp.onclick = function () {
    let chll = document.querySelectorAll('[name=btSelectItem]:checked');
    if (chll.length == 0) {
        myModal1.hide();
        alert('请选择要修改的数据!');
        return;
    }
    if (chll.length > 1) {
        myModal1.hide();
        alert('修改的数据大于一条，请重新选择！');
        return;
    }
    let idd;
    for (let i = 0; i < chll.length; i++) {
        if (chll[i].checked == true) {
            idd = chll[i].parentNode.parentNode.parentNode.dataset.uniqueid;
        }
    }
    let obj = {
        id: idd
    };
    $.ajax({
        type: "post",
        url: "/api/upda",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (res) {
            let keys = Object.keys(res);
            keys.forEach(key => {
                if (key === 'images') {
                    document.querySelector('.updateimg').innerHTML = `<img src="/Admin1/public/images/${res[key]}" />`;
                } else {
                    document.querySelector(`.form-update #${key}`).value = res[key];
                }
            })
        }
    })
}


