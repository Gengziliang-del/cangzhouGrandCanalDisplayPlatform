// 工具栏菜单控制
const topBarButtons = document.querySelectorAll('.nav-item');
const topMenuPanels = document.querySelectorAll('.topMenu-panel');

topBarButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        let  menuType = button.dataset.menu;
        console.log(menuType);
        //根据菜单名称确认选择的菜单（menutype插入）
        const targetMenu = document.querySelector(`.${menuType}-menu`);
        console.log(targetMenu);

        // 关闭其他菜单
        topMenuPanels.forEach(panel => {
            if (panel !== targetMenu) {
                panel.classList.remove('active');
            }
        });

        // 切换目标菜单
        if (targetMenu) {
            targetMenu.classList.toggle('active');
            if (targetMenu.classList.contains('active')) {
                const buttonRect = button.getBoundingClientRect();
                targetMenu.style.top = `${buttonRect.bottom + 10}px`;
                targetMenu.style.left = `${buttonRect.left}px`;
            }
        }

        // 给所有顶部菜单项绑定点击事件，点击后关闭弹出菜单
        topMenuPanels.forEach(panel => {
            const items = panel.querySelectorAll('.menu-item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    panel.classList.remove('active');
                });
            });
        });
    });
});
//--------------------------------------------------------------//


/////////////////////图层点击事件////////////////////////////////
// 图层控制
const addLayerBtn = document.querySelector('.add-layer-btn');
const layerMenu = document.querySelector('.layer-menu');
const layerPanel = document.querySelector('.layer-panel');

addLayerBtn.addEventListener('click', () => {
    layerMenu.classList.toggle('active');
    layerPanel.classList.toggle('active');
    // 切换按钮
    const plusIcon = document.getElementById('plusIcon');
    if(plusIcon.classList['value'] ==='icon plus-icon')
    {
        plusIcon.classList['value']="icon minus-icon";
    }
    else {
        plusIcon.classList['value']="icon plus-icon";
    }
});

// 图层开关控制
const layerSwitches = document.querySelectorAll('.layer-item input[type="checkbox"]');

layerSwitches.forEach(switch_ => {
    switch_.addEventListener('change', (e) => {
        const layerName = e.target.closest('.layer-item').querySelector('span').textContent;
        // 这里可以添加具体的图层显示/隐藏逻辑
        console.log(`${layerName} ${e.target.checked ? '显示' : '隐藏'}`);
    });
});
//-------------------------------------------------------------------------//


////////////////////////////状态栏////////////////////////////////////////
// 状态栏信息更新
const coordinatesElement = document.querySelector('.coordinates');
const viewHeightElement = document.querySelector('.view-height');
const scaleElement = document.querySelector('.scale');

viewer.scene.globe.enableLighting = true;

viewer.scene.postRender.addEventListener(() => {
    const camera = viewer.camera;
    const position = camera.positionCartographic;

    // 更新经纬度
    const longitude = Cesium.Math.toDegrees(position.longitude).toFixed(4);
    const latitude = Cesium.Math.toDegrees(position.latitude).toFixed(4);
    coordinatesElement.textContent = `经度: ${longitude}° 纬度: ${latitude}°`;

    // 更新视高
    const height = position.height.toFixed(0);
    viewHeightElement.textContent = `视高: ${height}m`;

    // 更新比例尺（简化计算）
    const scale = Math.round(height / 100) * 100;
    scaleElement.textContent = `1:${scale}`;
});
//-----------------------------------------------------------------//


///////////////////////////////点击空白处关闭菜单////////////////////////
// 点击页面空白处关闭菜单
document.addEventListener('click', (e) => {
    // 关闭顶部导航栏弹出菜单
    document.addEventListener('click', (e) => {
        // 如果点击的目标不在任一菜单或者导航栏中
        if (!e.target.closest('.topMenu-panel') && !e.target.closest('.top-nav')) {
            // 遍历所有菜单并移除 active 类
            document.querySelectorAll('.topMenu-panel').forEach(panel => {
                panel.classList.remove('active');
            });
        }
    });

//点击工具条（含子内容）
    if (e.target.closest('.toolMenu-panel')) {
        //关闭菜单
        layerMenu.classList.remove('active');
    }
});
//---------------------------------------------------------------//


