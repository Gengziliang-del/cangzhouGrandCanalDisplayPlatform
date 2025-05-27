let airplane = null;
let flightPath = null;
let startTime = null;
let stopTime = null;

// 飞行按钮
$('#tool-fly').on('click',function (){
    $('#analysis-panel').removeClass('analysisHidden');
    StartFly();
})

// 关闭按钮同时终止飞行
$('#panel-close').on('click', function () {
    $('#analysis-panel').addClass('analysisHidden');
    viewer.clock.shouldAnimate = false;
    viewer.trackedEntity = undefined;
    if (airplane) {
        viewer.entities.remove(airplane);
        airplane = null;
    }
   flag_fly=false;
});

//飞行操控
$('#fly-start').on('click', function () {
    if (!startTime) return;
    viewer.clock.currentTime = startTime.clone();
    viewer.clock.shouldAnimate = true;
});

$('#fly-pause').on('click', function () {
    viewer.clock.shouldAnimate = !viewer.clock.shouldAnimate ;
    // 切换按钮文字
    const $btn = $(this);
    if ($btn.text() === "暂停") {
        $btn.text("继续");
    } else {
        $btn.text("暂停");
    }
});
$('#fly-end').on('click', function () {
    $('#analysis-panel').addClass('analysisHidden');
    viewer.clock.shouldAnimate = false;
    viewer.trackedEntity = undefined;
    if (airplane) {
        viewer.entities.remove(airplane);
        airplane = null;
    }
    flag_fly=false;//飞行过程中终止其他面板
});

function StartFly() {
    flag_fly=true;//飞行过程中终止其他面板
    // 清除旧实体
    if (airplane) viewer.entities.remove(airplane);

    // 创建飞行路径
    function createFlightPath(positions, duration) {
        let property = new Cesium.SampledPositionProperty();
        startTime = Cesium.JulianDate.now();
        stopTime = Cesium.JulianDate.addSeconds(startTime, duration, new Cesium.JulianDate());

        for (let i = 0; i < positions.length; i++) {
            let time = Cesium.JulianDate.addSeconds(startTime, (i / positions.length) * duration, new Cesium.JulianDate());
            property.addSample(time, positions[i]);
        }

        viewer.clock.startTime = startTime.clone();
        viewer.clock.stopTime = stopTime.clone();
        viewer.clock.currentTime = startTime.clone();
        viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
        viewer.clock.multiplier = 1;

        return { property, stopTime };
    }

    flightPath = createFlightPath(convertToACCS(data), 100); // 100秒飞行

    let velocityOrientation = new Cesium.VelocityOrientationProperty(flightPath.property);
    let fixQuaternion = Cesium.Quaternion.fromAxisAngle(Cesium.Cartesian3.UNIT_Z, Cesium.Math.toRadians(180));

    let fixedOrientation = new Cesium.CallbackProperty(function (time, result) {
        let rawOrientation = velocityOrientation.getValue(time, result);
        if (rawOrientation) {
            return Cesium.Quaternion.multiply(rawOrientation, fixQuaternion, new Cesium.Quaternion());
        }
        return rawOrientation;
    }, false);

    airplane = viewer.entities.add({
        position: flightPath.property,
        model: {
            uri: './model/Eurocopter_H125_-_Flying.glb',
            minimumPixelSize: 64,
            maximumScale: 100,
            heightReference: Cesium.HeightReference.NONE,
            scale: 1.0
        },
        orientation: fixedOrientation
    });

    viewer.trackedEntity = airplane;
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    viewer.clock.shouldAnimate = true;
}

////经纬度转换为笛卡尔直角坐标系
function convertToACCS(Data){
    let positions =[];
    let Features = Data.features;
    Features.forEach(function (item){
        let position = Cesium.Cartesian3.fromDegrees(item.geometry.coordinates[0],item.geometry.coordinates[1],item.properties.height)
        positions.push(position);
    })
    return positions;
}
