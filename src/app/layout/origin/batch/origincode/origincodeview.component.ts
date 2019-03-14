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
import {OriginCodeService} from "../../../../shared/services/origin/originCode.service";
import {OriginTransItemService} from "../../../../shared/services/origin/originTransItem.service";


@Component({
    selector: 'app-origin-origincodeview',
    templateUrl: './origincodeview.component.html',
    animations: [routerTransition()]
})
export class OriginCodeViewComponent implements OnInit {


    public curId;//当前数据ID
    public originCodeData:any;

    public listTransItem = [];

    public qrdata;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private originCodeService: OriginCodeService,private originTransItemService: OriginTransItemService,private authService:AuthService) {

    }

    //页面初始化
    ngOnInit() {
        this.curId = this.route.snapshot.paramMap.get('id');

        this.loadData();

        //this.loadTrans();

    }

    loadData(){
        if(this.curId){
            this.originCodeService.find(this.curId).subscribe(res=>{
                if(res.code == 0){

                    this.originCodeData = res.data;

                    this.qrdata = "http://wiki.yjf2b.com/origin/detail/"+this.originCodeData.commodityCode+this.originCodeData.batchCode+this.originCodeData.originCode;
                }

            });
        }
    }

    loadTrans(){
        let paramsSku = new HttpParams().set('entityId',this.curId).set('entityName','originCode');

        this.originTransItemService.findAllByEntity(paramsSku).subscribe(res=>{
            if(res.code == 0){
                this.listTransItem = res.data;
            }
        });
    }

    goBack(){
        this.location.back();
    }
}
