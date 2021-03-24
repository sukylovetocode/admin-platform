<template>
    <div>
        <el-row>
            <el-col :span="3">
                <ul class="chating-left">
                    <h5 class="chating-title">可选房间</h5>
                    <li
                        v-for="(item, index) in rooms"
                        :key="index"
                        class="chating-room"
                        @click="joinRoom(item)"
                        :class="[item === nowRoom ? 'isActive' : '']"
                    >
                        {{ item }}
                    </li>
                </ul>
            </el-col>
            <el-col :span="3">
                <ul class="chating-mid">
                    <h5 class="chating-title">房间成员</h5>
                    <li
                        v-for="(child, idx) in roomUsers"
                        :key="idx"
                        class="chating-room"
                    >
                        {{ child.name }}
                    </li>
                </ul>
            </el-col>
            <el-col :span="18">
                <div class="chating-board" v-if="nowRoom">
                    <div class="chating-msg-list">
                        <div
                            v-for="(child, idx) in messages"
                            :key="idx"
                            class="chating-msg"
                        >
                            {{ child.user }}说：{{ child.message }}
                        </div>
                    </div>
                    <div class="send-msg">
                        <el-input
                            v-model="message"
                            class="send-input"
                        ></el-input>
                        <el-button type="primary" @click="sendMsg"
                            >发送</el-button
                        >
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="输入你的用户名" :visible="dialogVisible">
            <el-input v-model="userId"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                    >确 定</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
// NOTE https://github.com/MetinSeylan/Vue-Socket.io
import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

Vue.use(
    new VueSocketIO({
        debug: true,
        connection: 'http://localhost:3000',
    })
);

export default {
    data() {
        return {
            dialogVisible: true,
            userId: '',
            rooms: [],
            roomUsers: null,
            messages: [],
            nowRoom: '',
            message: '',
        };
    },
    mounted() {
        this.sockets.subscribe('connect', () => {
            console.log('链接成功');
        });
        this.sockets.subscribe('allRooms', (rooms) => {
            this.rooms = rooms;
        });
        this.sockets.subscribe('successJoin', ({ roomUsers, room }) => {
            this.roomUsers = roomUsers;
            this.nowRoom = room;
        });
        this.sockets.subscribe('message', (msg) => {
            this.$message(msg);
        });
        this.sockets.subscribe('msg', ({ nowRoom, message, user }) => {
            this.messages.push({
                room: nowRoom,
                message,
                user,
            });
        });
    },
    methods: {
        joinRoom(room) {
            if (!this.userId) {
                this.dialogVisible = true;
                return;
            }
            if (!this.nowRoom) {
                this.$socket.emit('joinRoom', {
                    room,
                    user: this.userId,
                });
            } else {
                this.$socket.emit('leaveJoin', {
                    oldRoom: this.nowRoom,
                    newRoom: room,
                    user: this.userId,
                });
            }
        },
        sendMsg() {
            this.$socket.emit('sendMsg', {
                message: this.message,
                nowRoom: this.nowRoom,
                user: this.userId,
            });
            this.message = '';
        },
    },
};
</script>

<style lang="scss">
.chating-left {
    width: 100%;
    height: 100vh;
    .isActive {
        background: #ebebeb;
    }
}
.chating-title {
    text-align: center;
    font-size: 25px;
}
.chating-room {
    line-height: 30px;
    text-align: center;
    font-size: 25px;
}
.chating-msg-list {
    min-height: 400px;
    .chating-msg {
        font-size: 20px;
        line-height: 30px;
    }
}
.send-input {
    width: 800px;
    margin-right: 20px;
}
</style>
