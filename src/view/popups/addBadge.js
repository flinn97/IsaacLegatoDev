import React, { Component } from "react";
import studentService from "../../services/studentService";
import badge1 from "../../assets/badges/Artboard_1.svg";
import badge2 from "../../assets/badges/Artboard_2.svg";
import badge3 from "../../assets/badges/Artboard_3.svg";
import badge4 from "../../assets/badges/Artboard_4.svg";
import badge5 from "../../assets/badges/Artboard_5.svg";
import badge6 from "../../assets/badges/Artboard_6.svg";
import badge7 from "../../assets/badges/Artboard_7.svg";
import badge9 from "../../assets/badges/Artboard_9.svg";
import badge10 from "../../assets/badges/Artboard_10.svg";

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class AddBadge extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            badges:[badge1,badge2, badge3,badge4,badge5,badge6,badge7,badge9,badge10],
            currentBadge:  badge1, 
            key:"add"
        }
    };
    async componentDidMount() {

        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let badge= state.currentComponent;
        let opps = badge?.getOperationsFactory();
        debugger
        let updater = opps?.getUpdater();
        if(state.operate.includes("update")){
            this.setState({
                key:"update",
                currentBadge: badge?.getJson()?.picURL
            })
        }
        else{
            let dispatch= app.dispatch;
            let key ="add"
            debugger
            badge?.setJson({ ...badge.getJson(), picURL:this.state.currentBadge});
        }
       
        

       document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.handleClose();
        }
    }

    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let badge= state.currentComponent
        let opps = badge?.getOperationsFactory();
        let dispatch= app.dispatch;
        let key = this.state.key;
        return (
            <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010", width: "50vw", height: "54vh" }}>
                <div style={ ///EXIT BUTTON
                                {...styles.buttons.closeicon, cursor: "pointer",}
                            } onClick={this.props.handleClose}>x</div>
                    <div style={{display:"flex", flexDirection:"row", marginTop: styles.margins.margin4, alignItems:"center", height:"100%"}}>
                    <div>
                        <img src={this.state.currentBadge} style={{width:"10vw", alignItems:"center", marginLeft:"7.5vw", marginTop:"-2vh"}}/>
                    <div className="form-group" style={{width:"25vw", alignItems:"center", justifyContent:"center"}}>
                        <label htmlFor="lastName">
                            <div style={{
                                fontSize: styles.fonts.fontsize1,
                                fontWeight: styles.fonts.fontweightMed,
                            }}
                            >Badge Title</div></label>
                        <input
                            type="text"
                            className="form-control"
                            id="badge"
                            placeholder= {key==="add"?"Name your award": state.currentComponent?.getJson()?.title}
                            onChange={opps?.handleChange}
                            name={key+"title"}
                        />
                    </div>
                    <div >
                        <label htmlFor="description">
                            <div style= {{
                                    fontSize: styles.fonts.fontsize1,
                                    fontWeight: styles.fonts.fontweightMed,
                            }}
                            >
                            Description</div></label>
                        <div className="form-group" style={{                        }}>
                            <textarea
                                type="text"
                                className="form-control"
                                rows="2"
                                id="description"
                                placeholder= {key==="add"?"Describe award": state.currentComponent?.getJson()?.description}
                                onChange={opps?.handleChange}
                                name={key+"description"}

                            ></textarea>
                        </div>

                    </div>
                    </div>
                    <div style={{
                        marginLeft: styles.margins.margin3, 
                        alignContent:"center", 
                        justifycontent:"center",
                        marginTop:"6vh"}}>{this.state.badges.map((badgePic, index)=>
                    <img key = {index} onClick={async ()=>{
                        
                       await this.setState({currentBadge: badgePic})
                        
                       
                    }}style ={{width:"4vw"}} src={badgePic}/>
                    )} </div>
                    
                    </div>
                    <div style={{marginBottom:"-"+styles.margins.margin4}}>
                    <div style={{cursor:"pointer", width: "100%",
                        height: "188%",}}>
                    {state.popupSwitch==="archive"?(<></>):(
                    <div className="btn  btn-block" 
                    style={{ 
                        ...styles.buttons.buttonLog,
                        width: "22%",
                        height: "34%",
                        marginTop: styles.margins.margin4,
                     }} 
                    onClick={async ()=>{
                        debugger
                        state.currentComponent?.setJson({ ...state.currentComponent.getJson(), picURL:this.state.currentBadge});
                        dispatch({operation:"run", popupSwitch:"", })
                    }}>Award Badge
                    </div>
                    )}
                    </div>
                    </div>
                </div>
            </div>

        )
    }
};

export default AddBadge;