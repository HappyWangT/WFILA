// 获取表单
let form = document.forms[0].elements;
// console.log(form);
// 用户昵称
let nike = form[0];
// console.log(nike);
// 用户账号
let id = form[1];
// console.log(id);
// 登录密码
let paw = form[2];
// console.log(paw);
// 重复密码
let repaw = form[3];
// console.log(repaw);


// 获取span
let span0 = nike.nextElementSibling;
let span1 = id.nextElementSibling;
let span2 = paw.nextElementSibling;
let span3 = repaw.nextElementSibling;

// console.log(span0);
// 全部状态设置为false
let s0 = false;
let s1 = false;
let s2 = false;
let s3 = false;



// 1.昵称   仅支持中文
nike.onblur = function() {
    var val = nike.value;
    var reg = /^[\u4e00-\u9fa5]{2,10}$/;
    if (reg.test(val)) {
        span0.innerHTML = '昵称可用';
        span0.style.color = 'green';
        s0 = true;
    } else {
        span0.innerHTML = '用户昵称输入不正确';
        span0.style.color = 'red';
        s0 = false;
    }
}

// 2.用户账号    字母数字下划线，长度为4-11

id.onblur = function() {
    var val = id.value;
    var reg = /^[a-z0-9]\w{4,11}$/;
    if (reg.test(val)) {
        span1.innerHTML = '用户名可用';
        span1.style.color = 'green';
        s1 = true;
    } else {
        span1.innerHTML = '用户名输入不正确';
        span1.style.color = 'red';
        s1 = false;
    }
};

// 2.密码的规则        数字字母特殊字符，一种类型，弱。两种类型为中，三种类型为强,6-20个字符
paw.onblur = function() {
    var val = paw.value;
    // 判断密码长度是否在6-20之间
    if (val.length >= 6 && val.length <= 12) {
        // 包含数字
        var reg1 = /\d+/;
        // 将结果给a，b，c
        a = reg1.test(val) ? 1 : 0;
        // 包含字母
        var reg2 = /[a-zA-Z]+/;
        b = reg2.test(val) ? 1 : 0;
        // 包含特殊字符
        var reg3 = /[^a-zA-Z\d]/;
        c = reg3.test(val) ? 1 : 0;

        // 判断密码强度
        switch (a + b + c) {
            case 1:
                span2.innerHTML = '弱';
                span2.style.color = 'green';
                break;
            case 2:
                span2.innerHTML = '中';
                span2.style.color = 'green';
                break;
            case 3:
                span2.innerHTML = '强';
                span2.style.color = 'green';
                break;
        }
        s2 = true;
    } else {
        span2.innerHTML = '密码长度不够';
        span2.style.color = 'red';
        s2 = false;
    }
};

// 3.重复密码          跟第一次输入 密码一致
repaw.onblur = function() {
    // 第一次密码
    var val1 = repaw.value;
    // 第二次密码
    var val2 = paw.value;
    if (val1 == val2) {
        span3.innerHTML = '密码一致';
        span3.style.color = 'green';
        s3 = true;
    } else {
        span3.innerHTML = '两次密码不一致';
        span3.style.color = 'red';
        s3 = false;
    }
};


let btn = document.querySelector('.btnadpt');
let al = document.querySelector('#alert');
// console.log(btn);
btn.onclick = function() {
    if (s0 && s1 && s2 && s3) {
        al.style.display = 'block';
        al.innerHTML = '注册成功，跳转登录页...';
        setTimeout(function() {
            location.assign('./login.html');

        }, 1500)
    } else {
        setTimeout(function() {
            al.style.display = 'block';
            al.innerHTML = '注册失败';
        }, 500);
        setTimeout(function() {
            al.style.display = 'none';
        }, 1500);
    }

    // 获取input框的值，发送给服务器

    let param = `username=${id.value}&password=${paw.value}&rpassword=${repaw.value}&nickname=${nike.value}`;
    console.log(param);

    // 注意要发送post请请求
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.post('http://localhost:8888/users/register', param).then(res => {
        console.log(res);
    })
}