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
import { Keys   }    from '../../../../shared/common/keys';
import {PlantBaseService} from "../../../../shared/services/origin/plantBase.service";
import {OriginCheckItemService} from "../../../../shared/services/origin/originCheckItem.service";
import {OriginTransItemService} from "../../../../shared/services/origin/originTransItem.service";

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CheckItemEditComponent} from "./checkitemedit.component";
import {TransItemEditComponent} from "../origincode/transitemedit.component";
import {BatchCodeService} from "../../../../shared/services/origin/batchCode.service";
import {SupplyMaterielService} from "../../../../shared/services/origin/supplyMateriel.service";
import {BatchMaterielEditComponent} from "../materiel/batchmaterieledit.component";

@Component({
    selector: 'app-origin-batchview',
    templateUrl: './batchview.component.html',
    animations: [routerTransition()]
})
export class BatchViewComponent implements OnInit {


    public curId;//当前数据ID
    public batchCodeData:any;

    public listCheckItem = [];
    public listTransItem = [];
    public listMaterial = [];

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private batchCodeService: BatchCodeService,private originCheckItemService: OriginCheckItemService,private originTransItemService: OriginTransItemService,private supplyMaterielService: SupplyMaterielService,private authService:AuthService,private modalService: NgbModal) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();

        this.loadCheckItem();
        this.loadTrans();

    }

    loadData(){
        if(this.curId){
            this.batchCodeService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.batchCodeData = res.data;
                }

            });
        }
    }

    loadCheckItem(){
    let paramsSku = new HttpParams().set('entityId',this.curId).set('entityName','batchCode');

    this.originCheckItemService.findAllByEntity(paramsSku).subscribe(res=>{
        if(res.code == 0){
            this.listCheckItem = res.data;
        }
    });
}



    addCheckItem(){
        const modalRef = this.modalService.open(CheckItemEditComponent,{size:'lg'});

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'batchCode';
        modalRef.result.then((result) => {
            this.loadCheckItem();
        });
    }

    deleteCheckItem(id){

        console.log('----' + id);

        this.originCheckItemService.delete(id).subscribe(res=>{
            this.loadCheckItem();
        });


    }

    loadTrans(){
        let paramsSku = new HttpParams().set('entityId',this.curId).set('entityName','batchCode');

        this.originTransItemService.findAllByEntity(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listTransItem = res.data;
            }
        });
    }



    addTransItem(){
        const modalRef = this.modalService.open(TransItemEditComponent,{size:'lg'});

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'batchCode';
        modalRef.result.then((result) => {
            this.loadTrans();
        });
    }

    deleteTransItem(id){

        console.log('----' + id);

        this.originTransItemService.delete(id).subscribe(res=>{
            this.loadTrans();
        });
    }



    loadMateriel(){
        let paramsSku = new HttpParams().set('batchCodeId',this.curId);

        this.supplyMaterielService.findAllByBatch(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listMaterial = res.data;
            }
        });
    }

    deleteMaterielItem(id){

        this.supplyMaterielService.delete(id).subscribe(res=>{
            this.loadMateriel();
        });


    }

    addMaterielItem(){
        const modalRef = this.modalService.open(BatchMaterielEditComponent,{size:'lg'});

        modalRef.componentInstance.batchCodeId = this.curId;
        modalRef.result.then((result) => {
            this.loadMateriel();
        });
    }

    //编辑
    toEdit(){
        this.router.navigate(['/origin/batch/batchedit',{id:this.curId}]);
    }

    goBack(){
        this.location.back();
    }
}
