import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit{
  id:number;
  employee:Employee;

  constructor(private employeeService: EmployeeService,
    private route:ActivatedRoute,private router:Router){ }

  ngOnInit()  {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id)
    .subscribe(data =>{
      this.employee = data;
    },
    error=>console.log(error));
  }

    updateEmployee(){
      this.employeeService.updateEmployee(this.id,this.employee)
      .subscribe(data => {
        console.log(data);
        this.employee= new Employee();
        this.goToEmployeeList();
      
      },error =>console.log(error));
    }      
  onSubmit(){
    this.updateEmployee();
  }
  
  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

}
