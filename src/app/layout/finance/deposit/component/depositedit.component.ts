/**
 * Created by hevan on 2018/6/4.
 */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { routerTransition } from '../../../../router.animations';
import { HttpClient,HttpResponse, HttpHeaders,HttpParams } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,FormBuilder, Validators } from '@angular/forms';
import {AuthService} from '../../../../shared/services/user/auth.service';
import {PayBillService} from '../../../../shared/services/finance/payBill.service';
import { Keys   }    from '../../../../shared/common/keys';
import {CorpSelectComponent} from "../../../merch/corp/component/corpselect.component";
import {ConstService} from "../../../../shared/services/common/const.service";
import {ConstCodeService} from "../../../../shared/services/common/constCode.service";
import {PurchaseSelectComponent} from "../../../puch/purchase/component/purchaseselect.component";
import {FarmSelectComponent} from "../../../sale/farm/component/farmselect.component";

@Component({
    selector: 'app-finance-depositedit',
    templateUrl: './depositedit.component.html'
})
export class DepositEditComponent implements OnInit {

    public dataForm: FormGroup; //定义form
    public curId;

    submitted = false; //控制重复提交
    public payTransImage;

    public cn = Keys.cn;

    public listBillType = [];


    //构造
    constructor(private fb: FormBuilder,private location: Location, private route: ActivatedRoute,private router: Router,private payBillService: PayBillService,private constService:ConstService,private constCodeService:ConstCodeService,
                private authService:AuthService, private modalService: NgbModal) {
        this.createForm();
    }

    //页面初始化
    ngOnInit() {

        this.curId = this.route.snapshot.paramMap.get('id');

        let params = new HttpParams().set('code', 'pt_pay_type');

        this.constCodeService.findItemAllByCode(params).subscribe(res=>{
            if(res.code == 0){
                this.listBillType = res.data;
            }
        });

        if(this.curId){
            this.payBillService.find(this.curId).subscribe(res=>{
                if(res.code == 0){
                    if(res.data){

                        this.dataForm.patchValue({'name': res.data.name});
                        this.dataForm.patchValue({'billCode': res.data.billCode});
                        this.dataForm.patchValue({'billType': res.data.billType});

                        this.dataForm.patchValue({'originBillCode': res.data.originBillCode});
                        this.dataForm.patchValue({'originBillType': res.data.originBillType});


                        this.dataForm.patchValue({'billMoney': res.data.billMoney});
                        this.dataForm.patchValue({'payType': res.data.payType});
                        this.dataForm.patchValue({'payTransNo': res.data.payTransNo});
                        this.dataForm.patchValue({'payDateTime': res.data.payDateTime});
                        this.dataForm.patchValue({'recvBank': res.data.recvBank});
                        this.dataForm.patchValue({'recvBankAccount': res.data.recvBankAccount});

                        this.dataForm.patchValue({'recvCorpId': res.data.recvCorpId});
                        this.dataForm.patchValue({'recvCorpName': res.data.recvCorpName});

                        this.dataForm.patchValue({'status': res.data.status});

                        this.payTransImage = res.data.payTransImage;
                    }

                }
            });
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

            billMoney: new FormControl('', Validators.required),
            payDateTime: new FormControl('', Validators.required),
            payType: new FormControl('', Validators.required),
            payTransNo: new FormControl('', Validators.required),
            recvBank: new FormControl('', Validators.required),
            recvBankAccount: new FormControl('', Validators.required),
            recvCorpName: new FormControl('', Validators.required),
            recvCorpId: new FormControl('', Validators.required),
            status: new FormControl('', Validators.required)
        });


    }

    genBillCode(){

        this.constService.genBillNo('SP').subscribe(res=>{
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
        formData.payTransImage = this.payTransImage;

        //contract.signedDate = JSON.stringify(contract.signedDate).substr(1,10);

        this.payBillService.save(JSON.stringify(formData)).subscribe(res=>{
            if(res.code == 0){

              this.curId = res.data;

                this.goBack();
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
            this.dataForm.patchValue({'recvCorpId': retData.id});
            this.dataForm.patchValue({'recvCorpName': retData.name});

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
            this.dataForm.patchValue({'billMoney': retData.amount});
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
            this.dataForm.patchValue({'billMoney': retData.amount});
        }, (reason) => {
        });
    }

    onBasicUploadAuto(event){
        this.payTransImage = JSON.parse(event.xhr.response).data.imageUrl;
    }

    goBack(){
        this.location.back();
    }

}
