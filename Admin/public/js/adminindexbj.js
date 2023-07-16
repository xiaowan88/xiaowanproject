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
    document.querySelector('.hh').innerHTML = `新增窗口`;
    form[0].style.display = 'block';
    form[1].style.display = 'none';
})

document.querySelector('#xh').addEventListener('change', () => {
    let xh = document.querySelector('#xh').files[0].name;
    document.querySelector('.pp').innerHTML = `<img src="../../public/images/${xh}">`;
})

form[0].addEventListener('submit', function (e) {
    e.preventDefault();
    let pic = document.querySelector('#xh').files[0].name;
    axios.post("/mock/add", {
        pic
    }).then(res => {
        render();
        document.querySelector('.pp').innerHTML = '';
        mod.style.top = '-800px';
    }).catch(err => {
        console.log('err', err);
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
            if (res == false) {
                tbody.innerHTML = `
                <tr>
                    <td colspan='2'>暂无数据</td>
                </tr>
                `;
                return;
            }
            tbody.innerHTML = res.map(item => `
                <tr>
                    <td><img src="/Admin/public/images/${item.pic}"></td>
                    <td><span onclick='update(\"${item.id}\")'>编辑</span><span onclick='del(\"${item.id}\")'>删除</span></td>
                </tr>
                `
            ).join('');
        }
    })
}
render();

// 编辑
function update(userid) {
    document.querySelector('.hh').innerHTML = `编辑窗口`;
    mod.style.top = '0';
    form[0].style.display = 'none';
    form[1].style.display = 'block';
    $.ajax({
        type: "post",
        url: "/api/upda",
        data: userid,
        dataType: "json",
        success: function (res) {
            document.querySelector('#uid').value = res.id;
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
    let xhvalue = document.querySelector('#xh1').files[0].name;
    let uid = document.querySelector('#uid').value;
    let obj = {
        id: uid,
        pic: xhvalue
    }
    $.ajax({
        type: "post",
        url: "/api/upd",
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (res) {
            if (res === true) {
                mod.style.top = '-800px';
                render();
            }
        }
    })

}


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
