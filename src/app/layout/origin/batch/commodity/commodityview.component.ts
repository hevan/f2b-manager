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
import {OriginMediaItemService} from "../../../../shared/services/origin/originMediaItem.service";
import {OriginContentItemService} from "../../../../shared/services/origin/originContentItem.service";
import {CommodityCodeService} from "../../../../shared/services/origin/commodityCode.service";

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ContentItemEditComponent} from "../../plant/component/contentitemedit.component";
import {MediaItemEditComponent} from "../../plant/component/mediaitemedit.component";

@Component({
    selector: 'app-origin-commodityview',
    templateUrl: './commodityview.component.html',
    animations: [routerTransition()]
})
export class CommodityViewComponent implements OnInit {


    public curId;//当前数据ID
    public commodityCodeData:any;

    public listMediaItem = [];
    public listContentItem = [];

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private commodityCodeService: CommodityCodeService,private originMediaItemService: OriginMediaItemService,private originContentItemService: OriginContentItemService,private authService:AuthService,private modalService: NgbModal) {

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
            this.commodityCodeService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.commodityCodeData = res.data;
                }

            });
        }
    }

    loadContent(){
        let paramsSku = new HttpParams().set('entityId',this.curId).set('entityName','commodityCode');

        this.originContentItemService.findAllContent(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listContentItem = res.data;
            }
        });
    }

    loadMedia(){
        let paramsSku = new HttpParams().set('entityId',this.curId).set('entityName','commodityCode');

        this.originMediaItemService.findAllByEntity(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listMediaItem = res.data;
            }
        });
    }

    addContentItem(){
        const modalRef = this.modalService.open(ContentItemEditComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'commodityCode';
        modalRef.result.then((result) => {
            this.loadContent();
        });
    }

    deleteContentItem(id){

        console.log('----' + id);

        this.originContentItemService.delete(id).subscribe(res=>{
            this.loadContent();
        });


    }

    deleteMediaItem(id){

        this.originMediaItemService.delete(id);
        this.loadMedia();

    }

    addMediaItem(){
        const modalRef = this.modalService.open(MediaItemEditComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'commodityCode';
        modalRef.result.then((result) => {
            this.loadMedia();
        });
    }

    //编辑
    toEdit(){
        this.router.navigate(['/origin/batch/commodityedit',{id:this.curId}]);
    }

    goBack(){
        this.location.back();
    }
}
