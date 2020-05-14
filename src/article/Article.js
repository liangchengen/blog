import React,{ Component,Fragment } from 'react';
import style from './Article.module.scss';
import ReactMarkdown from 'react-markdown';
import Axios from 'axios';
import qs from 'qs';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      data:"",
      spancolor:"#909399"
    }
    this.showmd = this.showmd.bind(this)
    this.onSpanClick = this.onSpanClick.bind(this)
  }
  componentWillMount(){
    Axios.post('/api/article',qs.stringify({
      id:this.props.match.params.id
    }))
    .then(req=>{
      console.log(req.data)
      this.setState({
        title:req.data.title,
        data:decodeURIComponent(req.data.data.replace(/\+/g, '%'))
      })
    })
    .catch(err=>{
      alert("获取数据失败")
    })
  }
  onSpanClick(){
    if(this.state.spancolor === "#909399"){
      this.setState({
        spancolor:"#20a0ff"
      })
      Axios.post('/api/setPraiseNumber',qs.stringify({
        id:this.props.match.params.id
      }))
    }

  }
  showmd(){
    if(this.state.data !== ""){
      return(
        <div className={style.md}>
          <h1 className={style.h1}>{this.state.title}</h1>
          <ReactMarkdown source={this.state.data}/>
          <div>
            <span style={{color:this.state.spancolor,cursor:"pointer"}} onClick={()=>this.onSpanClick()} className={style.iconfont}>&#xe600;</span>
          </div>
        </div>
      )
    }

  }
  render(){
    return(
      <Fragment>
        {this.showmd()}
      </Fragment>
    )
  }
}
export default Article;

