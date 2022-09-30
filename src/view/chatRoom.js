import React, { Component } from 'react';
import authService from '../services/auth.service';

class ChatRoom extends Component {
    constructor(props) {
        //create state
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            chatRooms:[]
        };
    }
    componentDidMount(){
       
        var element = document.getElementById("scroll1");
        element.scrollTop = element.scrollHeight;
        // debugger
        let app=this.props.app;
        let state= app.state;
        let componentList = state.componentList;
        let dispatch= app.dispatch
        if(this.props.app.state.currentuser.getJson().role==="student"){
            authService.getGeneralChatPosts(this.props.app.state.currentuser.getJson().collection, componentList);
            if(!this.props.app.state.currentChatroom){
                let chatRoom = this.props.app.state.componentList.getComponent("chatroom", state.currentstudent.getJson()._id);
                let students = componentList.getList("student");
                this.props.app.dispatch({currentChatroom:chatRoom, studentsToChatWith: students })
                
                let list = this.props.app.state.componentList.getList("post", chatRoom.getJson()._id, "chatroom");
                let list2=[]
                for(const key in list){
                   if(!list[key].getJson().read){
                       list[key].setJson({...list[key].getJson(), read:true})
                       list2.push(list[key])
                   }
                }
                if(list2.length!==0){
                    dispatch({operate:"update", operation:"prepareRun", object: list2})

                }
            
            }

        }
        else{
            if(!this.props.app.state.currentChatroom){
                let chatRoom = this.props.app.state.componentList.getList("chatroom", "general", "name")[0];
                let students = componentList.getList("student");
                this.props.app.dispatch({currentChatroom:chatRoom, studentsToChatWith: students })
                
                let list = this.props.app.state.componentList.getList("post", "generalChatroom", "chatroom");
                let list2=[]
                for(const key in list){
                    
                   if(!list[key].getJson().read && list[key].getJson().owner!== state.currentstudent?.getJson()?._id){
                    if(state.currentuser.getJson().role==="teacher"){
                        if( list[key].getJson().owner!== state.currentuser?.getJson()?._id){
                            list[key].setJson({...list[key].getJson(), read:true})
                        list2.push(list[key])
                        }
                    }
                    else{
                        list[key].setJson({...list[key].getJson(), read:true})
                        list2.push(list[key])
                    }
                       
                   }
                }
                
                if(list2.length!==0){
                    dispatch({operate:"update", operation:"prepareRun", object: list2})

                }            }
        }
        let chatRooms = componentList.getList("chatroom");
        debugger
        if(!state.keepChat || state.chatRooms===undefined){
            dispatch({
                chatRooms:chatRooms
            })
        }
        
        
    }
    handleChange(e){
        
        let app = this.props.app;
        let state = app.state;
        let list = state.componentList;
        let opps = list.getOperationsFactory();
        let comp = opps.getUpdater().getJson().add[0];
        comp.getOperationsFactory().handleChange(e)
    }
    

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles =state.styles;
        let dispatch = app.dispatch;
        let list = state.componentList;
        let posts = list.getList("post", state?.currentChatroom?.getJson()._id, "chatroom");
        let opps = list.getOperationsFactory();
        return (
            <div style={
                    styles.biggestcard}>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", height:"100%", width:"100%"}}>
                <div  className="scroller" style={{
                    display:"flex", 
                    flexDirection:"column",
                    justifyContent:"space-between",
                    height:"100%",
                    width:"20%",
                    paddingTop:"20px",
                    paddingLeft:"20px",
                    borderRight:"1px solid gray"
                }}>

                    <div style={{
                       
                        
                    }}>
                    {state.chatRooms?.map((chatroom, index) => <div style={{  borderBottom:"1px solid #F1F1F1", margin:"10px"}}>
                        <div onClick={async ()=>{
                        debugger
                        let app=this.props.app;
                        let state= app.state;
                        let componentList = state.componentList;
                        let list = this.props.app.state.componentList.getList("post", chatroom.getJson()._id, "chatroom");
                        let list2=[]
                        for(const key in list){
                            debugger
                           if(!list[key].getJson().read && list[key].getJson().owner!== state.currentstudent?.getJson()?._id){
                            if(state.currentuser.getJson().role==="teacher"){
                                if( list[key].getJson().owner!== state.currentuser?.getJson()?._id){
                                    list[key].setJson({...list[key].getJson(), read:true})
                                list2.push(list[key])
                                }
                            }
                            else{
                                let myStudList = state.componentList.getList('student');
                                let IDlist =[]
                                for (const stud in myStudList){
                                    IDlist.push(myStudList[stud].getJson()._id)
                                }
                                if(!IDlist.includes(list[key].getJson().owner)){
                                    list[key].setJson({...list[key].getJson(), read:true})
                                    list2.push(list[key])
                                }
                                
                            }
                               
                           }
                        }
                        if(list2.length>0){
                            dispatch({operate:"update", operation:"prepareRun", object: list2})
                        }
                        let arr =[]
                        if(chatroom.getJson()._id==="generalChatroom"){
                            arr = await state.componentList.getList('student');
                        }
                        else{
                            arr = await state.componentList.getList('student', chatroom.getJson().owner, "_id");
                        }
                        dispatch({currentChatroom: chatroom, studentsToChatWith:arr})
                    }} style={{margin:"10px", padding:"5px", borderRadius:state.currentChatroom?.getJson()._id===chatroom?.getJson()._id?"10px":"0px",background: state.currentChatroom?.getJson()._id===chatroom?.getJson()._id? "#F2F1F6": this.props.app.state.styles.colors.color6,}}>
                        <div >{chatroom.getJson().name}
                    </div>
                    <div style={{color:"#A8A8A8"}}>{list.getList("post", chatroom?.getJson()._id, "chatroom")[list.getList("post", chatroom?.getJson()._id, "chatroom").length-1]?.getJson().content.length>50?(<>{list.getList("post", chatroom?.getJson()._id, "chatroom")[list.getList("post", chatroom?.getJson()._id, "chatroom").length-1]?.getJson().content.slice(0,50)}...</>):(<>{list.getList("post", chatroom?.getJson()._id, "chatroom")[list.getList("post", chatroom?.getJson()._id, "chatroom").length-1]?.getJson().content}</>)} </div>
                    <div style={{color:"#CACACA"}}>{list.getList("post", chatroom?.getJson()._id, "chatroom")[0]&&(<>{list.getList("post", chatroom?.getJson()._id, "chatroom")[0]?.getJson().dateOfPost.split(" ")[3]+ list.getList("post", chatroom?.getJson()._id, "chatroom")[0]?.getJson().dateOfPost.split(" ")[4]}</>)}</div>
                    </div>
                    </div>)}
                    </div>

                </div>
            <div style={{
                    display:"flex", 
                    flexDirection:"column",
                    padding: this.props.app.state.styles.margins.margin4,
                    justifyContent:"space-between",
                    height:"100%",
                    width: "60%",
                }} >
                    <div className="scroller" style={{ marginBottom:"20px"}} id='scroll1'>{posts.map((post, index) => <div style={{width:"100%", display:'flex', justifyContent:"center", marginTop:"10px"}}>
                        {state.currentuser?.getJson().role==="teacher"?(<>
                            <div style={{width:"95%", display:"flex",justifyContent:(post.getJson().student)?"flex-start":"flex-end"}}>
                            {post.getJson().student?( <>
                                <img style={{borderRadius:"50%", width:"50px", height:'50px'}} src={post.getJson().picURL}/>
                        <div style={{fontWeight: "500",
                        fontSize: "14px", width:"20vw", background:"#F2F1F7", borderRadius:"15px", marginLeft:"20px", color:"black", padding:"10px"}}>{post.getJson().content}</div>
                        
                        </>):( <>
                        <div style={{fontWeight: "500",
                        fontSize: "14px", width:"20vw", background:this.props.app.state.styles.colors.colorLink, borderRadius:"15px", marginLeft:"20px", color:"black", padding:"10px"}}>{post.getJson().content}</div>
                        <img style={{borderRadius:"50%", width:"50px", height:'50px'}} src={post.getJson().picURL}/>
                        </>)}

                            </div>
                        </>):(<>
                            {post.getJson().owner===state?.currentstudent.getJson()._id?( <>
                            <div style={{width:"95%", display:"flex",justifyContent:(!post.getJson().student)?"flex-start":"flex-end"}}>
                                {post.getJson().student?(<>
                                    <div style={{fontWeight: "500",
                        fontSize: "14px", width:"20vw", background:this.props.app.state.styles.colors.colorLink, borderRadius:"15px", marginLeft:"20px", color:"black", padding:"10px"}}>{post.getJson().content}</div>
                        <img style={{borderRadius:"50%", width:"50px", height:'50px'}} src={post.getJson().picURL}/></>):(<>
                        <img style={{borderRadius:"50%", width:"50px", height:'50px'}} src={post.getJson().picURL}/>
                        <div style={{fontWeight: "500",
                        fontSize: "14px", width:"20vw", background:"#F2F1F7", borderRadius:"15px", marginLeft:"20px", color:"black", padding:"10px"}}>{post.getJson().content}</div></>)}

                                
                        </div>
                        </>):(
                            
                            <div style={{width:"95%", display:"flex",justifyContent:"flex-start"}}>

<img style={{borderRadius:"50%", width:"50px"}} src={post.getJson().picURL}/>
                        <div style={{fontWeight: "500",
                        fontSize: "14px", width:"20vw", background:"#F2F1F7", borderRadius:"15px", marginLeft:"20px", color:"black", padding:"10px"}}>{post.getJson().content}</div>
                        </div>)}
                        </>)}
                        
                        </div>)}</div>
            <div > <div className="form-group" style={{display:"flex", flexDirection:"row", position:"relative"}}>
                            
                            <input style={{paddingRight:"60px"}} type="text" className="form-control" id="last" onChange={this.handleChange}  onClick={async ()=>{
                                debugger
                                let owner = state.currentChatroom.getJson().owner;
                                if(state.currentChatroom.getJson()._id==="generalChatroom"){
                                    owner= state.currentuser.getJson().role==="teacher"? state.currentChatroom.getJson().owner: state.currentstudent.getJson()._id
                                }
                                let comp = list.getComponent("student", owner, "_id")
                                let picUrl = state.currentuser.getJson().role ==="teacher"? state.currentuser.getJson().picURL:  comp.getJson().picURL;
                                await dispatch({operation:"cleanJsonPrepare", operate:"addpost", 
                                object:{
                                    picURL: picUrl,
                                    owner: owner,student:state.currentuser.getJson().role==="teacher"?false:true,  chatroom:state.currentChatroom.getJson()._id}})
                    }} name="addcontent"/>

                            <div style={{ borderLeft:"1px solid gray", paddingLeft:"10px", position:"absolute", right:"10px", marginTop:"5px"}} onClick={()=>{
                                let comp = opps.getUpdater().getJson().add[0];
                                if(comp&& comp.getJson().content!==""&&comp.getJson().content!==" "){
                                    dispatch({operation:"run"})
                                }
                                
                                }}>send</div>
                        </div>
                        </div>
            </div>
            <div className="scroller" style={{
                    display:"flex", 
                    flexDirection:"row",
                    flexWrap: "wrap",
                    justifyContent:"space-around",
                    borderLeft:"1px solid gray",
                    width:"22%"
                }}>
                    {state.studentsToChatWith.map((student, index)=> <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"15px" }}>
                        <img src= {student.getJson().picURL} alt = ""  style={{width:window.innerWidth<1300?"10vw":"120px", height:window.innerWidth<1300?"10vw":"120px", borderRadius:"50%"}} />
                        <div>{student.getJson().firstName} {student.getJson().lastName}</div>
                        <div style={{display:"flex", flexDirection:"row"}}>

{Object.keys(student.getJson().days).map((day, index)=><div key={index}>

{day==="Monday"&&(<div
onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
operate: "update", operation:"cleanPrepare", currentstudent:student })}
style={styles.daytag}

> Mon </div>)}
{day==="Tuesday"&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
operate: "update", operation:"cleanPrepare", currentstudent:student })}
style={styles.daytag}> Tues </div>)}
{day==="Wednesday"&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
operate: "update", operation:"cleanPrepare", currentstudent:student })}
style={styles.daytag}> Wed </div>)}
{day==="Thursday"&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
operate: "update", operation:"cleanPrepare", currentstudent:student })}
style={styles.daytag}> Thur </div>)}
{day==="Friday"&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
operate: "update", operation:"cleanPrepare", currentstudent:student })}
style={styles.daytag}> Fri </div>)}
{day==="Saturday"&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
operate: "update", operation:"cleanPrepare", currentstudent:student })}
style={styles.daytag}> Sat </div>)}
{day==="Sunday"&&(<div onClick = {dispatch.bind(this,{popupSwitch:"editStudent",  
operate: "update", operation:"cleanPrepare", currentstudent:student })}
style={styles.daytag}> Sun </div>)}

</div>)}
</div>
                        </div>)}


                </div>
            </div>
            </div>
               
        );
    }
}

export default ChatRoom;