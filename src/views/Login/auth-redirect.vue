<script>
const CLIENT_ID = '24a4eb712fbdab80b302';
const CLIENT_SECRET = 'f92dc94b195043c1b249da5812b7a734e4159613';
import axios from 'axios';

export default {
    render: function(h) {
        return h();
    },
    async created() {
        let code = window.location.search.slice(1).substring(5);
        let a = axios({
            method: 'post',
            url: '/getAccessToken',
            params: {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                accept: 'application/json',
            },
        });
        a.then((res) => {
            let access_token = res.data.access_token;
            axios({
                method: 'get',
                url: `/userInfo`,
                headers: {
                    accept: 'application/json',
                    Authorization: `token ${access_token}`,
                },
            }).then((res) => {
                this.$router.push('/feactures/excel');
                console.log(res);
            });
        });
    },
};
</script>
