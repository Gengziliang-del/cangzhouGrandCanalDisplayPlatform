function POI_Add({path, DataSource_obj, image, scale = 0.7}) {
    //加载指定路径的GeoJSON文件
    promise = Cesium.GeoJsonDataSource.load(
        path,
        {}
    );
    // 加载完成后自定义图标
    promise.then(function (dataSource) {
        // 将数据源添加到 Cesium Viewer
        viewer.dataSources.add(dataSource);
        DataSource_obj.source = dataSource;

        // 获取所有实体
        const entities = dataSource.entities.values;

        // 遍历所有实体
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];

            // 检查是否为 "点"（Point）
            if (entity.position) {
                console.log(entity);
                const type = entity._properties._Type._value;
                console.log( "./ico/"+type+".png");

                // 移除默认样式（如 marker）
                entity.billboard = new Cesium.BillboardGraphics({
                    image: "./ico/landmark/"+type+".png", // 自定义图标路径
                    scale: scale, // 自定义图标缩放比例
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 图标对齐方式
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 对齐地面
                });
            }
        }
    });
}



let POI={source:null};
$('#addPOI').on('change',function (){
    if ($(this).is(':checked')) {
       POI_Add(
           {
               path:"./jsonData/attr3.geojson",
               image:"./ico/icons8-park-32-2.png",
               scale:0.8,
               DataSource_obj:POI,
           }
       )
    }
    else{
        viewer.dataSources.remove(POI.source);
    }
})

