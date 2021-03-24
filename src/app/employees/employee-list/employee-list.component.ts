import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public empService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.empService.getList();
  }

  onDelete(eid: number) {
    if (confirm('Are you sure you want to delete?')) {
      this.empService.deleteEmployee(eid).subscribe(res => {
        this.toastr.info('Record deleted succcessfully', '');
        this.refreshList();
      });
    }
  }

  populateForm(Employee: Employee) {
    this.empService.formData = Object.assign({}, Employee);
  }
}
