import SseRequest from '@/SSE';

export class ChatSse extends SseRequest {
    constructor(model: SseRequest['model']) {
        super(model)
    }
}

export function chatTest(params: { message: string }, model?: SseRequest['model']): ChatSse {
    return new ChatSse(model || 'EventSource')
        .connect<{ message: string }>('/chat/test', params)
}