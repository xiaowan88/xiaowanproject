// 判断是否在登录状态
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
if (fl) {
    location.href = '/Admin1/src/views/admintitle.html';
}

// 判断用户名
function usern() {
    let una = document.querySelector('.username1');
    let reg = /^[\w-]{4,16}$/;
    if (!reg.test(una.value)) {
        document.querySelector('.user').innerHTML = `请输入4-16位不以中文开头的用户名`;
        return false;
    }
    document.querySelector('.user').innerHTML = '';
    return true;
}
document.querySelector('.username1').addEventListener('change', usern);

// 判断密码
function pwdd() {
    let pw1 = document.querySelector('.password1');
    let reg = /^[A-Za-z0-9]{6,15}$/;
    if (!reg.test(pw1.value)) {
        document.querySelector('.pwd').innerHTML = `请输入6-15位以大小写英文和数字组合`;
        return false;
    }
    document.querySelector('.pwd').innerHTML = '';
    return true;
}
document.querySelector('.password1').addEventListener('change', pwdd);


let una = document.querySelector('.username1');
let pw1 = document.querySelector('.password1');
form2.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!usern()) return e.preventDefault();
    if (!pwdd()) return e.preventDefault();
    let login1 = hex_md5(pw1.value);

    let firm = JSON.parse(localStorage.getItem('sql')) || [];
    let flag = false;
    let index;
    let str = [];
    let us = [];
    for (let i = 0; i < firm.length; i++) {
        if (firm[i].username === una.value && firm[i].password === login1) {
            index = i;
            us.push({
                user: firm[i].username
            })
            str.push({
                stuid: firm[i].stuid,
                username: firm[i].username,
                password: firm[i].password,
                uiphone: firm[i].uiphone,
                registerTime: firm[i].registerTime,
                loginTime: new Date().toLocaleString()
            })
            flag = true;
            break;
        }
    }
    if (flag === true) {
        let chall = document.querySelector('#checkbox');
        if (chall.checked) {
            let date = new Date();
            date.setTime(date.getTime() + 5 * 60 * 1000);
            document.cookie = `user=${una.value};expires=${date.toUTCString()}`;
        } else {
            document.cookie = `user=${una.value}`;
        }
        firm[index] = str[0];
        localStorage.setItem('sql', JSON.stringify(firm));
        localStorage.setItem('user', JSON.stringify(us));
        location.href = '/Admin1/src/views/admintitle.html';
        return;
    } else {
        alert('账号或密码输入错误，请重新输入!');
        una.value = '';
        pw1.value = '';
    }
})