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

// 映射分类
axios.get("/mock/sel")
    .then(res => {
        let sel = document.querySelectorAll('#classp');
        for (let i = 0; i < sel.length; i++) {
            sel[i].innerHTML = res.data.map(item => `
                <option value="${item.classid}">${item.name}</option>
                `
            ).join('');
        }
    })

// 映射产地
axios.get("/mock/selplace")
    .then(res => {
        let selplace = document.querySelectorAll('#place');
        for (let i = 0; i < selplace.length; i++) {
            selplace[i].innerHTML = res.data.map(item => `
                <option value="${item.placeid}">${item.place}</option>
                `
            ).join('');
        }
    })

// 新增按钮
let form = document.querySelectorAll('form');
let mod = document.querySelector('.mod');
let btn1 = document.querySelector('.btn1');
btn1.addEventListener('click', function () {
    mod.style.top = '0';
    document.querySelector('.hh').innerHTML = `新增窗口`;
    form[0].style.display = 'block';
    form[1].style.display = 'none';
    form[2].style.display = 'none';
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
    let con = document.querySelector('#con').value;
    let classid = document.querySelectorAll('#classp')[0].value;
    let placeid = document.querySelectorAll('#place')[0].value;
    lo.push({
        id: lo.length ? lo[lo.length - 1].id + 1 : 1,
        pic: xh,
        name: username,
        price: con,
        classid,
        placeid
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
                    <td colspan='5'>暂无数据</td>
                </tr>
                `;
            } else {
                tbody.innerHTML = res.map(function (item) {
                    return `
                        <tr>
                            <td><input type="checkbox" value="${item.id}" class='ch'></td>
                            <td><img src="../../public/images/${item.pic}"></td>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td>${render1(item.classid)}</td>
                            <td>${render2(item.placeid)}</td>
                            <td><span onclick='update(\"${item.id}\")'>编辑</span><span onclick='del(\"${item.id}\")'>删除</span></td>
                        </tr>
                        `;
                }).join('');
                qxan();
            }
        }
    })

}
render();



// 渲染分类和产地
function render1(res) {
    let loca1 = loca();
    for (let i = 0; i < loca1.length; i++) {
        if (loca1[i].classid == res) {
            return loca1[i].name;
        }
    }
}

function render2(res) {
    let lo = loca1();
    for (let i = 0; i < lo.length; i++) {
        if (lo[i].placeid == res) {
            return lo[i].place;
        }
    }
}

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



// 编辑
let pic = '';
function update(userid) {
    mod.style.top = '0';
    document.querySelector('.hh').innerHTML = `编辑窗口`;
    form[0].style.display = 'none';
    form[1].style.display = 'block';
    form[2].style.display = 'none';
    $.ajax({
        type: "post",
        url: "/api/upda",
        data: userid,
        dataType: "json",
        success: function (res) {
            pic = res.pic;
            document.querySelector('#uid').value = res.id;
            document.querySelector('#username1').value = res.name;
            document.querySelector('#con1').value = res.price;
            document.querySelectorAll('#classp')[1].value = res.classid;
            document.querySelectorAll('#place')[1].value = res.placeid;
            document.querySelector('.pp1').innerHTML = `<img src="../../public/images/${res.pic}">`;
        }
    })
}

document.querySelector('#xh1').addEventListener('change', () => {
    let xh = document.querySelector('#xh1').files[0].name;
    document.querySelector('.pp1').innerHTML = `<img src="../../public/images/${xh}">`;
})

let btn = document.querySelector('.btn8');
btn.onclick = function () {
    let uid = document.querySelector('#uid').value
    let xhvalue = document.querySelector('#xh1').files[0];
    let namevalue = document.querySelector('#username1').value;
    let convalue = document.querySelector('#con1').value;
    let classid = document.querySelectorAll('#classp')[1].value;
    let placeid = document.querySelectorAll('#place')[1].value;
    let obj = {
        id: uid,
        pic: xhvalue ? xhvalue.name : pic,
        name: namevalue,
        price: convalue,
        classid,
        placeid
    }
    $.ajax({
        type: "post",
        url: "/api/upd",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (res) {
            if (res === true) {
                alert('修改成功！');
                mod.style.top = '-800px';
                form[1].reset();
                render();
            }
        }
    })

}


//修改按钮
let pic1 = '';
function xgan() {
    let btn2 = document.querySelector('.btn2');
    btn2.addEventListener('click', function () {
        let chs = document.querySelectorAll('.ch:checked').length;
        if (chs === 0) {
            alert('请选择需要修改的信息！');
            return;
        }
        if (chs > 1) {
            alert('修改的信息数据不能大于两条，请重新选择！');
            return;
        }
        mod.style.top = '0';
        document.querySelector('.hh').innerHTML = `修改窗口`;
        form[0].style.display = 'none';
        form[1].style.display = 'none';
        form[2].style.display = 'block';
        let ch = document.querySelectorAll('.ch');
        let id1;
        for (let i = 0; i < ch.length; i++) {
            if (ch[i].checked === true) {
                id1 = ch[i].value;
            }
        }
        $.ajax({
            type: "post",
            url: "/api/upd1",
            data: JSON.stringify(id1),
            dataType: "json",
            success: function (res) {
                pic1 = res.pic;
                document.querySelector('#uid1').value = res.id;
                document.querySelector('#username2').value = res.name;
                document.querySelector('#con2').value = res.price;
                document.querySelectorAll('#classp')[2].value = res.classid;
                document.querySelectorAll('#place')[2].value = res.placeid;
                document.querySelector('.pp2').innerHTML = `<img src="../../public/images/${res.pic}">`;
            }
        })
    })
    document.querySelector('#xh2').addEventListener('change', () => {
        let xh = document.querySelector('#xh2').files[0].name;
        document.querySelector('.pp2').innerHTML = `<img src="../../public/images/${xh}">`;
    })

    let btn9 = document.querySelector('.btn9');
    btn9.addEventListener('click', function () {
        let uid = document.querySelector('#uid1').value
        let xhvalue = document.querySelector('#xh2').files[0];
        let namevalue = document.querySelector('#username2').value;
        let convalue = document.querySelector('#con2').value;
        let classid = document.querySelectorAll('#classp')[2].value;
        let placeid = document.querySelectorAll('#place')[2].value;
        let chall = document.querySelector('.chall');
        console.log(xhvalue);
        let obj = {
            id: uid,
            pic: xhvalue ? xhvalue.name : pic1,
            name: namevalue,
            price: convalue,
            classid,
            placeid
        }
        $.ajax({
            type: "post",
            url: "/api/upd2",
            data: JSON.stringify(obj),
            dataType: "json",
            success: function (res) {
                if (res === true) {
                    alert('修改成功！');
                    mod.style.top = '-800px';
                    form[2].reset();
                    chall.checked = false;
                    render();
                }
            }
        })

    })
}
xgan();



// 查询
let inquire = document.querySelector('[name=search]');
let btn5 = inquire.nextElementSibling;
btn5.addEventListener('click', function () {
    if (inquire.value === '') {
        alert('输入不能为空');
        return;
    }
    let trim = inquire.value.trim();
    document.querySelector('.btn2').style.display = 'none';
    document.querySelector('.btn3').style.display = 'none';
    let objj = {
        name: trim
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
                    <td><input type="checkbox" value="${item.id}" class='ch1'></td>
                    <td><img src="../../public/images/${item.pic}"/></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${render1(item.classid)}</td>
                    <td>${render2(item.placeid)}</td>
                    <td><span onclick='update(\"${item.id}\")'>编辑</span><span onclick='del(\"${item.id}\")'>删除</span></td>
                </tr>
                `;
            }).join('');
        }
    })
    cxqxan();
})

// 刷新
let btn4 = document.querySelector('.btn4');
btn4.addEventListener('click', function () {
    location.reload();
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




