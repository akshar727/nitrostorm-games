import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


user_conversations = {}


class ChatRoomConsumer(WebsocketConsumer):
    def connect(self):
        # set self.room_name equaal to the text after ws/chat/<whtever is here> the url doesnt have kwargs only a single endpoint
        print(user_conversations)
        self.room_name = self.scope['path'].replace('/ws/chat/', '').replace('/', '')

        self.room_group_name = 'chat_%s' % self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        
        self.accept()
        self.send(text_data=json.dumps({
                'type': 'CONNECTION_SUCCESS'
            }))
        if user_conversations.get(self.room_name) == None:
            user_conversations[self.room_name] = {'users': 0, 'messages': []}
        elif len(user_conversations[self.room_name]['messages']) > 0:
            payload = []
            for message in user_conversations[self.room_name]['messages']:
                payload.append({'username': message[0], 'message': message[1]})
            self.send(text_data=json.dumps({
                'type': 'MESSAGE_HISTORY',
                'payload': payload
            }))
        user_conversations[self.room_name]['users'] += 1


    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        # check if there are any clients left in the room
        user_conversations[self.room_name]['users'] -= 1

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print(text_data_json)
        if text_data_json.get('startData') == True:
            return
        user_conversations[self.room_name]['messages'].append(("Anonymous", message))
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'message',
                'message': message,
                'username': "Anonymous",
            }
        )

    def message(self, event):
        message = event['message']
        username = event['username']
        self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'type': 'MESSAGE'
        }))

    pass
