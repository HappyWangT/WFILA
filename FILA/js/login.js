class checkLogin {
    constructor() {

        // console.log(this);
        // console.log(this.$('.btnadpt'));
        this.$('.btnadpt').addEventListener('click', this.sendData.bind(this));

        // console.log(location.search);
        // console.log(sessionStorage.getItem('url'));
        // console.log(location.href);

        let search = location.search;
        let hash = location.hash;
        // console.log(search);
        // console.log(hash);
        // console.log(location.href);

        if (search) {
            // sessionStorage.getItem('url');
            if (hash) {
                this.url = search.split('=')[1] + hash;
            }
        } else {
            this.url = './detail.html';
        }

    }


    //*获取input框中的值，通过ajax发送给服务器，判断用户名和密码是否正确。
    sendData() {
        // console.log(this.$('.tel')[1]);
        let username = this.$('.tel').value;
        let password = this.$('.cade').value;
        // console.log(username, password);
        let param = `username=${username}&password=${password}`;
        const TOKEN = localStorage.getItem('token');
        axios.defaults.headers.common['authorization'] = TOKEN;
        // 注意要发送post请请求
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        axios.post('http://localhost:8888/users/login', param).then(({ status, data }) => {
            // console.log(status, data);
            if (status != 200 || data.code != 1) {
                alert('登录失败, 用户名或者密码不对 !')
            }

            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('token', data.token);
            // location.assign('./detail.html');
            // let url = sessionStorage.getItem('url');
            // let hrefUrl = url.split('#')[1];
            // location.href = `./information.html#` + hrefUrl;
            // if (url.split('#')[1]) { location.href = `./information.html#` + (url.split('#')[1]) } else { location.href = './detail.html' }

            console.log(this.url);
            if (this.url) {
                location.href = this.url;
            }

        })
    }

    //* 获取节点对象的方法
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}
new checkLogin;