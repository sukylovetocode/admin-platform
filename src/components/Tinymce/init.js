import tinymce from 'tinymce/tinymce'; // eslint-disable-line no-unused-vars
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/code';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/autosave';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/emoticons/js/emojis';
import '@/assets/zh_CN.js';
import 'tinymce/skins/ui/oxide/skin.min.css';

export function init() {
    return tinymce.init({
        selector: '#editor',
        language: 'zh_CN',
        height: 500,
        skin: false,
        content_css: false,
        plugins: [
            'image',
            'link',
            'media',
            'code',
            'lists',
            'table',
            'preview',
            'autosave',
            'advlist',
            'emoticons',
        ],
        toolbar:
            'image link media code undo redo | bold italic | alignleft aligncenter alignright alignjustify |numlist bullist table preview restoredraft | paste forecolor backcolor emoticons',
    });
}
