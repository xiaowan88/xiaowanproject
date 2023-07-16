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
    let form = document.querySelectorAll('form')[0];
    let data = serialize(form, { hash: true, empty: true });
    let images = document.querySelector('#form_pic').files[0].name;
    data.images = images;
    axios.post("/mock/lbt", data).then(res => {
        if (res.data == false) {
            alert('只能添加一条数据，请删除后添加！');
            return;
        }
        form.reset();
        reLoad2();
        myModal.toggle();
    }).catch(err => {
        console.log('err', err);
    })

}

// 页面刷新
function reLoad2() {
    //var pageNumber = $("#dataTable").bootstrapTable("getOptions").pageNumber; // 获取当前页码
    $("table").bootstrapTable('refreshOptions', { pageNumber: 1 }); // pageNumber:1, 指定页码
}

// 渲染页面
$("#table").bootstrapTable({
    url: "/mock/hq",
    method: "post",
    dataType: "json",
    toolbar: "#serverToolbar",
    pagination: true,
    pageNumber: 1,
    // pageList: [8],
    // search: true,
    uniqueId: "id",
    columns: [
        /* {
            field: "id",
            checkbox: '<input type="checkbox">',
 
        }, */
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
            field: "title",
            title: "商品标题",
            align: 'center'

        },
        {
            field: "brief",
            title: "简介1",
            align: 'center'

        },
        {
            field: "brief1",
            title: "简介2",
            align: 'center'
        },
        {
            field: "http",
            title: "商城网址",
            align: 'center'
        },
        {
            field: "id",
            title: "操作",
            align: 'center',
            formatter: function (value, row, index) {
                return [`
                <button onclick='update(${row.id})' class="bu colo">修改</button>
                <button onclick='del(${row.id})' class="bu">删除</button>
                `]
            }
        }
    ]
})

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
            document.querySelector('.updateimg').innerHTML = `<img src="/Admin1/public/images/${res.images}" />`;
            document.querySelector('.uid').value = res.id;
            document.querySelector('#brief11').value = res.brief;
            document.querySelector('#brief2').value = res.brief1;
            document.querySelector('#lbttitle').value = res.title;
            document.querySelector('#lbthttp').value = res.http;
        }
    })
}

document.querySelector('#form_pic2').addEventListener('change', function () {
    let img = document.querySelector('#form_pic2').files[0].name;
    document.querySelector('.updateimg').innerHTML = `<img src="../../public/images/${img}">`;
})


updata.onclick = function () {
    let form = document.querySelectorAll('form')[1];
    let data = serialize(form, { hash: true, empty: true });
    let images1 = document.querySelector('#form_pic2').files[0];
    data.images = images1 ? images1.name : pic;
    axios.post("/mock/upd", data).then(res => {
        myModal1.toggle();
        reLoad2();
    }).catch(err => {
        console.log('err', err);
    })

}
