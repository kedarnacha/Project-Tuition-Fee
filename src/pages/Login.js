import React from "react"
import axios from "axios"
import { base_url } from "../config";
import "../assets/login.css"
import { ReactComponent as Gambar } from "../assets/bgedu.svg"

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            level: "admin",
            token: "",
            logged: true,
            message: "",
            nisn: "",
            as: "petugas"
        }

    }
    Login = event => {
        event.preventDefault();
        if (this.state.as === "petugas") {
            let sendData = {
                username: this.state.username,
                password: this.state.password,
                level: this.state.level
            }
            let url = base_url + "/petugas/auth"
            axios.post(url, sendData)
                .then(response => {
                    this.setState({ logged: response.data.logged })
                    if (this.state.logged) {
                        let admin = response.data.data
                        let token = response.data.token
                        localStorage.setItem("admin", JSON.stringify(admin))
                        localStorage.setItem("token", token)
                        localStorage.setItem("level", this.state.level)
                        this.props.history.push("/dashboard")
                    } else {
                        this.setState({ message: response.data.message })
                    }
                })
                .catch(error => console.log(error))
        } else if (this.state.as === "siswa") {
            let sendData = {
                nisn: this.state.nisn
            }
            let url = base_url + "/siswa/auth"
            axios.post(url, sendData)
                .then(response => {
                    this.setState({ logged: response.data.logged })
                    if (this.state.logged) {
                        let siswa = response.data.data
                        let token = response.data.token
                        localStorage.setItem("siswa", JSON.stringify(siswa))
                        localStorage.setItem("token", token)
                        this.props.history.push("/dashboard")
                    } else {
                        this.setState({ message: response.data.message })
                    }
                })
                .catch(error => console.log(error))
        }
    }
    componentDidMount() {
        // get token from local.storage
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            window.location = "/"
        }

    }
    render() {
        return (
            <div class="login">
                <div class="login_box">
                    <div class="left">
                        <div class="contact">
                            <form onSubmit={ev => (this.Login(ev))}>
                                <h3>SIGN IN</h3>
                                <div>
                                    <select value={this.state.as} onChange={ev => this.setState({ as: ev.target.value })} class="form-select w-full mt-1 text-gray-600 py-1 rounded-md border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 px-2 text-sm">
                                        <option value="petugas">Admin</option>
                                        <option value="siswa">User</option>
                                    </select>
                                </div>
                                {this.state.as === "petugas" ? (
                                    <>
                                        <input type="text" placeholder="USERNAME" value={this.state.username}
                                            onChange={ev => this.setState({ username: ev.target.value })} />
                                        <input type="password" placeholder="PASSWORD" value={this.state.password}
                                            onChange={ev => this.setState({ password: ev.target.value })}
                                            autoComplete="false" />
                                        <select required value={this.state.level}
                                            onChange={ev => this.setState({ level: ev.target.value })}>
                                            <option value="admin">Admin</option>
                                            <option value="petugas">Petugas</option>
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <input type="text" placeholder="NISN" value={this.state.nisn}
                                            onChange={ev => this.setState({ nisn: ev.target.value })} />
                                    </>
                                )}
                                <button class="submit" onClick={ev => this.Login(ev)} >Login</button>
                            </form>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-inductor">
                            <Gambar />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}