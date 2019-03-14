import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CorpEditComponent} from "../merch/corp/component/corpedit.component";
import {CorpManagerService} from "../../shared/services/corp/corpManager.service";
import {Keys} from "../../shared/common/keys";
import {CorpService} from "../../shared/services/corp/corp.service";
import {AuthService} from "../../shared/services/user/auth.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    public corpId;

    public corp;

    constructor(private modalService: NgbModal, private corpManagerService:CorpManagerService,private corpService:CorpService,private authService:AuthService) {
    }
    ngOnInit() {

        this.checkCorp();

    }

    checkCorp(){

        let corpData = this.authService.getCorpInfo();
        this.corp = corpData;

        console.log(corpData);

        if(null == corpData){

            let userMobile = localStorage.getItem(Keys.KEY_USER_INFO);
            if(null != userMobile){
                let userMobileData = JSON.parse(userMobile);
                let params = new HttpParams().set('mobile',userMobileData.mobile);

                this.corpManagerService.findByMobile(params).subscribe(res=>{
                    if(res.code == 0){

                        console.log(res.data);

                        if(res.data && res.data.length > 0){
                            let curManager = res.data[0];

                            localStorage.setItem(Keys.KEY_MANGER_INFO, JSON.stringify(res.data[0]));
                            this.corpId = curManager.corpId;

                            this.loadCorp(curManager.corpId);

                        }else{
                            this.modalService.open(CorpEditComponent,{ size: 'lg' });
                        }

                    }
                });
            }
        }
    }

    loadCorp(id){

        this.corpService.find(id).subscribe(res=>{
            if(res.code == 0){
                if(res.data){
                    this.corp = res.data;
                    localStorage.setItem(Keys.KEY_CORP_INFO, JSON.stringify(res.data));
                }

            }
        });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
