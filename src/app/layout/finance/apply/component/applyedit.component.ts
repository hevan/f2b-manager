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
import {SpecialApplyService} from "../../../../shared/services/finance/specialApply.service";
import {CorpSelectComponent} from "../../../merch/corp/component/corpselect.component";
import {ConstCodeService} from "../../../../shared/services/common/constCode.service";
import {ConstService} from "../../../../shared/services/common/const.service";
import {PurchaseSelectComponent} from "../../../puch/purchase/component/purchaseselect.component";
import {FarmSelectComponent} from "../../../sale/farm/component/farmselect.component";
import {SpecialSelectComponent} from "../../../prod/special/component/specialselect.component";

@Component({
    selector: 'app-finance-applyedit',
    templateUrl: './applyedit.component.html'
})
export class SpecialApplyEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;

    submitted = false; //控制重复提交
    public imageUrl;

    public cn = Keys.cn;

    public listBillType = [];

    public corp:any;

    public paramOriginBillCode='';
    public paramOriginBillType='';
    public paramAmount=0.00;

    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private specialApplyService: SpecialApplyService,private constService:ConstService,private constCodeService:ConstCodeService,
                private authService:AuthService, private modalService: NgbModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {

        this.curId = this.route.snapshot.paramMap.get('id');

        this.paramOriginBillCode = this.route.snapshot.paramMap.get('billCode');
        this.paramOriginBillType = this.route.snapshot.paramMap.get('billType');
        let strAmount = this.route.snapshot.paramMap.get('amount');

        if(strAmount){
            this.paramAmount = +strAmount;

            this.dataForm.patchValue({'originBillCode': this.paramOriginBillCode});
            this.dataForm.patchValue({'originBillType':  this.paramOriginBillType});
            this.dataForm.patchValue({'applyAmount': strAmount});
            this.dataForm.patchValue({'checkAmount': strAmount});
        }

        this.corp = this.authService.getCorpInfo();

        let params = new HttpParams().set('code', 'pt_loan_type');

        this.constCodeService.findItemAllByCode(params).subscribe(res=>{
            if(res.code == 0){
                this.listBillType = res.data;
            }
        });

        if(this.curId){
            this.specialApplyService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    if(res.data){

                        this.dataForm.patchValue({'name': res.data.name});
                        this.dataForm.patchValue({'billCode': res.data.billCode});
                        this.dataForm.patchValue({'billType': res.data.billType});

                        this.dataForm.patchValue({'originBillCode': res.data.originBillCode});
                        this.dataForm.patchValue({'originBillType': res.data.originBillType});


                        this.dataForm.patchValue({'applyAmount': res.data.applyAmount});
                        this.dataForm.patchValue({'checkAmount': res.data.checkAmount});

                        this.dataForm.patchValue({'assureCorpId': res.data.assureCorpId});
                        this.dataForm.patchValue({'assureCorpName': res.data.assureCorpName});
                        this.dataForm.patchValue({'applyCorpId': res.data.applyCorpId});
                        this.dataForm.patchValue({'applyCorpName': res.data.applyCorpName});
                        this.dataForm.patchValue({'applyLinkMan': res.data.applyLinkMan});
                        this.dataForm.patchValue({'applyLinkTel': res.data.applyLinkTel});

                        this.dataForm.patchValue({'productId': res.data.productId});
                        this.dataForm.patchValue({'productName': res.data.productName});

                        this.dataForm.patchValue({'status': res.data.status});
                    }

                }
            });
        }else{
            this.dataForm.patchValue({'applyCorpId': this.corp.id});
            this.dataForm.patchValue({'applyCorpName': this.corp.name});
        }
    }


    //初始化form
    createForm(){
        this.dataForm = new FormGroup({
            name: new FormControl('', Validators.required),

            billCode: new FormControl('', Validators.required),
            billType: new FormControl('', Validators.required),

            originBillCode: new FormControl('', Validators.required),
            originBillType: new FormControl('', Validators.required),

            applyAmount: new FormControl('', Validators.required),
            checkAmount: new FormControl('', Validators.required),
            assureCorpId: new FormControl('', Validators.required),
            assureCorpName: new FormControl('', Validators.required),

            applyCorpId: new FormControl('', Validators.required),
            applyCorpName: new FormControl('', Validators.required),
            applyLinkMan: new FormControl('', Validators.required),
            applyLinkTel:new FormControl('', Validators.required),

            productId:new FormControl('', Validators.required),
            productName:new FormControl('', Validators.required),

            status: new FormControl('', Validators.required)
        });

    }

    genBillCode(){
        this.constService.genBillNo('F').subscribe(res=>{
            if(res.code ===0 ){
                this.dataForm.patchValue({'billCode': res.data});
            }
        });
    }

    //数据提交
    onSubmit() {

        //点击后button disabled
        this.submitted = true;

        let formData = this.dataForm.value;


        //console.log(JSON.stringify(contract));
        formData.id  =this.curId;

        //formData.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.specialApplyService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){
                this.curId = res.data;
            }
            //还原button
            this.submitted = false;
        });
    }

    selectCorp(){
        const modalRef = this.modalService.open(CorpSelectComponent);
        modalRef.result.then((result) => {
            let retData = JSON.parse(result);

            console.log('-----'+result)
            this.dataForm.patchValue({'assureCorpId': retData.id});
            this.dataForm.patchValue({'assureCorpName': retData.name});

        }, (reason) => {
        });
    }

    selectPurchase(){
        const modalRef = this.modalService.open(PurchaseSelectComponent);
        modalRef.result.then((result) => {
            let retData = JSON.parse(result);

            console.log('-----'+result)
            this.dataForm.patchValue({'originBillCode': retData.billCode});
            this.dataForm.patchValue({'originBillType': retData.billType});
            this.dataForm.patchValue({'applyAmount': retData.amount});
            this.dataForm.patchValue({'checkAmount': retData.amount});
        }, (reason) => {

        });
    }

    selectFarm(){
        const modalRef = this.modalService.open(FarmSelectComponent);
        modalRef.result.then((result) => {
            let retData = JSON.parse(result);

            console.log('-----'+result)
            this.dataForm.patchValue({'originBillCode': retData.billCode});
            this.dataForm.patchValue({'originBillType': retData.billType});
            this.dataForm.patchValue({'applyAmount': retData.amount});
            this.dataForm.patchValue({'checkAmount': retData.amount});
        }, (reason) => {
        });
    }

    selectSpecial(){
        const modalRef = this.modalService.open(SpecialSelectComponent);
        modalRef.result.then((result) => {
            let retData = JSON.parse(result);

            console.log('-----'+result)
            this.dataForm.patchValue({'productId': retData.id});
            this.dataForm.patchValue({'productName': retData.name});
        }, (reason) => {
        });
    }


}
