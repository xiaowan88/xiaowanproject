Mock.mock("/mock/news", "get", function () {
    let goodsnews = JSON.parse(localStorage.getItem('goodsnews'));
    if (goodsnews == null) {
        return false;
    }
    return goodsnews;
})