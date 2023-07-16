let login = document.querySelector('.login');
let header = document.querySelector('.header');
let form2 = document.querySelector('.form2');
let form1 = document.querySelector('.form1');
login.addEventListener('click', function () {
    header.style.left = '50%';
    form1.style.display = 'none';
    form2.style.display = 'block';

})


let register = document.querySelector('.register');
register.addEventListener('click', function () {
    header.style.left = '2%';
    form1.style.display = 'block';
    form2.style.display = 'none';
})


// 判断用户名
let un = document.querySelector('.username');
function user() {
    let reg = /^[\w-]{4,16}$/;
    if (!reg.test(un.value)) {
        document.querySelector('.user1').innerHTML = `请输入4-16位不以中文开头的用户名`;
        return false;
    }
    document.querySelector('.user1').innerHTML = '';
    return true;
}
document.querySelector('.username').addEventListener('change', user);



// 判断密码
let pw = document.querySelector('.password');
function pwd() {
    let reg = /^[A-Za-z0-9]{6,15}$/;
    if (!reg.test(pw.value)) {
        document.querySelector('.pwd2').innerHTML = `请输入6-15位大小写英文或数字组合`;
        return false;
    }
    document.querySelector('.pwd2').innerHTML = '';
    return true;
}
document.querySelector('.password').addEventListener('change', pwd);

// 再次验证密码
let con = document.querySelector('.conf');
function conf() {
    if (con.value !== pw.value) {
        document.querySelector('.pwd3').innerHTML = `两次密码输入不一致`;
        return false;
    }
    document.querySelector('.pwd3').innerHTML = '';
    return true;
}
document.querySelector('.conf').addEventListener('change', conf);

// 判断手机号
let ip = document.querySelector('.text');
function iphone() {
    let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    if (!reg.test(ip.value)) {
        document.querySelector('.text4').innerHTML = `请输入11位手机号`;
        return false;
    }
    document.querySelector('.text4').innerHTML = '';
    return true;
}
document.querySelector('.text').addEventListener('change', iphone);

// 提交到后台
form1.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!user()) return e.preventDefault();
    if (!pwd()) return e.preventDefault();
    if (!conf()) return e.preventDefault();
    if (!iphone()) return e.preventDefault();
    let jm = hex_md5(pw.value);
    let firm = JSON.parse(localStorage.getItem('sql')) || [];
    let flag = false;
    for (let i = 0; i < firm.length; i++) {
        if (firm[i].username === un.value) {
            flag = true;
            break;
        }
    }
    if (flag === true) {
        alert('用户名已存在，请重新输入!');
        un.value = '';
        return;
    }
    firm.push({
        stuid: firm.length ? firm[firm.length - 1].stuid + 1 : 1,
        username: un.value,
        password: jm,
        uiphone: ip.value,
        registerTime: new Date().toLocaleString(),
        loginTime: '没登录，怎么有时间呢！'
    })
    header.style.left = '50%';
    form1.style.display = 'none';
    form2.style.display = 'block';
    localStorage.setItem('sql', JSON.stringify(firm));
    un.value = '';
    pw.value = '';
    con.value = '';
    ip.value = '';
})