/////////////////////////收起导航栏///////////////////////////////////
//收起打开导航栏
// 获取导航栏和尾巴按钮的 DOM 元素
const topNav = document.querySelector('.top-nav');
const bubble = document.getElementById('navToggleBubble');

// 点击页面其他区域时收起导航栏，并显示尾巴按钮
document.addEventListener('click', function (event) {
    // 如果点击的目标既不在导航栏、也不在尾巴，并且导航栏当前是展开状态
    if (!topNav.contains(event.target) &&
        !bubble.contains(event.target) &&
        !topNav.classList.contains('hidden')) {  // 仅当导航栏处于显示状态时才隐藏
        topNav.classList.add('hidden');
        topNav.addEventListener('transitionend', function handler(e) {
            if (e.propertyName === 'top') {
                bubble.classList.remove('hidden');
                bubble.classList.add('slide-down');
                topNav.removeEventListener('transitionend', handler);
            }
        });
    }
});
// 点击尾巴按钮时，展开导航栏，并用动画效果让尾巴逐渐“融入”导航栏
bubble.addEventListener('click', function (event) {
    event.stopPropagation();  // 阻止事件冒泡，避免触发 document 的 click
    // 先显示导航栏
    topNav.classList.remove('hidden');
    // 给尾巴添加 expanding 类，触发 CSS 动画：上移并淡出
    bubble.classList.add('expanding');

    // 动画结束后，隐藏尾巴
    setTimeout(function () {
        bubble.classList.remove('expanding');
        bubble.classList.add('hidden');
    }, 300);  // 与 CSS transition 的时间保持一致
});
//---------------------------------------------------------------------//


///////////////////////////拖动工具条/////////////////
//拖动工具条
;(function() {
    const toolbar = document.querySelector('.toolbar');
    let isDragging = false;
    let startX, startY, origX, origY;
    // 拖动范围上下限
    let minX = 0, minY = 0, maxX, maxY;

    // 计算当前可拖动的边界
    function updateBounds() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const tw = toolbar.offsetWidth;
        const th = toolbar.offsetHeight;
        minX = 0;
        minY = 0;
        maxX = vw - tw;
        maxY = vh - th;
        // 如果此时 toolbar 已经超出边界，就立即修正位置
        const curLeft = toolbar.offsetLeft;
        const curTop  = toolbar.offsetTop;
        if (curLeft < minX) toolbar.style.left = minX + 'px';
        if (curLeft > maxX) toolbar.style.left = maxX + 'px';
        if (curTop  < minY) toolbar.style.top  = minY + 'px';
        if (curTop  > maxY) toolbar.style.top  = maxY + 'px';
    }

    // 初始化边界
    updateBounds();
    // 监听窗口尺寸变更
    window.addEventListener('resize', updateBounds);

    toolbar.style.cursor = 'move';
    toolbar.addEventListener('mousedown', e => {
        // 只点在 toolbar 背景（非按钮区域）才拖拽
        if (e.target.closest('.tab-item')) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        origX = toolbar.offsetLeft;
        origY = toolbar.offsetTop;
        toolbar.style.transition = 'none';

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup',   onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        // 计算新的位置
        let newX = origX + (e.clientX - startX);
        let newY = origY + (e.clientY - startY);
        // 限制在边界内
        newX = Math.min(maxX, Math.max(minX, newX));
        newY = Math.min(maxY, Math.max(minY, newY));
        toolbar.style.left = newX + 'px';
        toolbar.style.top  = newY + 'px';
    }

    function onMouseUp() {
        if (!isDragging) return;
        isDragging = false;
        toolbar.style.transition = '';
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup',   onMouseUp);
    }
})();
//-------------------------------------------------------------//