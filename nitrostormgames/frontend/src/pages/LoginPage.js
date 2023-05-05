// import * as React from 'react';
// import { createRoot } from 'react-dom/client';
// import Box from '@mui/material/Box';
// import InputAdornment from '@mui/material/InputAdornment';
// import { Button, CircularProgress, IconButton, Snackbar, TextField} from "@mui/material";
// import MuiAlert from '@mui/material/Alert';
// import {Visibility, VisibilityOff} from "@mui/icons-material";
// import {Footer, Themer} from "../utils/utils";
// import jwt_decode from 'jwt-decode';
// import PersonIcon from '@mui/icons-material/Person';


// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//   });

// function clean(inp) {
//     return inp.toString().replace(/[\u200B-\u200D\uFEFF]/g, '');
// }


// export default class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             snackbarState: {
//                 open: false,
//                 vertical: 'bottom',
//                 horizontal: 'center',
//             },
//             showPassword: false,
//             email: "",
//             password: "",
//             submitted: false,
//             invalid_credentials: false,
//             loading: false,
//             success: false
//         }
//         this.handleClickShowPassword = () => this.setState({showPassword: !this.state.showPassword});
//         this.buttonSx = {
//             ...(this.state.success && {
//                 bgcolor: "primary",
//                 '&:hover': {
//                     bgcolor: "primary",
//                 },
//             }),
//         };
//     }


//     handleMouseDownPassword = (event) => {
//         event.preventDefault();
//         return true;
//     };
//     handleButtonClick = () => {
//         if (!this.state.loading) {
//             this.setState({loading: true, success: false});
//             if (clean(this.state.email) === "" || clean(this.state.password) === "") {
//                 this.setState({submitted: true, loading: false, success: false});
//             } else {
//                 $('.email-hidden').val(this.state.email);
//                 $('.password-hidden').val(this.state.password);
//                 $('.login-form').submit();
//             }
//         }
//     }
//     handleGoogleLogin = (response) => {
//         console.log("Encoded JWT ID token: " + response.credential);
//         const userObject = jwt_decode(response.credential);
//         console.log("Decoded JWT ID token: " + JSON.stringify(userObject));
//     }
//     componentDidMount() {
//         this.checkForValidationError()
//         document.querySelector("input[name='csrfmiddlewaretoken']").value = csrftoken;
//     //              /* global google */
//     //         google.accounts.id.initialize({
//     //             client_id: '514043729320-t1id41i7nb2smnvu8oteom91k6e0ibh9.apps.googleusercontent.com',
//     //             callback: this.handleGoogleLogin,
//     //         })
//     //         google.accounts.id.renderButton(
//     //             document.getElementById("google-login-button"),
//     //             {theme: "outline",size:"large"}
//     //         )
//     }

//     checkForValidationError = () => {
//         if ($('#verification-error')[0]) {
//             this.setState({snackbarState: {...this.state.snackbarState, open: true}});
//         }
//     }
//     handleClose = () => {
//             this.setState({snackbarState: {...this.state.snackbarState, open: false}});
//     }

