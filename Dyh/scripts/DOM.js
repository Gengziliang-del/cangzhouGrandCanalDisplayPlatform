$("#addDOM").on('change', function () {
    if ($(this).is(':checked')) {
        console.log("显示");
        viewer.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                url: "http://localhost:8180/out/{z}/{x}/{y}.png",
                tilingScheme: new Cesium.WebMercatorTilingScheme(),
                maximumLevel: 10,  // 最大缩放级别
                tileWidth: 256,
                tileHeight: 256
            })
        );
    } else {
        console.log("隐藏");
    }
})