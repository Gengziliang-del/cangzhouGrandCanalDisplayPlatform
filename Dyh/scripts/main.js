//Token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ODA1M2JhYi02NzgyLTQxNjgtOWQxMi01OWMyM2FjYjFlNDQiLCJpZCI6MTUxMzQwLCJpYXQiOjE2ODg0NzM5OTl9.Xl-U6Par_DVb2IJ6efQ77Z4nUw7FiaFEBjNwYvSfi80';
let viewer= new Cesium.Viewer("cesiumContainer",{
    //是否显示工具
    geocoder : false ,//位置查找
    homeButton: false, //首页位置
    sceneModePicker:false,//视角模式
    baseLayerPicker:false,//图层选择
    navigationHelpButton:false,//导航帮助
    animation:false,//动画
    timeline:false,//时间轴
    fullscreenButton:false,//全屏按钮
    //其他参数
});

// 设置初始视角 - 沧州市坐标
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(116.8491,38.2397,12000),
    orientation: {
        heading: Cesium.Math.toRadians(0.0),
        pitch: Cesium.Math.toRadians(-60.0),
        roll: 0.0
    }
});




