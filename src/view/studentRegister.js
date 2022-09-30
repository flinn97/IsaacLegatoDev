import React, { Component } from "react";
import AuthService from "../services/auth.service";

//import ReCAPTCHA from "react-google-recaptcha";
import studentService from "../services/studentService";

export default class StudentRegister extends Component {
    componentDidMount() {
        // let auth = AuthService.getCurrentUser();
        // if (auth) {
        //     if (auth.role === "teacher") {
        //         this.props.app.history.push("/profile");
        //     }
        //     if (auth.role === "student") {
        //         this.props.app.history.push("/student_routes");
        //     }
        // }
    }
    //state creation and binding.
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            enabled:false,

           
        };
    }
    onChange(value) {
        console.log('Captcha value:', value);
      }
    //handles all changes with state.
    handleChange = (event) => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }
    //submites for login using the controller to connect with backend. Sends to the teacher profile if teacher or the student if back end spits out student.
    async handleLogin(e) {
        await studentService.changeStudentsEmail(this.state.email, this.state.password, this.props.app.state.currentuser, this.props.app.dispatch);

        // await this.props.app.dispatch({
        //     email:this.state.email
        // })
        
        // e.preventDefault();
        // let user = await AuthService.register(this.state.email, this.state.password,true);
        // if(user){
            
        //     await this.props.app.state.currentComponent?.getOperationsFactory().componentDispatch({addemail:this.state.email, addlastName:this.state.lastName, addfirstName:this.state.firstName, add_id:this.state.email})
        //     await this.props.app.state.currentComponent?.getOperationsFactory().run();
            
        //     this.props.app.dispatch({login:false, currentuser:this.props.app.state.currentComponent, });
        // }
    
    }

    render() {
        //login page for the screen. 
        return (
            <div style={{width:"100%", height:"100%"}}>
                {/* <div style={{width:"100%", height:"50px"}} onClick={this.props.app.dispatch.bind(this,{login:true})}>
                    login
                </div> */}
            <div className="col-md-12">
                <div className="card card-container">
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card"/>
                        Welcome to Legato Student! Please enter a new email and password to continue.
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
                                {/* <ReCAPTCHA
        sitekey="6LeiGochAAAAAMq6jjzeQhFrO7NILcrx44bt0Now"
        onChange={this.onChange}
      /> */}
                                <div className="form-group" style={{marginTop:"37px"}}>
                                    <button className="btn  btn-block" style={{ background: "#696eb5", height: "35px", color: "#F0F2EF", width: "85spx" }} onClick={this.handleLogin} >
                                        <span>Register</span>
                                    </button>
                                </div>

                   
                    
                </div>
            </div>
            </div>
        );
    }
}