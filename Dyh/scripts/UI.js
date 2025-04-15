// 工具栏菜单控制
const toolbarButtons = document.querySelectorAll('.tab-item');
const menuPanels = document.querySelectorAll('.toolMenu-panel');

toolbarButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        let  menuType = button.dataset.menu;
        console.log(menuType);
        //根据菜单名称确认选择的菜单（menutype插入）
        const targetMenu = document.querySelector(`.${menuType}-menu`);

        // 关闭其他菜单
        menuPanels.forEach(panel => {
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

        menuPanels.forEach(panel => {
            const items = panel.querySelectorAll('.menu-item');
            items.forEach(item => {
                item.addEventListener('click', () => {
                    panel.classList.remove('active');
                });
            });
        });

        const toolbar = document.querySelector('.toolbar');
        // toolbar.classList.remove('menu-open');
        toolbar.classList.add('menu-open');
    });
});

//////////////////////////////////////////待定!!

// 工具栏菜单控制
const topbarButtons = document.querySelectorAll('.nav-item');
const topMenuPanels = document.querySelectorAll('.topMenu-panel');

topbarButtons.forEach(button => {
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

/////////////////////////////////////////////////////


// 图层控制
const addLayerBtn = document.querySelector('.add-layer-btn');
const layerMenu = document.querySelector('.layer-menu');

addLayerBtn.addEventListener('click', () => {
    layerMenu.classList.toggle('active');
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

// 点击页面空白处关闭菜单
document.addEventListener('click', (e) => {
    if (!e.target.closest('.toolbar') && !e.target.closest('.toolMenu-panel')) {
        menuPanels.forEach(panel => panel.classList.remove('active'));
        //恢复气泡
        const toolbar = document.querySelector('.toolbar');
        toolbar.classList.remove('menu-open');
    }
    // 关闭顶部导航栏弹出菜单
    if (!e.target.closest('.topMenu-panel') && !e.target.closest('.top-nav')) {
        const topMenuPanel = document.querySelector('.topMenu-panel');
        if (topMenuPanel) {
            topMenuPanel.classList.remove('active');
        }
    }
//点击工具条（含子内容）
    if (e.target.closest('.toolMenu-panel')) {
        // alert("dianji");
        //恢复气泡
        const toolbar = document.querySelector('.toolbar');
        toolbar.classList.remove('menu-open');
        //关闭菜单
        layerMenu.classList.remove('active');
    }
});

// 视图控制菜单响应
const viewMenuItems = document.querySelectorAll('.view-menu .menu-item');

viewMenuItems.forEach(item => {
    item.addEventListener('click', () => {
        const viewType = item.textContent;
        switch(viewType) {
            case '2D视图':
                viewer.scene.morphTo2D(1);
                break;
            case '3D视图':
                viewer.scene.morphTo3D(1);
                break;
            case '俯视图':
                viewer.camera.setView({
                    destination: Cesium.Cartesian3.fromDegrees(
                        116.8452, 38.3047, 50000
                    ),
                    orientation: {
                        heading: 0,
                        pitch: -Cesium.Math.PI_OVER_TWO,
                        roll: 0
                    }
                });
                break;
        }
    });
});


/////////////////////////收起导航栏///////////////////////////////////
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
/////////////////////////////////////////////////////////////////////


///////////////////////////
// 假设 targetMenu 是你打开的工具条菜单

////////////////////////////