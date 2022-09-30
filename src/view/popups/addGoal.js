import React, { Component } from "react";
import studentService from "../../services/studentService";
//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class addGoal extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
        }
    };
    async componentDidMount() {
        debugger
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let opps = state.componentList?.getOperationsFactory();
        
        let goal= state.currentComponent;
        let currentGoal = state.currentGoal;
        let dispatch= app.dispatch;
        let key =(goal?.getJson().collection !=="" && goal?.getJson().collection !==undefined) ? "update": "add"
        
        let subgoals = currentGoal? state.componentList.getList("goal", currentGoal?.getJson()._id,"mainID") : [];
        this.setState({goals: subgoals})
        
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
        let opps = state.componentList?.getOperationsFactory();
        
        let goal= state.currentComponent;
        let currentGoal = state.currentGoal;
        let dispatch= app.dispatch;
        let key = (currentGoal?.getJson()?.collection !=="" && currentGoal?.getJson()?.collection !==undefined) ? "update": "add"
        return (
            <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010" }}>
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                    <div className="form-group">
                        <label htmlFor="lastName"><h5>Add Goal</h5></label>
                        <input
                            type="text"
                            className="form-control"
                            id="goal"
                            placeholder= {currentGoal?.getJson().title}
                            onChange={(e)=>{

                                opps?.getUpdater(key)[0]?.getOperationsFactory()?.handleChange(e)}

                                }
                            name={key+"title"}
                        />
                    </div>
                    <div className="homeworkScroll1">subgoals:
                                {this.state.goals?.map((goal, index)=>
                                <div>
                                 <input
                                 type="text"
                                 className="form-control"
                                 id="goal"
                                 placeholder= {goal.getJson().title}
                                 onChange={(e)=>{
                                    debugger
                                    let key = (goal?.getJson().collection !=="" && goal?.getJson().collection !==undefined)? "update": "add"
                                    if(key==="update"){
                                        opps.prepare({update:goal});
                                    }
                                    goal.setJson({...goal.getJson(), title:e.target.value})}
                                     }
                                 name={key+"title"}
                             /> <p onClick={()=>{
                                debugger
                                if(goal.getJson().collection!==undefined && goal.getJson().collection!==""){
                                    let goalID = goal.getJson()._id;
                                    let IDarr =[];
                                    for(const key in this.state.goals){
                                        if(this.state.goals[key].getJson()._id!==goalID){
                                            IDarr.push(this.state.goals[key]);
                                        }
                                    }
                                    opps.prepare({del:goal});
                                    this.setState({
                                        goals:IDarr
                                    })
                                    
                                }
                                else{
                                    debugger
                                    let go = [];
                                    for(const goalz in this.state.goals){
                                        let checkGoalz = this.state.goals[goalz]
                                        if(checkGoalz.getJson()._id!==goal.getJson()._id){
                                            go.push(this.state.goals[goalz]);
                                        }
                                    }
                                
                                    // let g = opps?.getUpdater(goal.getJson().collection===""?"add":"update");
                                    let g = opps?.getUpdater("add");
                                    let IDarr =[];
                                    for(const key in g){
                                        IDarr.push(g[key].getJson()._id);
                                    }
                                    let i =0;
                                    let bool= false
                                    for(i; i<IDarr.length; ){
                                        if(IDarr[i]===goal.getJson()._id){
                                            break;
                                        }
                                        i++
                                    }
                                    
                                    if(g.length!==0){
                                        if(g.length===1){
                                            g=[]
                                        }
                                        else{
                                            g = g.splice(i,1);
                                        }
                                            

                                            opps.cleanPrepare({addgoal:g});
                                            
                                            this.setState({goals:go});
                                        }
                                    }

                             }}>del</p></div>
                               )}
                               </div>
                    <div className="btn  btn-block" 
                                    style={{ 
                                        margin: "0 auto", 
                                        marginTop: "10px", 
                                        display: 'flex', 
                                        flexDirection: 'row', 
                                        justifyContent: 'center',
                                        verticalAlign: "baseline" 
                                        }} value="submit" onClick={async ()=>{
                                            debugger
                                            let id = (Math.random(Date.now())+Date.now()+performance.now()).toString();

                                            await opps.jsonPrepare({addgoal: {_id: id, mainID:opps?.getUpdater(key)[0]?.getJson()._id,  owner: state.currentstudent.getJson()._id,}})
                                           let g = opps?.getUpdater("add")
                                            let goal = g[g.length-1];
                                            this.setState({goals:[...this.state.goals, goal], })
                                            }} >
                                <span className="checkboxstuff1" 
                                    // what is this?
                                    style={{ width: "190px" }}>
                                        
                                <div> + Supporting Goal</div><div className="rowss huv"> </div>
                                </span>
                                </div>

                    <div style={{display:'flex', flexDirection:"row"}}>
                    {state.popupSwitch==="archive"?(<></>):(<>
                    <button className="btn  btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF" }} 
                    onClick={dispatch.bind(this, {operation:"run", popupSwitch:""})}>Save
                    </button>
                    {goal?.getJson().collection!=="" &&(<button  className="btn  btn-block"  
                    onClick={dispatch.bind(this, {popupSwitch:"", operation:"cleanPrepareRun", object:goal, operate:"del"})}
                    style={{ background: "#F56060", height: "30px", color: "#F0F2EF", width: "200px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>Delete</button>)}
                    </>)}
                    </div>





                </div>
            </div>

        )
    }
};

export default addGoal;