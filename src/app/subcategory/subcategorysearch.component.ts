import { Component, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { LocalStorageService } from 'angular-2-local-storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonUtil } from '../util/common';
import { ToastyService, ToastyConfig } from 'ng2-toasty';
import { UserService } from '../services/userservice';
import { IMyDpOptions } from 'angular4-datepicker/src/my-date-picker/interfaces';
import { FileUploader } from 'ng2-file-upload';
declare var $: any;
const URL = 'http://localhost:3000/upload';

@Component({
    selector: 'subcategory-search',
    templateUrl: 'subcategorysearch.component.html',
    providers: [LocalStorageService]
})
export class SubCategorySearchComponent {
    imgdir: any;
    filename: any;
    optionSelected: any;
    originalfile: any;
    filepath: any;
    activekey: any;
    emailvalid: boolean = true;
    mobilevalid: any = true;
    userform: FormGroup;
    result: any;
    user: any;
    addhidden: boolean = false;
    edithidden: boolean = true;
    key: any;
    activedeactivevalue: any;
    currentdate = new Date();
    public uploader: FileUploader = new FileUploader({ url: URL });

    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
        disableUntil: { year: new Date().getFullYear(), month: (new Date().getMonth()) + 1, day: new Date().getDate() }

    };

    constructor(private commonUtil: CommonUtil, private formBuilder: FormBuilder, private toastyService: ToastyService, private toastyConfig: ToastyConfig, private localstorage: LocalStorageService, private router: Router, private userservice: UserService) {

        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.timeout = 2000;
        this.userform = this.formBuilder.group({
            'BannerName': ['', Validators.required],
            'BannerDescription': ['', Validators.required],
            'BannerPosition': ['', Validators.required],
            'StartDate': ['', Validators.required],
            'EndDate': ['', Validators.required],
            'File': [null, Validators.required],
            'CreatedOn': [this.commonUtil.getCurrentDateTime()],
            'LastUpdatedOn': [this.commonUtil.getCurrentDateTime()],
            'CreatedBy': [this.localstorage.get('currentUser')],
            'LastUpdatedBy': [this.localstorage.get('currentUser')],
            'Status': ['1']


        });
    }

    get isBannerName() {
        return this.userform.controls['BannerName'].valid;
    }
    get isBannerDescription() {
        return this.userform.controls['BannerDescription'].valid;
    }
    get isBannerPosition() {
        return this.userform.controls['BannerPosition'].value;
    }
    get isStartDate() {
        return this.userform.controls['StartDate'].valid;
    }
    get isEndDate() {
        return this.userform.controls['EndDate'].valid;
    }
    get isFile() {
        return this.userform.controls['File'].valid;
    }

    ngOnInit() {
        this.getAllBanners();
    }

    onFileChange(event) {
        let file = event.target.files[0];
        this.originalfile = file;
        this.filename = file.name
        alert(file.name);
    }

    submit() {
        let formdata = new FormData();
        formdata.append("File", this.originalfile, this.filename);

        if (this.key == 0) {

            this.userform.controls['CreatedOn'].setValue(this.commonUtil.getCurrentDateTime());
            this.userform.controls['CreatedBy'].setValue(this.localstorage.get('currentUser'));
            this.userform.controls['LastUpdatedOn'].setValue(this.commonUtil.getCurrentDateTime());
            this.userform.controls['LastUpdatedBy'].setValue(this.localstorage.get('currentUser'));
            this.userform.controls['Status'].setValue('1');
            this.userform.controls['StartDate'].setValue((this.userform.controls['StartDate'].value).formatted);
            this.userform.controls['EndDate'].setValue((this.userform.controls['EndDate'].value).formatted);
            this.userservice.uploadFile(formdata).subscribe(
                file => {
                    this.filepath = file;
                    this.userform.controls['File'].patchValue("");
                    this.userform.value.File = this.filepath.filepath;
                    this.imgdir = "http://localhost:3000" + this.filepath.filepath
                    this.userservice.insertBanner(this.userform.value).subscribe(
                        data => {
                            this.result = data;
                            if (this.result.success) {
                                this.toastyService.success(' Successfully Created !');
                                setTimeout(() => {
                                    this.back();
                                }, 2000);
                            } else {
                                this.toastyService.error("Server Error !");
                            }
                        },
                        err => {
                            console.log(err)
                            this.toastyService.error("Server Error !");
                        }
                    )
                }
            )
        } else if (this.key > 0) {

            this.userform.controls['StartDate'].setValue((this.userform.controls['StartDate'].value).formatted);
            this.userform.controls['EndDate'].setValue((this.userform.controls['EndDate'].value).formatted);
            this.userservice.uploadFile(formdata).subscribe(
                file => {
                    this.filepath = file;
                    this.userform.controls['File'].patchValue("");
                    this.userform.value.File = this.filepath.filepath;
                    this.imgdir = "http://localhost:3000" + this.filepath.filepath
                    this.userservice.updateBannerById(this.key, this.userform.value).subscribe(
                        data => {
                            this.result = data;
                            if (this.result.success) {
                                this.toastyService.success(' Successfully Updated !');
                                setTimeout(() => {
                                    this.back();
                                }, 2000);
                            } else {
                                this.toastyService.error("Server Error !");
                            }
                        },
                        err => {
                            console.log(err)
                            this.toastyService.error("Server Error !");
                        }
                    )
                });

        }

    }

    reset() {
        this.userform.reset();
    }

    add() {
        this.key = 0;
        this.addhidden = !this.addhidden;
        this.edithidden = !this.edithidden;
        $("#userTable_wrapper").hide();
        this.userform.reset();
    }

    switchChange(event, userId) {
        this.activekey = userId;
        if (event)
            this.activedeactivevalue = "active"
        else
            this.activedeactivevalue = "deactive"
        $("#myModal").modal('show');

    }

    activeBanner(activevalue) {
        if (activevalue == '1') {
            if (this.activedeactivevalue == 'active') {
                this.userservice.activeBanner({ "status": '1', "id": this.activekey }).subscribe(
                    data => {
                        this.toastyService.success(' Successfully updated !');
                    },
                    err => {
                        console.log(err)
                        this.toastyService.error("Server Error !");
                    })
            } else if (this.activedeactivevalue == 'deactive') {
                this.userservice.activeBanner({ "status": '0', "id": this.activekey }).subscribe(
                    data => {
                        this.toastyService.success(' Successfully updated !');
                    },
                    err => {
                        console.log(err)
                        this.toastyService.error("Server Error !");
                    })
            } else {

            }
        } else if (activevalue == '0') {
            this.getAllBanners();
        }

    }

    back() {
        this.getAllBanners();
        setTimeout(() => {
            $('#userTable').DataTable();
        }, 500);
        this.addhidden = !this.addhidden;
        this.edithidden = !this.edithidden;
        this.key = -1;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            $('#userTable').DataTable();
        }, 1000);
    }

    getAllBanners() {
        this.userservice.getBannerData().subscribe(data => {
            this.result = data;
        });
    }

    edit(id) {
        this.myDatePickerOptions;
        this.userservice.getBannerById(id).subscribe(
            data => {
                this.result = data;
                this.key = id;
                this.userform.controls['BannerName'].setValue(this.result[0].BANNER_NAME);
                this.userform.controls['BannerDescription'].setValue(this.result[0].BANNER_DESCRIPTION);
                this.userform.controls['BannerPosition'].patchValue(this.result[0].BANNER_POSITION);
                this.optionSelected = this.result[0].BANNER_POSITION;
                this.userform.patchValue({
                    StartDate: {
                        date: {
                            year: this.result[0].BANNER_START_DATE.split("-")[0],
                            month: this.result[0].BANNER_START_DATE.split("-")[1].substring(1, 2),
                            day: this.result[0].BANNER_START_DATE.split("-")[2].substring(0, 2)
                        }
                    }
                });
                this.userform.patchValue({
                    EndDate: {
                        date: {
                            year: this.result[0].BANNER_END_DATE.split("-")[0],
                            month: this.result[0].BANNER_END_DATE.split("-")[1].substring(1, 2),
                            day: this.result[0].BANNER_END_DATE.split("-")[2].substring(0, 2)
                        }
                    }
                });
                if (this.result[0].BANNER_FILE) {
                    this.userform.controls['File'].setValidators(null);
                    this.userform.controls['File'].updateValueAndValidity();
                }

                this.userform.controls['LastUpdatedOn'].setValue(this.commonUtil.getCurrentDateTime());
                this.userform.controls['LastUpdatedBy'].setValue(this.localstorage.get('currentUser'));
                this.userform.controls['Status'].setValue(this.result[0].USER_STATUS);
                this.imgdir = "http://localhost:3000" + this.result[0].BANNER_FILE;
                this.addhidden = !this.addhidden;
                this.edithidden = !this.edithidden;
                $("#userTable_wrapper").hide();
            },
            err => {
                console.log(err)
                this.toastyService.error("Server Error !");
            })
    }



}
