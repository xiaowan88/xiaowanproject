// 登录的用户
let p1 = document.querySelector('.user').innerHTML = `欢迎${use()}访问户外运动专卖商城！`;

// 标题头点击事件
$('.nav_ul li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
})

// banner图
function lbt() {
    new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: "fade",
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    })
}
lbt();


// 电梯导航回到顶部
document.querySelector('.ep3').addEventListener('click', function () {
    window.scrollTo(0, 0);
})

//  头部购物车点击跳转事件
document.querySelector('.header .icon-gouwuchekong').addEventListener('click', function () {
    location.href = '../../src/views/shoppingTrolley.html';
})



// 商品映射
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
            let res1 = res.reverse();
            let resarr = res1.slice(0, 8);
            document.querySelector('.pro_content_ul').innerHTML = resarr.map(item => {
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
    })
}
goods();





// 头部轮播图和标题路径
axios.get("/mock/header")
    .then(res => {
        if (res.data === false) {
            return;
        }
        document.querySelector('.banner_font').innerHTML = res.data.map(item => {
            return `
            <h1>${item.title}</h1>
            <a href="${item.http}">进入在线商城</a>
            `;
        }).join('');
    }).catch(err => {
        console.log('err', err);
    })

// 轮播图和透明背景
axios.get("/mock/pic")
    .then(res => {
        if (res.data === false) {
            return;
        }
        let res1 = res.data.slice(0, 3);
        document.querySelector('.banner .swiper-wrapper').innerHTML = res1.map(item => {
            return `
            <div class="swiper-slide data-pic1"><img src="../../public/images/${item.images}"></div>
            `;
        }).join('');
        lbt();
        document.querySelector('.transparent').style.backgroundImage = `url(../../public/images/${res.data[0].images})`;
        document.querySelector('.transparent1').style.backgroundImage = `url(../../public/images/${res.data[1].images})`;
        document.querySelector('.transparent2').style.backgroundImage = `url(../../public/images/${res.data[2].images})`;
    }).catch(err => {
        console.log('err', err);
    })

// 中部
axios.get("/mock/center")
    .then(res => {
        if (res.data === false) {
            return;
        }
        document.querySelector('.gywm_content').innerHTML = res.data.map(item => {
            return `
            <div class="gywm_font">
                <h1>${item.title}</h1>
                <span class="span1">${item.brief}</span>
                <span class="span2">${item.brief1}</span>
                <a href="${item.http}">查看更多详情</a>
            </div>
            <div class="gwym_pic">
                <img src="../../public/images/${item.images}">
            </div>
            `;
        }).join('');


        // 透明背景标题映射
        document.querySelector('.data-tr1').innerHTML = res.data.map(item => `
            <h1>${item.title}</h1>
            <p class="p1">${item.brief}</p>
            <p class="p2">${item.brief1}</p>
        `).join('');
        document.querySelector('.data-tr2').innerHTML = res.data.map(item => `
            <h1>${item.title}</h1>
            <p class="p1">${item.brief}</p>
            <p class="p2">${item.brief1}</p>
        `).join('');
        document.querySelector('.data-tr3').innerHTML = res.data.map(item => `
            <h1>${item.title}</h1>
            <p class="p1">${item.brief}</p>
            <p class="p2">${item.brief1}</p>
            <a href="${item.http}">进入在线商城</a>
        `).join('');
    }).catch(err => {
        console.log('err', err);
    })



// 下部
axios.get("/mock/bottom")
    .then(res => {
        if (res.data === false) {
            return;
        }
        document.querySelector('.pro1_left').innerHTML = res.data.map(item => `
            <div class="pto1_top">
                <img src="../../public/images/${item.images}" style="cursor: pointer;">
                <div class="pro1_font data-font1">
                    <h4>${item.title}</h4>
                    <span>发布日期：</span><span>${item.time}</span>
                    <p>${item.brief}</p>
                </div>
            </div>      
            `
        ).join('');
    }).catch(err => {
        console.log('err', err);
    })




// 底部雪碧图
axios.get("/mock/jlt").then(res => {
    if (res.data === false) {
        return;
    }
    document.querySelector('.foot .wrapper').innerHTML = res.data.map(item => `
    <img src="../../public/images/${item.images}">
    `).join('');
}).catch(err => {
    console.log('err', err);
})

