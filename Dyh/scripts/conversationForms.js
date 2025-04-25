// 始终监视
let clickedBound = false; // 标志：是否已经绑定过点击事件
const inter = setInterval(function () {
    let button = $('#dify-chatbot-bubble-button')[0];
    if (button) {
        // 如果按钮存在，且尚未绑定点击事件
        if (!clickedBound) {
            $(button).on('click', function () {
                // console.log('按钮被点击了，当前样式为：', this.style);
                buttonClick();
            });

            clickedBound = true;
        }
    }
}, 500);


function buttonClick() {
    let win = document.getElementById('dify-chatbot-bubble-window');
    if (win) {
        if (win.style.display !== 'none') {
            console.log('显示聊天窗口');
            ChangeStyle(win);
        }
    }
}

function ChangeStyle(win) {
    win.style.removeProperty("bottom");
    win.style.removeProperty("flex-direction");
    win.style.removeProperty("justify-content");
    win.style.removeProperty("left");
    win.style.removeProperty("right");
    win.style.removeProperty("bottom");
    win.style.removeProperty("width");
    win.style.removeProperty("max-width");
    win.style.removeProperty("max-height");
    // win.style.backgroundColor="white";

    win.style.max_height = "150px";
    win.style.max_width = "140px";
    win.style.height = "150px";
    win.style.width = "140px";
    win.style.top = "-600px";
    win.style.left = "-350px";
    win.style.overflow = "hidden";
    console.log(win.style);
}


