<template>
    <div>
        <div
            @click="
                handleShare(
                    'weibo',
                    '测试',
                    'http://www.baidu.com',
                    'http://aladdin-vray.oss-cn-beijing.aliyuncs.com/Other/80de988c-ad11-449b-af48-b5341c957668.jpg',
                    ''
                )
            "
        >
            微博
        </div>
        <div
            @click="
                handleShare(
                    'qq',
                    '测试',
                    'http://www.baidu.com',
                    'http://aladdin-vray.oss-cn-beijing.aliyuncs.com/Other/80de988c-ad11-449b-af48-b5341c957668.jpg',
                    '简单描述'
                )
            "
        >
            QQ
        </div>
        <div>微信</div>
        <div>facebook</div>
        <div>twitter</div>
    </div>
</template>

<script>
export default {
    methods: {
        handleShare(type, title, url, picurl, summary) {
            var share_url;
            switch (type) {
                case 'weibo':
                    share_url =
                        'http://v.t.sina.com.cn/share/share.php?title=' +
                        title +
                        '&url=' +
                        url +
                        '&pic=' +
                        picurl +
                        '&appkey=2706825840';
                    window.open(share_url);
                    break;
                case 'qq':
                    share_url =
                        'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' +
                        url +
                        '&title=' +
                        title +
                        '&pics=' +
                        picurl +
                        '&summary=' +
                        summary;
                    window.open(share_url);
                    break;
            }
        },
    },
};
</script>
