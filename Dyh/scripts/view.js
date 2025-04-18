$('.quick-btn').on('click', function () {
    const icon2d = $(this).find('.icon-2d');
    const icon3d = $(this).find('.icon-3d');

    // 切换显示隐藏
    icon2d.toggle();
    icon3d.toggle();
});