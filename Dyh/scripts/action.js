// 监听分析按钮点击事件，打开面板
$(document).ready(function () {
    // 点击“分析”按钮，显示分析面板
    $('[data-menu="analysis"]').on('click', function () {
        $('#analysis-panel').removeClass('analysisHidden');
    });

    // 点击关闭按钮，隐藏分析面板
    $('.close-btn').on('click', function () {
        $('#analysis-panel').addClass('analysisHidden');
    });
});



