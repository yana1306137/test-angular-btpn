import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  dataNasabah = [
                  {id: 1, nomor_nasabah: 1, nama_nasabah: 'Yana',  tanggal_lahir: '1994-10-10', pendapatan: 10000000},
                  {id: 2, nomor_nasabah: 2, nama_nasabah: 'Dani',  tanggal_lahir: '1995-12-11', pendapatan: 15000000}
                ];
  tempNasabah = this.dataNasabah;
  api         = 'http://localhost:3000/';
  button      = 'Simpan';
  nasabah     = '';
  formNasabah;
  idxtoUpdate;
  idtoUpdate;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.formNasabah = this.fb.group({
      id: '',
      nomor_nasabah: '',
      nama_nasabah: '',
      tanggal_lahir: '',
      pendapatan: ''
    });
    //  this.formNasabah = new FormGroup({
    //   id: new FormControl(''),
    //   nomorNasabah: new FormControl(''),
    //   namaNasabah: new FormControl(''),
    //   tanggalLahir: new FormControl(''),
    //   pendapatan: new FormControl('')
    // });
  }

  ngOninit() {
    this.getDataNasabah();
    console.log(this.dataNasabah);
  }

  getDataNasabah() {
    this.http.get(this.api).subscribe(
      (success: any) => {
        this.dataNasabah = success;
        console.log(this.dataNasabah);
      }
    );
  }

  submit() {
    if (this.button === 'Simpan') {
      this.insertDataNasabah();
    } else {
      this.updateDataNasabah();
    }
  }

  insertDataNasabah() {
    //
    this.dataNasabah.push(this.formNasabah.value);
    const val = this.nasabah.toLowerCase();
    const temp = this.dataNasabah.filter(function(d) {
        return d.nama_nasabah ? (d.nama_nasabah.toLowerCase().indexOf(val) !== -1 ||  !val) :  !val;
    });
    this.dataNasabah = temp;
    this.clear();
    this.tempNasabah = this.dataNasabah;
  }

  getDetail(id, idx) {
    this.http.get(this.api + id).subscribe(
      (success: any) => {
        this.formNasabah.patchValue({
          id: '',
          nomor_nasabah: '',
          nama_nasabah: '',
          tanggal_lahir: '',
          pendapatan: ''
        });
      }
    );
    this.formNasabah.patchValue({
      id: this.dataNasabah[idx].id,
      nomor_nasabah: this.dataNasabah[idx].nomor_nasabah,
      nama_nasabah: this.dataNasabah[idx].nama_nasabah,
      tanggal_lahir: this.dataNasabah[idx].tanggal_lahir,
      pendapatan: this.dataNasabah[idx].pendapatan
    });

    this.button = 'Ubah';
    this.idxtoUpdate = idx;
  }

  updateDataNasabah() {
    //
    for (let index = 0; index < this.dataNasabah.length; index++) {
      if (this.idxtoUpdate === index) {
        this.dataNasabah[index] = this.formNasabah.value;
      }
    }
    const val = this.nasabah.toLowerCase();
    const temp = this.dataNasabah.filter(function(d) {
        return d.nama_nasabah ? (d.nama_nasabah.toLowerCase().indexOf(val) !== -1 ||  !val) :  !val;
    });
    this.dataNasabah = temp;
    this.clear();
    this.tempNasabah = this.dataNasabah;
  }

  deleteDataNasabah(id, idx) {
    this.dataNasabah.splice(idx, 1);
    const val = this.nasabah.toLowerCase();
    const temp = this.dataNasabah.filter(function(d) {
        return d.nama_nasabah ? (d.nama_nasabah.toLowerCase().indexOf(val) !== -1 ||  !val) :  !val;
    });
    this.dataNasabah = temp;
    this.tempNasabah = this.dataNasabah;
  }

  filterNama(nama) {
    const val = nama.target.value.toLowerCase();
    const temp = this.tempNasabah.filter(function(d) {
        return d.nama_nasabah.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.dataNasabah = temp;
  }

  clear() {
     this.formNasabah.patchValue({
      id: '',
      nomor_nasabah: '',
      nama_nasabah: '',
      tanggal_lahir: '',
      pendapatan: ''
    });
    this.button = 'Simpan';
    this.idxtoUpdate = null;
  }
}
