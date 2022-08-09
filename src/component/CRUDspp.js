import React from "react"
import axios from "axios"
import { base_url } from "../config"
import $ from "jquery"
const qs = require('qs');

export default class CRUDspp extends React.Component {
    constructor() {
        super()
        this.state = {
            spp: [],
            token: "",
            action: "",
            id_spp: "",
            angkatan: "",
            tahun: "",
            nominal: ""
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
        this.getSpp()
    }
    Add = () => {
        $("#modal_spp").modal("show");
        this.setState({
            action: "insert",
            id_spp: "",
            angkatan: "",
            tahun: "",
            nominal: ""
        })
    }

    Edit = selectedItem => {
        $("#modal_spp").modal("show")
        this.setState({
            action: "update",
            angkatan: selectedItem.angkatan,
            tahun: selectedItem.tahun,
            nominal: selectedItem.nominal
        })
    }
    saveSpp = event => {
        event.preventDefault()
        $("#modal_spp").modal("hide")
        let form = {
            id_spp: this.state.id_spp,
            angkatan: this.state.angkatan,
            tahun: this.state.tahun,
            nominal: this.state.nominal
        }
        console.log(form)
        let url = base_url + "/spp"
        if (this.state.action === "insert") {
            console.log("ini msuk insert")
            axios.post(url, qs.stringify(form), this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    console.log(response)
                    this.getSpp()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            console.log("ini msuk update")
            axios.put(url, qs.stringify(form), this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSpp()
                })
                .catch(error => console.log(error))
        }
    }
    dropSpp = selectedItem => {
        if (window.confirm("are you sure will delete this item?")) {
            let url = base_url + "/spp/" + selectedItem.id_spp
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSpp()
                })
                .catch(error => console.log(error))
        }
    }

    render() {
        return (
            <div>
                <div class="d-flex justify-content-between">
                    <div>
                        <h3 className="fw-bold">Tabel SPP</h3>
                    </div>
                    <div>
                        <button className="btn btn-primary mx-2 fw-bold" type="button" onClick={() => { this.Add() }}>SPP</button>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Angkatan</th>
                                <th scope="col">Tahun</th>
                                <th scope="col">Nominal</th>
                                <th scope="col">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.spp.map(item => (
                                <tr>
                                    <th scope="row">{item.angkatan}</th>
                                    <td>{item.tahun}</td>
                                    <td>{item.nominal}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary mx-2 fw-bold" type="button"
                                            onClick={() => this.Edit(item)}>Edit</button>
                                        <button className="btn btn-sm btn-outline-primary fw-bold" type="button"
                                            onClick={() => this.dropSpp(item)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="modal fade" id="modal_spp">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h4>Form SPP</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveSpp(ev)}>
                                    Angkatan
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.angkatan}
                                        onChange={ev => this.setState({ angkatan: ev.target.value })}
                                        required
                                    />
                                    Tahun
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.tahun}
                                        onChange={ev => this.setState({ tahun: ev.target.value })}
                                        required
                                    />
                                    Nominal
                                    <input type="text" className="form-control mb-1"
                                        value={this.state.nominal}
                                        onChange={ev => this.setState({ nominal: ev.target.value })}
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