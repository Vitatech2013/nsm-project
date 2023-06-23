import { BatchComponent } from './batch/batch.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../shared/material/material.module';
import { PosBillComponent } from './pos-bill/pos-bill.component';
import { ProductsComponent } from './products/products.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ReportComponent } from './report/report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DoctorsComponent } from './doctors/doctors.component';
import { PaymentTypeComponent } from './payment-type/payment-type.component';
import { ExpenseTypeComponent } from './expense-type/expense-type.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { MedicineCategoryComponent } from './medicine-category/medicine-category.component';
import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';
import { NewExpenseTypeComponent } from './expense-type/new-expense-type/new-expense-type.component';
import { NewMedicineCategoryComponent } from './medicine-category/new-medicine-category/new-medicine-category.component';
import { NewPaymentTypeComponent } from './payment-type/new-payment-type/new-payment-type.component';
import { NewSupplierComponent } from './suppliers/new-supplier/new-supplier.component';
import { NewProductsComponent } from './products/new-products/new-product.component';
import { NewExpensesComponent } from './expenses/new-expenses/new-expenses.component';
import { NewPosBillComponent } from './pos-bill/new-pos-bill/new-pos-bill.component';
import { NewAttendanceComponent } from './attendance/new-attendance/new-attendance.component';
import { ViewAttendanceComponent } from './attendance/view-attendance/view-attendance.component';
import { ProfileComponent } from './profile/profile.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { HSNComponent } from './hsn/hsn.component';
import { CompanyComponent } from './company/company.component';
import { AddCompanyComponent } from './company/add-company/add-company.component';
import { PurchaseBatchComponent } from './purchase-batch/purchase-batch.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddHSNComponent } from './hsn/add-hsn/add-hsn.component';
import { TempComponent } from './temp/temp.component';
import { AddPurchaseBatchComponent } from './purchase-batch/add-purchase-batch/add-purchase-batch.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { AddBalanceSheetComponent } from './balance-sheet/add-balance-sheet/add-balance-sheet.component';
import { SalesDemoComponent } from './sales-demo/sales-demo.component';
import { SalesDemoTableComponent } from './sales-demo-table/sales-demo-table.component';
import { PaymentsComponent } from './payments/payments.component';
import { NewPaymentsComponent } from './payments/new-payments/new-payments.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { ExpiredProductsComponent } from './expired-products/expired-products.component';
import { PurchaseReportsComponent } from './reports/purchase-reports/purchase-reports.component';
import { SalesReportsComponent } from './reports/sales-reports/sales-reports.component';
import { ExpensesReportsComponent } from './reports/expenses-reports/expenses-reports.component';
import { SaleItemsReportsComponent } from './reports/sale-items-reports/sale-items-reports.component';
import { PurchaseItemsReportsComponent } from './reports/purchase-items-reports/purchase-items-reports.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { NewPurchaseComponent } from './new-purchase/new-purchase.component';
import { NewPurchaseDemoComponent } from './new-purchase/new-purchase-demo/new-purchase-demo.component';
import { SalesComponent } from './sales/sales.component';
import { DemoComponent } from './sales/demo/demo.component';
import { SalesItemsComponent } from './sales-items/sales-items.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { DeleteButtonRendererComponent } from './delete-button-renderer/delete-button-renderer.component';
import { DatePipe } from '@angular/common';
import { BillFormattComponent } from './pos-bill/bill-formatt/bill-formatt.component';
import { NewSalesComponent } from './new-sales/new-sales.component';
import { MonthlySalesComponent } from './monthly-sales/monthly-sales.component';
import { InnerAggridComponent } from './inner-aggrid/inner-aggrid.component';




@NgModule({
  declarations: [
    AdminComponent,
    NavComponent,
    DashboardComponent,
    PosBillComponent,
    ProductsComponent,
    ExpensesComponent,
    AttendanceComponent,
    ReportComponent,
    DoctorsComponent,
    PaymentTypeComponent,
    ExpenseTypeComponent,
    SuppliersComponent,
    MedicineCategoryComponent,
    AddDoctorComponent,
    NewExpenseTypeComponent,
    NewMedicineCategoryComponent,
    NewPaymentTypeComponent,
    NewSupplierComponent,
    NewProductsComponent,
    NewExpensesComponent,
    NewPosBillComponent,
    NewAttendanceComponent,
    ViewAttendanceComponent,
    ProfileComponent,
    HSNComponent,
    CompanyComponent,
    AddCompanyComponent,
    PurchaseBatchComponent,
    SideNavComponent,
    AddHSNComponent,
    TempComponent,
    AddPurchaseBatchComponent,
    BalanceSheetComponent,
    AddBalanceSheetComponent,
    SalesDemoComponent,
    SalesDemoTableComponent,
    PaymentsComponent,
    NewPaymentsComponent,
    BatchComponent,
    PurchaseReturnComponent,
    ExpiredProductsComponent,
    PurchaseReportsComponent,
    SalesReportsComponent,
    ExpensesReportsComponent,
    SaleItemsReportsComponent,
    PurchaseItemsReportsComponent,
    SalesReturnComponent,
    NewPurchaseComponent,
    NewPurchaseDemoComponent,
    SalesComponent,
    DemoComponent,
    SalesItemsComponent,
    ProductsListComponent,
    ButtonRendererComponent,
    DeleteButtonRendererComponent,
    BillFormattComponent,
    NewSalesComponent,
    MonthlySalesComponent,
    InnerAggridComponent,
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleChartsModule,
    MatTableExporterModule,AgGridModule.withComponents([ButtonRendererComponent])

  ],
  providers: [DatePipe],

  

})
export class AdminModule { }
