import React from "react"

import Header from "../component/header"
import Static from "../component/static"
import Siswa from "../component/CRUDsiswa"
import Kelas from "../component/CRUDkelas"
import Spp from "../component/CRUDspp"
import Petugas from "../component/CRUDpetugas"
import Pembayaran from "../component/pembayaran"
import Laporan from "../component/Laporan"

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            data_admin: ""
        }
    }
    getAdmin = () => {
        let admins = JSON.parse(localStorage.getItem('admin'))
        if (!admins) {
            let siswa = JSON.parse(localStorage.getItem('siswa'))
            this.setState({
                data_admin: siswa.nama
            })
        } else {
            this.setState({
                data_admin: admins.level
            })
        }
    }
    componentDidMount() {
        this.getAdmin()
    }
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        localStorage.removeItem("level")
        localStorage.removeItem("siswa")
        window.location = "/"
    }
    render() {
        return (
            <div>
                {this.state.data_admin === "admin" || this.state.data_admin === "petugas" ? (
                    <div className="container">
                        <Header />
                        <Static />
                        <div class="row">
                            <div className="col-12 col-md-2">
                                <div class="nav nav-pills mb-3 px-2">
                                    {this.state.data_admin === "admin" ? (
                                        <>
                                            <a class="nav-link" id="v-pills-siswa-tab" data-toggle="pill" href="#v-pills-siswa" role="tab" aria-controls="v-pills-siswa" aria-selected="false">Siswa</a>
                                            <a class="nav-link" id="v-pills-kelas-tab" data-toggle="pill" href="#v-pills-kelas" role="tab" aria-controls="v-pills-kelas" aria-selected="false">Kelas</a>
                                            <a class="nav-link" id="v-pills-spp-tab" data-toggle="pill" href="#v-pills-spp" role="tab" aria-controls="v-pills-spp" aria-selected="false">SPP</a>
                                            <a class="nav-link" id="v-pills-admin-tab" data-toggle="pill" href="#v-pills-admin" role="tab" aria-controls="v-pills-admin" aria-selected="false">Petugas</a>
                                            <a class="nav-link" id="v-pills-transaksi-tab" data-toggle="pill" href="#v-pills-transaksi" role="tab" aria-controls="v-pills-transaksi" aria-selected="false">Bayar</a>
                                            <a class="nav-link" id="v-pills-laporan-tab" data-toggle="pill" href="#v-pills-laporan" role="tab" aria-controls="v-pills-laporan" aria-selected="false">Laporan</a>
                                        </>
                                    ) : (
                                        <>
                                            <a class="nav-link" id="v-pills-transaksi-tab" data-toggle="pill" href="#v-pills-transaksi" role="tab" aria-controls="v-pills-transaksi" aria-selected="false">Bayar</a>
                                            <a class="nav-link" id="v-pills-laporan-tab" data-toggle="pill" href="#v-pills-laporan" role="tab" aria-controls="v-pills-laporan" aria-selected="false">Laporan</a>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 col-md-10">
                                <div class="tab-content " id="v-pills-tabContent">
                                    <div class="tab-pane fade" id="v-pills-transaksi" role="tabpanel" aria-labelledby="v-pills-transaksi-tab">
                                        <Pembayaran />
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-siswa" role="tabpanel" aria-labelledby="v-pills-siswa-tab">
                                        <Siswa />
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-kelas" role="tabpanel" aria-labelledby="v-pills-kelas-tab">
                                        <Kelas />
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-spp" role="tabpanel" aria-labelledby="v-pills-spp-tab">
                                        <Spp />
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-admin" role="tabpanel" aria-labelledby="v-pills-admin-tab">
                                        <Petugas />
                                    </div>
                                    <div class="tab-pane fade" id="v-pills-laporan" role="tabpanel" aria-labelledby="v-pills-laporan-tab">
                                        <Laporan />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* END-TABS */}
                    </div>
                ) : (
                    <div className="row text-center border-bottom py-4" >
                        <div id="menu" className="col-sm-6 col-12 mb-4 mb-sm-0" >
                            <div className="col" >
                                <h2 className="p-2 fw-bolder" > {this.state.data_admin} </h2>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 my-auto" >
                            <button className="btn btn-outline-danger fw-bold" type="button" onClick={() => this.Logout()} > Logout </button>
                        </div>
                        <Laporan />
                    </div>
                )}
            </div>
        )
    }
}
