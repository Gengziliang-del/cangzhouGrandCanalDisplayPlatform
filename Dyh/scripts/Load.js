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
                console.log("./ico/" + type + ".png");

                // 移除默认样式（如 marker）
                entity.billboard = new Cesium.BillboardGraphics({
                    image: "./ico/POI/" + type + ".png", // 自定义图标路径
                    // image:image,
                    scale: scale, // 自定义图标缩放比例
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 图标对齐方式
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // 对齐地面
                });
            }
        }
    });
}


let POI = {source: null};
$('#addPOI').on('change', function () {
    if ($(this).is(':checked')) {
        POI_Add(
            {
                path: "./jsonData/dyh_POI.geojson",
                image: "./ico/icons8-park-32-2.png",
                scale: 0.8,
                DataSource_obj: POI,
            }
        )
    } else {
        viewer.dataSources.remove(POI.source);
    }
})


function LoadGeoJson(jsonName) {
    Cesium.GeoJsonDataSource.load("./jsonData/" + jsonName + ".geojson", {
        clampToGround: true,
        stroke: Cesium.Color.HOTPINK,
        fill: Cesium.Color.PINK,
        strokeWidth: 5
    }).then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        const entities = dataSource.entities.values;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            const icoName = entity._properties._name?._value;
            const labelName = entity._properties._name?._value || "未命名";

            console.log(entity);
            console.log("./ico/LS/" + icoName + ".png");
            if (Cesium.defined(entity.position)) {
                // 添加图标
                console.log("添加" );
                entity.billboard = new Cesium.BillboardGraphics({
                    image: "./ico/LS/" + icoName + ".png",
                    scale: 0.1,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    show: true,
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 10000.0)
                });
            }
        }
    });
}
