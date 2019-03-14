/**
 * Created by hevan on 2018/6/4.
 */
import { Component,ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { Router,ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import {AuthService} from '../../../../shared/services/user/auth.service';
import { Keys   }    from '../../../../shared/common/keys';


import {PlantBaseService} from "../../../../shared/services/origin/plantBase.service";
import {OriginContentItemService} from "../../../../shared/services/origin/originContentItem.service";
import {OriginMediaItemService} from "../../../../shared/services/origin/originMediaItem.service";
import {CityService} from "../../../../shared/services/common/city.service";


import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ContentItemEditComponent} from "../../plant/component/contentitemedit.component";
import {MediaItemEditComponent} from "../../plant/component/mediaitemedit.component";
import {BatchCodeService} from "../../../../shared/services/origin/batchCode.service";
import {CommodityCodeService} from "../../../../shared/services/origin/commodityCode.service";

@Component({
    selector: 'app-origin-commodityedit',
    templateUrl: './commodityedit.component.html',
    animations: [routerTransition()]
})
export class CommodityEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;//当前数据ID
    public corp;

    submitted = false; //控制重复提交

    public imageUrl='';

    public listMediaItem = [];

    public listContentItem = [];
    //构造
    constructor(private location: Location, private route: ActivatedRoute,private router: Router,private commodityCodeService: CommodityCodeService,private originContentItemService:OriginContentItemService,private originMediaItemService:OriginMediaItemService,private authService:AuthService,private modalService: NgbModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');
        this.corp = this.authService.getCorpInfo();


        if(this.curId){
            this.commodityCodeService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    this.dataForm.patchValue({'name': res.data.name});
                    this.dataForm.patchValue({'commodityCode': res.data.commodityCode});

                    this.imageUrl = res.data.imageUrl;
                }

            });

            this.loadMedia();
            this.loadContent();
        }

    }

    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),
            commodityCode: new FormControl('', Validators.required)
        });


    }

    loadMedia(){
        let paramsMedia = new HttpParams().set('entityId',this.curId).set('entityName','commodityCode');

        this.originMediaItemService.findAllByEntity(paramsMedia).subscribe(res=>{
            if(res.code == 0){
                this.listMediaItem = res.data;
            }
        });
    }

    loadContent(){
        let params = new HttpParams().set('entityId',this.curId).set('entityName','commodityCode');

        this.originContentItemService.findAllContent(params).subscribe(res=>{
            if(res.code == 0){
                this.listContentItem = res.data;
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

        this.originContentItemService.delete(id).subscribe(res=>{
            this.loadContent();
        });
    }

    deleteMediaItem(id){
       this.originMediaItemService.delete(id).subscribe(res=>{
           this.loadMedia();
       });
    }

    addMediaItem(){
        const modalRef = this.modalService.open(MediaItemEditComponent);

        modalRef.componentInstance.entityId = this.curId;
        modalRef.componentInstance.entityName = 'commodityCode';
        modalRef.result.then((result) => {
           this.loadMedia();
        });
    }


    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;

        formData.imageUrl  =this.imageUrl;

        formData.corpId  =this.corp.id;
        formData.corpName  =this.corp.name;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.commodityCodeService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;
            }
            //还原button
            this.submitted = false;
        });
    }

    onBasicUploadAuto(event){
        this.imageUrl = JSON.parse(event.xhr.response).data.imageUrl;
    }

    goBack(){
        this.location.back();
    }

}
