// 页面映射
axios.get("/mock/news")
    .then(res => {
        if (res.data === false) {
            return;
        }
        document.querySelector('.yx').innerHTML = res.data.map(item => `
        <div class="col-xl-2 col-md-2">
            <img src="../../public/images/${item.images}" style="cursor: pointer;" class="img">
        </div>
        <div class="col-xl-10 col-md-12">
            <div class="pro1_font data-font1">
                <h4>${item.name}</h4>
                <span>发布日期：</span><span>${item.time} </span><span>分类：</span><span>${item.sel}</span>
                <p><i>${item.sel1}：</i>${item.content}</p>
            </div>
        </div>
        <div class="yx1"></div>
            `
        ).join('');
    }).catch(err => {
        console.log('err', err);
    })

