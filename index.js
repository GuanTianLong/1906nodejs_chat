    const WebSocket = require('ws');
    const moment = require('moment')

    const wss = new WebSocket.Server({ port: 8989 });

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('接收到的消息：%s', message);

            //将接收到的 JSON文本内容 转化为 JSON对象
            var json_obj = JSON.parse(message);

            //向客户端发送数据
            var send_msg = {
                nick_name : json_obj.nick_name,
                msg        : json_obj.msg
            }

            wss.clients.forEach(function each (client){
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(send_msg));      // 发送
                }

            })

        });

    });