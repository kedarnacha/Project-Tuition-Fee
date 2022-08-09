import React from "react"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"
const qs = require('qs');

export default class CRUDkelas extends React.Component {
    constructor() {
        super()
        this.state = {
            kelas: [],
            token: "",
            action: "",
            id_kelas: "",
            nama_kelas: "",
            jurusan: "",
            angkatan: ""
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
    componentDidMount() {
        this.getKelas()
    }
    Add = () => {
        $("#modal_kelas").modal("show");
        this.setState({
            action: "insert",
            id_kelas: "",
            nama_kelas: "",
            jurusan: "",
            angkatan: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "update",
            nama_kelas: selectedItem.nama_kelas,
            jurusan: selectedItem.jurusan,
            angkatan: selectedItem.angkatan
        })
    }
    saveKelas = event => {
        event.preventDefault()
        $("#modal_kelas").modal("hide")
        let form = {
            id_kelas: this.state.id_kelas,
            nama_kelas: this.state.nama_kelas,
            jurusan: this.state.jurusan,
            angkatan: this.state.angkatan
        }
        console.log(form)
        let url = base_url + "/kelas"
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
    dropKelas = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/kelas/" + selectedItem.id_kelas
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getKelas()
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div>
                <div class="d-flex justify-content-between">
                    <div>
                        <h3 className="fw-bold">Tabel Kelas</h3>
                    </div>
                    <div>
                        <button className="btn btn-primary mx-2 fw-bold" type="button" onClick={() => { this.Add() }}>Kelas</button>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nama Kelas</th>
                                <th scope="col">Jurusan</th>
                                <th scope="col">Angkatan</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.kelas.map(item => (
                                <tr>
                                    <th scope="row">{item.nama_kelas}</th>
                                    <td>{item.jurusan}</td>
                                    <td>{item.angkatan}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary mx-2 fw-bold" type="button"
                                            onClick={() => this.Edit(item)}>Edit</button>
                                        <button className="btn btn-sm btn-outline-primary fw-bold" type="button"
                                            onClick={() => this.dropKelas(item)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="modal_kelas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h4>Form Kelas</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveKelas(ev)}>
                                    Nama Kelas
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nama_kelas}
                                        onChange={ev => this.setState({ nama_kelas: ev.target.value })}
                                        required
                                    />
                                    Jurusan
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.jurusan}
                                        onChange={ev => this.setState({ jurusan: ev.target.value })}
                                        required
                                    />
                                    Angkatan
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.angkatan}
                                        onChange={ev => this.setState({ angkatan: ev.target.value })}
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