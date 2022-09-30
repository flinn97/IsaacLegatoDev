import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Student from "./mystudents";
import Opps from "../npm/compontsList";
import OppsFactory from "../npm/operationsFactory";


export default class Login extends Component {
   
    //state creation and binding.
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            
            done:false,
            email:"",
            password:"",
        };
    }
    //handles all changes with state.
    handleChange = (event) => {
        
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    //submites for login using the controller to connect with backend. Sends to the teacher profile if teacher or the student if back end spits out student.
    async handleLogin(e,) {
        debugger
        e.preventDefault();
        let email = this.state.email
        let password = this.state.password
        let student = false;
        let teacher = false;
        if(!email.includes("@")){
            let getEmail = await AuthService.getStudentsTeacher(email+"@legato.com");
            email = email+"@legato.com";
            teacher = getEmail.email;
            password = this.state.email;
            student = this.state.email;
            this.props.app.dispatch({firstTime:true})
        }
        else{
            let s = await AuthService.getStudentsTeacher(email);
            if(s?.student){
                student= s._id;
                teacher= s.email;
            }
        }
        let user = await AuthService.login(email, password, this.props.app.state.componentList, student, teacher);
        
        if(user){
            await AuthService.getAllTheDataForTheUser(email, this.props.app.state.componentList, student, teacher, this.props.app.dispatch);

        }
    }


    render() {
        
        //login page for the screen. 
        return (
            <div style={{width:"100%", height:"100%"}}>
                <div style={{width:"100%", height:"50px"}} onClick={()=>{
                    this.props.app.dispatch({operate: "adduser", operation:"cleanPrepare", login:false});
                }}>
                    Register
                </div>
            <div className="col-md-12">
                <div className="card card-container">
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
                                <div className="form-group">
                                    <label htmlFor="Email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        maxLength="30"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        maxLength="20"

                                    />
                                </div>

                                <div className="form-group" style={{marginTop:"37px"}}>
                                    <button className="btn  btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", width: "85spx" }} onClick={this.handleLogin} >
                                        <span>Login</span>
                                    </button>
                                </div>

                   
                    
                </div>
            </div>
            </div>
        );
    }
}