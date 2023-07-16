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


// 图片显示
document.querySelector('#form_pic').addEventListener('change', function () {
    let img = document.querySelector('#form_pic').files[0].name;
    document.querySelector('.img').style.display = 'block';
    document.querySelector('.img').innerHTML = `<img src="../../public/images/${img}">`;
})

add.onclick = function () {
    let form = document.querySelector('.form-add');
    let data = serialize(form, { hash: true, empty: true });
    let images = document.querySelector('#form_pic').files[0].name;
    let sel = document.querySelector('#sel').value;
    let sel1 = document.querySelector('#sel1').value;
    data.images = images;
    data.sel = sel;
    data.sel1 = sel1;
    axios.post("/mock/lbt", data).then(res => {
        document.querySelector('.img').innerHTML = '';
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
                field: "images",
                title: "图片",
                align: 'center',
                formatter: function (value, row, index) {
                    return [`
                <img src="/Admin1/public/images/${row.images}" style="width:70px;"/>
                `]
                }

            },
            {
                field: "name",
                title: "新闻标题",
                align: 'center'

            },
            {
                field: "content",
                title: "新闻内容",
                align: 'center'

            },
            {
                field: "sel",
                title: "新闻类型",
                align: 'center'

            },
            {
                field: "sel1",
                title: "发布人",
                align: 'center'

            },
            {
                field: "time",
                title: "添加时间",
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
let pic = '';
function update(res) {
    myModal1.toggle();
    document.querySelector('.updateimg').style.display = 'block';
    let obj = {
        id: res
    }
    $.ajax({
        type: "post",
        url: "/api/upda",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (res) {
            pic = res.images;
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

document.querySelector('#updata-img').addEventListener('change', function () {
    let img = document.querySelector('#updata-img').files[0].name;
    document.querySelector('.updateimg').innerHTML = `<img src="../../public/images/${img}">`;
})


updata.onclick = function () {
    let form = document.querySelector('.form-update');
    let data = serialize(form, { hash: true, empty: true });
    let images1 = document.querySelector('#updata-img').files[0];
    let sel = document.querySelectorAll('#sel')[1].value;
    let sel1 = document.querySelectorAll('#sel1')[1].value;
    data.images = images1 ? images1.name : pic;
    data.sel = sel;
    data.sel1 = sel1;
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
    document.querySelector('.updateimg').style.display = 'block';
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
            pic = res.images;
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


