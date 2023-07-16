// 标题头点击事件
$('.nav_ul li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
})


// 电梯导航回到顶部
document.querySelector('.ep3').addEventListener('click', function () {
    window.scrollTo(0, 0);
})


document.querySelector('.header .icon-gouwuchekong').addEventListener('click', function () {
    location.href = '../../src/views/shoppingTrolley.html';
})




// 页面映射
function goods() {
    $.ajax({
        type: "get",
        url: "/api/goods",
        data: null,
        dataType: "json",
        success: function (res) {
            if (res === false) {
                return;
            }
            document.querySelector('.pro_content_ul').innerHTML = res.map(item => {
                return `
                <li>
                    <div class="pic"><img src="../../public/images/${item.images}"></div>
                    <p>${item.name}<b></b></p>
                    <div class="bottom">
                        <span>￥${item.price}</span>
                        <i class="iconfont icon-gouwuchekong data-trolley"></i>
                        <input type="hidden" name="uid" id="uid" value="${item.id}">
                    </div>
                </li>
                `;
            }).join('');
            trolley();
        }
    })

}
goods();

// 购物车
function trolley() {
    let ilist = document.querySelectorAll('.data-trolley');
    let inpid = document.querySelectorAll('#uid');
    for (let i = 0; i < ilist.length; i++) {
        ilist[i].onclick = function () {
            let uid = inpid[i].value;
            let obj = {
                id: uid
            }
            $.ajax({
                type: "post",
                url: "/mock/tro",
                data: JSON.stringify(obj),
                dataType: "json",
                success: function (res) {
                    if (res === true) {
                        alert('添加成功!');
                    } else if (res === false) {
                        alert('本商品已存在请勿重复添加！')
                    }
                }
            })

        }
    }
}




// 分类表格映射
$.ajax({
    type: "get",
    url: "/mock/tab",
    data: null,
    dataType: "json",
    success: function (res) {
        if (res === false) {
            return;
        }
        document.querySelector('.tdspan').innerHTML = res.map(item => {
            return `
            <span data-id="${item.classid}">${item.title}</span>
            `;
        }).join('');
        document.querySelectorAll('.tdspan span')[0].classList.add('activespan');
        filter();
    }
})

// 产地表格映射
$.ajax({
    type: "get",
    url: "/mock/tab1",
    data: null,
    dataType: "json",
    success: function (res) {
        if (res === false) {
            return;
        }
        document.querySelector('.placess').innerHTML = res.map(item => {
            return `
            <span data-index="${item.placeid}">${item.title}</span>
            `;
        }).join('');
        document.querySelectorAll('.placess span')[0].classList.add('activespan');
        filter();
        aplace();
    }
})





// 筛选
function filter() {
    let classlist = document.querySelectorAll('.tdspan span');
    for (let i = 0; i < classlist.length; i++) {
        classlist[i].onclick = function () {
            let daid = this.dataset.id;
            document.querySelector('.tdspan .activespan').classList.remove('activespan');
            this.classList.add('activespan');
            axios.get("/mock/fliter").then(res => {
                let arr = res.data.filter(function (item) {
                    return item.classid == daid;
                });
                fl(arr);
                let placelist = document.querySelectorAll('.placess span');
                for (let i = 0; i < placelist.length; i++) {
                    placelist[i].onclick = function () {
                        document.querySelector('.placess .activespan').classList.remove('activespan');
                        this.classList.add('activespan');
                        cd(arr, this.dataset.index);
                        trolley();
                    }
                }
                trolley();
            }).catch(err => {
                console.log('err', err);
            })
        }
    }
}


// 封装的分类函数
function fl(res) {
    document.querySelector('.pro_content_ul').innerHTML = res.map(item => {
        return `
        <li>
            <div class="pic"><img src="../../public/images/${item.images}"></div>
            <p>${item.name}<b></b></p>
            <div class="bottom">
                <span>￥${item.price}</span>
                <i class="iconfont icon-gouwuchekong data-trolley"></i>
                <input type="hidden" name="uid" id="uid" value="${item.id}">
            </div>
        </li>
        `;
    }).join('');
}

// 封装的产地函数
function cd(arr, text) {
    let arr1 = arr.filter(item => {
        return item.placeid == text;
    })
    document.querySelector('.pro_content_ul').innerHTML = arr1.map(item => {
        return `
        <li>
            <div class="pic"><img src="../../public/images/${item.images}"></div>
            <p>${item.name}<b></b></p>
            <div class="bottom">
                <span>￥${item.price}</span>
                <i class="iconfont icon-gouwuchekong data-trolley"></i>
                <input type="hidden" name="uid" id="uid" value="${item.id}">
            </div>
        </li>
        `;
    }).join('');
}





// 刚开始点击地区筛选
function aplace() {
    let placelist = document.querySelectorAll('.placess span');
    for (let i = 0; i < placelist.length; i++) {
        placelist[i].onclick = function () {
            document.querySelector('.placess .activespan').classList.remove('activespan');
            this.classList.add('activespan');
            axios.get("/mock/fliter").then(res => {
                setcd(res.data, this.dataset.index);
                trolley();
            }).catch(err => {
                console.log('err', err);
            })
        }
    }
}
function setcd(res, text) {
    let arr1 = res.filter(item => {
        return item.placeid == text;
    })
    document.querySelector('.pro_content_ul').innerHTML = arr1.map(item => {
        return `
        <li>
            <div class="pic"><img src="../../public/images/${item.images}"></div>
            <p>${item.name}<b></b></p>
            <div class="bottom">
                <span>￥${item.price}</span>
                <i class="iconfont icon-gouwuchekong data-trolley"></i>
                <input type="hidden" name="uid" id="uid" value="${item.id}">
            </div>
        </li>
        `;
    }).join('');
}




// 商品查询
let btn = document.querySelector('.header_title .right .right');
btn.onclick = function () {
    let content = document.querySelector('#search').value;
    if (!content) {
        alert('请输入查询的商品名称');
        return;
    }
    axios.post("/mock/search1", {
        content
    }).then(res => {
        if (res.data === false) {
            document.querySelector('.pro_content_ul').innerHTML = '<p style="color:red;font-size:20px;margin:auto">该商品不存在！</p>';
            return;
        }
        document.querySelector('.pro_content_ul').innerHTML = res.data.map(item => {
            return `
            <li>
                <div class="pic"><img src="../../public/images/${item.images}"></div>
                <p>${item.name}<b></b></p>
                <div class="bottom">
                    <span>￥${item.price}</span>
                    <i class="iconfont icon-gouwuchekong data-trolley"></i>
                    <input type="hidden" name="uid" id="uid" value="${item.id}">
                </div>
            </li>
            `;
        }).join('');
    }).catch(err => {
        console.log('err', err);
    })
}