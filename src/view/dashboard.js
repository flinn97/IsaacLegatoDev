import React, { Component } from 'react';
import Sidemenu from "./sidemenu.js";
import Dash from "./dash.js";
import "../view.css";
import Chat from "./chat.js";
import Studentview from "./studentDash.js";//"./studentdash.js" ;
import Metro from "./metro.js";//"../pages/metro.js" ;
import Calendar from "./calendar.js";//"../pages/calendar.js" ;
import Teacher from './teacher.js';
import ChatRoom from './chatRoom.js';
import StudentDashboard from './studentDashboard.js';
 
 

export default class Dashboard extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            
        };
    }

    render() {
       let styles=this.props.app.state.styles;
        let app = this.props.app;
        let state= app.state;
        return (
            <div style={{
                    display:"flex", 
                    flexDirection:"row", 
                    justifycontent:"space-between",
                backgroundColor: styles.colors.colorBackground,
                    width: "100%", 
                    height:"100%",
                    fontFamily: styles.fonts.appFont,

                    marginTop: state.ipad? "0px": styles.borders.allmarginsH,
                                marginBottom: state.ipad? "0px": styles.borders.allmarginsH,
                                fontWeight: styles.fonts.fontweightMed,
                                
                                justifycontent: "center",
                                alignItems: state.ipad? "none":"center",
                    
                    
                    }}>
                <div style= {{
                    border: styles.borders.borderthin,
                    width: this.props.app.state.ipad?"5vw": "21vw",
                    height:"100vh",
                    border: "0px solid black" 
                }}
                >
                <Sidemenu  app={this.props.app}/>
                </div>
                <div style={{marginTop:state.ipad?"4vh":"0px"}}>
                <Switchcase  app={this.props.app}/>
                </div>

            </div>
        );
    }
}

function Switchcase (props) {
    
    let app = props?.app
    let mypage={
        viewstudent: app.state.myswitch==="viewstudent" && (<Studentview  app={app}/>),
        studentDash: app.state.myswitch==="studentDash" && (<StudentDashboard  app={app}/>),
        metro: app.state.myswitch==="metro" && (<Metro  app={app}/>),
        calendar: app.state.myswitch==="calendar" && (<Calendar  app={app}/>),
        chat: app.state.myswitch==="chat" && (<ChatRoom  app={app}/>),
        teacherpage: app.state.myswitch==="teacherpage" && (<Teacher  app={app}/>),
        dash: app.state.myswitch==="dash" && (<Dash app={app}/>)
    }
    return mypage[app.state.myswitch]? mypage[app.state.myswitch]: <div></div>;

    // if( props.state.viewstudent ){
    //     return <Studentview handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // }
    // else if(props.state.metro){
    //     return <Metro handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // }
    // else if(props.state.calendar){
    //     return <Calendar handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // } 
    // else if(props.state.chat){
    //     return <Chat handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // }
    // else if(props.state.teacherpage){
    //     return <Teacher handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>
    // }
    // else{
    //     return <Dash handleChange={props.handleChange} dispatch={props.dispatch}app={props.state}/>

    // }
   
}
