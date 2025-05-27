const czcoverLon = 118.7590
const czcoverLat = 25.5033

const cloudHeight = 1187368;
const cloudPosition = Cesium.Cartesian3.fromDegrees(czcoverLon, czcoverLat, cloudHeight);

// 相机位置置于云层中
CameraLookAt({Cz: 30});

//创建并添加云集合clouds
let clouds = viewer.scene.primitives.add(
    new Cesium.CloudCollection({
        noiseDetail: 16.0,//细节量
    })
);
//向云集合中添加云
let cloud = clouds.add({
    position: cloudPosition,
    //云层的东西、南北、垂直方向上的厚度
    maximumSize: new Cesium.Cartesian3(1000.0, 600.0, 400.0), // 三维云朵尺寸
    slice: 0.3,          // 可选：显示厚度
    brightness: 0.8      // 云亮度
})

//当进入按钮按下时
function enterTheScene() {
    //关闭封面
    let cover = document.getElementById("cover");
    cover.style.display = "none";

    //穿越云层
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(czcoverLon, czcoverLat, cloudHeight - 0.5),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-55),
            roll: Cesium.Math.toRadians(0),
        },
        maximumHeight: cloudHeight + 20,
        duration: 5,
        complete: function () {
            // 清除云层
            viewer.scene.primitives.remove(clouds);


// 加载 GeoJSON 并存储引用
            Cesium.GeoJsonDataSource.load("./jsonData/大运河.geojson", {
                fill: Cesium.Color.fromCssColorString('rgba(50,110,247,0.8)'),     // 填充颜色
                stroke: Cesium.Color.fromCssColorString('rgba(1,62,202,0.9)'),     // 轮廓颜色
                strokeWidth: 4                                                     // 轮廓宽度
            }).then(function(dataSource) {
                geoJsonDataSource = dataSource;
                viewer.dataSources.add(dataSource);
            });
           LoadGeoJson("扒鸡");
            $('#popup-container').show();
        },
    });

    // 重置相机变换矩阵
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
}

function CameraLookAt({lon = czcoverLon, lat = czcoverLat, height = cloudHeight, Cx = 0, Cy = 0, Cz = 0}) {
    viewer.camera.lookAt(
        //相机聚焦经纬度
        Cesium.Cartesian3.fromDegrees(czcoverLon, czcoverLat, height),
        //相机x轴偏移量、y轴偏移量、z轴偏移量
        new Cesium.Cartesian3(Cx, Cy, Cz),
    );
}