class List {
    constructor() {
        this.judge();
        this.getData();
        this.$('.goods-list').addEventListener('click', this.goodsHref);
        this.$('.cartIcon').addEventListener('click', this.getCartData.bind(this));
    }
    prevBtn = document.querySelector(".prev");
    totalBtn = document.querySelector(".total");
    nextBtn = document.querySelector(".next");
    current = 1;
    pagesize = 12;
    total;
    data = '';
    lock = false;

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

    //* 下一页按钮
    nextHandler() {
        if (this.current >= this.total) return;
        if (this.lock) return;
        this.lock = true;
        setTimeout(() => {
            this.lock = false;
        }, 500)
        this.getData(++this.current)
    }

    //* 上一页按钮
    prevHandler() {
        if (this.current <= 1) return;
        if (this.lock) return;
        this.lock = true;
        setTimeout(() => {
            this.lock = false;
        }, 500)
        this.getData(--this.current)
    }


    //* 获取数据的方法 
    async getData(current = 1) {

        let { status, data } = await axios.get('http://localhost:8888/goods/list?current=' + this.current);
        // console.log(data.total);
        if (status != 200 || data.code != 1) throw new Error('获取不到数据呢')

        this.data = data.list;
        this.nextBtn.addEventListener("click", this.nextHandler.bind(this))
        this.prevBtn.addEventListener("click", this.prevHandler.bind(this))
        this.bing(data)

        // let html = '';
        // 遍历数组，添加数据
        // data.list.forEach(goods => {
        //     // console.log(goods);
        //     html += `<li class="goods-item J_goods_item log1 " data-id="${goods.goods_id}">
        //     <div class="goods-body" data-id="${goods.goods_id}">
        //         <img src="${goods.img_big_logo}" style="display: inline;" id="goodsImg" data-id="${goods.goods_id}">
        //         <a target="_blank" href="./information.html" class="goods-name ellipsis" data-id="${goods.goods_id}">${goods.title}</a>
        //         <div class="goods-thumbs J_goods_thumbs " data-id="${goods.goods_id}">
        //             <a href="./information.html" class="thumbs-btn prev" ></a>
        //             <ul class="thumbs-list J_thumbs_list">
        //                 <li class="">
        //                     <a href="">
        //                         <img src="${goods.img_big_logo}"  class="colorimg loading" style="display: inline;" data-id="${goods.goods_id}"></a>
        //                 </li>
        //             </ul>
        //             <a href="./information.html" class="thumbs-btn next"></a>
        //         </div>
        //         <a href="" class="goods-price" data-id="${goods.goods_id}">
        //             <span data-id="${goods.goods_id}">￥${goods.current_price}</span> <span class="mkt-price" data-id="${goods.goods_id}">￥${goods.price}</span></a>
        //     </div>
        // </li>`
        // });

        // this.$('.goods-list').innerHTML += html;

    }

    //* 准备一个渲染函数，专门用来渲染页面
    bing(data) {
        // console.log(data);
        // console.log(data.total);
        let goodAll = data.list;
        // var data = this.data;
        let html = '';
        goodAll.forEach(goods => {
            // console.log(goods);
            html += `
        <li class="goods-item J_goods_item log1 " data-id="${goods.goods_id}">
        <div class="goods-body" data-id="${goods.goods_id}">
            <img src="${goods.img_big_logo}" style="display: inline;" id="goodsImg" data-id="${goods.goods_id}">
            <a target="_blank" href="./information.html" class="goods-name ellipsis" data-id="${goods.goods_id}">${goods.title}</a>
            <div class="goods-thumbs J_goods_thumbs " data-id="${goods.goods_id}">
                <a href="./information.html" class="thumbs-btn prev" ></a>
                <ul class="thumbs-list J_thumbs_list">
                    <li class="">
                        <a href="">
                            <img src="${goods.img_big_logo}"  class="colorimg loading" style="display: inline;" data-id="${goods.goods_id}"></a>
                    </li>
                </ul>
                <a href="./information.html" class="thumbs-btn next"></a>
            </div>
            <a href="" class="goods-price" data-id="${goods.goods_id}">
                <span data-id="${goods.goods_id}">￥${goods.current_price}</span> <span class="mkt-price" data-id="${goods.goods_id}">￥${goods.price}</span></a>
        </div>
                </li>`
        });
        // var bingList = data.slice((this.current - 1) * this.pagesize, this.current * this.pagesize);

        // 将页面重新进行渲染
        this.$('.goods-list').innerHTML = html;
        // console.log(data.total);
        // console.log(this.pagesize);
        // console.log(data.total / this.pagesize);
        let maxPage = data.total / this.pagesize;
        // console.log(maxPage);
        this.total = Math.ceil(maxPage);
        this.totalBtn.innerHTML = `${this.current}/${this.total}`;

    }



    async getCartData() {
        // console.log(11);
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
            // this.$('.num-input').value = val.cart_number + num;
        })

        this.$('#cartinfo').innerHTML = html;
    }


    //* 跳转页面
    goodsHref = (eve) => {
        console.log(eve.target.nodeName);
        // console.log(eve.target.dataset.id);
        // location.assign('./information.html')
        // if (eve.target.nodeName !== "LI") return;
        if (!eve.target.dataset.id) return;
        let goodsId = eve.target.dataset.id;
        // console.log(goodsId);
        location.hash = goodsId // 将hash值添加到链接的尾部，跳转的时候携带。
        location.href = "./information.html" + location.hash;
    }

    //* 获取节点对象的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new List;