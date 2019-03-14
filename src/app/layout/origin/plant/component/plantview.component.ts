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
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ContentItemEditComponent} from "./contentitemedit.component";
import {MediaItemEditComponent} from "./mediaitemedit.component";

import {PlantBaseService} from "../../../../shared/services/origin/plantBase.service";
import {OriginMediaItemService} from "../../../../shared/services/origin/originMediaItem.service";
import {OriginContentItemService} from "../../../../shared/services/origin/originContentItem.service";


@Component({
    selector: 'app-origin-plantview',
    templateUrl: './plantview.component.html',
    animations: [routerTransition()]
})
export class PlantViewComponent implements OnInit {


    public curId;//当前数据ID
    public plantData:any;

    public listMediaItem = [];
    public listContentItem = [];

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private plantBaseService: PlantBaseService,private originMediaItemService: OriginMediaItemService,private originContentItemService: OriginContentItemService,private authService:AuthService,private modalService: NgbModal) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();

        this.loadMedia();
        this.loadContent();

    }

    loadData(){
        if(this.curId){
            this.plantBaseService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.plantData = res.data;
                }

            });
        }
    }

    loadContent(){
        let paramsSku = new HttpParams().set('entityId',this.curId).set('entityName','plantBase');

        this.originContentItemService.findAllByEntity(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listContentItem = res.data;
            }
        });
    }

    loadMedia(){
        let paramsSku = new HttpParams().set('entityId',this.curId).set('entityName','plantBase');

        this.originMediaItemService.findAllByEntity(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listMediaItem = res.data;
            }
        });
    }

    addContentItem(){
        const modalRef = this.modalService.open(ContentItemEditComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'plantBase';
        modalRef.result.then((result) => {
            this.loadContent();
        });
    }

    deleteContentItem(id){

        console.log('----' + id);

        this.originContentItemService.delete(id);

        this.loadContent();
    }

    deleteMediaItem(id){

        this.originMediaItemService.delete(id).subscribe(res=>{
            this.loadMedia();
        });

    }

    addMediaItem(){
        const modalRef = this.modalService.open(MediaItemEditComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'plantBase';
        modalRef.result.then((result) => {
            this.loadMedia();
        });
    }

    //编辑
    toEdit(){
        this.router.navigate(['/origin/plant/plantedit',{id:this.curId}]);
    }

    goBack(){
        this.location.back();
    }
}
