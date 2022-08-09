import React from "react"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"
const qs = require('qs');

export default class CRUDsiswa extends React.Component {
    constructor() {
        super()
        this.state = {
            siswa: [],
            kelas: [],
            spp: [],
            token: "",
            action: "",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            tunggakan: ""
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
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ kelas: response.data.kelas })
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
    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ spp: response.data.spp })
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
        this.getKelas()
        this.getSpp()
    }
    Add = () => {
        $("#modal_siswa").modal("show");
        this.setState({
            action: "insert",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "update",
            nisn: selectedItem.nisn,
            nis: selectedItem.nis,
            nama: selectedItem.nama,
            id_kelas: selectedItem.id_kelas,
            alamat: selectedItem.alamat,
            no_telp: selectedItem.no_telp,
            id_spp: selectedItem.id_spp,
        })
    }
    saveSiswa = event => {
        event.preventDefault()
        $("#modal_siswa").modal("hide")
        let form = {
            nisn: this.state.nisn,
            nis: this.state.nis,
            nama: this.state.nama,
            id_kelas: this.state.id_kelas,
            alamat: this.state.alamat,
            no_telp: this.state.no_telp,
            id_spp: this.state.id_spp
        }
        console.log(form)
        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            console.log("ini msuk insert")
            axios.post(url, qs.stringify(form), this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    console.log(response)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            console.log("ini msuk update")
            axios.put(url, qs.stringify(form), this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        }
    }
    dropSiswa = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/siswa/" + selectedItem.nisn
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div>
                <div class="d-flex justify-content-between">
                    <div>
                        <h3 className="fw-bold">Tabel Siswa</h3>
                    </div>
                    <div>
                        <button className="btn btn-primary mx-2 fw-bold" type="button" onClick={() => { this.Add() }}>Siswa</button>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">NISN</th>
                                <th scope="col">Nama Siswa</th>
                                <th scope="col">Nama Kelas</th>
                                <th scope="col">Alamat</th>
                                <th scope="col">No Telepon</th>
                                <th scope="col">Jumlah Tunggakan</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.siswa.map(item => (
                                <tr>
                                    <th scope="row">{item.nisn}</th>
                                    <td>{item.nama}</td>
                                    <td>{item.kelas.nama_kelas}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.no_telp}</td>
                                    <td>{item.tunggakan}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary mx-2 fw-bold" type="button"
                                            onClick={() => this.Edit(item)}>Edit</button>
                                        <button className="btn btn-sm btn-outline-primary fw-bold" type="button"
                                            onClick={() => this.dropSiswa(item)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="modal_siswa">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h4>Form Siswa</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveSiswa(ev)}>
                                    NISN
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nisn}
                                        onChange={ev => this.setState({ nisn: ev.target.value })}
                                        required
                                    />
                                    NIS
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nis}
                                        onChange={ev => this.setState({ nis: ev.target.value })}
                                        required
                                    />
                                    Nama
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({ nama: ev.target.value })}
                                        required
                                    />
                                    ID Kelas
                                    <select className="form-control mb-1" onChange={ev => this.setState({ id_kelas: ev.target.value })}>
                                        <option value=""></option>
                                        {this.state.kelas.map(item => (
                                            <option value={item.id_kelas}
                                            >
                                                {item.id_kelas}
                                            </option>

                                        ))}
                                    </select>
                                    Alamat
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.alamat}
                                        onChange={ev => this.setState({ alamat: ev.target.value })}
                                        required
                                    />
                                    No Telepon
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.no_telp}
                                        onChange={ev => this.setState({ no_telp: ev.target.value })}
                                        required
                                    />
                                    ID SPP
                                    <select className="form-control mb-1" onChange={ev => this.setState({ id_spp: ev.target.value })}>
                                        <option value=""></option>
                                        {this.state.spp.map(item => (
                                            <option value={item.id_spp}
                                            >
                                                {item.id_spp}
                                            </option>

                                        ))}
                                    </select>
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