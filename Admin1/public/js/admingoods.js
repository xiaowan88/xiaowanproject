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
// let myModal2 = new bootstrap.Modal(document.querySelector('#exampleModal2'));

// 渲染页面下拉框
axios.get("/mock/sel").then(res => {
    let sel = document.querySelectorAll('#classid');
    for (let i = 0; i < sel.length; i++) {
        sel[i].innerHTML = res.data.map(item => `
        <option value="${item.classid}">${item.title}</option>
        `).join('');
    }
}).catch(err => {
    console.log('err', err);
})
axios.get("/mock/sel1").then(res => {
    let sel = document.querySelectorAll('#placeid');
    for (let i = 0; i < sel.length; i++) {
        sel[i].innerHTML = res.data.map(item => `
        <option value="${item.placeid}">${item.title}</option>
        `).join('');
    }
}).catch(err => {
    console.log('err', err);
})

// 图片显示
document.querySelector('#form_pic').addEventListener('change', function () {
    let img = document.querySelector('#form_pic').files[0].name;
    document.querySelector('.img').style.display = 'block';
    document.querySelector('.img').innerHTML = `<img src="../../public/images/${img}">`;
})

// 添加数据
add.onclick = function () {
    let form = document.querySelector('.form-add');
    let data = serialize(form, { hash: true, empty: true });
    let images = document.querySelector('#form_pic').files[0].name;
    let classid = document.querySelector('#classid').value;
    let placeid = document.querySelector('#placeid').value;
    data.images = images;
    data.classid = classid;
    data.placeid = placeid;
    axios.post("/mock/lbt", data).then(res => {
        form.reset();
        document.querySelector('.img').innerHTML = '';
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
        pageSize: 5,
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
                title: "商品名称",
                align: 'center'
            },
            {
                field: "price",
                title: "价格",
                align: 'center'

            },
            {
                field: "classid",
                title: "商品分类",
                align: 'center',
                formatter: function (value, row, index) {
                    return [`
                    ${render1(row.classid)}
                `]
                }
            },
            {
                field: "placeid",
                title: "商品产地",
                align: 'center',
                formatter: function (value, row, index) {
                    return [`
                    ${render2(row.placeid)}
                `]
                }
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


// 渲染分类和产地
function render1(res) {
    let loca1 = loca();
    for (let i = 0; i < loca1.length; i++) {
        if (loca1[i].classid == res) {
            return loca1[i].title;
        }
    }
}

function render2(res) {
    let lo = loca1();
    for (let i = 0; i < lo.length; i++) {
        if (lo[i].placeid == res) {
            return lo[i].title;
        }
    }
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
    let classid = document.querySelectorAll('#classid')[1].value;
    let placeid = document.querySelectorAll('#placeid')[1].value;
    data.images = images1 ? images1.name : pic;
    data.classid = classid;
    data.placeid = placeid;
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


