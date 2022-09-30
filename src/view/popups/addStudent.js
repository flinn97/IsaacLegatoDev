import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import { isEmail } from "validator";
import Dropdown from "./dropdown.js"
import Down from "./downarrow.png"
import authService from "../../services/auth.service.js";
import "../../App.css"
import './pages.css';
import './components.css';
import './index.css';
import './view.css';
import clock from "./clock.png"
import calendarService from "../../services/calendarService.js";
import Wolf from '../../assets/place1.png';
import dear from '../../assets/place2.png';
import sheep from '../../assets/place3.png';
import cat from '../../assets/place4.png';
import bird from '../../assets/place5.png';
import turkey from '../../assets/place6.png';
import bug from '../../assets/place7.png';
import loading from '../../assets/loading.gif';
// import factory from "../../npm/factory.js";
//this component details my dialog help component

class Addstudent extends Component {
    //using the functions sent from the profile page allows me to send back student information typed in to profile and then to the backend. 
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.selectDay = this.selectDay.bind(this);
        this.selectDays = this.selectDays.bind(this);
        this.selectTime = this.selectTime.bind(this);
        this.closedrop = this.closedrop.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.addstudent=this.addstudent.bind(this);
        this.getSchedule = this.getSchedule.bind(this);
        this.editDays = this.editDays.bind(this);
        this.changeObjTime=this.changeObjTime.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
            loading: false,
            times: [],
            days: [],
            pics: [Wolf, dear, sheep, cat, bird, turkey, bug],
            sched: {},
            objArr:[],
            showtime: false,
            showtimes:"",
            daily: "100",
            currentDay: "",
            hwtype: "",
            showHomework: false,
            currentHomework: undefined,
            currentgoal: undefined,
            showGoals: false,
            tempID: 1,
            HWtempID: 1,
            tempGoal: "",
            tempDescription: "",
            tempday: "",
            tempcheckboxes: "",
            tempHW: "",
            edited: false,
            edit: "",
            editedd: "",
            val: false,
            yesnoCheckboxes: true,
            yesnoTime: true,
            timeframePractice: true,
            starPoints: true,
            manualsetup: false,
            syncCheckbox: true,
            dayorweekTime: "",
            timeSync: true,
            daysbool: true,
            timebool: true,
            smonths: "",
            emonths: "",
            temonths: "",
            tsmonths: "",
            Supporting_Goal: "",
            Homework_Practiced: "",
            timeframePracticebiao: true,
            min: "100",
            weeklytimebiao: "60",
            dailytimebiao: true,
            dmin: "20",
            weekStreak: true,
            dayStreak: true,
            done: 0,
            hwsynccheck: true,
            hwdmin: "",
            HWweeklytimebiao: "",
            hwtimesync: true,
            hwlink: "",
            struggles: true,
            hwQuestions: true,
            yesnoday: true,
            yesnoweek: true,
            marginTop: "",
            marginLeft: "55px",
            selectDay: false,
            selectTime: false,
            day: "",
            time: "",
            first: "",
            last: "",
            time: "",
            toosmall: false,

        }
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }
    componentDidMount() {
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


    selectDay() {
        this.setState({
            selectDay: !this.state.selectDay,
        })
    }
    closedrop() {
        this.setState({
            selectDay: false,
            selectTime: false,
            showtime:false,

        })
    }
    selectTime(day) {

        this.setState({
            [day + "selectTime"]: !this.state[day + "selectTime"],
            currentDay: day

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

    selectDays(day) {
        let arr = [...this.state.days];
        if(!arr.includes(day)){
            arr.push(day)
        }
        else{
            arr = arr.filter(function(value, index, arr){ 
                    return value !== day;
                });
        }
       
        this.setState({
            days: arr
        })
    }
    changeTime(time, showtime) {
        
        let app = this.props.app;
        let styles = this.props.app.state.styles;
        let comp = this.props.app.state.componentList;
        let operate = comp.getOperationsFactory();
        let times = this.getSchedule(time, showtime.includes("12")?showtime:false);
        let sched = { ...this.state.sched };
        sched[this.state.currentDay] = times;
        this.setState({ time: times, showtimes: showtime })
        // this.setState({
        //     sched:sched,
        //     [this.state.currentDay+"time"]: showtime
        // })
        // this.selectTime(this.state.currentDay);
    }
    editDays(obj, day, index){
        let arr = this.state[index+"days"];
        if(!arr.includes(day)){
            arr.push(day)
        }
        else{
            arr = arr.filter(function(value, index, arr){ 
                    return value !== day;
                });
        }
        debugger
        this.setState({[index+"days"]: arr, [index+"time"]: obj[Object.keys(obj)[0]]});
        
    }
    changeObjTime(time, showtime){
        debugger
        let times = this.getSchedule(time);
        this.setState({[this.state.index+"time"]: times, [this.state.index+"showtimes"]: showtime})
    }

    render() {
        let app = this.props.app;
        let styles = this.props.app.state.styles;
        let comp = this.props.app.state.componentList;
        let operate = comp.getOperationsFactory();
        let student = operate.getUpdater().getJson().add[0];
        return (
            <div className="popup-box" style={{
                zIndex: "10000",
            }}>
                <div className="box_add" ref={this.wrapperRef}>
                <div style={ ///EXIT BUTTON
                                styles.buttons.closeicon
                            } onClick={this.props.handleClose}>x</div>
                    <div>
                        <div className="form-group">
                            <label htmlFor="firstName"><b>Student First Name:</b>*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first"
                                onChange={operate.handleChange}
                                name="addfirstName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName"><b>Student Last Name:</b>*</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last"
                                onChange={operate.handleChange}
                                name="addlastName"
                            />
                        </div>
                        {this.state.objArr?.map((obj, index) =>
                        <div style={{width:"100%", marginTop:"17px"}}>{!this.state[index+"edit"]?(
                            <div style={{ display: "flex", flexDirection: "row", padding: "2%", background:this.props.app.state.styles.colors.colorLink, width: "100%", borderRadius:"14px"}}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                {Object.keys(obj).includes("Monday") && (<div  style={{ ...styles.daytag, background:styles.colors.color6, color:this.props.app.state.styles.colors.colorLink, display:"flex", flexDirection:"row",marginTop:"4px", marginRight:"20px", 
                                    cursor: "default",
                                    width: "36px",
                                }}>Mon </div>)}
                                {Object.keys(obj).includes("Tuesday") && (<div style={{ ...styles.daytag, background:styles.colors.color6, color:this.props.app.state.styles.colors.colorLink, display:"flex", flexDirection:"row",marginTop:"4px", marginRight:"20px", 
                                    cursor: "default",
                                    width: "36px",
                                }} >Tues </div>)}
                                {Object.keys(obj).includes("Wednesday") && (<div style={{ ...styles.daytag, background:styles.colors.color6, color:this.props.app.state.styles.colors.colorLink, display:"flex", flexDirection:"row",marginTop:"4px", marginRight:"20px", 
                                    cursor: "default",
                                    width: "36px",
                                }} >Wed </div>)}
                                {Object.keys(obj).includes("Thursday") && (<div style={{ ...styles.daytag, background:styles.colors.color6, color:this.props.app.state.styles.colors.colorLink, display:"flex", flexDirection:"row",marginTop:"4px", marginRight:"20px", 
                                    cursor: "default",
                                    width: "36px",
                                }} >Thur </div>)}
                                {Object.keys(obj).includes("Friday") && (<div style={{ ...styles.daytag, background:styles.colors.color6, color:this.props.app.state.styles.colors.colorLink, display:"flex", flexDirection:"row",marginTop:"4px", marginRight:"20px", 
                                    cursor: "default",
                                    width: "36px",
                                }} >Fri </div>)}
                                {Object.keys(obj).includes("Saturday") && (<div style={{ ...styles.daytag, background:styles.colors.color6, color:this.props.app.state.styles.colors.colorLink, display:"flex", flexDirection:"row",marginTop:"4px", marginRight:"20px", 
                                    cursor: "default",
                                    width: "36px",
                                }} >Sat </div>)}
                                {Object.keys(obj).includes("Sunday") && (<div style={{ ...styles.daytag, background:styles.colors.color6, color:this.props.app.state.styles.colors.colorLink, display:"flex", flexDirection:"row",marginTop:"4px", marginRight:"20px", 
                                    cursor: "default",
                                    width: "36px",
                                }} >Sun </div>)}
                                <div style={{ flexDirection: "row", display: 'flex', }}>
                                        <div className="form-control" id="time" style={{ width: "110px", 
                                                height: "30px", 
                                                flexDirection: "row", 
                                                display: "flex",
                                                marginLeft: styles.margins.margin4,
                                                marginRight: styles.margins.margin4, }}>
                                            <div style={{ width: "90px", alignSelf: "center" }}>{obj[Object.keys(obj)[0]]?.includes("pm")?(<>{calendarService.getTime(obj[Object.keys(obj)[0]])}</>):(<>{obj[Object.keys(obj)[0]]}</>)}</div>
                                            <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                        </div>
                                        <div style = {{  width: "80px", 
                                                height: "30px", marginLeft:"20px", background:styles.colors.color6, borderRadius:"7px", display:"flex", justifyContent:"center", alignItems:"center"}} 
                                                onClick={()=>{
                                                    debugger
                                            let arr = [];
                                            for(const key in obj){
                                                arr.push(key);
                                            }
                                            this.setState({[index+"edit"]: true, [index+"days"]: arr})}}> edit time</div>
                                            <div style={{
                                                color: styles.colors.colorWarning,
                                                fontSize: styles.fonts.fontsize5,
                                                width: "52px",
                                                marginLeft:"20px",
                                                fontWeight: styles.fonts.fontweightMed,
                                            }} onClick={()=>{
                                            let arr = [...this.state.objArr];
                                            arr = arr.filter(function(value, ind, arr){ 
                                                return ind !== index;
                                            });
                                            this.setState({objArr: arr})}}> delete</div>
                                    </div>
                            </div>
                            </div>
                            ):(
                                <div style={{marginTop:"15px", height:"105px"}} className="form-group forfiles" >
                            <div style={{
                                
                                display: "flex",
                                flexDirection: "column",
                                //justifyContent:"space-between",
                                background: styles.colors.colorShadow+"54",
                                borderRadius: "23px",
                                boxShadow: "2px 3px 6px" + styles.colors.colorOffwhite,
                            }}>
                                    <div style={{ 
                                    flexDirection: "row", 
                                    display: 'flex', 
                                    padding: "2%",
                                    height: "5vh",
                                   
                                    alignContent: "center",
                                    backgroundColor: styles.colors.colorOffwhite,
                                    color: styles.colors.colorOffBlack,
                                    marginTop: styles.margins.margin4,}}>
                                        <div onClick={this.editDays.bind(this, obj,"Monday", index)} style = {this.state[index+"days"].includes("Monday")?{ ...styles.daytag,
                                            color: this.state.days.includes("Monday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Monday") && styles.colors.color1,}:{}}>Mon </div>
                                        <div onClick={this.editDays.bind(this, obj,"Tuesday", index)} style = {this.state[index+"days"].includes("Tuesday")? { ...styles.daytag,
                                            color: this.state.days.includes("Tuesday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Tuesday") && styles.colors.color1,}:{}}>Tues </div> 
                                         <div onClick={this.editDays.bind(this, obj,"Wednesday", index)} style = {this.state[index+"days"].includes("Wednesday")?{ ...styles.daytag,
                                            color: this.state.days.includes("Wednesday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Wednesday") && styles.colors.color1,}:{}}>Wed </div>
                                        <div onClick={this.editDays.bind(this, obj,"Thursday", index)} style = {this.state[index+"days"].includes("Thursday") ?{ ...styles.daytag,
                                            color: this.state.days.includes("Thursday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Thursday") && styles.colors.color1,}:{}}>Thur </div>
                                        <div onClick={this.editDays.bind(this, obj,"Friday", index)} style = {this.state[index+"days"].includes("Friday") ?{ ...styles.daytag,
                                            color: this.state.days.includes("Friday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Friday") && styles.colors.color1,}:{}}>Fri </div>
                                        <div onClick={this.editDays.bind(this, obj,"Saturday", index)} style = {this.state[index+"days"].includes("Saturday") ?{ ...styles.daytag,
                                            color: this.state.days.includes("Saturday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Saturday") && styles.colors.color1,}:{}}>Sat </div>
                                        <div onClick={this.editDays.bind(this, obj,"Sunday", index)} style = {this.state[index+"days"].includes("Sunday") ?{ ...styles.daytag,
                                            color: this.state.days.includes("Sunday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Sunday") && styles.colors.color1,}:{}}>Sun </div> 
                                    </div>
                                    <div style={{ flexDirection: "row", display: 'flex', }}>
                                        <div onClick={()=>{this.setState({[index+'showtime']:this.state[index+'showtime']!==undefined?false:!this.state[index+'showtime'], index:index})}} className="form-control" id="time" 
                                        style={{ width: "110px", height: "30px", marginLeft:"13px", marginRight:"25px", flexDirection: "row", display: "flex" }}>
                                            <div style={{ width: "90px", alignSelf: "center" }}>
                                                {this.state[index+"time"]? (<>{this.state[index+"showtimes"]}</>):(<>{obj[Object.keys(obj)[0]]?.includes("pm")?(<>{calendarService.getTime(obj[Object.keys(obj)[0]])}</>):(<>{obj[Object.keys(obj)[0]]}</>)}</>)}
                                                </div>
                                            <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                        </div>
                                        <div style={{...styles.buttons.buttonLog, fontSize:"15px",
                                        // marginTop: styles.margins.margin5,

                                        background:styles.colors.color6, width:"100px", height:"27px",
                                        color: styles.colors.colorOffBlack+"dd"}}onClick={() => {
                                            debugger
                                            let ar = [...this.state.objArr];
                                            let arr = [...this.state[index+'days']];
                                            let newobj = {};
                                            for (const key in arr) {
                                                newobj[arr[key]] = this.state[index+'time'];
                                            }
                                            ar[index]=newobj
                                            this.setState({ [index+"edit"]: false, objArr:ar })
                                        }}> + Time</div>
                                    </div>
                                    {this.state[index+'showtime'] ? (<Dropdown selectDay={this.selectDays} clock={true} closedrop={()=>{this.setState({[index+"showtime"]: false})}} changeTime={this.changeObjTime} />) : (<div></div>)}
                                </div>
                                </div>
                                )}
                            </div>
                            
                        )}
                        <div style={{marginTop:"15px", height:"105px"}} className="form-group forfiles" >
                            <div style={{
                                
                                display: "flex",
                                flexDirection: "column",
                                //justifyContent:"space-between",
                                background: styles.colors.colorShadow+"54",
                                borderRadius: "23px",
                                boxShadow: "2px 3px 6px" + styles.colors.colorOffwhite,
                            }}>


                                <div>
                                    <div style={{ 
                                    flexDirection: "row", 
                                    display: 'flex', 
                                    padding: "2%",
                                    height: "5vh",
                                   
                                    alignContent: "center",
                                    backgroundColor: styles.colors.colorOffwhite,
                                    color: styles.colors.colorOffBlack,
                                    marginTop: styles.margins.margin4,}}>
                                        <div onClick={this.selectDays.bind(this, "Monday")} 
                                         style={{ 
                                            ...styles.daytag,
                                            color: this.state.days.includes("Monday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Monday") && styles.colors.color1,}}>Mon </div>
                                        <div onClick={this.selectDays.bind(this, "Tuesday")} 
                                         style={{ 
                                            ...styles.daytag,
                                            color: this.state.days.includes("Tuesday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Tuesday") && styles.colors.color1,}}>Tues </div>
                                        <div onClick={this.selectDays.bind(this, "Wednesday")} 
                                         style={{ 
                                            ...styles.daytag,
                                            color: this.state.days.includes("Wednesday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Wednesday") && styles.colors.color1,}}>Wed </div>
                                        <div onClick={this.selectDays.bind(this, "Thursday")} 
                                         style={{ 
                                            ...styles.daytag,
                                            color: this.state.days.includes("Thursday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Thursday") && styles.colors.color1,}}>Thur </div>
                                        <div onClick={this.selectDays.bind(this, "Friday")} 
                                         style={{ 
                                            ...styles.daytag,
                                            color: this.state.days.includes("Friday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Friday") && styles.colors.color1,}}>Fri </div>
                                        <div onClick={this.selectDays.bind(this, "Saturday")} 
                                         style={{ 
                                            ...styles.daytag,
                                            color: this.state.days.includes("Saturday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Saturday") && styles.colors.color1,}}>Sat </div>
                                        <div onClick={this.selectDays.bind(this, "Sunday")} 
                                         style={{ 
                                            ...styles.daytag,
                                            color: this.state.days.includes("Sunday") && styles.colors.colorBackground,
                                            backgroundColor: this.state.days.includes("Sunday") && styles.colors.color1,}}>Sun </div>
                                    </div>
                                    <div style={{ flexDirection: "row", display: 'flex', }}>
                                        <div onClick={()=>{this.setState({showtime:!this.state.showtime})}} className="form-control" id="time" 
                                        style={{ width: "110px", height: "30px", marginLeft:"13px", marginRight:"25px", flexDirection: "row", display: "flex" }}>
                                            <div style={{ width: "90px", alignSelf: "center" }}>{this.state.showtimes}</div>
                                            <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                                        </div>
                                        <div style={{...styles.buttons.buttonLog, fontSize:"15px",
                                        // marginTop: styles.margins.margin5,

                                        background:styles.colors.color6, width:"100px", height:"27px",
                                        color: styles.colors.colorOffBlack+"dd"}} onClick={() => {
                                            debugger
                                            let arr = [...this.state.days];
                                            let obj = { ...this.state.sched };
                                            for (const key in arr) {
                                                obj[arr[key]] = this.state.time;
                                            }
                                            let ar = [...this.state.objArr];
                                            ar.push(obj);
                                            this.setState({ objArr: ar,  sched:obj, days:[], time:"", sched:{} })
                                        }}> + Time</div>
                                    </div>
                                    {this.state.showtime ? (<Dropdown selectDay={this.selectDays} clock={true} closedrop={this.closedrop} changeTime={this.changeTime} />) : (<div></div>)}
                                </div>

                            </div>
                        </div>
                        {/* {this.state.days?.map((day, index) => 
                        <div> <h3 onClick={()=>{
                            let arr = [...this.state.days];
                            arr = arr.filter(word=>word!==day);
                            let sched = {...this.state.sched};
                            let s ={}
                            for(const key in sched){
                                if(key!==day){
                                    s[key]= sched[key]
                                }
                            }
                            this.setState({days:arr, sched:s});
                        }}>X</h3> <div key={index}>{day}</div><div>
                        <label htmlfor="time"><b>Scheduled Time:</b></label>
                        <div className="form-control" id="time" onClick={this.selectTime.bind(this, day)} style={{ width: "120px", height: "30px", flexDirection: "row", display: "flex" }}>
                            <div style={{ width: "90px", alignSelf: "center" }}>{this.state[day+"time"]}</div>
                            <img src={clock} alt="clock" style={{ width: "15px", height: "15px", }} />
                        </div>
                        {this.state[day+"selectTime"] ? (<Dropdown selectDay={this.selectDays} clock={true} closedrop={this.closedrop} changeTime={this.changeTime}/>) : (<div></div>)}
                    </div></div>
                        )} */}
                        <div style={{ marginTop: "50px" }}>
                            <button className="btn " style={{ background: "#696eb5", color: "#F0F2EF" }} onClick=
                                {async () => {
                                    await this.setState({loading:true});
                                    let picURL = this.state.pics[Math.floor(Math.random() * (7 - 1))]
                                    await student.setJson({ ...student.getJson(), picURL: picURL });
                                    let arr = this.state.objArr;
                                    let obj ={}
                                    debugger
                                    for(const key in arr){
                                        for(const day in arr[key]){
                                            obj[day]=arr[key][day]
                                        }
                                    }
                                    await student.changeSchedule(obj);
                                    await operate.run();

                                    await operate.cleanJsonPrepareRun({
                                        addstarpoints: { owner: student.getJson()._id },
                                        addchatroom: { name: student.getJson().firstName, owner: student.getJson()._id, people: { [student.getJson()._id]: student.getJson().lastName } }
                                    });

                                    await authService.register(student.getJson()._id + "@legato.com", student.getJson()._id);
                                    await authService.registerStudent({ email: app.state.email }, student.getJson()._id);
                                    app.dispatch({ studentAdded: true });
                                    // await operate.JsonPrepareRun({addchatroom:{name:student.getJson().firstName, people:{[student.getJson()._id]:student.getJson().lastName}}});

                                    this.props.handleClose();
                                }}>{this.state.loading?(<><img src={loading} style={{width:"20px", height:"20px"}}/>Adding...</>):(<>Add Student</>)}</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
};

export default Addstudent;
