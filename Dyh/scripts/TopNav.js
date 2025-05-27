$('.menu-item').on('click', function () {
    const text = $(this).text(); // 获取点击项的文本
    if (text === "大运河") {
        enterTheScene();

        console.log("你点击了大运河");
    }
});

$('.menu-item').on('click', function () {
    const text = $(this).text(); // 获取点击项的文本
    if (text === "沧州") {
        if (geoJsonDataSource) {
            viewer.dataSources.remove(geoJsonDataSource, true); // 第二个参数表示是否销毁
            geoJsonDataSource = null; // 如果需要可清空变量
        }
        viewer.camera.flyTo(
            {
                destination: Cesium.Cartesian3.fromDegrees(116.8506, 38.2352, 6252),
                orientation: {
                    heading: Cesium.Math.toRadians(0),
                    pitch: Cesium.Math.toRadians(-41),
                    roll: 0
                },
            }
        )
        console.log("你点击了沧州");
    }
});


$('#enterButton').on('click', function () {
    $('#popup-container').hide();
    if (geoJsonDataSource) {
        viewer.dataSources.remove(geoJsonDataSource, true); // 第二个参数表示是否销毁
        geoJsonDataSource = null; // 如果需要可清空变量
    }
    viewer.camera.flyTo(
        {
            destination: Cesium.Cartesian3.fromDegrees(116.8506, 38.2352, 6252),
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-41),
                roll: 0
            },
        }
    )
});