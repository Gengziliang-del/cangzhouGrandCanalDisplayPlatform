let attractions_rotateFlag = true;//是否继续旋转
///////UI设计
$('#searchBtn').on('click', function(e) {
    e.stopPropagation(); // 阻止事件冒泡
    const query = $('#searchInput').val();
    if (query) {
        flyToAttractions(query);
    }
});

$('#searchInput').on('click', function(e) {
    e.stopPropagation();
});

$('.list-ico').on('click', function(e) {
    $('.list-ico').hide();
    $('.search-container').show();
    $('.Attraction-Collections').show();
});

//监听点击事件关闭面板
$(document).on('click', function(e) {
    // 判断点击是否发生在 #AttractionsList 内部
    if (!$(e.target).closest('#AttractionsList').length) {
        searchInput.value = '';
        //关闭所有图层
        $('.search-container').hide();
        $('.Attraction-Collections').hide();
        $('.Attractions').hide();
        $('.list-ico').show();
        attractions_rotateFlag =false;
    }
});

$('.Attractions-title').on('click',function (){
    let Collection_id = this.dataset.collection;
    $(`.${Collection_id}`).toggle();
})
////////选项点击事件
$('.Attractions li').on('click',function (){
    const clickedName = $(this).text().trim(); // 获取当前点击的 li 的文字
    flyToAttractions(clickedName);
})

function flyToAttractions(name){
    let  coordinates = null;
    let targetFeature = null;

    attractions.features.forEach(function(feature) {
        if(feature.properties.Name===name)
        {
            targetFeature = feature;
            console.log(targetFeature);
            // lon = targetFeature./
            coordinates = targetFeature.geometry.coordinates;
            console.log(coordinates);
        }
    });

    if(targetFeature)
    {
        viewer.camera.flyTo(
            {
                destination:Cesium.Cartesian3.fromDegrees(coordinates[0],coordinates[1],300),
                orientation:{
                    heading:Cesium.Math.toRadians(20),
                    pitch:Cesium.Math.toRadians(-90),
                    roll:0
                },
                maximumHeight:1000,
            }
        )

        let earthPosition = Cesium.Cartesian3.fromDegrees(coordinates[0],coordinates[1],0);
        let angle = 0;//初始角度
        attractions_rotateFlag = true;//是否继续

        //开始环绕
        function rotateCamera() {
            console.log(attractions_rotateFlag);
            if (!attractions_rotateFlag) return;//检查是否终止环绕
            angle += Cesium.Math.toRadians(0.1);
            viewer.camera.lookAt(
                earthPosition,
                new Cesium.HeadingPitchRange(
                    angle, Cesium.Math.toRadians(-30), 300)
            )
            requestAnimationFrame(rotateCamera);
        }
        rotateCamera();
    }
}
