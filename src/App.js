import React,{ Component } from 'react';
import { Menu } from 'element-react';
import 'element-theme-default';
import 'normalize.css';
import About from './about/About';
import ArticleList from './articleList/ArticleList';
import Article from './article/Article';
import Login from './login/Login';
import Manage from './manage/Manage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import style from './App.module.scss';
import './App.css';
import Axios from 'axios';



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      signIn: null
    }
    this.login = this.login.bind(this)
  }

  componentWillMount(){
    if(this.state.signIn === null){
      Axios.get('/api/getuser')
      .then((res)=>{
        this.setState({
          signIn:res.data.signin
        })
      })
    }
  }
  login(){
    if (this.state.signIn != null && this.state.signIn === true){
      return(
        <Link to="/manage">
          <Menu.Item index="3" className={style.login}>
            管理
          </Menu.Item>
        </Link>
      )
    }else{
      return(
        <Link to="/login">
          <Menu.Item index="3" className={style.login}>
            登录
          </Menu.Item>
        </Link>
      )
    }
  }
  render(){
    return(
      <Router>
        <div className={style.nav}>
          <div className={style.width}>
            <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal">
              <Link to="/">
                <li className={style.logo}>
                  行走的博客
                </li>
              </Link>
              <Link to="/">
                <Menu.Item index="1" className={style.hover}>
                  主页
                </Menu.Item>
              </Link>
              <Link to="/about">
                <Menu.Item index="2" className={style.hover}>
                  关于
                </Menu.Item>
              </Link>
              {this.login()}
            </Menu>
          </div>
        </div>
          <Switch>
            {/* 管理页 */}
            <Route path="/manage">
              <Manage />
            </Route>
            {/* 文章页 */}
            <Route path="/article/:id" component={Article}>
            </Route>
            {/* 关于页 */}
            <Route path="/about">
              <div className={style.center}>
                <About />
              </div>
            </Route>
            {/* 登录页 */}
            <Route path="/login">
              <div className={style.center}>
                <Login />
              </div>
            </Route>
            {/* 主页 */}
            <Route path="/">
              <div className={style.center}>
                <ArticleList/>
              </div>
            </Route>
          </Switch>
      </Router>
    )
  }
}
export default App;