//     render() {
//     const {vertical, horizontal, open} = this.state.snackbarState;
//     const pageContent = (
//     <>
//         <section className="position-relative py-4 py-xl-5">
//             <div className="container">
//                 <div className="row mb-5">
//                     <div className="col-md-8 col-xl-6 text-center mx-auto">
//                         <h2>Login</h2>
//                         <p className="w-lg-50"></p>
//                     </div>
//                 </div>
//                 <div className="row d-flex justify-content-center">
//                     <div className="col-md-6 col-xl-4">
//                         <div style={{border: "none"}} className="card mb-5">
//                             <Box bgcolor={"background.default"} component={"div"} className="card-body d-flex flex-column align-items-center">
//                                 <div className="bs-icon-xl bs-icon-circle text-light bs-icon my-4 bg-main-color"
//                                      data-bss-hover-animate="pulse">
//                                     <PersonIcon fontSize={"large"} />
//                                 </div>
//                                 <form className="text-center login-form" method="post"
//                                       autoComplete="on">
//                                     <input type="hidden" name="csrfmiddlewaretoken"></input>
//                                     <input type="hidden" className="email-hidden" name="username" />
//                                     <input type="hidden" className="password-hidden" name="password" />
//                                     <Box sx={{'& > :not(style)': {m: 1}, '& .MuiTextField-root': {m: 1, width: '25ch'}}}>
//                                         <TextField
//                                             id="email-input"
//                                             label={"Email"}
//                                             type={"email"}
//                                             name={"username"}
//                                             value={this.state.email}
//                                             InputLabelProps={{shrink: true}}
//                                             onChange={event => {
//                                                 this.setState({email: event.target.value, submitted: false})
//                                             }}
//                                             helperText={this.state.submitted && clean(this.state.email) === "" ? "Please enter your email." : ""}
//                                             error={clean(this.state.email) === "" && this.state.submitted}
//                                             color={"primary"}
//                                             autoComplete={"email"}
//                                         />
//                                         <TextField
//                                             id="password-input"
//                                             color={"primary"}
//                                             label={"Password"}
//                                             type={this.state.showPassword ? 'text' : 'password'}
//                                             name={"password"}
//                                             helperText={this.state.submitted && clean(this.state.password) === "" ? "Please enter your password." : ""}
//                                             autoComplete={"current-password"}
//                                             InputLabelProps={{shrink: true}}
//                                             value={this.state.password}
//                                             onChange={event => {
//                                                 this.setState({password: event.target.value, submitted: false})
//                                             }}
//                                             error={(clean(this.state.email) === "" || !this.state.invalid_credentials) && this.state.submitted}
//                                             InputProps={{
//                                                 endAdornment:
//                                                     <InputAdornment position="end">
//                                                         <IconButton
//                                                             aria-label="toggle password visibility"
//                                                             onClick={this.handleClickShowPassword}
//                                                             onMouseDown={this.handleMouseDownPassword}
//                                                             edge="end"
//                                                         >
//                                                             {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
//                                                         </IconButton>
//                                                     </InputAdornment>
//                                             }}
//                                         />

//                                     </Box>
//                                     <Box sx={{alignItems: 'center'}}>
//                                         <Box sx={{m: 1, position: 'relative'}}>
//                                             <Button
//                                                 variant="contained"
//                                                 sx={this.buttonSx}
//                                                 color={"primary"}
//                                                 disabled={this.state.loading}
//                                                 onClick={this.handleButtonClick}
//                                             >
//                                                 Login
//                                             </Button>
//                                             {this.state.loading && (
//                                                 <CircularProgress
//                                                     size={24}
//                                                     sx={{
//                                                         color: "secondary.dark",
//                                                         position: 'absolute',
//                                                         top: '50%',
//                                                         left: '50%',
//                                                         marginTop: '-12px',
//                                                         marginLeft: '-12px',
//                                                     }}
//                                                 />
//                                             )}
//                                         </Box>
//                                     </Box>
//                     <Snackbar
//                         anchorOrigin={{vertical, horizontal}}
//                         open={open}
//                         // autoHideDuration={6000}
//                         onClose={this.handleClose}
//                         key={vertical + horizontal}>
//                         <Alert onClose={this.handleClose} severity="error"
//                                sx={{width: '100%'}}>
//                             <p id="invalid-text" style={{color: "#fff"}}>Invalid Username and/or Password.</p>
//                         </Alert>
//                     </Snackbar>
//                                             <p className="text-muted">Don't have an account? <a
//                                                 href="/signup/" className="text-main-color">Sign Up</a></p>
//                                             <p className="text-muted">Forgot your password?</p>
//                                 </form>
//                             </Box>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     </>
//     )
//             return (
//                 <Themer>
//                     {pageContent}
//                     <Footer/>
//                 </Themer>
//             );
//         }
//     }
