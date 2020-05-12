import React,{ Component } from 'react';
import { Menu,Layout } from 'element-react';
import 'element-theme-default';
import AddArticle from '../addArticle/AddArticle';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import style from './Manage.module.scss';


class Manage extends Component {
  constructor(props) {
    super(props);
    this.state= {
      height: null
    }
    
  }
  UNSAFE_componentWillMount(){
    this.setState({
      height:window.innerHeight - 60
    })
  }
  render(){
    return(
      <Router>
        <Layout.Row>
          <Layout.Col span="3"  className={style.left} style={{height:this.state.height}}>
            <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="vertical">
              <Link to="/manage" className={style.a}>
                <Menu.Item index="1">
                  新建文章
                </Menu.Item>
              </Link>
            </Menu>
          </Layout.Col>
          <Layout.Col span="21">
          <Switch>
            <Route path="/manage">
              <AddArticle />
            </Route>
          </Switch>
          </Layout.Col>
        </Layout.Row>
      </Router>
    )
  }
}

export default Manage;