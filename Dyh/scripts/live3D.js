function addReality3DData() {
    const tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: "./TDTiles/tileset.json",
            maximumScreenSpaceError: 32, // 放大误差，显示更远
            skipLevelOfDetail: true,
            immediatelyLoadDesiredLevelOfDetail: true,
        })
    );

    // 调整地球层最大误差
    viewer.scene.globe.maximumScreenSpaceError = 64;
    // tileset.cullRequestsWhileMoving = false; // 移动过程中不剔除瓦片
    // tileset.cullWithChildrenBounds = false; // 禁用子瓦片包围盒剔除
    tileset.skipScreenSpaceErrorFactor = 16.0; // 减少剔除
    // tileset.maximumMemoryUsage = 10240; // 单位是MB，默认是512
    // tileset.tileUnloadPolicy = new Cesium.NeverTileUnloadPolicy();

    tileset.readyPromise.then(() => {
        // 摄像机飞到瓦片中心，距离调整为半径的2倍
        viewer.camera.viewBoundingSphere(tileset.boundingSphere, new Cesium.HeadingPitchRange(0, -0.5, tileset.boundingSphere.radius * 2.0));
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }).otherwise(error => {
        console.error("加载瓦片失败:", error);
    });

    return tileset;
}


let tileset = null;
$('#add3DData').on('change', function () {
    if ($(this).is(':checked')) {
        //被勾选了，执行加载实景三维逻辑
        console.log('加载实景三维数据');
        tileset = addReality3DData();

        viewer.zoomTo(tileset);
    } else {
        //取消勾选，执行移除实景三维逻辑
        console.log('移除实景三维数据');
        viewer.scene.primitives.remove(tileset);
    }
});