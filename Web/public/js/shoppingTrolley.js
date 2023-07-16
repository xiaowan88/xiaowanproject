// 标题头点击事件
$('.nav_ul li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
})


// 电梯导航回到顶部
document.querySelector('.ep3').addEventListener('click', function () {
    window.scrollTo(0, 0);
})




// 页面映射
function render() {
    $.ajax({
        type: "get",
        url: "/mock/tro",
        data: null,
        dataType: "json",
        success: function (res) {
            if (res === false) {
                document.querySelector('tbody').innerHTML = `
                    <tr>
                        <td colspan='4'>暂无商品，请先添加商品!</td>
                    </tr>
                    `;
                return;
            }
            document.querySelector('tbody').innerHTML = res.map(item => {
                return `
                        <tr>
                            <td class="ytd">
                                <i class="iconfont icon-shanchu" onclick='del(\"${item.id}\")'></i>
                                <img src="../../public/images/${item.images}">
                                <span>${item.name}</span>
                            </td>
                            <td id="price">${item.price}</td>
                            <td>
                                <button class="reduce">-</button>
                                <input type="text" value="1" class="num" disabled>
                                <button class="add">+</button>
                            </td>
                            <td id="sum">${item.price}</td>
                        </tr>
                    `;
            }).join('');
            rad();
        }
    })
}
render();

function rad() {


    // 购物车加减
    let reduce = document.querySelectorAll('.reduce');
    let add = document.querySelectorAll('.add');
    let inp = document.querySelectorAll('.num');
    let price = document.querySelectorAll('#price');
    // 获取商品总件数
    ser();
    function ser() {
        let sn = 0;
        let nm = 0;
        let sm = document.querySelectorAll('#sum');
        for (let i = 0; i < inp.length; i++) {
            sn += parseInt(inp[i].value);
            nm += parseInt(sm[i].innerHTML);
        }
        document.querySelector('.xj').innerHTML = sn;
        document.querySelector('.subtotal span').innerHTML = `￥${nm}`;
        document.querySelector('.order span').innerHTML = `￥${nm}`;
    }
    for (let i = 0; i < reduce.length; i++) {
        reduce[i].addEventListener('click', function () {
            inp[i].value--;
            inp[i].value < 1 ? inp[i].value = 1 : inp[i].value;
            document.querySelectorAll('#sum')[i].innerHTML = `${inp[i].value * price[i].innerHTML}`;
            ser();
        })
        add[i].addEventListener('click', function () {
            inp[i].value++;
            document.querySelectorAll('#sum')[i].innerHTML = `${inp[i].value * price[i].innerHTML}`;
            ser();
        })
    }

}
// 商品的删除
function del(res) {
    $.ajax({
        type: "post",
        url: "/api/del",
        data: res,
        dataType: "json",
        success: function (res) {
            render();
        }
    })
}
