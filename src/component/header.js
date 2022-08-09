import React from "react"
import { Link } from "react-router-dom"

class header extends React.Component {
    constructor() {
        super()
        this.state = {
            data_admin: {}
        }
    }
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        localStorage.removeItem("level")
        localStorage.removeItem("siswa")
        window.location = "/"
    }
    getAdmin = () => {
        let admins = JSON.parse(localStorage.getItem('admin'))
        if (!admins) {
            this.setState({
                data_admin: "siswa"
            })
        } else {
            this.setState({
                data_admin: admins
            })
        }
    }
    componentDidMount() {
        this.getAdmin()
    }
    render() {
        return (
            <div className="row text-center border-bottom py-4" >
                <div id="menu" className="col-sm-6 col-12 mb-4 mb-sm-0" >
                    <div className="col" >
                        <h2 className="p-2 fw-bolder" > {this.state.data_admin.nama_petugas} </h2> 
                    </div>
                    <div className="col" >
                        <span className="p-4 fw-bold" title="Username" > Username: {this.state.data_admin.username} </span>
                        <span className="p-4 fw-bold" title="Role/Level" > Level: {this.state.data_admin.level} </span>
                    </div>
                </div>
                <div className="col-12 col-lg-4 my-auto" > 
                    <button className="btn btn-outline-danger fw-bold" type="button" onClick={() => this.Logout()} > Logout </button>
                </div>
            </div>
        )
    }
}
export default header;