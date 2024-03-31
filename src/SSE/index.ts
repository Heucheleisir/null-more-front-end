const BASE_URL = import.meta.env.VITE_NM_BASE_URL
const DONE = `[DONE]`
const MAX_RETRY_TIME = 3
type Status = 'init' | 'connect' | 'success' | 'fail' | 'disconnect' | 'close' | 'continue'
type Model = 'EventSource' | 'Fetch' | 'xhr'
type Source<T extends Model> = T extends 'EventSource'
    ? EventSource : T extends 'Fetch' | 'xhr'
    ? Promise<unknown> : null
interface ConnectGenericity { [key: string]: string | number | boolean }
interface CreateFun { <T extends ConnectGenericity>(url: string, params: T): void }
interface REST { id: string | number, data: string }
class SseRequest {
    public SSEId: string
    protected _status: Status
    protected model: Model
    protected source: Source<Model> | null
    protected response: REST | null
    protected error: Error | null
    protected originList: Array<MessageEvent>
    protected observerList: Array<(response: REST) => void>
    protected catchList: Array<(error: Error) => void>
    protected statusListeners: Array<(status: Status) => void>
    protected retryTime: number
    constructor(model?: Model) {
        this._status = 'init'
        this.model = model || 'EventSource'
        this.source = null
        this.observerList = []
        this.catchList = []
        this.statusListeners = []
        this.originList = []
        this.response = null
        this.error = null
        this.SSEId = ''
        this.retryTime = 0
    }

    public get status(): Status {
        return this._status
    }
    public set status(value: Status) {
        this.statusListeners && this.statusListeners.forEach(callback => {
            callback && callback(value)
        })
        this._status = value;
    }

    public connect<T extends ConnectGenericity>(url: string, params: T) {
        this.status = 'connect'
        if (this.model === 'EventSource') {
            this.creatEventSource<T>(url, params)
        } else if (this.model === 'Fetch') {
            this.createFetch<T>(url, params)
        } else if (this.model === 'xhr') {

        } else { }
        return this
    }
    public then(callback: (response: REST) => void) {
        callback && this.observerList.push(callback)
        this.distribute()
        return this
    }
    public catch(callback: (error: Error) => void) {
        callback && this.catchList.push(callback)
        this.distribute()
        return this
    }
    public disconnect() {
        this.status = 'disconnect'
        if (this.source instanceof EventSource) {
            this.source?.close()
        }
    }
    public close() {
        this.status = 'close'
        this.source = null
        this.response = null
        this.error = null
        this.observerList.length = 0
        this.catchList.length = 0
        this.originList.length = 0
        this.retryTime = 0
    }
    public addStatusListener(callback: (status: Status) => void) {
        callback && this.statusListeners.push(callback)
        return this
    }
    private creatEventSource: CreateFun = <T extends ConnectGenericity>(url: string, params: T) => {
        const urlParams = Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&')
        this.source = new EventSource(`${BASE_URL}${url}${urlParams ? '?' + urlParams : ''}`)
        this.source.onopen = (event: Event) => {
            console.log(event, 'sse--onopen');
        }
        this.source.onmessage = (event: Event) => {
            const messageEvent = event as MessageEvent;
            this.originList.push(messageEvent)
            this.SSEId = messageEvent.lastEventId || ''
            if (messageEvent.data && messageEvent.data === DONE) {
                this.disconnect()
            } else {
                this.response = {
                    id: messageEvent.lastEventId,
                    data: JSON.parse(messageEvent.data)
                }
                this.status = 'success'
                this.distribute()
            }
        }
        this.source.onerror = (event: Event) => {
            this.retryTime++
            if (this.retryTime >= MAX_RETRY_TIME) {
                this.disconnect()
            }
        }
    }
    private createFetch: CreateFun = <T extends ConnectGenericity>(url: string, params: T) => {
        this.source = fetch(`${BASE_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 如果有其他需要设置的请求头，可以在这里添加
            },
            body: JSON.stringify(params) // 将数据转换为JSON字符串作为请求体
        }).then(response => {
            const reader = response.body?.getReader();
            const decoder = new TextDecoder('utf-8');

            const readStream = () => {
                reader && reader.read().then(({ done, value }) => {
                    if (done) {
                        this.disconnect()
                        return;
                    }
                    const chunk = decoder.decode(value, { stream: true });
                    // console.log('Received chunk:', chunk);
                    this.response = {
                        id: chunk.match(/id: (.+)/)?.[1] || '',
                        data: JSON.parse(chunk.match(/data: (.+)/)?.[1] || '')
                    }
                    this.status = 'success'
                    this.distribute()
                    // 继续读取下一个 chunk
                    readStream();
                });
            };

            readStream();
        })
            .catch(error => {
                console.error('Error occurred:', error);
            });
    }
    private distribute() {
        if (this.status === 'success') {
            this.status = 'continue'
            this.observerList && this.observerList.forEach(callback =>
                this.response && callback(this.response))
        } else if (this.status === 'fail') {
            this.catchList && this.catchList.forEach(callback =>
                this.error && callback(this.error))
        }
    }
}

export default SseRequest