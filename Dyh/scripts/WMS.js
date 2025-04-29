function addWFM(){
    viewer._cesiumWidget._creditContainer.style.display = "none";
    let imageryProvider = new Cesium.WebMapServiceImageryProvider({
        url: 'http://localhost:8180/geoserver/DYH/wms?',
        layers: 'roadLine',
        parameters: {
            transparent: true,
            format: "image/png",
            crs: "EPSG:4326", // 使用与WMS服务地址一致的CRS
        }

    });

// 创建一个ImageryLayer实例，将ImageryProvider添加到场景中
    let imageryLayer = new Cesium.ImageryLayer(imageryProvider);
    global_road_layer=imageryLayer;
    console.log(global_road_layer);
    viewer.imageryLayers.add(imageryLayer);

    //是否跳转到。。。
    // viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (commandInfo) {
    //     // Fly to tileset
    //     viewer.flyTo(tileset);
    //     // Tell the home button not to do anything
    //     commandInfo.cancel = true;
    // });
}

let global_road_layer = null;
$('#addRoad').on('change',function (){
    if ($(this).is(':checked')) {
        addWFM();

    }
    else{
        viewer.imageryLayers.remove(global_road_layer);
    }
})