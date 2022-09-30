import React, { Component } from "react";
import Checkedd from "../components/checkbox";
import Times from "./times";
import studentService from "../../services/studentService.js"
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class Addhomework extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.edit = this.edit.bind(this);

        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            edit: this.props.app.state.popupSwitch==="updateHomework"? true: false,
            addMeta:false
        }

    };
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if(!this.props.app.state.popupSwitch!=="addhwtime"){
                this.props.handleClose();
            }
        }
    }
    edit(){
        this.setState({ edit:!this.state.edit})
    }
    
    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let homework= state.currentComponent;
        let opps = homework?.getOperationsFactory();
        let dispatch= app.dispatch;
        let mykey = state.popupSwitch;
        let key = opps?.getSplice(mykey);
        return (<div>
            
                                <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010", height:"50vh" }}>
                    
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                     
                    <div className="form-group">
                        <label htmlFor="lastName"><b>Assignment Title:</b></label>
                        <input type="text" className="form-control" id="homework" style={{width:"95%"}} onChange={opps?.handleChange} name={key+"title"} placeholder={homework?.getJson().title}/>
                    </div>
                        <div className="form-group">
                            <label>Notes:</label>
                                <textarea style={{width:"95%"}} type="text" className="form-control" rows="3" id="hwdescription" onChange={opps?.handleChange} name={key+"description"} placeholder={homework?.getJson().description}></textarea>
                        </div>
                       
                        <div className="form-group">
                        <label htmlFor="lastName"><b>Meta:</b></label>
                        <input type="text" className="form-control" id="homework" style={{width:"95%"}} onChange={opps?.handleChange} name={key+"hwlink"} placeholder={homework?.getJson()?.hwlink}/>
                    </div> 

                   
                        <div style={{ marginTop: "20px", flexDirection:"row", display:'flex' }}>
                        <button  className="btn  btn-block"  
                        onClick={dispatch.bind(this, {popupSwitch:"", operation:"run"})}
                        style={{ background: "#696eb5", height: "30px", color: "#F0F2EF", width: "200px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>+ Homework</button>
                    
                    {homework?.getJson().collection!=="" &&(<button  className="btn  btn-block"  
                        onClick={dispatch.bind(this, {popupSwitch:"", operation:"cleanPrepareRun", object:homework, operate:"del"})}
                        style={{ background: "#F56060", height: "30px", color: "#F0F2EF", width: "200px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>Delete</button>)}
                    </div>
                    

                </div>
                
            </div>

            </div>)
    }
};
export default Addhomework;
//                        onClick={this.props.app.dispatch.bind(this, {objkey:"homeworks", obj:this.props.app.state.showhomework? {...this.props.app.homework}: undefined, myswitch:this.props.app.state.showhomework?"update": "add"})} 
