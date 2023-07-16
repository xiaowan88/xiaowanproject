// if (!localStorage.getItem('sql')) {
//     alert('请先登录之后在操作！');
//     location.href = '../../src/views/admin.html';
// }
let lis = document.querySelectorAll('.left ul li');
let as = document.querySelectorAll('.one');
lis[0].addEventListener('click', function () {
    as[0].style.display = 'block';
    as[1].style.display = 'none';
    as[2].style.display = 'none';
})
lis[1].addEventListener('click', function () {
    as[0].style.display = 'none';
    as[1].style.display = 'block';
    as[2].style.display = 'none';
})
lis[2].addEventListener('click', function () {
    as[0].style.display = 'none';
    as[1].style.display = 'none';
    as[2].style.display = 'block';
})


let alist = document.querySelectorAll('.left li .one a');
for (let i = 0; i < alist.length; i++) {
    alist[i].addEventListener('mouseenter', function () {
        this.style.color = '#70abff';
        this.style.backgroundColor = '#e6f7ff';
        this.style.borderRight = '3px solid #379cfb';
    });
    alist[i].addEventListener('mouseleave', function () {
        this.style.color = 'black';
        this.style.backgroundColor = '#ffffff';
        this.style.borderRight = 0;
    });
}


// 获取本地欢迎登录用户名
document.querySelector('.header h4').innerHTML = `<i class="iconfont icon-yonghu"></i>${admin()}`;



// 新增按钮
let form = document.querySelectorAll('form');
let mod = document.querySelector('.mod');
let btn1 = document.querySelector('.btn1');
btn1.addEventListener('click', function () {
    mod.style.top = '0';
})

document.querySelector('#xh').addEventListener('change', () => {
    let xh = document.querySelector('#xh').files[0].name;
    document.querySelector('.pp').innerHTML = `<img src="../../public/images/${xh}">`;
})

form[0].addEventListener('submit', function (e) {
    e.preventDefault();
    let lo = loc();
    let xh = document.querySelector('#xh').files[0].name;
    let username = document.querySelector('#username').value;
    let clp = document.querySelector('#clp').value;
    let content = document.querySelector('#content').value;
    let type = document.querySelector('#classp').value;
    lo.push({
        id: lo.length ? lo[lo.length - 1].id + 1 : 1,
        pic: xh,
        name: username,
        clp,
        content,
        type,
        time: new Date().toLocaleDateString()
    })

    $.ajax({
        type: "post",
        url: "/api/add",
        data: JSON.stringify(lo),
        dataType: "json",
        success: function (res) {
            if (res) {
                form[0].reset();
                document.querySelector('.pp').innerHTML = '';
                mod.style.top = '-800px';
                render();
            }
        }
    })
})



// 取消按钮
let btn6 = document.querySelectorAll('.btn6');
let sc = document.querySelector('.shanchu');
for (let i = 0; i < btn6.length; i++) {
    btn6[i].onclick = function () {
        mod.style.top = '-800px';
    }
}
sc.onclick = function () {
    mod.style.top = '-800px';
}



// 渲染页面
let tbody = document.querySelector('tbody');
function render() {
    $.ajax({
        type: "get",
        url: "/api/xr",
        data: null,
        dataType: "json",
        success: function (res) {
            if (res == true) {
                tbody.innerHTML = `
                <tr>
                    <td colspan='8'>暂无数据</td>
                </tr>
                `;
            } else {
                tbody.innerHTML = res.map(function (item) {
                    return `
                        <tr>
                            <td><input type="checkbox" value="${item.id}" class='ch'></td>
                            <td><img src="../../public/images/${item.pic}"></td>
                            <td>${item.name}</td>
                            <td>${item.clp}</td>
                            <td>${item.type}</td>
                            <td>${item.content}</td>
                            <td>${item.time}</td>
                            <td><span onclick='del(\"${item.id}\")'>删除</span></td>
                        </tr>
                        `;
                }).join('');
                qxan();
            }
        }
    })

}
render();


// 查询全选
function cxqxan() {
    let chall = document.querySelector('.chall');
    let chs1 = document.querySelectorAll('.ch1');
    chall.addEventListener('click', function () {
        for (let i = 0; i < chs1.length; i++) {
            chs1[i].checked = chall.checked;
        }
    })
    for (let i = 0; i < chs1.length; i++) {
        chs1[i].addEventListener('click', function () {
            chall.checked = document.querySelectorAll('.ch1:checked').length === chs1.length;
        })
    }
}



// 查询
let inquire = document.querySelector('[name=search]');
let btn5 = inquire.nextElementSibling;
btn5.addEventListener('click', function () {
    if (inquire.value === '') {
        alert('输入不能为空');
        return;
    }
    let trim = inquire.value.trim();
    let objj = {
        na: trim
    }
    $.ajax({
        type: "post",
        url: "/api/iqe",
        data: JSON.stringify(objj),
        dataType: "json",
        success: function (res) {
            tbody.innerHTML = res.map(function (item) {
                return `
                <tr>
                    <td><input type="checkbox" value="${item.id}" class='ch'></td>
                    <td><img src="../../public/images/${item.pic}"></td>
                    <td>${item.name}</td>
                    <td>￥${item.price}</td>
                    <td>${cla(item.classid)}</td>
                    <td>${item.place}</td>
                    <td><span onclick='update(\"${item.id}\")'>编辑</span><span onclick='del(\"${item.id}\")'>删除</span></td>
                </tr>
                `;
            }).join('');
        }
    })
    cxqxan();
})



// 删除
function del(userid) {
    $.ajax({
        type: "post",
        url: "/api/del",
        data: userid,
        dataType: "json",
        success: function (res) {
            render();
        }
    })

}

// 批量删除
let btn3 = document.querySelector('.btn3');
function plsc() {
    btn3.onclick = function () {
        let chss = document.querySelectorAll('.ch:checked').length;
        if (chss === 0) {
            alert('请选择要删除的数据!');
            return;
        }
        let chs = document.querySelectorAll('.ch');
        let chall = document.querySelector('.chall');
        let id1 = [];
        for (let i = 0; i < chs.length; i++) {
            if (chs[i].checked === true) {
                id1.push(chs[i].value);
            }
        }
        $.ajax({
            type: "post",
            url: "/api/del1",
            data: JSON.stringify(id1),
            dataType: "json",
            success: function (res) {
                chall.checked = false;
                render();
            }
        })
    }
}
plsc();

// 全选按钮
function qxan() {
    let chall = document.querySelector('.chall');
    let chs = document.querySelectorAll('.ch');
    chall.addEventListener('click', function () {
        for (let i = 0; i < chs.length; i++) {
            chs[i].checked = chall.checked;
        }
    })
    for (let i = 0; i < chs.length; i++) {
        chs[i].addEventListener('click', function () {
            chall.checked = document.querySelectorAll('.ch:checked').length === chs.length;
        })
    }
}




