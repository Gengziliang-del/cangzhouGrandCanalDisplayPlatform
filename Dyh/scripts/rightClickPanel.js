//点击获取的坐标，用于环绕
let earthPosition = null;
//是否继续旋转
let rotateFlag = true;
//获取弹出菜单对象
const menu = document.getElementById("contextMenu");

/////////////////右键弹出菜单//////////////////////////
// 禁用浏览器默认的右键菜单
document.addEventListener("contextmenu", (e) => e.preventDefault());

//右键点击时获取点击坐标并且弹出菜单
let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (event) {
    //获取点击坐标
    earthPosition = viewer.camera.pickEllipsoid(event.position);
    //暂停环绕
    rotateFlag = false;
    ////显示菜单////
    menu.style.display = "block";//
    menu.style.left = event.position.x + "px";
    menu.style.top = event.position.y + "px";
    console.log("dianji=");
}, Cesium.ScreenSpaceEventType.RIGHT_DOWN)


////////点击屏幕时关闭菜单并终止旋转////////////
document.addEventListener("click", (event) => {
    menu.style.display = "none";
    if (!menu.contains(event.target)) {
        rotateFlag = false;
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }
});


///////////点击环绕//////////////
$('#surrounding').on('click', function () {
    const height = viewer.camera.positionCartographic.height.toFixed(0);
    let angle = 0;//初始角度
    rotateFlag = true;//是否暂停标记

    //开始环绕
    function rotateCamera() {
        if (!rotateFlag) return;//检查是否终止环绕
        angle += Cesium.Math.toRadians(0.1);
        viewer.camera.lookAt(
            earthPosition,
            new Cesium.HeadingPitchRange(
                angle, Cesium.Math.toRadians(-30), height)
        )
        requestAnimationFrame(rotateCamera);
    }

    rotateCamera();

});


// 飞往某处
$('#flyTo').on('click', function () {
    let newPosition = Transfrom(earthPosition, 500);
    viewer.camera.flyTo(
        {
            destination: newPosition,
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-90),
                roll: 0
            },
            maximumHeight: 100,
        }
    )
});


//转换坐标
function Transfrom(earthPosition, newHeight) {
    let cartographic = Cesium.Cartographic.fromCartesian(earthPosition);
    let longitude = Cesium.Math.toDegrees(cartographic.longitude);
    let latitude = Cesium.Math.toDegrees(cartographic.latitude);
    let currentAltitude = cartographic.height; // 当前的高度（相对地面）

    // 计算上空500米的新位置
    let altitude = currentAltitude + newHeight; // 当前高度 + 500米

    // 使用新的经纬度和计算出的高度创建新位置
    return Cesium.Cartesian3.fromDegrees(longitude, latitude, altitude);
}
