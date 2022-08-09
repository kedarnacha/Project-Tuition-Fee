import React from "react"
import axios from "axios"
import { base_url } from "../config"
import "../assets/assets.css"

export default class statik extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            adminName: null,
            petugasCount: 0,
            siswaCount: 0,
            kelasCount: 0,
            sppCount: 0,
            pembayaranCount: 0
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ petugasCount: response.data.petugas.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ siswaCount: response.data.siswa.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ kelasCount: response.data.kelas.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ sppCount: response.data.spp.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    getPembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ pembayaranCount: response.data.pembayaran.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    componentDidMount() {
        this.getPetugas()
        this.getSiswa()
        this.getKelas()
        this.getSpp()
        this.getPembayaran()
    }
    render() {
        return (
            <div className="row g-6 mb-6 py-3">
                <div className="col-xl-3 col-sm-6 col-12 mb-3">
                    <div className="mycard shadow border-0">
                        <div className="mycard-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                                        Petugas
                                    </span>
                                    <span className="h3 font-bold mb-0">
                                        {this.state.petugasCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                        <i class="fas fa-users-cog"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 mb-3">
                    <div className="mycard shadow border-0">
                        <div className="mycard-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                                        Siswa
                                    </span>
                                    <span className="h3 font-bold mb-0">
                                        {this.state.siswaCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                        <i class="fas fa-users-cog"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 mb-3">
                    <div className="mycard shadow border-0">
                        <div className="mycard-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                                        Kelas
                                    </span>
                                    <span className="h3 font-bold mb-0">
                                        {this.state.kelasCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                        <i class="fas fa-users-cog"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 mb-3">
                    <div className="mycard shadow border-0">
                        <div className="mycard-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                                        Spp
                                    </span>
                                    <span className="h3 font-bold mb-0">
                                        {this.state.sppCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                        <i class="fas fa-users-cog"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12 mb-3">
                    <div className="mycard shadow border-0">
                        <div className="mycard-body">
                            <div className="row">
                                <div className="col">
                                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                                        Pembayaran
                                    </span>
                                    <span className="h3 font-bold mb-0">
                                        {this.state.pembayaranCount}
                                    </span>
                                </div>
                                <div className="col-auto">
                                    <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                                        <i class="fas fa-users-cog"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
