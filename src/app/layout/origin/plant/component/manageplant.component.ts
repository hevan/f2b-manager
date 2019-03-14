/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import { Keys  }    from '../../../../shared/common/keys';
import { PageDataModel  }    from '../../../../shared/common/page.model';
import {PlantBaseService} from "../../../../shared/services/origin/plantBase.service";

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PlantSelectComponent} from "./plantselect.component";

@Component({
    selector: 'app-origin-plant-manange',
    templateUrl: './manageplant.component.html',
    animations: [routerTransition()]
})
export class ManagePlantComponent implements OnInit {

    public listData = []; //定义form

    public pageNav = new PageDataModel();

    public searchData = {'name':''};

    public corp;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private plantBaseService:PlantBaseService,private authService:AuthService,private modalService: NgbModal) {

    }

    //页面初始化
    ngOnInit() {
        this.corp = this.authService.getCorpInfo();

        this.loadData();
    }

    loadData() {

        const params = new HttpParams().set('corpId',this.corp.id);

        this.plantBaseService.findManageByCorpId(params).subscribe(res=>{
            if(res.code == 0){
                this.listData = res.data;

            }
        });
    }



    toView(id){
        this.router.navigate(['/origin/plant/plantview', { 'id': id}]);
    }


    toAdd(){
        const modalRef = this.modalService.open(PlantSelectComponent,{size:'lg'});

        modalRef.result.then((result) => {

            if(result){
                let resData = JSON.parse(result);
                let params = new HttpParams().set('corpId',this.corp.id).set('plantBaseId',resData.id);
                this.plantBaseService.addCorp(params).subscribe(res=>{
                    if(res.code ==0){
                        this.loadData();
                    }

                });

            }


        });
    }

    toDelete(plantBaseId){
        let params = new HttpParams().set('corpId',this.corp.id).set('plantBaseId',plantBaseId);
        this.plantBaseService.deleteByCorpId(params).subscribe(res=>{
            if(res.code ==0){
                this.loadData();
            }

        });

    }
    goBack(){
        this.location.back();
    }
}
