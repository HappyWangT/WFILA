class List {
    constructor() {
        this.getData();
        this.$('.goods-list').addEventListener('click', this.goodsHref)
    }



    //* 获取数据的方法 
    async getData() {
        let { status, data } = await axios.get('http://localhost:8888/goods/list');
        // console.log(data);
        if (status != 200 || data.code != 1) throw new Error('获取不到数据呢')
        let html = '';
        // 遍历数组，添加数据
        data.list.forEach(goods => {
            // console.log(goods);
            html += `<li class="goods-item J_goods_item log1 " data-id="${goods.goods_id}">
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

        this.$('.goods-list').innerHTML += html;


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