import React, { Component } from 'react';
import './App.css';

class App extends Component {
  renderBoard(w,h){
    return <Board w={w} h={h} />
  }
  render() {
    return (
      <div className="App">
    {this.renderBoard()}
      </div>
    
    );
  }
}
class Board extends Component{
  renderCard(i,vis){
return <Card value={i} vis={vis} clickHandeler={this.clickHandeler}/>
  }
   constructor(props) {
    super(props);
    console.log("constructor");
    this.state = {
      size:4,
      valueArr:[],
      vis:false,
      p:[]
    };
    this.clickHandeler=this.clickHandeler.bind(this);
  }
  genTab(size){
    console.log(size);
    var  arr1=[],arr2=[],m=size*size;
    for(let i=0;i<m/2;i++){
      arr1.push(i);
    }
     for(let i=0;i<m/2;i++){
      arr1.push(i);
    }
     while(m--){
      arr2.push(arr1.splice(Math.floor(Math.random()*m),1));
    }
    this.setState({
      valueArr:arr2,
      vis:true,
    });
    setTimeout(()=>this.setState({
      vis:false
    }), 3000);
    console.log(this.state.valueArr);
  }
    handleSizeChange(e) {
    console.log(e);
    //this.genTab(e.value);
    this.setState({
      size: e.value
    })
    
  }
  clickHandeler(e){
    //console.log(this.state.p.length);
    this.state.p.push(e);
    if(this.state.p.length>=2){
     // console.log(this.state.p[0].props.value[0]);
      if(this.state.p[0].props.value[0]===this.state.p[1].props.value[0]){
        console.log("hit"+" "+this.state.p.length);
        this.state.p.pop().setState({color:"red"});
        this.state.p.pop().setState({color:"red"});
        console.log(this.state.p.length);
        //this.state.p=[];
      }
      else{
        setTimeout(()=>{
        if(this.state.p.length>=2){
        this.state.p.pop().setState({vis:false});
        this.state.p.pop().setState({vis:false});}
        else if(this.state.p.length==1)
        this.state.p.pop().setState({vis:false})


        //this.state.p=[]
      },1000);
       
      }
    }
  }
  buttonClickHandler(e) {
    this.genTab(e.value,true);
   }
  render(){
    console.log("Renderd"+" "+this.state.valueArr);
    let items=[],items2=[],c=0,c2=0;
    for(let i=0;i<this.state.size;i++){
      items=[];
      c2=0;
    while(c2++<this.state.size){
      items.push(<div key={c}>{this.renderCard(this.state.valueArr[c+i],this.state.vis)}</div>);
      c++;
    }
    c--;
    items2.push(<div className="row" key={i}>{items}</div>);
  }
    console.log(this.state.valueArr);
return(
  <div className="Board">
    <select id="height" type="number" defaultValue={4} onChange={()=>this.handleSizeChange(document.getElementById("height"))}>
    <option>2</option>
    <option>4</option>
    <option>6</option>
    <option>8</option>
    <option>10</option>
    <option>12</option>
    </select>
    <button onClick={()=>this.buttonClickHandler(document.getElementById("height"))}></button>
    {items2}
  </div>
  );
  }
}
class Card extends Component{
  constructor(props){
      //console.log(props);
    super(props);
      this.state = {
        vis:false,
        value: props.value,
        color:"blue"
      };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.props.value||nextProps.vis !== this.props.vis||this.props.color!==nextProps.color) {
      this.setState({value: nextProps.value,vis:nextProps.vis,color:nextProps.color});
    }
  }
  render(){
    if(this.state.vis)
return(
  <div className="Card" style={{background:this.state.color,color:"black"}}  onClick={() => this.props.clickHandeler(this)}>
    {this.state.value}
  </div>
  );
else
return(
  <div className="Card" style={{background:this.state.color,color:"black"}} onClick={() => {this.setState({vis:true});this.props.clickHandeler(this)}}>
    {}
  </div>
  );

  }
}
export default App;
