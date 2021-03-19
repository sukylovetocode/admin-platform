// 按需注册Element-ui
import Vue from 'vue';
import {
    Container,
    Input,
    Header,
    Footer,
    Main,
    Aside,
    Button,
    Col,
    Row,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Icon,
    Form,
    FormItem,
    Checkbox,
    Avatar,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Table,
    TableColumn,
    Message,
    Popover,
    Select,
    Option,
    Tag,
    Switch,
    Dialog,
    Drawer,
    Radio,
} from 'element-ui';

Vue.use(Container);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Button);
Vue.use(Col);
Vue.use(Row);
Vue.use(Input);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Icon);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Drawer);
Vue.use(Radio);

Vue.prototype.$message = Message;
