function addReality3DData() {
    const tileset = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: "./3dTiles/3dTiles1.0/tileset.json",
            maximumScreenSpaceError: 32,
            //- 直接跳转到所需的详细层级，避免加载低分辨率过渡瓦片，适用于提升性能和用户体验的场景
            skipLevelOfDetail: true,
            immediatelyLoadDesiredLevelOfDetail: true,
        })
    );
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