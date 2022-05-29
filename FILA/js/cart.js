class getCart {
    constructor() {
        this.getCartList();
    }

    //* 获取购物车列表
    async getCartList() {
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
        console.log(data);
        let html = '';

        data.cart.forEach(val => {
            // console.log(val);
            html += `<tr class="goods-item ">
            <td class="td-check">
                <input type="checkbox" name="" id="checkList" value="" />
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
                        <span class="infos-price  price">￥${val.price}</span>
                        <span class="infos-mktprice">￥${val.current_price}</span></div>
                </div>
                <div class="td-infos-bot clearfix">
                    <p class="fl"><span>数量：</span>
                       
                        <button class="remove num-minus ">-</button>
                        <span class="num-input  num">1</span>
                        <button class=" num-plus  add">+</button>
                    </p>
                    <p class="fr">
                        <a href="javascript:;" class="delete-one" style="color:red">删除</a></p>
                </div>
            </td>
        </tr>`
        })
        this.$('.cart-table').innerHTML = html;
        // console.log(html);
    }

    //* 删除购物车中的一条商品



    //* 获取节点对象的方法
    $(ele) {
        let res = document.querySelectorAll(ele);
        return res.length == 1 ? res[0] : res;
    }
}
new getCart;