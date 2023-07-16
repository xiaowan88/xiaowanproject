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
    let form = document.querySelector('form');
    let data = serialize(form, { hash: true, empty: true });
    axios.post("/mock/lbt", data).then(res => {
        if (res.data == false) {
            alert('只能添加一条数据，请删除后添加！');
            return;
        }
        render();
        form.reset();
        myModal.toggle();
    }).catch(err => {
        console.log('err', err);
    })

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
        // search: true,
        uniqueId: "id",
        columns: [
            /* {
                field: "id",
                checkbox: '<input type="checkbox">',
 
            }, */
            {
                field: "title",
                title: "商品标题",
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
}
function del(res) {
    axios.post("/mock/del", res).then(res => {
        render();
        // location.reload();
    }).catch(err => {
        console.log('err', err);
    })
}

function update(res) {
    let obj = {
        id: res
    }
    myModal1.toggle();
    $.ajax({
        type: "post",
        url: "/api/upda",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (res) {
            document.querySelector('.uid').value = res.id;
            document.querySelector('#lbttitle').value = res.title;
            document.querySelector('#lbthttp').value = res.http;
        }
    })
}

updata.onclick = function () {
    let form = document.querySelectorAll('form')[1];
    let data = serialize(form, { hash: true, empty: true });
    axios.post("/mock/upd", data).then(res => {
        render();
        // location.reload();
    }).catch(err => {
        console.log('err', err);
    })
    myModal1.toggle();
}
