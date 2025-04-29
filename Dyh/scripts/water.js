

let rectangleAppearance =null;
let addRectangleGeometry = null;

//定义纹理
function defineTheAppearance(){
    rectangleAppearance = new Cesium.EllipsoidSurfaceAppearance({
        material: new Cesium.Material({
            fabric:
                {
                    type: 'Water',
                    uniforms://材质类型
                        {
                            baseWaterColor: new Cesium.Color(0.2, 0.3, 0.5, 0.6),//基础颜色
                            normalMap: './image/水面3.jpg',//法线纹理贴图
                            frequency: 100,//波纹数量
                            animationSpeed: 0.001,//波纹震动速度
                            amplitude: 5,//波纹振幅
                            flowDirection: new Cesium.Cartesian2(1.0, 0.0)
                        }
                }
        })
    })
}

//定义形状
function addShapes(){
    //生成纹理
    defineTheAppearance();
    Cesium.GeoJsonDataSource.load("./JsonData/lake.geojson").then(function (dataSource) {
        let entities = dataSource.entities.values; // 获取所有实体
        //geojson转换为几何形状
        let geometryInstances = entities.map(entity => {
            if (entity.polygon) {
                let hierarchy = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()); // 获取坐标
                let positions = hierarchy.positions;

                return new Cesium.GeometryInstance({
                    geometry: new Cesium.PolygonGeometry({
                        polygonHierarchy: new Cesium.PolygonHierarchy(positions),
                        height: 6,  // 可修改高度
                    })
                });
            }
        }).filter(instance => instance !== undefined); // 过滤空对象

        //创建一个Primitive对象，即将外观加载到几何形状上
        addRectangleGeometry = new Cesium.Primitive({
            geometryInstances: geometryInstances,
            appearance: rectangleAppearance
        });
        viewer.scene.primitives.add(addRectangleGeometry);
        //开启深度检测，开启后会有高程遮挡效果，更加真实的模拟不同高程的水面效果
        viewer.scene.globe.depthTestAgainstTerrain = true;
    });
}

$('#add3DData').on('change', function () {
    if ($(this).is(':checked')) {
       addShapes();
    } else {
        viewer.scene.primitives.remove(addRectangleGeometry);
    }
});