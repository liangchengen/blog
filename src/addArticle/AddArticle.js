import React,{ Component,Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import style from './AddArticle.module.scss';
import { Input,Button } from 'element-react';
import 'element-theme-default';
import Axios from 'axios';
import qs from 'qs';

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:"",
      title:"",
      textHeight:(window.innerHeight - 116)/2,
      display: "inline-block"
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.setBox = this.setBox.bind(this)
  }
  onInputChange(title){
    this.setState({
      title
    })
  }
  onTextChange(event){
    this.setState({
      value:event.target.value
    })
  }
  setBox(n){
    switch(n){
      case 1:
        if(this.state.title !== "" && this.state.value !== ""){
          Axios.post('http://localhost:3000/addArticle',qs.stringify({
            title:this.state.title,
            data:encodeURIComponent(this.state.value).replace(/%/g, '+')
          }))
          .then(req=>{
            if(req.data.result === true){
              alert("发布成功")
            }else{
              alert("发布失败")
            }
          })
          .catch(err=>{
            alert("发布失败",err)
          })
        }else{
          alert("标题或内容为空")
        }
        break;
      case 2:
        this.setState({
          display: "none",
          textHeight:0
        })
        break;
      case 3:
        this.setState({
          textHeight:(window.innerHeight - 116)/2,
          display: "inline-block"
        })
        break;
      case 4:
        this.setState({
          textHeight:window.innerHeight - 116,
          display: "inline-block"
        })
        break;
      default:
    }

  }
  render(){
    return(
      <Fragment>
        <div className={style.title}>
          <div className={style.input}>
            <Input placeholder="标题" value={this.state.title} onChange={this.onInputChange}/>
          </div>
          <Button type="text" onClick={()=>this.setBox(1)} className={style.button}>发布</Button>
          <Button type="text" onClick={()=>this.setBox(2)} className={style.button}>预览</Button>
          <Button type="text" onClick={()=>this.setBox(3)} className={style.button}>分页</Button>
          <Button type="text" onClick={()=>this.setBox(4)} className={style.button}>编辑</Button>
        </div>
        <div className={style.body} style={{height:window.innerHeight - 116}}>
          <textarea style={{height:this.state.textHeight,display:this.state.display}} value={this.state.value} onChange={this.onTextChange} className={style.text}>
            
          </textarea>
          <div style={{overflow:"auto",height:window.innerHeight - this.state.textHeight}}>
            <ReactMarkdown source={this.state.value}/>
          </div>
        </div>
        
      </Fragment>
    )
  }
}

export default AddArticle;