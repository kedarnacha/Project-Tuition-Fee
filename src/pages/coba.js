// import React from "react"
// import axios from "axios"
// // import { baseUrl } from "../confs";
// import "../assets/login.css"
// import { ReactComponent as Gambar } from "../assets/bgedu.svg"

// export default class coba extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             // call variable
//             // name: "",
//             email: "",
//             password: "",
//             roles: ""
//         };
//     }
//     // headerConfig = () => {
//     //     auth: {
//     //         Username: 'telkom',
//     //         Password: 'da1c25d8-37c8-41b1-afe2-42dd4825bfea'
//     //     }
//     // }
//     Login = event => {
//         event.preventDefault();
//         let sendData = {
//             // name: this.state.name,
//             email: this.state.email,
//             password: this.state.password,
//             roles: this.state.roles
//         }
//         console.log(sendData)
//         let url = baseUrl + "/users/login"
//         axios.post(url, sendData,{
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: "Basic dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ=="
//             }
//         })
//             .then(response => {
//                 console.log(sendData)
//                 // this.setState({ logged: response.data.logged })
//                 if (sendData!=null) {
//                     let data = response.data.data
//                     let token = response.data.token
//                     localStorage.setItem("data", JSON.stringify(data))
//                     localStorage.setItem("token", token)
//                     this.props.history.push("/berhasil")
//                 } else {
//                     this.setState({ message: response.data.message })
//                     this.props.history.push("/gagal")
//                 }
//             })
//             .catch(error => {
//                 console.log(error)
//             }
//             )
//     }
//     componentDidMount() {
//         // get token from local.storage
//         // if (localStorage.getItem("token")) {
//         //     this.state.token = localStorage.getItem("token")
//         //     window.location = "/"
//         // }

//     }
//     render() {
//         return (
//             <div class="login">
//                 <div class="login_box">
//                     <div class="left">
//                         <div class="contact">
//                             <form onSubmit={ev => (this.Login(ev))}>
//                                 <h3>SIGN IN</h3>
//                                 {/* <input type="text" placeholder="NAMA" value={this.state.name}
//                                     onChange={ev => this.setState({ name: ev.target.value })} /> */}
//                                 <input type="text" placeholder="EMAIL" value={this.state.email}
//                                     onChange={ev => this.setState({ email: ev.target.value })} />
//                                 <input type="password" placeholder="PASSWORD" value={this.state.password}
//                                     onChange={ev => this.setState({ password: ev.target.value })}
//                                     autoComplete="false" />
//                                 <input type="text" placeholder="ROLE" value={this.state.roles}
//                                     onChange={ev => this.setState({ roles: ev.target.value })} />
//                                 <button class="submit" onClick={ev => this.Login(ev)} >Login</button>
//                             </form>
//                         </div>
//                     </div>
//                     <div class="right">
//                         <div class="right-inductor">
//                             <Gambar />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }