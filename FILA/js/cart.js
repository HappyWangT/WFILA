class getCart {
    constructor() {
        this.getCartList()

        // 给.cart-table 绑定点击事件，进行分发
        this.$('.cart-table').addEventListener('click', this.dispatch);

        // 给全选按钮绑定点击事件
        this.$('#checkAll').addEventListener('click', this.checkAll);


    }

    //* 全选的实现
    checkAll = (eve) => {
        // console.log(this);

        //? 点击全选的时候，让单个商品的选择框状态跟随全选按钮
        let allStatus = eve.target.checked;
        // console.log(allStatus);

        //  全选时，单个按钮的状态
        this.oneCheckedWithAll(allStatus);

        // 调用统计数量和价格的方法
        this.countSumPrice();
    }

    //* 全选时，单个按钮的状态 
    oneCheckedWithAll(status) {
        // console.log(this.$('.checkList'));
        //? 循环单选按钮，将状态设置成全选按钮的状态
        this.$('.checkList').forEach(input => {
            // console.log(input);
            input.checked = status;
        })
    }

    //* 单选的实现
    oneChecked() {
        //? 遍历给每个单选按钮绑定点击事件
        if (Array.from(this.$('.checkList')).length > 1) {
            this.$('.checkList').forEach(input => {
                // console.log(input);

                // 保存this的指向
                let self = this;
                input.onclick = function() {
                    // 判断当前的点击状态
                    // console.log(this.checked);

                    //? 判断当前商品的input点击的是取消，则此时取消全选
                    if (!this.checked) {
                        self.$('#checkAll').checked = false;
                    }

                    //? 点击选中时，判断页面在是否有其他未选中的，如果都选中，则全选选中
                    if (this.checked) {
                        let status = self.getOneGoodsStatus();
                        self.$('#checkAll').checked = status;
                    }

                    self.countSumPrice();
                }
            })
        } else {
            let self = this;
            this.$('.checkList').onclick = function() {
                if (!this.checked) {
                    self.$('#checkAll').checked = false;
                }
                if (this.checked) {
                    let status = self.getOneGoodsStatus();
                    self.$('#checkAll').checked = status;
                }
                self.countSumPrice();
            }
        }
    }

    //* 获取单个商品的选中状态
    getOneGoodsStatus() {

        // 寻找是否有没选中的，如果页面都选中，res为空数组
        let res = Array.from(this.$('.checkList')).find(input => {
            // console.log(input);
            return !input.checked;
        })

        // 如果res有值，则页面中还有没被选中的，页面中都被选中，则返回true
        return !res;
    }

    //* 委托事件分发
    dispatch = (eve) => {
        let target = eve.target;
        // console.log(target);
        // console.log(target.className);
        //? 判断如果点击的是删除按钮，执行删除的函数 
        if (target.nodeName == 'P' && target.classList.contains('delete-one')) {
            this.cartDel(target);
        }

    }


    //* 获取购物车列表
    async getCartList() {
        // 从地址栏中获取goodsId
        // let gId = location.hash.split('#')[1];
        // console.log(gId);
        const TOKEN = localStorage.getItem('token');
        axios.defaults.headers.common['authorization'] = TOKEN;
        axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        let { status, data } = await axios.get('http://localhost:8888/cart/list', {
            params: {
                id: localStorage.getItem('userId')
            }
        });
        // console.log(res);
        // console.log(data);
        let html = '';
        // console.log(status, data)

        data.cart.forEach(val => {
            // console.log(val);
            html += `<tr class="goods-item" data-id="${val.goods_id}">
            <td class="td-check">
                <input type="checkbox" name="" class="checkList" value="" />
            </td>
            <td class="td-img">
                    <img src="${val.img_small_logo}" alt="">
            </td>
            <td class="td-infos">
                <div class="td-infos-top clearfix">
                    <div class="fl">
                        <h5>${val.title}</h5>
                        <p><span>颜色:匀乳白;尺码:M</span></p>
                    </div>
                    <div class="fr">
                          <span>￥${val.current_price}</span>
                        <span class="infos-price  price">小计：￥<i class="xiaoji">${val.current_price *val.cart_number}</i></span>
                        <span class="infos-mktprice">￥${val.price*val.cart_number}</span></div>
                </div>
                <div class="td-infos-bot clearfix">
                    <p class="fl"><span>数量：</span>
                       
                        <button class="remove num-minus ">-</button>
                        <span class="num-input  num">${val.cart_number}</span>
                        <button class=" num-plus  add">+</button>
                    </p>
                    <p class="fr delete-one">
                       删除</p>
                </div>
            </td>
        </tr>`;

        })
        this.$('.cart-table').innerHTML = html;

        //? 等待html加载完成之后，才能实现
        //? 单选按钮事件绑定 
        this.oneChecked();

    }

    //* 统计数量和价格
    countSumPrice() {
        // console.log(111111);
        let sum = 0;
        let num = 0;
        // console.log(this.$('.checkList'));
        if (Array.from(this.$('.checkList')).length > 1) {
            this.$('.checkList').forEach(input => {
                // console.log(input);
                // 如果选中单选框，则需要将该tr中的数量和小计相加
                if (input.checked) {
                    // console.log(111);
                    let tr = input.parentNode.parentNode;
                    // console.log(tr);
                    // 数量
                    let tmpNum = tr.querySelector('.num-input').innerHTML - 0;
                    num += tmpNum;
                    // 价格
                    let tmpSum = tr.querySelector('.xiaoji').innerHTML - 0
                    sum += tmpSum;
                }
            })
        } else {
            if (this.$('.checkList').checked) {
                // console.log(111);
                let tr = this.$('.checkList').parentNode.parentNode;
                // console.log(tr);
                // 数量
                let tmpNum = tr.querySelector('.num-input').innerHTML - 0;
                num += tmpNum;
                // 价格
                let tmpSum = tr.querySelector('.xiaoji').innerHTML - 0
                sum += tmpSum;
            }
        }
        // console.log(num, sum);
        this.$('.cartnum').innerHTML = num;
        this.$('.subtotal').innerHTML = sum;
    }

    //* 购物车删除，需要用户id，商品id
    cartDel(tar) {
        let self = this;
        localStorage.getItem('userId');
        // console.log(tar.parentNode.parentNode.parentNode);
        // console.log(goodsId);
        //? 点击删除按钮的弹出框
        layer.confirm('是否删除商品', {
            title: '删除提示框'
        }, function() { // 确认的回调函数
            // console.log(11);
            let tr = tar.parentNode.parentNode.parentNode;
            let goodsId = tr.dataset.id;
            let uId = localStorage.getItem('userId');
            // console.log(goodsId, uId);
            const TOKEN = localStorage.getItem('token');
            axios.defaults.headers.common['authorization'] = TOKEN;
            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            axios.get('http://localhost:8888/cart/remove', {
                params: {
                    id: uId,
                    goodsId: goodsId
                }
            }).then(res => {
                // console.log(res);
                //? 关闭弹出框 
                layer.closeAll();
                //? 无刷新删除 
                tr.remove();
                self.countSumPrice();
            })
        })

    }


    //* 获取节点对象的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new getCart;