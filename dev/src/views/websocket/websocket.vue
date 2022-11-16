<template>
    <div class="websocket" pa-md>
        <div class="rooms" flex>
            <div class="room" col-12 ba black v-for="room in rooms" mr-md>
                <div class="roomName" black bg ht-10 ac px-md ac-20 jsb>
                    <span>{{ room.name }}</span>
                    <span>{{ 'Socket ID : ' + room.id + (room.id ? ' 已连接' : ' 未连接') }}</span>
                </div>
                <div class="msgWindow" py-md style="height: 300px;overflow-y: auto">
                    <div px-sm v-for="msg in room.msgs">
                        {{ msg }}
                    </div>
                </div>
                <div class="msgBar" flex jsb>
                    <div col-18>
                        <el-input v-model="room.input" placeholder="请输入内容"></el-input>
                    </div>
                    <el-button col-4 type="primary" @click="submit(room)">发送</el-button>
                    <el-button col-2 type="primary" @click="joinRoom(room)">+</el-button>
                </div>
            </div>
        </div>
        <div>
            <el-input v-model="sessionVal"></el-input>
            <el-button type="primary" @click="setSession">测试</el-button>
        </div>
    </div>
</template>

<script>
import { io } from "socket.io-client"
export default {
    name: "websocket",
    mounted() {
        this.rooms.forEach(room => {
            room.socket = io("http://localhost:3001")
            room.socket.on("connect", () => {
                room.socket.emit('init')
                room.id = room.socket.id
            })
            room.socket.on("message", data => {
                room.msgs.push('收到："' + data + '"')
            })
            room.socket.on("testtest", data => {
                room.msgs.push("testtest")
                room.socket.emit("testtest")
            })
        })
        // this.socket = io("http://localhost:3001")
    },
    data(){
        return {
            val: '',
            socket: null,
            sessionVal:'',
            rooms:[
                {
                    id:'',
                    msgs:[],
                    input:'',
                    socket: null,
                    name: '张三'
                },
                // {
                //     id:'',
                //     msgs:[],
                //     input:'',
                //     socket: null,
                //     name: '李四'
                // },
                // {
                //     id:'',
                //     msgs:[],
                //     input:'',
                //     socket: null,
                //     name: '王五'
                // },
            ]
        }
    },
    methods:{
        submit(room){
            if(room.input){
                room.msgs.push('提交：“' + room.input + '"' )
                room.socket.emit('message',room.input, room.name)
            }

        },
        setSession(){
            this.$http.post('/socket',{ aaa:this.sessionVal }).then(result =>{
                console.log(result.data)
            })
        }
    },
    watch:{

    }
}
</script>

<style scoped lang="scss">
div.aaa{
    width: 600px;height: 500px;
    background-color: rgba(0,0,0,.1);
    display: flex;justify-content: center;align-items: center;
    margin: 0 auto;
}
</style>