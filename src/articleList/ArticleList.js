import React,{ Component } from 'react';
import style from './ArticleList.module.scss';
import Axios from 'axios';
import { Pagination } from 'element-react';
import 'element-theme-default';
import {
  Link
} from "react-router-dom";


class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      currentPage:1,
      pageNumber:0
    }
    this.time = this.time.bind(this);
    this.onCurrentChange = this.onCurrentChange.bind(this);
  }
  UNSAFE_componentWillMount() {
    Axios.get('/api/articlelist?pages='+this.state.currentPage)
    .then((res) => {
      this.setState({
        list: res.data.data,
        pageNumber: res.data.page.number
      })
    })
  }
  time(val){
    var date = new Date(val);
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`
  }
  onCurrentChange(n){
    this.setState({
      currentPage:n
    })
    Axios.get('/api/articlelist?pages='+ n)
    .then((res) => {
      this.setState({
        list: res.data.data
      })
    })
    console.log(this.state.currentPage)
  }
  render(){
    return(
      <div className={style.left}>
        <div className={style.list}>
        {
          this.state.list.map(val =>
            <Link to={"/article/" + val.id} className={style.box} key={val.id}>
              <span className={style.title}>{val.title}</span>
              <div className={style.data}>
                <span className={style.iconfont}>&#xe600;</span>
                <span>{val.praise}</span>
                <span className={style.iconfont}>&#xe663;</span>
                <span>{val.view}</span>
                <span>{this.time(val.time)}</span>

              </div>
            </Link>  
          )
        }
        </div>
        {
          this.state.pageNumber > 12 ? <Pagination className={style.pagination} layout="total,prev, pager, next,jumper" total={this.state.pageNumber} onCurrentChange={this.onCurrentChange} pageSize={12} currentPage={this.currentPage}/> : ''
        }
      </div>
    )
  }
}
export default ArticleList;
