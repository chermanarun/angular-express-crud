import { Injectable } from '@angular/core';
import { Http, HttpModule, URLSearchParams, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class EmpolyeeListService {

    private localUrl: string;

    constructor(private _http: Http) {
        this.localUrl = "http://192.168.1.3:4000/api";
        console.log("employees Provider");
    }

    getEmployeeList(start: any, limit: any) {
        return this._http.get(this.localUrl + '/employees/' + start + '/' + limit)
            .map(res => res.json());
    }

    deleteEmployee(empid: any) {
        console.log(empid);
        return this._http.delete(this.localUrl + '/employees/' + empid)
            .map(res => res.json());
    }

    postEmployee(inputEmpData: any) {
        if (inputEmpData.employeeid) {
            let data = new URLSearchParams()
            data.append('data', JSON.stringify(inputEmpData));
            return this._http.put(this.localUrl + '/employees/' + inputEmpData.employeeid, data).map(res => {
                res.json();
            });

        } else {
            let data = new URLSearchParams()
            data.append('data', JSON.stringify(inputEmpData));
            return this._http.post(this.localUrl + '/employees', data).map(res => {
                res.json();
            });
        }
    }
}