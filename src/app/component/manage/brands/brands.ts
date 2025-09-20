import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BrandService } from '../../../services/brand';

@Component({
  selector: 'app-brands',
   imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './brands.html',
  styleUrl: './brands.scss'
})
export class Brands {

 displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  brandService =inject(BrandService);
  router = inject(Router);

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getData();
  }

  private getData(){
    this.brandService.getBrands().subscribe((result:any)=>{
      // console.log(result);
      this.dataSource.data = result;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   deleteBrand(id:String){
    this.brandService.deleteBrandById(id).subscribe((result:any)=>{
      // alert("Brand Deleted : ");
      this.getData();
    });
  }


}
