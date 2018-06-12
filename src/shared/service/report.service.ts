import { Injectable, Inject } from '@angular/core';

import { HttpReq, ErrorMessage } from './../common/interfaces';
import { Util } from "../utils/util";
import { Storage } from "../utils/storage";
import { ApexService } from "./apex.service";
import { Props} from "../../apex/common/props";
import 'rxjs/add/operator/map'

@Injectable()
export class ReportService {

    headers: Headers;
    CONTENT_TYPE: string = "application/x-www-form-urlencoded";
    // CONTENT_TYPE : string = "application/json";
    public API_ENDPOINT: string;
    constructor(private apexService: ApexService) {

    }

 

  
    // authMethod(httpReq: HttpReq) {
    //     if (httpReq.showLoader && httpReq.showLoader === true) {
    //         this.showLoader(true);
    //     }

    //     let url = this.API_ENDPOINT + httpReq.url;
    //     let restMethod: any;
    //     if (httpReq.type == 'PUT') {
    //         restMethod = this.http.put(url, JSON.stringify(httpReq.body), { headers: this.headers });
    //     } else {
    //         restMethod = this.http.post(url, JSON.stringify(httpReq.body), { headers: this.headers });
    //     }
    //     return restMethod.map(
    //         (resp: Response) => {
    //             if (httpReq.showLoader && httpReq.showLoader === true) {
    //                 this.showLoader(false);
    //             }
    //             if (resp.json().status == 1) {
    //                 console.log(resp.json().data.menuList);
    //                 Storage.setJWT(resp.json().data.jwt);
    //                 Storage.setSessionUser(resp.json().data.user);
    //                 Storage.setMenuList(resp.json().data.menuList);
    //                 Storage.setBranch(resp.json().data.branch);
                    
    //                 this.apexService.sessionUserEmit(resp.json().data.user);
    //                 // this.createAuthorizationHeader();
    //                 return resp.json().data.user;
    //             } else {
    //                 this.errorMessage(resp.json().error);
    //                 return null;
    //             }

    //         },
    //         (error: Error) => {
    //             console.log("error Message :" + JSON.stringify(error));
    //         }
    //     );
    // }

    getJwt() {
        return Storage.getJWT();
    }
    imgload(id) {
        let url = Props.API_END_POINT + '/img/' + id;
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();;
            xhr.open("GET", url);
            xhr.setRequestHeader("Content-type", this.CONTENT_TYPE);
            xhr.onreadystatechange = (() => {
                if (xhr.readyState == 0 || xhr.readyState == 4) {
                    var data = JSON.parse(xhr.response);
                    if (data.status == 1) {
                        resolve(data.data);
                    } else {
                        this.errorMessage(data.error);
                        reject(data);
                    }
                }
            });
            xhr.send();
        });
    }

    report(httpReq: HttpReq) {
        this.showLoader(true);
        let paramString = Util.GetParamString(httpReq.body ? httpReq.body.data : {});
        let url = this.API_ENDPOINT + httpReq.url + paramString;
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();;
            xhr.open("GET", url);
            xhr.setRequestHeader("Content-type", this.CONTENT_TYPE);
            xhr.onreadystatechange = (() => {
                if (xhr.readyState == 0 || xhr.readyState == 4) {
                    this.showLoader(false);
                    var data = JSON.parse(xhr.response);
                    if (data.status == 1) {
                        resolve(data.data);
                    } else {
                        this.errorMessage(data.error);
                        reject(data);
                    }
                }
            });
            xhr.send();
        });
    }
    pdf(httpReq: HttpReq, fileName: string) {
        this.showLoader(true);
        let paramString = Util.GetParamString(httpReq.body ? httpReq.body.data : {});
        let url = this.API_ENDPOINT + httpReq.url + paramString;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        //xhr.responseType = "blob";
        xhr.setRequestHeader("Content-type", this.CONTENT_TYPE);
        xhr.onload = () => {
            if (xhr.status === 200) {
                this.showLoader(false);
                var blob = xhr.response;
                //  Util.ES.PrintPopup(blob);
                ReportService.PrintPopup(blob);
            }
        };
        xhr.send();
    }

    showLoader(show: boolean) {
        this.apexService.showLoader(show);
    }
    errorMessage(err: ErrorMessage) {
        if(err.message) {
            this.apexService.showMessage(err.message);
        } else if(err.code) {
            this.apexService.showMessage(err.code);
        } else {
            this.apexService.showMessage(""+err);
        }
        
    }

    static PrintPopup(data: any) {
        //    console.log(data);
        // if(typeof cordova === 'undefined') {
        var frame1 = document.createElement('iframe');
        frame1.name = "frame1";
        frame1.style.position = "absolute";
        frame1.style.top = "-1000000px";
        document.body.appendChild(frame1);
        var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument['document'] ? frame1.contentDocument['document'] : frame1.contentDocument;
        frameDoc.document.open();
        frameDoc.document.write(data);
        frameDoc.document.close();
        setTimeout(function () {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            document.body.removeChild(frame1);
        }, 500);
        return false;
        // }else {
        //     cordova.plugins.printer.print(data, {duplex: 'long'}, function (res : any) {
        //         alert(res ? 'Done' : 'Canceled');
        //     });
        // }
    }

}


