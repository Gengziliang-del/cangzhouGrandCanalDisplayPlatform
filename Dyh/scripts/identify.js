// 设置事件处理器来监听点击事件
viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
    const pickedFeature = viewer.scene.pick(movement.position);
    if (Cesium.defined(pickedFeature)) {
        // 输出被点击实体的属性
        console.log("Entity properties:", pickedFeature.id._properties._Describe._value);
        $('#bubblePanel').removeClass('bubbleHidden');
        const Name = pickedFeature.id._properties._Name._value;
        $('#bubblePanel-title').text(Name);
        const imgPath = "./image/" + Name + ".png"
        $('#bubblePanel-img').attr("src", imgPath);
        $('#bubble-describe').text(pickedFeature.id._properties._Describe._value);
    }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

$('#bubblePanel-close').on('click', function () {
    console.log("关闭");
    $('#bubblePanel').addClass('bubbleHidden');
})