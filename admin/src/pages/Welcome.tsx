import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { prelogin, login } from '../services/user'

import JSEncrypt from 'jsencrypt'

import { message } from 'antd';

class Welcome extends React.Component {
  componentDidMount() {
    // prelogin().then(res => {
    //   const pubkey = res.data.pubkey
    //   const encrypt = new JSEncrypt(pubkey)
    //   const pwd = encrypt.encrypt('12345abc')
    //   const data = {username: 'www', pwd}
    //   login(data).then(res => {
    //     message.success('登录成功')
    //   })
    // })
  }
  render () {
    return (
      <PageHeaderWrapper>
        welcome
      </PageHeaderWrapper>
    )
  }
}

export default Welcome
