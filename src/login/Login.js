import React ,{Component} from 'react';
import { Input,Button } from 'element-react';
import 'element-theme-default';
import style from './Login.module.scss';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import qs from 'qs';


class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      user:"",
      password:""
    }
    this.onUserChange = this.onUserChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onClick = this.onClick.bind(this)

  }
  onUserChange(event){
    this.setState({
      user:event
    })
  }
  onPasswordChange(event){
    this.setState({
      password:event
    })
  }
  onClick(){
    if(this.state.user !== "" && this.state.password !== ""){
      Axios.post('/api/login',qs.stringify({
      "name": this.state.user.trim(),
      "password": this.state.password.trim()
    }))
    .then((res) =>{
      if(res.data.result === true){
        this.props.history.push('/manage')
      }else{
        if(res.data.result === false){
          alert(res.data.text)
        }else{
          alert("登录失败，请刷新重试")
        }
      }
    })
    }else{
      alert("账号或密码为空")
    }
  }
  render(){
    return(
      <div className={style.login}>
        <Input placeholder="账号" value={this.state.user} onChange={this.onUserChange} size="large"/>
        <Input placeholder="密码" value={this.state.password} onChange={this.onPasswordChange}type="password" size="large"/>
        <Button onClick={this.onClick} type="primary" size="large">登录</Button>
      </div>
    )
  }

}
export default withRouter(Login);