const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let isExpanded = false;

// 点击按钮展开或搜索
searchBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (!isExpanded) {
        document.querySelectorAll('.tab-item').forEach(item => {
            item.style.display = 'none';
        });
        searchBox.classList.add('active');
        searchInput.focus();
        isExpanded = true;
    } else {
        const query = searchInput.value.trim();
        if (query) {
            alert('搜索内容为：' + query); // 替换成你的查询逻辑
        }
    }
});

// 点击空白区域收起
document.addEventListener('click', () => {
    if (isExpanded) {
        searchBox.classList.remove('active');
        searchInput.value = '';
        isExpanded = false;

        //搜索框关闭后打开其他按钮
        searchBox.addEventListener('transitionend', () => {
            if (!isExpanded) {
                document.querySelectorAll('.tab-item').forEach(item => {
                    item.style.display = 'flex';
                });
            }
        });
    }
});

// 阻止点击输入框时关闭
searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
});
