 // 获取节点对象
 let ulLis = document.querySelectorAll('.img-list li');
 let olLis = document.querySelectorAll('.img-icon li');
 let prev = document.querySelector('#goPrev');
 // console.log(prev);
 let next = document.querySelector('#goNext');
 // console.log(next);
 let box = next.parentNode;
 // console.log(box);



 // 设置上一张图片的索引————需要隐藏进去的图片
 let lastIndex = 0;
 // 设置当前图片的索引————需要显示出来的图片
 let index = 0;


 // 1、实现通过ol里面的li来切换图片

 // 给olLis绑定鼠标点击事件，遍历里面所有的li
 olLis.forEach((li, key) => {
     // 遍历出所有的li
     // console.log(li);
     // console.log(key);
     // 给li绑定点击事件
     li.onclick = function() {
         // console.log(111);
         // 点击之后，实现切换图片
         lastIndex = index;
         index = key;
         // console.log(lastIndex, index);

         // 调用change函数，使类名修改，实现图片切换和焦点改变的效果
         change();
     }
 })


 // 2、通过按钮实现图片切换

 // 向前切换
 prev.onclick = function() {
     // 将当前图片的索引给上一张图片，
     lastIndex = index;
     // 图片进行切换时，索引值-1，往前进行切换图片
     index--;
     // console.log(lastIndex, index);

     // 判断索引值小于0的时候，说明已经切换到第一张图片了，此时应该将索引值重新设置成最大索引值
     if (index < 0) index = ulLis.length - 1

     // 调用change函数，实现图片类名的改变
     change()
 }


 // 向后切换
 next.onclick = function() {
     // 将当前图片的索引给上一张图片，
     lastIndex = index;
     // 图片进行切换时，索引值+1，往后进行切换图片
     index++;
     // console.log(lastIndex, index);
     // 判断索引值大于最大索引值的时候，说明已经切换到最后一张图片了，此时应该将索引值重新设置为0
     if (index > ulLis.length - 1) index = 0;
     change()
 }



 // 3、设置图片自动切换

 // 保存定时器的返回值
 let times = '';

 // 创建自动切换函数
 function autoPlay() {
     // 设置定时器
     times = setInterval(function() {
         // 调用切换下一张的函数
         next.onclick()
     }, 3000)
 }
 // 调用函数
 autoPlay()






 // 设置切换时的函数，因为需要设置很多次，所以单独写一个函数，谁需要谁调用
 function change() {
     // 上一张图片的类名为空
     // 图片类名设置为空
     ulLis[lastIndex].className = '';
     // 焦点类名设置为空
     olLis[lastIndex].className = '';

     // 当前图片的类名为ac
     // 图片类名设置为ac
     ulLis[index].className = 'ac';
     // 焦点类名设置为ac
     olLis[index].className = 'ac';

 }