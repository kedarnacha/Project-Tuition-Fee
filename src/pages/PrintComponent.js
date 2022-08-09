import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios"
import { base_url } from "../config"

export default function PrintComponent() {
  let componentRef = useRef();

  return (
    <>
      <div id="print_component">
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <button className="btn btn-outline-success fw-bold -3">Print this out !!</button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={(el) => (componentRef = el)} />
        </div>
      </div>
    </>
  );
}

// component to be printed
class ComponentToPrint extends React.Component {
    constructor() {
        super()
        this.state = {
            laporan: [],
            token: ""
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
    getLaporan = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ laporan: response.data.pembayaran })
                console.log(this.state.laporan)
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        // this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    componentDidMount() {
        this.getLaporan()
    }

    SplitDate = date => {
        return date.split('T')[0]
    }

    render() {
        return (
            <div>
                <div class="d-flex justify-content-between m-3">
                    <div>
                        <h3 className="fw-bold">Data Laporan</h3>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table class="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">ID Pembayaran</th>
                                <th scope="col">Nama Petugas</th>
                                <th scope="col">Nama Siswa</th>
                                <th scope="col">Nama Kelas</th>
                                <th scope="col">No Telepon Siswa</th>
                                <th scope="col">Tanggal Bayar</th>
                                <th scope="col">Jumlah yang dibayarkan</th>
                                <th scope="col">Sisa Tunggakan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.laporan.map(item => (
                                <tr>
                                    <th scope="row">{item.id_pembayaran}</th>
                                    <td>{item.petugas.nama_petugas}</td>
                                    <td>{item.siswa.nama}</td>
                                    <td>{item.siswa.kelas.nama_kelas}</td>
                                    <td>{item.siswa.no_telp}</td>
                                    <td>Tanggal Bayar: {this.SplitDate(item.tanggal_bayar)} <br /> Bulan bayar: {item.bulan_bayar} <br /> Tahun Bayar: {item.tahun_bayar}</td>
                                    <td>{item.jumlah_bayar}</td>
                                    <td>{item.siswa.tunggakan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}