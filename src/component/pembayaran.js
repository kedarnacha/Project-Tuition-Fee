import React from "react"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"
const qs = require('qs');

export default class pembayaran extends React.Component {
    constructor() {
        super()
        this.state = {
            siswa: [],
            petugas: [],
            pembayaran: [],
            token: "",
            action: "",
            id_pembayaran: "",
            id_petugas: "",
            nama_petugas: "",
            nisn: "",
            nama: "",
            tanggal_bayar: "",
            bulan_bayar: "",
            tahun_bayar: "",
            jumlah_bayar: ""
        }

        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/"
        }
        this.headerConfig.bind(this)
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ siswa: response.data.siswa })

            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        // this.props.history.push("/dashboard")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    getPetugas = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ petugas: response.data.petugas })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        // this.props.history.push("/dashboard")
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
                this.setState({ pembayaran: response.data.pembayaran })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        // this.props.history.push("/dashboard")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    componentDidMount() {
        this.getSiswa()
        this.getPetugas()
        this.getPembayaran()
    }
    Add = () => {
        $("#modal_pembayaran").modal("show");
        this.setState({
            id_pembayaran: "",
            id_petugas: "",
            nisn: "",
            tanggal_bayar: new Date().toISOString().split('T')[0],
            bulan_bayar: "",
            tahun_bayar: "",
            jumlah_bayar: ""
        })
    }
    pembayaran = event => {
        event.preventDefault()
        $("#modal_pembayaran").modal("hide")
        let form = {
            id_pembayaran: this.state.id_pembayaran,
            id_petugas: this.state.id_petugas,
            nisn: this.state.nisn,
            tanggal_bayar: this.state.tanggal_bayar,
            bulan_bayar: this.state.bulan_bayar,
            tahun_bayar: this.state.tahun_bayar,
            jumlah_bayar: this.state.jumlah_bayar
        }
        console.log(form)
        let url = base_url + "/pembayaran"
        axios.post(url, form, this.headerConfig())
            .then(response => {
                window.alert(response.data.message)
                this.getPembayaran()
            })
            .catch(error => console.log(error))
    }

    SplitDate = date => {
        return date.split('T')[0]
    }

    render() {
        return (
            <div>
                <div class="d-flex justify-content-between">
                    <div>
                        <h3 className="fw-bold">Tabel Pembayaran</h3>
                    </div>
                    <div>
                        <button className="btn btn-primary mx-2 fw-bold" type="button" onClick={() => { this.Add() }}>Pembayaran</button>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nama Petugas</th>
                                <th scope="col">Nama Siswa</th>
                                <th scope="col">Tanggal Bayar</th>
                                <th scope="col">Bulan Bayar</th>
                                <th scope="col">Tahun Bayar</th>
                                <th scope="col">Jumlah yang dibayarkan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.pembayaran.map(item => (
                                <tr>
                                    <th scope="row">{item.petugas.nama_petugas}</th>
                                    <td>{item.siswa.nama}</td>
                                    <td>{this.SplitDate(item.tanggal_bayar)}</td>
                                    <td>{item.bulan_bayar}</td>
                                    <td>{item.tahun_bayar}</td>
                                    <td>{item.jumlah_bayar}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="modal_pembayaran">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h4>Form Pembayaran</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.pembayaran(ev)}>
                                    Petugas
                                    <select className="form-control mb-1" required onChange={ev => this.setState({ id_petugas: ev.target.value })}>
                                        <option value=""></option>
                                        {this.state.petugas.map(item => (
                                            <option value={item.id_petugas}
                                            >
                                                {item.nama_petugas}
                                            </option>

                                        ))}
                                    </select>
                                    Siswa
                                    <select className="form-control mb-1" required onChange={ev => this.setState({ nisn: ev.target.value })}>
                                        <option value=""></option>
                                        {this.state.siswa.map(item => (
                                            <option value={item.nisn}
                                            >
                                                {item.nama}
                                            </option>
                                        ))}
                                    </select>
                                    Tanggal Dibayar
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.tanggal_bayar}
                                        onChange={ev => this.setState({ tanggal_bayar: ev.target.value })}
                                        disabled
                                    />
                                    Bulan Bayar
                                    <select name="bulan" className="form-control mb-1" required>
                                        <option value={this.state.bulan_bayar = "Januari"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Januari</option>
                                        <option value={this.state.bulan_bayar = "Febriari"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Febriari</option>
                                        <option value={this.state.bulan_bayar = "Maret"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Maret</option>
                                        <option value={this.state.bulan_bayar = "April"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>April</option>
                                        <option value={this.state.bulan_bayar = "Mei"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Mei</option>
                                        <option value={this.state.bulan_bayar = "Juni"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Juni</option>
                                        <option value={this.state.bulan_bayar = "Juli"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Juli</option>
                                        <option value={this.state.bulan_bayar = "Agustus"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Agustus</option>
                                        <option value={this.state.bulan_bayar = "September"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>September</option>
                                        <option value={this.state.bulan_bayar = "Oktober"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Oktober</option>
                                        <option value={this.state.bulan_bayar = "November"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>November</option>
                                        <option value={this.state.bulan_bayar = "Desember"} onChange={ev => this.setState({ bulan_bayar: ev.target.value })}>Desember</option>
                                    </select>
                                    Tahun Bayar
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.tahun_bayar}
                                        onChange={ev => this.setState({ tahun_bayar: ev.target.value })}
                                        required
                                    />
                                    Jumlah Bayar
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.jumlah_bayar}
                                        onChange={ev => this.setState({ jumlah_bayar: ev.target.value })}
                                        required
                                    />
                                    <button type="submit" className="btn btn-block btn-primary">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}