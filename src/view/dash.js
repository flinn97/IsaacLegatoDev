import React, { Component } from 'react';
import Student from './mystudents.js';
import Today from "./todaycomponent.js";
import Chat from "./chat.js";
import Metro from './metro.js';
import "../view.css"
import Admin from './admin.js';
import TimerComponent from './timer.js';
class Dashboard extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
        
        };
    }
    

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles= state.styles;
        
       
        return (

                <div style={{
                    
                            display: "flex", 
                            flexDirection: "column",
                            justifycontent: "center",
                            alignItems: "center",
                            
                            marginTop: state.ipad? "0px": styles.borders.allmarginsH,
                            marginBottom: styles.borders.allmarginsH,
                            
                            }}>
                    {state.currentuser.role==="admin"?(<Admin />):(<div>
                    <div style={{
                                
                                marginTop: styles.borders.allmarginsH,
                                marginBottom: styles.borders.allmarginsH,
                                fontWeight: styles.fonts.fontweightMed,
                                fontFamily: styles.fonts.appTitle,
                                fontSize: styles.fonts.fontsizeMod + styles.fonts.fontsizeTitle,

                                display: "flex", 
                                flexDirection: "column",
                                justifycontent: "center",
                                alignItems: "center",
                            
                            }}></div>

                    <div style={{
                        
                            display: styles.dashboard.display, 
                            flexDirection: styles.dashboard.flexRow,
                              }}>

                        <Student app={app}  />
                        <Today app={app} />
                    </div>
                    <div style={{

                            display:styles.dashboard.display, 
                            flexDirection:styles.dashboard.flexRow, 
                            }}>

                        <Chat app={app} />
                        
                        <TimerComponent app={app} />

                        <Metro app={app} />
                    </div>
                    </div>)}
                    
                </div>

        );
    }
}

export default Dashboard;