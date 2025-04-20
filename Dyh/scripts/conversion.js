function ResolveThePath(Data) {
    let waypoints = [];
    let Features = Data.features;
    Features.forEach(function (item) {
        let position = {
            "lon": item.geometry.coordinates[0],
            "lat": item.geometry.coordinates[1],
            "height": item.properties.height
        }
        waypoints.push(position)
    })
    return waypoints;
}

////经纬度转换为笛卡尔直角坐标系

function convertToACCS(Data) {
    let positions = [];
    let Features = Data.features;
    Features.forEach(function (item) {
        let position = Cesium.Cartesian3.fromDegrees(item.geometry.coordinates[0], item.geometry.coordinates[1], item.properties.height)
        positions.push(position);
    })
    return positions;
}
