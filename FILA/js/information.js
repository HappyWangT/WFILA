class Information {
    constructor() {
        this.judge();
        // console.log("刷新了")
        this.getInformation();
        // this.getCartList();
    }

    // 判断是否登录成功，如果成功，将信息显示出来
    judge() {
        // console.log(111);
        let token = localStorage.getItem('token');
        // console.log(token);
        if (token) {
            this.$('.login').style.display = 'block';
            this.$('.header-list').style.display = 'none';
        }
        this.$('.out').addEventListener('click', this.tk.bind(this))
    }

    //* 确认删除的弹框 
    tk() {
        let login = this.$('.login');
        let list = this.$('.header-list');
        //? 点击删除按钮的弹出框
        layer.confirm('确定要退出登录吗', {
            title: '退出登录提示框'
        }, function() { // 确认的回调函数
            // const TOKEN = localStorage.getItem('token');
            // axios.defaults.headers.common['authorization'] = TOKEN;
            // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            let id = localStorage.getItem('userId');
            // console.log(id);
            axios.get(`http://localhost:8888/users/logout/${id}`).then(res => {
                // console.log(res);
                //? 关闭弹出框 
                layer.closeAll();
                login.style.display = 'none';
                list.style.display = 'block';
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
            })
        })
    }



    //* 获取页面信息 
    async getInformation() {
        let goodsId = location.href.split("#")[1];
        let {
            status,
            data
        } = await axios.get(`http://localhost:8888/goods/item/${goodsId}`);
        // console.log(status, data);
        if (status != 200 || data.code != 1) throw new Error('获取不到数据呢！')
        let html = '';
        html = `<div class="pro-container w-full">
            <div class="pro-main w-1280 clearfix">
                <div class="pro-view fl clearfix">
                    <div class="pro-view-l fl">
                        <div class="pro-smallImgs">
                            <div data-col="499249" class="small-list J_small_list current more">
                                <a href="#none" class="small-prev"></a>
                                <ul data-col="499249">
                                    <li class="i current">
                                    <img alt="" class="cloudzoom-gallery loading cloudzoom-gallery-active" src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704FZA/2/20de7a44719821eddbbbaf7d56c5fd99.jpg" style="display: inline;"></li>
                                    <li class="i">
                                    <img class="cloudzoom-gallery loading" src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704FZA/1/7cb0d6d09d6326de6f67a2c5a8c694af.jpg" style="display: inline;"></li>
                                    <li class="i">
                                    <img o class="cloudzoom-gallery loading" src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704FZA/5/eb89bf8de93d7daf2ca4918a5901815d.jpg" style="display: inline;"></li>
                                    <li class="i">
                                    <img src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704FZA/3/1dfff37178a420beee96c08b0e4a429c.jpg" style="display: inline;"></li>
                                    <li class="i">
                                    <img src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704FZA/4/377ac00cb7cdc0f8ce8392690893419f.jpg" style="display: inline;"></li>
                                    <li class="i hide">
                                    <img src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704FZA/9/66160ba43233c067e3bacc117e3c585a.jpg" class="cloudzoom-gallery loading"></li>
                                    <li class="i hide">
                                    <img src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704FZA/10/422a88f9360dcefdfbafd6c6bd4a6db8.jpg" class="cloudzoom-gallery loading"></li>
                                </ul>
                                <a href="#none" class="small-next"></a>
                            </div>
                        </div>
                        <div class="pro-operates"><a href="#none" class="pro-collect ">
                                    收藏</a></div>
                    </div>
                    <div id="box">
                        <div class="pro-bigImg fl">
                            <div class="mask"></div>
                            <img id="zoom1" class="cloudzoom J_pro_bigImg" src="${data.info.img_big_logo}">
                        </div>
                        <div class="superPicture">
                            <img class="Bigimg" src="${data.info.img_big_logo}">
                        </div>
                    </div>
                    <div class="preview_img">
                        <img src="upload/s3.png" alt="">
                        <div class="big">
                            <img src="upload/big.jpg" alt="" class="bigImg">
                        </div>
                    </div>
                </div>
                <div class="pro-infos J_pro_infos fl">

                    <div class="J_pro_infos_t">

                        <h3 class="goods-name">${data.info.title}</h3>
                        <p class="goods-sn">款号：F11M118601F</p>
                        <p class="goods-price">￥${data.info.current_price}<span class="mktprice">￥${data.info.price}</span></p>
                        <div class="promos clearfix">
                            <div class="promos-title fl">促销</div>
                            <div class="promos-content"><a href="javascript:;" title="【免运费】会员专享">【免运费】会员专享</a></div>
                        </div>
                    </div>
                    <div class="J_pro_infos_b">
                        <p class="goods-attr goods-color J_goods_color">颜色：<span></span></p>
                        <ul class="attr_list color_list J_color_list">
                            <li class="attr_code color_code" data-id="${data.info.goods_id}"><img  src="${data.info.img_big_logo}" class="loading"></li>
                        </ul>

                        <p class="goods-attr goods-size J_goods_size">尺码：<span></span></p>
                        <ul class="attr_list size_list J_size_list">
                            <li class="attr_code size_code" data-id="${data.info.goods_id}"><span title="S">S</span></li>
                            <li class="attr_code size_code" data-id="${data.info.goods_id}"><span title="M">M</span></li>
                            <li class="attr_code size_code" data-id="${data.info.goods_id}"><span title="L">L</span></li>
                            <li class="attr_code size_code" data-id="${data.info.goods_id}"><span title="XL">XL</span></li>
                            <li class="attr_code size_code" data-id="${data.info.goods_id}"><span title="2XL">2XL</span></li>
                        </ul>
                        <div class="infos-panel">
                            <div class="infos-cell clearfix">
                                <div class="box-label fl">购买数量</div>
                                <div class="pro-num-edit fr"><a href="javascript:;" class="num-ops num-minus">-</a> <input id="selectNum" type="text" class="num-input" value="1"> <a href="javascript:;" class="num-ops num-plus">+</a></div>
                            </div>
                        </div>

                        <div class="goods-btns clearfix">
                        <span class="btn-addCart fl">加入购物车</span> 
                        <span class="btn-toBuy fr">立即购买</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pro-details w-1280 " style="margin-top: 30px;">
            <img class="loading" src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704F_02/806829aa780057b2766f753789d2f7cb.jpg" style="display: none;">
            <img class="loading" src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704F_13/98ce6745522c97d6ca8be8e1dca81093.jpg" style="display: none;">
            <img class="loading" src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704F_14/39e185ff763865699baa3df87845920c.jpg" style="display: none;">
            <img class="loading" src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704F_15/38aad80a29c5f8a03961d6f9bd6d09ee.jpg" style="display: none;">
            <img class="loading" src="https://img.fishfay.com/shopgoods/7/F11M228704F/F11M228704F_18/d3281d331e22c5343148a68434a08ba6.jpg" style="display: none;">
        </div>`

        this.$('.content').innerHTML = html;
        // 放大镜
        this.bigImg();
        // 点击 加入购物车。判断登录状态
        this.$('.btn-addCart').addEventListener('click', this.changeHandler.bind(this));
        // 点击 立即购买，判断登录状态
        this.$('.btn-toBuy').addEventListener('click', this.changeHandler.bind(this));
        // 点击 - 按钮，进行数量的减
        this.$('.num-minus').addEventListener('click', this.numRedu.bind(this));
        // 点击 + 按钮，进行数量的加
        this.$('.num-plus').addEventListener('click', this.numPlus.bind(this));
    }

    //* 数量的加
    numPlus() {
        let div = this.$('.pro-num-edit');
        // console.log(div);
        let num = div.querySelector('input').value - 0;
        // console.log(num);
        // let plus = div.querySelector('.num-plus');
        num++;
        let numVal = num++;
        // console.log(num++);
        this.$('#selectNum').value = numVal;
    }

    //* 数量的减
    numRedu() {
        let div = this.$('.pro-num-edit');
        let num = div.querySelector('input').value - 0;
        num--;
        let numVal = num--;
        this.$('#selectNum').value = numVal;
        if (numVal < 1) {
            alert('数量不能小于1！');
            this.$('#selectNum').value = 1
        }
    }

    //* 判断登录状态
    changeHandler() {
        // console.log(this);
        // console.log(this.$('#alert'));
        // 从本地存储中获取token
        let token = localStorage.getItem('token');
        // 从本地存储中获取userId
        let userId = localStorage.getItem('userId');
        // console.log(token, userId);
        //? 判断是否有token，没有则跳转到登录页面，进行登录 
        if (!token || !userId) {
            this.$('#alert').style.display = 'block';
            setTimeout(function() {
                location.assign('./login.html?ReturnUrl=./information.html' + location.hash);
                sessionStorage.setItem('url', location.href);
            }, 2000)
        } else {
            let num = this.$('#selectNum').value;
            // console.log(num);
            this.addCart(num);

        }

    }


    //* 加入购物车
    addCart(num) {
        let goodsId = location.href.split("#")[1];
        let userId = localStorage.getItem('userId');
        let param = `id=${userId}&goodsId=${goodsId}`;

        const TOKEN = localStorage.getItem('token');
        axios.defaults.headers.common['authorization'] = TOKEN;
        // 注意要发送post请请求
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        axios.post('http://localhost:8888/cart/add', param).then(({ status, data }) => {
            // console.log(status, data);
            // if (status != 200 || data.code != 1) return;
            // if (status == 200 && data.code == 401) { location.assign('./login.html'); }
            if (status == 200 && data.code == 1) {
                this.getCartList(num);
            }
            // 如果状态不等于1 代表没有登录，清除之前的token和用户名
            if (data.code != 1) {

                localStorage.removeItem('userId');
                localStorage.removeItem('token');

                location.hash = goodsId // 将hash值添加到链接的尾部，跳转的时候携带。
                    // console.log(location.href = "./information.html" + location.hash);
                    // location.href = "./information.html" + location.hash;
                    // sessionStorage.setItem('url', location.href);
                    // location.assign('./login.html');
                location.assign('./login.html?ReturnUrl=./information.html' + location.hash)
            }
        })
    }


    //* 获取购物车列表
    async getCartList(num) {
        // console.log(num);
        this.$('#tankuang').style.display = 'block';
        // 从地址栏中获取goodsId
        // let gId = location.hash.split('#')[1];
        // console.log(gId);
        const TOKEN = localStorage.getItem('token');
        axios.defaults.headers.common['authorization'] = TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let { data } = await axios.get('http://localhost:8888/cart/list', {
            params: {
                id: localStorage.getItem('userId')
            }
        });
        // console.log(res);
        // console.log(data);
        let html = '';

        data.cart.forEach(val => {
            // console.log(val);
            html += ` <div class="goods-item mini-cart">
            <div class="goods-item__img">
            <img src="${val.img_small_logo}"></div>
            <div class="goods-item__right">
                <div class="goods-item__title">
                    <span>${val.title}</span>
                </div>
                <div class="goods-item__specs">
                    <span class="goods-item__specs-color">卡其色</span>
                    <span class="goods-item__specs-size">S</span></div>

                <div class="t-num-price">
                    <div>
                        <span class="num-add">-</span>
                        <input autocomplete="off" class="num-input" value="${val.cart_number}">
                        <span class="num-redu">+</span>
                    </div>
                    <span class="price__symbol">¥${val.current_price*val.cart_number}</span>
                    <span class="price"><del>¥${val.price*val.cart_number}</del></span>
                </div>
            </div>
        </div>`;
            this.$('.carttotal').innerHTML = 111;
        })

        this.$('#cartinfo').innerHTML = html;
        // console.log(html);
        this.$('.view-cart').addEventListener('click', function() {
            location.assign('./cart.html')
        });
    }


    //* 放大镜
    bigImg() {

        let box = this.$('#box');
        let small = this.$('.pro-bigImg');
        let mask = this.$('.mask');
        let big = this.$('.superPicture');
        let img = this.$('.Bigimg');
        // console.log(box, small, mask, big, img);
        small.onmouseover = function() {
            mask.style.display = 'block';
            big.style.display = 'block';
        }

        small.onmouseout = function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        }

        small.onmousemove = function(e) {
            // console.log(e.clientX)
            var x = e.clientX;
            var y = e.clientY;

            var offLeft = box.offsetLeft;
            var offTop = box.offsetTop;

            var targetX = x - offLeft;
            var targetY = y - offTop;

            targetX -= mask.offsetWidth / 2;
            targetY -= mask.offsetHeight / 2;

            var maxX = small.offsetWidth - mask.offsetWidth //small的宽 - mask的宽
            var maxY = small.offsetHeight - mask.offsetHeight //small的宽 - mask的宽

            targetX = targetX < 0 ? 0 : targetX;
            targetX = targetX > maxX ? maxX : targetX;
            targetY = targetY < 0 ? 0 : targetY;
            targetY = targetY > maxY ? maxY : targetY;

            mask.style.left = targetX + 'px';
            mask.style.top = targetY + 'px';

            var imgMaxX = img.offsetWidth - big.offsetWidth;
            var imgMaxY = img.offsetHeight - big.offsetHeight;

            var imgX = targetX / maxX * imgMaxX;
            var imgY = targetY / maxY * imgMaxY;

            img.style.left = -imgX + 'px';
            img.style.top = -imgY + 'px';
        }
    }

    //* 获取节点对象的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new Information;