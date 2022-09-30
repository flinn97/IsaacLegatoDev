import React, { Component } from 'react';
import clock from "./clock.png";
import Dropdown from './dropdown';
import Down from './downarrow.png';
import Switch from "react-switch";
import calendarService from '../../services/calendarService';
export default class EditProgress extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectTime = this.selectTime.bind(this);
        this.selectDay = this.selectDay.bind(this);
        this.selectDays = this.selectDays.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.closedrop = this.closedrop.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.editDays = this.editDays.bind(this);
        this.changeObjTime = this.changeObjTime.bind(this);
        this.handleChecksChange = this.handleChecksChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSpChange = this.handleSpChange.bind(this);

        this.state = {
            // first: this.props.app.state.currentstudent.firstName,
            // last: this.props.app.state.currentstudent.lastName,
            // username: this.props.app.state.currentstudent.username,
            // scheduling: this.props.app.state.currentstudent.scheduling,
            // starPoints: this.props.app.state.currentstudent.starPoints,
            day: this.props.app.state.currentstudent.day,
            // email: this.props.app.state.currentstudent.email,
            // phone: this.props.app.state.currentstudent.phone,
            // totalDaysPracticed: this.props.app.state.currentstudent.totalDaysPracticed,
            // totalDays: this.props.app.state.currentstudent.totalDays,
            // timeTotal: this.props.app.state.currentstudent.timeTotal,
            // totaltime: this.props.app.state.currentstudent.totaltime,
            // time: this.props.app.state.currentstudent.time,
            // checked: this.props.app.state.currentstudent.syncedCheckbox,
            // daysPracticed: this.props.app.state.currentstudent.daysPracticed,
            // wmin: this.props.app.state.currentstudent.wmin,
            day: this.props.app.state.currentstudent?.getJson()?.day,
            scheduling: "",
            showtimes: "",
            selectTime: false,
            selectDay: false,
            days: [],
            times: [],
            sched: {},
            objArr: [],
            // showtime: this.props.app.state.currentstudent.scheduling
        }
    }
    componentDidMount() {
        //debugger
        let objArr = [];
        let schedulearr = [];
        let obj = {};
        let timeobj = {};
        let sched = this.props.app.state.currentstudent?.getJson()?.days;

        for (const key in sched) {

            let attribute = sched[key].slice(0, -3)
            timeobj[attribute] = sched[key]
            if (obj[attribute]) {
                obj[attribute].push(key);
            }
            else {
                obj[attribute] = [key]
            }
        }
        let o = {}
        for (const key in obj) {
            for (const day in obj[key]) {
                o[obj[key][day]] = timeobj[key];
            }
            objArr.push(o);
            o = {}
        }
        
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        if (compJson) {
            this.setState({
                trackTime: compJson.trackTime,
                starpoints: compJson.starpoints,
                check: compJson.check
            })
        }



        this.setState({ objArr: objArr, });
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
    dispatch(obj) {

        this.setState({
            [Object.keys(obj)[0]]: obj[Object.keys(obj)[0]]
        })
    }
    handleChecksChange(checked) {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        opps.componentDispatch({ updatecheck: checked })
        this.setState({ check: checked });
    }
    handleTimeChange(checked) {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        opps.componentDispatch({ updatetrackTime: checked })
        this.setState({ trackTime: checked });
    }
    handleSpChange(checked) {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        opps.componentDispatch({ updatestarpoints: checked })
        this.setState({ starpoints: checked });
    }
    handleChange = (event) => {
        debugger
        let { name, value } = event.target
        if (value === "true" || value === "false") {
            value = value === "true" ? true : false
        }
        this.setState({
            [name]: value,
        })
    }
    selectDays(day) {
        let arr = [...this.state.days];
        if (!arr.includes(day)) {
            arr.push(day)
        }
        else {
            arr = arr.filter(function (value, index, arr) {
                return value !== day;
            });
        }

        this.setState({
            days: arr
        })
    }
    selectDay() {
        this.setState({
            selectDay: !this.state.selectDay,
        })

    }
    closedrop() {
        this.setState({
            selectDay: false,
            selectTime: false,
            showtime: false,

        })
    }
    getSchedule(time, twelve) {
        let aschedule = "";
        let ampm = ""
        if(twelve){
            aschedule= twelve.includes("pm")? "1200 pm": "0000 am";
        }
        else{
        for (let i = 0; i < time.length; i++) {
            if (time[i] !== ":") {
                if (i === 0 && time[i] !== "0") {
                    aschedule = aschedule + time[i];
                    if (parseInt(time[i + 1]) > 1) {
                        ampm = " pm"
                    }
                    else {
                        ampm = " am"
                    }
                }
                else if (i === 0 && time[i] === "0") {
                    ampm = " am"
                }
                else if (i > 0) {

                    aschedule = aschedule + time[i];
                }

            }
        }
        aschedule += ampm;
    }
        return aschedule;
    }
    changeTime(time, showtime) {

        let app = this.props.app;
        let styles = this.props.app.state.styles;
        let comp = this.props.app.state.componentList;
        let operate = comp.getOperationsFactory();
        let times = this.getSchedule(time, showtime.includes("12")?showtime:false);
        let sched = { ...this.state.sched };
        sched[this.state.currentDay] = times;
        debugger
        this.setState({ time: times,  showtimes:showtime})
        // this.setState({
        //     sched:sched,
        //     [this.state.currentDay+"time"]: showtime
        // })
        // this.selectTime(this.state.currentDay);
    }
    selectTime(day) {

        this.setState({
            [day + "selectTime"]: !this.state[day + "selectTime"],
            currentDay: day

        })
    }
    editDays(obj, day, index) {
        let arr = this.state[index + "days"];
        if (!arr.includes(day)) {
            arr.push(day)
        }
        else {
            arr = arr.filter(function (value, index, arr) {
                return value !== day;
            });
        }
        
        this.setState({ [index + "days"]: arr, [index + "time"]: obj[Object.keys(obj)[0]] });

    }
    changeObjTime(time, showtime) {
        
        let times = this.getSchedule(time);
        this.setState({ [this.state.index + "time"]: times })
    }
    render() {
        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch = app.dispatch;
        let component = state.currentstudent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        return (
            <div className="popup-boxa to-front" style={{}} >

                <div ref={this.wrapperRef} style={{ ...styles.popup1, height: "65vh", width: "50vw" }} >
                <div style={ ///EXIT BUTTON
                                { ...styles.buttons.closeicon, justifySelf: "flex-end" }
                            } onClick={this.props.handleClose}>x</div>
                    <div style={{display:'flex', flexDirection:"row"}}>
                    <div>
                        <div  ///HEADER DIV
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "100%",
                                marginTop: "-" + styles.margins.margin4,
                            }}>

                            <div style={{ ///POPUP TITLE
                                display: "flex",
                                flexDirection: "row",
                                lineHeight: "3vw",
                                height: "3vh",


                                fontSize: styles.fonts.fontsize1,
                                fontWeight: styles.fonts.fontweightMed,
                                textAlign: "center",
                                color: styles.colors.colorOffBlack,
                                fontSize: styles.fonts.fontsize1,

                            }}><img onClick={()=>{if(state.currentuser.getJson().role!=="teacher"){dispatch({popupSwitch:"addPic"})}}} src={state.currentstudent.getJson().picURL} style={{ width: "70px", height: "70px", borderRadius: "50%" }} alt="pic" /></div>

                            
                        </div>

                        {/* ///BODY  */}
                        <div className=" homeworkScroll1" style={{ height: "43vh", marginTop: "40px" }}>
                            <div style={{display:"flex", flexDirection:"row", marginBottom: styles.margins.margin4,}}>
                                <div className="form-group"
                                    style={{ width: "10vw", marginRight:'10px'}}>
                                    <input type="text" className="form-control" id="first" placeholder={compJson?.firstName} onChange={opps?.handleChange} name="updatefirstName" />
                                </div>


                                <div className="form-group"
                                    style={{
                                        width: "10vw",
                                        
                                    }}>
                                    <input type="text" className="form-control" id="last" placeholder={compJson?.lastName} onChange={opps?.handleChange} name="updatelastName" />
                                </div>
                            </div>
                          

                            <div className="form-group"
                                style={{ width: "89%" }}>
                                <label htmlFor="parent"><b>Parent:</b></label>
                                <input type="text" className="form-control" id="parent" placeholder={compJson?.parent} onChange={opps?.handleChange} name="updateparent" />
                            </div>
                            <div className="form-group"
                                style={{ width: "89%" }}>
                                <label htmlFor="phone"><b>Phone:</b></label>
                                <input type="text" className="form-control" id="phone" placeholder={compJson?.phone} onChange={opps?.handleChange} name="updatephone" />
                            </div>
                            <div className="form-group"
                                style={{ width: "89%" }}>
                                <label htmlFor="email"><b>Email:</b></label>
                                <input value={compJson?.email?compJson?.email:"Student Hasn't Updated Yet"}type="text" className="form-control" id="email" placeholder={compJson?.email} name="updateemail" />
                            </div>
                            <div className="form-group"
                                style={{ width: "89%" }}>
                                <label htmlFor="address"><b>Address:</b></label>
                                <input type="text" className="form-control" id="address" placeholder={compJson?.phone} onChange={opps?.handleChange} name="updateaddress" />
                            </div>
                            
                            
                            {state.currentuser.getJson().role==="teacher" &&(<>
                            <label>Should this student have daily checkboxes?</label>
                            <Switch onChange={this.handleChecksChange} checked={this.state.check} onColor={"#57BA8E"} name="updatecheck" uncheckedIcon={false} checkedIcon={false} />
                            
                            {/* {compJson?.check?(
                            <select  htmlFor="updatecheck" onChange={opps?.handleChange} name="updatecheck" id="updatecheck">
                            <option value={true}>Current: Yes</option>
                            <option value={false}>No</option>                                       
                        </select>
                        ):(
                            <select  htmlFor="updatecheck" onChange={opps?.handleChange} name="updatecheck" id="updatecheck">
                                        <option value={false}>Current:No</option>                                       
                                        <option value={true}>Yes</option>
                                    </select>
                        )} */}

                            <div className="form-group" style={{}}>
                                <label>Should this student track time?</label>
                                <Switch onChange={this.handleTimeChange} checked={this.state.trackTime} onColor={"#57BA8E"} name="updatecheck" uncheckedIcon={false} checkedIcon={false} />

                                {/*  {compJson?.time?(
                            <select  htmlFor="time" onChange={opps?.handleChange} name="updatetime" id="time">
                            <option value={true}>Current: Yes</option>
                            <option value={false}>No</option>                                       
                        </select>
                        ):(
                            <select  htmlFor="time" onChange={opps?.handleChange} name="updatetime" id="time">
                                        <option value={false}>Current:No</option>                                       
                                        <option value={true}>Yes</option>
                                    </select>
                        )}*/}
                            </div>
                            {/* <div className="form-group">
                                <label>Track Star Points?</label>
                                <Switch onChange={this.handleSpChange} checked={this.state.starpoints} onColor={"#57BA8E"} name="updatecheck" uncheckedIcon={false} checkedIcon={false} />

                                {/* {compJson?.starPoints?(
                                    <select htmlfor="starPoints" onChange={opps?.handleChange} name="updatestarPoints" id="starPoints">
                                    <option value={true}>Current: yes</option>
                                    <option value={false}>no</option>
                                    </select>):(
                                        <select htmlfor="starPoints" onChange={opps?.handleChange} name="updatestarPoints" id="starPoints">
                                        <option value={false}>Current: no</option>
                                        <option value={true}> yes</option>
                                        </select>
                                     )} 
                            </div> */}
                           
                            {/* <div> */}
                            {/* <div> */}
                            {/* <div className="form-group" >
                                <label htmlFor="totalDays">Days to practice:</label>
                                <input type="text" className="form-control" id="updatetotalDays" style={{ width: "60px" }} placeholder={compJson?.totalDays} onChange={opps?.handleChange} name="updatetotalDays"/>
                            </div>
                            <button className="btn btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", marginTop:"5px", width:"185px" }} 
                            onClick= {()=>{
                                this.setState({dayscleared:true});
                                opps?.componentDispatch({updatedaysPracticed:"0"}); }}>
                                {!this.state.dayscleared?(<span className="fill1"><p style={{ marginBottom: "10px" }}>Clear Days Practiced</p></span>):(<span className="fill1"><p style={{ marginBottom: "10px" }}>Days Cleared</p></span>)}</button>
                                <div>
                                    <div>
                                    <div className="form-group" >
                                    <label htmlFor="wmin">Practice minutes:</label>
                                    <input type="text" className="form-control" id="wmin" placeholder={compJson?.wmin} style={{ width: "60px" }} onChange={opps?.handleChange} name="updatewmin"/>
                                </div>
                                
                                <button className="btn btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", marginTop:"5px", width:"185px" }} 
                               onClick={()=>{
                                this.setState({timecleared:true});
                                opps?.componentDispatch({updatetimeTotalforGoal:"0"}); }}>{!this.state.timecleared?(<span className="fill1"><p style={{ marginBottom: "10px" }}>Clear Time Practiced</p></span>):(<span className="fill1"><p style={{ marginBottom: "10px" }}>Time Cleared</p></span>)}</button> */}
                            </>)}

                            

                        <button className="btn btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", marginTop: "20px", width: "125px" }} onClick={async () => {
                            let arr = this.state.objArr;
                            let obj = {}
                            for (const key in arr) {
                                for (const day in arr[key]) {
                                    obj[day] = arr[key][day]
                                }
                            }
                            
                           await  component.changeSchedule(obj);
                            dispatch({ operation: "run", popupSwitch: "" })
                        }}>
                            <span className="fill1"><p style={{ marginBottom: "10px" }}>Save</p></span></button>
                            </div>
                            </div>
                    
                    <div style={{marginTop:"6vh", marginLeft:"2vw"}}>
                        <h3>Lesson Times</h3>
                          {/* UMM?? */}
                          {this.state.objArr?.map((obj, index) =>
                                <div>{!this.state[index + "edit"] ? (
                                    <div style={{ marginTop:"20px",display: "flex", flexDirection: "column", padding: "2%", background: "#6C86F4", width: "300px", borderRadius: "14px", marginBottom:"20px" }}>
                                        <div style={{ display: "flex", flexDirection: "row", marginBottom:"20px"}}>

                                            {Object.keys(obj).includes("Monday") && (<div
                                                style={{
                                                    ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", marginRight: "20px",
                                                    cursor: "default",
                                                    width: "36px",
                                                }} >Mon</div>)}
                                            {Object.keys(obj).includes("Tuesday") && (<div
                                                style={{
                                                    ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", marginRight: "20px",
                                                    cursor: "default",
                                                    width: "36px",
                                                }}>Tues</div>)}
                                            {Object.keys(obj).includes("Wednesday") && (<div
                                                style={{
                                                    ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", marginRight: "20px",
                                                    cursor: "default",
                                                    width: "36px",
                                                }}>Wed</div>)}
                                            {Object.keys(obj).includes("Thursday") && (<div
                                                style={{
                                                    ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", marginRight: "20px",
                                                    cursor: "default",
                                                    width: "36px",
                                                }}>Thur</div>)}
                                            {Object.keys(obj).includes("Friday") && (<div
                                                style={{
                                                    ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", marginRight: "20px",
                                                    cursor: "default",
                                                    width: "36px",
                                                }}>Fri</div>)}
                                            {Object.keys(obj).includes("Saturday") && (<div
                                                style={{
                                                    ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", marginRight: "20px",
                                                    cursor: "default",
                                                    width: "36px",
                                                }}>Sat</div>)}
                                            {Object.keys(obj).includes("Sunday") && (<div
                                                style={{
                                                    ...styles.daytag, background: "white", color: "#6C86F4", display: "flex", flexDirection: "row", marginTop: "4px", marginRight: "20px",
                                                    cursor: "default",
                                                    width: "36px",
                                                }}>Sun</div>)}
                                        </div>
                                        <div style={{ flexDirection: "row", display: 'flex', }}>
                                            <div className="form-control" id="time" style={{
                                                width: "110px",
                                                height: "30px",
                                                flexDirection: "row",
                                                display: "flex",
                                                marginLeft: styles.margins.margin4,
                                                marginRight: styles.margins.margin4,
                                            }}>
                                                <div style={{
                                                    width: "150px", alignSelf: "center"
                                                }}>{obj[Object.keys(obj)[0]].includes("pm")?(<>{calendarService.getTime(obj[Object.keys(obj)[0]])}</>):(<>{obj[Object.keys(obj)[0]]}</>)}</div>
                                                <img src={clock} alt="clock" style={{
                                                    width: "15px", height: "15px",
                                                }} />
                                            </div>


                                            <div style={{
                                                width: "100px",
                                                height: "30px", marginLeft: "20px", background: "white", borderRadius: "7px", display: "flex", justifyContent: "center", alignItems: "center"
                                            }} onClick={() => {
                                                let arr = [];
                                                for (const key in obj) {
                                                    arr.push(key);
                                                }
                                                this.setState({ [index + "edit"]: true, [index + "days"]: arr })
                                            }}> edit time</div>


                                            <div onClick={() => {
                                                let arr = [...this.state.objArr];
                                                arr = arr.filter(function (value, ind, arr) {
                                                    return ind !== index;
                                                });
                                                this.setState({ objArr: arr })
                                            }}

                                                style={{
                                                    color: styles.colors.colorWarning,
                                                    fontSize: styles.fonts.fontsize5,
                                                    width: "52px",
                                                    marginLeft: "20px"
                                                }}
                                            > delete </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div  style={{ marginTop:"20px",display: "flex", flexDirection: "column", padding: "2%", background: '#F0F0F0', width: "300px", borderRadius: "14px", marginBottom:"20px" }}>
                                    <div style={{ display: "flex", flexDirection: "row", marginBottom:"20px"}}>
                                            <div onClick={this.editDays.bind(this, obj, "Monday", index)}
                                                style={this.state[index + "days"].includes("Monday") ? { ...styles.daytag }:{}}
                                            >Mon</div>

                                            <div onClick={this.editDays.bind(this, obj, "Tuesday", index)}
                                                style={this.state[index + "days"].includes("Tuesday") ? { ...styles.daytag }:{}}
                                            >Tues</div>

                                            <div onClick={this.editDays.bind(this, obj, "Wednesday", index)}
                                                style={this.state[index + "days"].includes("Wednesday") ? { ...styles.daytag }:{}}
                                            >Wed</div>

                                            <div onClick={this.editDays.bind(this, obj, "Thursday", index)}
                                                style={this.state[index + "days"].includes("Thursday") ? { ...styles.daytag }:{}}
                                            >Thur</div>

                                            <div onClick={this.editDays.bind(this, obj, "Friday", index)}
                                                style={this.state[index + "days"].includes("Friday")? { ...styles.daytag }:{}}
                                            >Fri</div>

                                            <div onClick={this.editDays.bind(this, obj, "Saturday", index)}
                                                style={this.state[index + "days"].includes("Saturday") ? { ...styles.daytag }:{}}
                                            >Sat</div>

                                            <div onClick={this.editDays.bind(this, obj, "Sunday", index)}
                                                style={this.state[index + "days"].includes("Sunday") ? { ...styles.daytag }:{}}
                                            >Sun</div>

                                        </div>
                                        <div style={{ flexDirection: "row", display: 'flex', }}>
                                            <div onClick={() => { this.setState({ [index + 'showtime']: this.state[index + 'showtime'] !== undefined ? false : !this.state[index + 'showtime'], index: index }) }} className="form-control" id="time" style={{ width: "120px", height: "30px", flexDirection: "row", display: "flex" }}>
                                                <div style={{ width: "90px", alignSelf: "center" }}>
                                                    {this.state[index + "time"] ? (<>{this.state[index + "time"]}</>) : (<>{obj[Object.keys(obj)[0]]?.includes("pm")?(<>{calendarService.getTime(obj[Object.keys(obj)[0]])}</>):(<>{obj[Object.keys(obj)[0]]}</>)}</>)}
                                                </div>
                                                <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                            </div>
                                            <div onClick={() => {
                                                debugger
                                                let ar = [...this.state.objArr];
                                                let arr = [...this.state[index + 'days']];
                                                let newobj = {};
                                                for (const key in arr) {
                                                    newobj[arr[key]] = this.state[index + 'time'];
                                                }
                                                ar[index] = newobj
                                                this.setState({ [index + "edit"]: false, objArr: ar })
                                            }}> + Time</div>
                                        </div>
                                        {this.state[index + 'showtime'] ? (<Dropdown selectDay={this.selectDays} clock={true} closedrop={() => { this.setState({ [index + "showtime"]: false }) }} changeTime={this.changeObjTime} />) : (<div></div>)}
                                    </div>
                                )}
                                </div>

                            )}
                            <div style={{ marginTop: "15px", height: "105px" }} className="form-group forfiles" >
                                <div style={{

                                    display: "flex",
                                    flexDirection: "column",
                                    width: "300px",
                                    //justifyContent:"space-between",
                                    background: styles.colors.colorShadow + "54",
                                    borderRadius: "23px",
                                    boxShadow: "2px 3px 6px" + styles.colors.colorOffwhite,
                                }}>


                                    <div style={{}}>
                                        <div style={{
                                            flexDirection: "row",
                                            display: 'flex',
                                            padding: "2%",
                                            height: "5vh",

                                            alignContent: "center",
                                            backgroundColor: styles.colors.colorOffwhite,
                                            color: styles.colors.colorOffBlack,
                                            marginTop: styles.margins.margin4,
                                        }}>
                                            <div onClick={this.selectDays.bind(this, "Monday")}

                                                style={{
                                                    ...styles.daytag,
                                                    color: this.state.days.includes("Monday") && styles.colors.colorBackground,
                                                    backgroundColor: this.state.days.includes("Monday") && styles.colors.color1,
                                                }}

                                            >Mon </div>
                                            <div onClick={this.selectDays.bind(this, "Tuesday")}
                                                style={{
                                                    ...styles.daytag,
                                                    color: this.state.days.includes("Tuesday") && styles.colors.colorBackground,
                                                    backgroundColor: this.state.days.includes("Tuesday") && styles.colors.color1,
                                                }}
                                            >Tues </div>
                                            <div onClick={this.selectDays.bind(this, "Wednesday")}
                                                style={{
                                                    ...styles.daytag,
                                                    color: this.state.days.includes("Wednesday") && styles.colors.colorBackground,
                                                    backgroundColor: this.state.days.includes("Wednesday") && styles.colors.color1,
                                                }}
                                            >Wed </div>
                                            <p onClick={this.selectDays.bind(this, "Thursday")}
                                                style={{
                                                    ...styles.daytag,
                                                    color: this.state.days.includes("Thursday") && styles.colors.colorBackground,
                                                    backgroundColor: this.state.days.includes("Thursday") && styles.colors.color1,
                                                }}
                                            >Thur </p>
                                            <div onClick={this.selectDays.bind(this, "Friday")}
                                                style={{
                                                    ...styles.daytag,
                                                    color: this.state.days.includes("Friday") && styles.colors.colorBackground,
                                                    backgroundColor: this.state.days.includes("Friday") && styles.colors.color1,
                                                }}
                                            >Fri </div>
                                            <div onClick={this.selectDays.bind(this, "Saturday")}
                                                style={{
                                                    ...styles.daytag,
                                                    color: this.state.days.includes("Saturday") && styles.colors.colorBackground,
                                                    backgroundColor: this.state.days.includes("Saturday") && styles.colors.color1,
                                                }}
                                            >Sat </div>
                                            <div onClick={this.selectDays.bind(this, "Sunday")}
                                                style={{
                                                    ...styles.daytag,
                                                    color: this.state.days.includes("Sunday") && styles.colors.colorBackground,
                                                    backgroundColor: this.state.days.includes("Sunday") && styles.colors.color1,
                                                }}
                                            >Sun </div>
                                        </div>
                                        <div style={{ flexDirection: "row", display: 'flex', alignItems: "center", }}>
                                            <div onClick={() => { this.setState({ showtime: !this.state.showtime }) }}
                                                className="form-control" id="time"
                                                style={{ width: "110px", height: "30px", marginLeft: "13px", marginRight: "25px", flexDirection: "row", display: "flex" }}>
                                                <div style={{ width: "90px", alignSelf: "center" }}>{this.state.showtimes}</div>
                                                <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                            </div>
                                            <div style={{
                                                ...styles.buttons.buttonLog, fontSize: "15px",
                                                // marginTop: styles.margins.margin5,

                                                background: styles.colors.color6, width: "100px", height: "27px",
                                                color: styles.colors.colorOffBlack + "dd"
                                            }}
                                                onClick={() => {
                                                    debugger
                                                    let arr = [...this.state.days];
                                                    let obj = { ...this.state.sched };
                                                    for (const key in arr) {
                                                        obj[arr[key]] = this.state.time;
                                                    }
                                                    let ar = [...this.state.objArr];
                                                    ar.push(obj);
                                                    this.setState({ objArr: ar,  days: [], time: "", sched: {} })
                                                }}> + Add time</div>
                                        </div>
                                        {this.state.showtime ? (
                                            <Dropdown selectDay={this.selectDays} clock={true} closedrop={this.closedrop} changeTime={this.changeTime} />
                                        ) : (<div></div>)}
                                    </div>

                                </div>
                            </div>
                            <button className="btn  btn-block"  
                        onClick={ async ()=>{
                            debugger
                            let list = await state.componentList.getOwnerList(state.currentstudent.getJson()._id); 
                            dispatch({popupSwitch:"", currentstudent:undefined, myswitch:"dash", operation:"cleanPrepareRun", object:list, operate:"del"
                        })}}
                        style={{ background: "#F56060", marginTop:"10vh", height: "30px", color: "#F0F2EF", width: "200px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>Delete Student</button>
                            
                    </div>
                    </div>


                </div>
            </div>
            // </div>
            // </div>
            // </div>


        )

    }
}
///                await this.props.app.dispatch({tick:1, myswitch:"noarray", switchV:true,miscswitch:true, day:day, objkey:"checked", objectattribute:day, realobject:{checked: mychecks}, sp:20, backendearr:["starpoints", "checked", "daysPracticed", "daystreak"], currentstudent: this.props.app.currentstudent?this.props.app.currentstudent: false})
