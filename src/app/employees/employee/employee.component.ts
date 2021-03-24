import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public empService: EmployeeService, public toaster: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeeID > 0) {
      this.updateRecord(form);
    }
    else {

      this.insertRecord(form);
    }
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.empService.formData = {
      EmployeeID: 0,
      FullName: '',
      EMPCode: '',
      Mobile: '',
      Position: ''
    }
  }

  insertRecord(form: NgForm) {
    this.empService.postEmployee(form.value).subscribe(res => {
      this.toaster.success('Recored added successfully', '');
      this.resetForm(form);
      this.empService.getList();
    });
  }

  updateRecord(form: NgForm) {
    this.empService.putEmployee(form.value).subscribe(res => {
      this.toaster.success('Recored updated successfully', '');
      this.resetForm(form);
      this.empService.getList();
    });
  }

}

