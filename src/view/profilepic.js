import React, { Component } from 'react';
class ProfilePic extends Component {
    constructor(props) {
        //create state
        super(props);
        this.state = {
            dropdown:false
        };
    }
    

    render() {
       
        let app = this.props.app;
        let state = app.state;
        let styles =state.styles;
        let dispatch = app.dispatch;
        let list = state.componentList;
        let component = state.currentuser;
        let comp = component?.getJson();
        
        return (
            
            <div 
                 style={{
                     display:"flex", 
                     flexDirection:"row", 
                     justifycontent:"justify",
                     
                     flex: .2,
                     marginTop: styles.margins.margin2,
                     border: styles.borders.borderthin,
                     alignItems: "flex-end",

                     
                     }}>

                <img style={{
                    width: "63px", 
                    height:"63px",
                    flexDirection:"row",
                    border: styles?.borders?.borderPic,
                    justifycontent:"space-evenly",
                    fontSize: styles?.fonts?.fontsize2,
                    cursor: "pointer",
                    borderRadius:"50%"}}
                     src = {comp?.picURL} onClick={dispatch.bind(this, {operate: "update", operation:"cleanPrepare", object:component, popupSwitch:"addPic"})} />
            <div onClick={()=>{
                if(state.currentuser.getJson().role==="teacher"){
                    dispatch({popupSwitch:"editUser",  operate: "update", operation:"cleanPrepare", object:component})
                }
            }} style= {{
                flexDirection:"column",
                textAlign: "left"
            }}>   
              <div style={{
                        color: styles?.colors.colorOffBlack,
                        marginLeft: "16px",
                        cursor: "pointer",
                        display:"flex",
                        flexDirection:"row",
                        alignItems:"center"
              }} 
              >{comp?.firstName} {comp?.lastName} <div onClick={()=>{this.setState({dropdown:!this.state.dropdown})}} style={{clipPath: "polygon(100% 0, 0 0, 50% 100%)", marginTop:"2px", marginLeft:"10px", width:"8px", height:"8px", background:"black"}}></div></div>
                <div style={{position:"relative"}}>
                    <div style={{position:"absolute", right:"0px"}}>
                        {this.state.dropdown&&(
                            <div style={{background:"#EFF1F2", padding:"10px", borderRadius:"7px", boxShadow:"2px 3px 6px #D1D1D1"}}>
                                {app.state.componentList?.getList("student")?.map((student, index) =>
                                <>{student.getJson().firstName!==state.currentuser.getJson().firstName&&(
                                <div onClick={()=>{
                                    app.dispatch({currentuser:student, currentstudent:student})
                                }}>{student.getJson().firstName}</div>
                                )}
                                </>
                                )}
                                
                            </div>
                        )}
                    
                </div>
                </div>
                <div onClick={()=>{
                if(state.currentuser.getJson().role!=="teacher"){
                    dispatch({popupSwitch:"editStudent",  operate: "update", operation:"cleanPrepare", object:component})
                }
            }} style={{
                       
                        color: styles?.colors.colorOffBlack,
                        fontSize: styles?.fonts.fontsize5,
                        justifyContent: "space-evenly",
                        flexDirection:"column",
                        marginLeft: "16px",
                        marginBottom: "10px",
                        cursor: "pointer",
                    }}
                    >
                       View Profile
                        </div></div> 
            </div>
               
        );
    }
}

export default ProfilePic;