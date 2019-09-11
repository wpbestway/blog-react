import Mock from 'mockjs';

type MsgType = string | number

const success = (msg: MsgType = '', data?: any) => {
    return {
        code: 0,
        msg,
        data,
    }
}

const error = (code: number, msg: MsgType = '', data?: any) => {
    return {
        code,
        msg,
        data,
    }
}

interface IPostResInterface {
    body: string
    type: 'post',
    url: string
}

Mock.mock(/\/api\/user\/login/, loginRes);
function loginRes(req: IPostResInterface) {
    const { user_name, password } = JSON.parse(req.body)
    if (user_name === 'wp' && password === 123) {
        return success()
    } else {
        return error(-1, '密码错误')
    }
}
