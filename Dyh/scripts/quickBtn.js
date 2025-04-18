$('.view-btn').on('click', function () {
    const icon2d = $(this).find('.icon-2d');
    const icon3d = $(this).find('.icon-3d');

    // 切换图标显示隐藏
    icon2d.toggle();
    icon3d.toggle();

    // 判断当前是否为 3D，如果是就切换到 2D，否则切回 3D
    const currentMode = viewer.scene.mode;
    if (currentMode === Cesium.SceneMode.SCENE3D) {
        viewer.scene.morphTo2D(1.0); // 动画切换到2D，1秒
    } else {
        viewer.scene.morphTo3D(1.0); // 动画切换到3D，1秒
    }
});

$('.home-btn').on('click',function (){
    viewer.camera.flyTo(
        {
            destination:Cesium.Cartesian3.fromDegrees(116.8491,38.2397,12000),
            orientation:{
                heading:Cesium.Math.toRadians(0),
                pitch:Cesium.Math.toRadians(-60),
                roll:0
            },
        }
    )
    //重置相机到默认状态
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
});

$('.compass-btn').on('click',function (){

    const camera = viewer.camera;
    const currentPitch = camera.pitch;
    const currentRoll = camera.roll;
    const currentPosition = camera.positionWC.clone(); // 保留当前位置

    camera.flyTo({
        destination: currentPosition,
        orientation: {
            heading: Cesium.Math.toRadians(0), // 设置为正北
            pitch: currentPitch,
            roll: currentRoll
        },
        duration: 1.2
    });
});