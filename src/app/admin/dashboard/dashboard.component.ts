import { Component, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { PurchaseService } from 'src/app/shared/services/purchase.service';
import { SalesItemsService } from 'src/app/shared/services/sales-items.service';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from '@amcharts/amcharts4/themes/material';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading!: boolean;
  dataSource: any;
  amount = 0;
  basicData: any;
  basicOptions: any;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10, 25, 50, 100];
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'startDate',
    'endDate',
    'status',
  ];

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Income', cols: 2, rows: 1 }];
      }

      return [{ title: 'Income', cols: 1, rows: 1 }];
    })
  );

  expensesCards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Expenses', cols: 3, rows: 1 }];
      }

      return [{ title: 'Expenses', cols: 1, rows: 1 }];
    })
  );
  dashboardCards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ title: 'Expenses', cols: 2, rows: 1 }];
      }

      return [{ title: 'Expenses', cols: 1, rows: 1 }];
    })
  );
  chart4 = [];
  chart: any;
  chart1: any;
  chart2: any;
  type = 'ColumnChart';
  expensestype = 'PieChart';
  expType = 'AreaChart';
  salaryType = 'AreaChart';
  salesType = 'LineChart';
  data = [];
  columnNames = ['sales', 'Purchase', 'Sales'];
  columnOptions = {
    is3D: true,
    responsive: true,
    width: 660,
    height: 300,
    colors: ['#40C4FF', '#1E88E5'],
    legend: { position: 'top', maxLines: 2 },
    bar: { groupWidth: '50%' },
    isStacked: false,
  };
  transactionOptions = {
    is3D: true,
    responsive: true,
    width: 460,
    height: 180,
    colors: ['#1E88E5'],
    legend: { position: 'top', maxLines: 2 },
    bar: { groupWidth: '50%' },
    isStacked: false,
  };
  salesOptions = {
    is3D: true,
    responsive: true,
    width: 460,
    height: 180,
    colors: ['#40C4FF'],
    legend: { position: 'top', maxLines: 2 },
    bar: { groupWidth: '50%' },
    isStacked: false,
    stroke: {
      show: true,
      curve: 'smooth',
      lineCap: 'butt',
      colors: undefined,
      width: 2,
      dashArray: 0,
    },
  };
  lineOptions = {
    is3D: true,
    responsive: true,
    width: 460,
    height: 180,
    colors: ['#FF4081'],
    legend: { position: 'top', maxLines: 1 },
    bar: { groupWidth: '50%' },
    isStacked: false,
    chartArea: { width: '80%', height: '70%' },
  };
  lineOptions2 = {
    is3D: true,
    responsive: true,
    width: 460,
    height: 180,
    colors: ['#BBDEFB'],
    legend: { position: 'top', maxLines: 1 },
    bar: { groupWidth: '50%' },
    isStacked: false,
    chartArea: { width: '80%', height: '70%' },
  };
  columnNames1 = ['', 'Expenses'];
  data1 = [];
  pieOptions = {
    is3D: true,
    responsive: true,
    width: 460,
    plotOptions: {
      pie: {
        donut: {
          size: '100%',
        },
      },
    },
    height: 180,
    colors: [
      '#6495ED',
      '#F0F8FF',
      '#00FFFF',
      '#FAEBD7',
      '#7FFFD4',
      '#FFEBCD',
      '#34495E',
      '#F39C12',
      '#8A2BE2',
      '#3498DB',
      '#95A5A6',
      '#16A085',
      '#5F9EA0',
      '#7FFF00',
      '#DC143C',
      '#FFF8DC',
      '#008B8B',
      '#2F4F4F',
      '#FF00FF',
      '#228B22',
      '#F8F8FF',
    ],
    legend: { position: 'right' },
    chartArea: { width: '100%', height: '100%' },
  };

  expensesTypeData = [];
  ExpTypecolumnNames = ['', 'Expense'];

  salaryData = [];
  salaryColumnNames = ['', 'Salary'];

  purchaseData = [];
  purchaseColumnNames = ['', 'Purchase'];

  salesData = [];
  salesColumnNames = ['', 'sales'];

  transactionsData = [];
  transactionsColumnNames = ['', 'Credit', 'Debit'];

  expenseData: any;
  expenseTypeData: any;
  expenseChartData = [];
  totalExpenses = 0;

  purchauseData: any;
  purchauseChartData = [];
  totalPurchaseAmount = 0;
  purchaseMonthData: any;
  purchaseYearData: any;
  purchaseYearCount = 0;

  salesDATA: any;
  salesChartData = [];
  salesMonthData: any;
  totalSalesAmount = 0;
  salesYearData: any;
  salesMonthCount = 0;
  salesYearCount = 0;
  purchaseMonthCount = 0;
  expenseYearData: any;
  expenseYearCount = 0;
  date = new Date();
  year = this.date.getFullYear();
  month = this.date.getMonth();
  day = this.date.getDate();
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  salaryChartData = [];
  salaryChartTypeData = [];
  salaryTotalCount = 0;
  exepenseChartData1 = [];
  salaryChartData1 = [];
  chart3: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private expenseService: ExpensesService,
    private purchaseService: PurchaseService,
    private salesService: SalesItemsService
  ) {}

  ngOnInit(): void {
    // Chart themes
    am4core.useTheme(am4themes_animated);

    // expense type Pie chart
    this.chart = am4core.create('chartdiv', am4charts.PieChart3D);
    this.chart.logo.disabled = true;
    this.chart.hiddenState.properties.opacity = 0;
    this.chart.legend = new am4charts.Legend();
    this.chart.data = [];
    const series1 = this.chart.series.push(new am4charts.PieSeries3D());
    series1.dataFields.value = 'amount';
    series1.dataFields.category = 'expenseType';


    // Sales and Purchase Chart
    this.chart1 = am4core.create('chartdiv1', am4charts.XYChart);
    this.chart1.numberFormatter.numberFormat = '#.#\'%\'';
    this.chart1.data = [];
    const categoryAxis = this.chart1.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'month';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    const valueAxis = this.chart1.yAxes.push(new am4charts.ValueAxis());
    const series = this.chart1.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'sales';
    series.dataFields.categoryX = 'month';
    series.clustered = false;
    series.tooltipText = 'sales in {categoryX} : [bold]{valueY}[/]';
    const series2 = this.chart1.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = 'purchase';
    series2.dataFields.categoryX = 'month';
    series2.clustered = false;
    series2.columns.template.width = am4core.percent(50);
    series2.tooltipText = 'purchase in {categoryX} : [bold]{valueY}[/]';
    this.chart1.logo.disabled = true;
    this.chart1.cursor = new am4charts.XYCursor();
    this.chart1.cursor.lineX.disabled = true;
    this.chart1.cursor.lineY.disabled = true;

    // expense Chart
    const chart2 = am4core.create('chartdiv2', am4charts.XYChart);
    chart2.data = [];
    const categoryAxis3 = chart2.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis3.dataFields.category = 'month';
    categoryAxis3.renderer.grid.template.location = 0;
    categoryAxis3.renderer.minGridDistance = 30;
    categoryAxis3.renderer.labels.template.adapter.add('dy', function(dy, target) {
      if (target.dataItem && target.dataItem.index && 2 === 2) {
        return dy + 25;
      }
      return dy;
    });
    const valueAxis3 = chart2.yAxes.push(new am4charts.ValueAxis());
    const series3 = chart2.series.push(new am4charts.ColumnSeries());
    series3.dataFields.valueY = 'Expense';
    series3.dataFields.categoryX = 'month';
    series3.name = 'Expense';
    series3.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series3.columns.template.fillOpacity = .8;
    const columnTemplate3 = series3.columns.template;
    columnTemplate3.strokeWidth = 2;
    columnTemplate3.strokeOpacity = 1;
    chart2.logo.disabled = true;
    this.chart2 = chart2;

    // Salary Chart
    const chart3 = am4core.create('chartdiv3', am4charts.XYChart);
    chart3.scrollbarX = new am4core.Scrollbar();
    chart3.data = [];
    const categoryAxis4 = chart3.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis4.dataFields.category = 'month';
    categoryAxis4.renderer.grid.template.location = 0;
    categoryAxis4.renderer.minGridDistance = 30;
    categoryAxis4.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis4.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis4.renderer.labels.template.rotation = 270;
    categoryAxis4.tooltip.disabled = true;
    categoryAxis4.renderer.minHeight = 110;
    const valueAxis4 = chart3.yAxes.push(new am4charts.ValueAxis());
    valueAxis4.renderer.minWidth = 50;
    const series4 = chart3.series.push(new am4charts.ColumnSeries());
    series4.sequencedInterpolation = true;
    series4.dataFields.valueY = 'salary';
    series4.dataFields.categoryX = 'month';
    series4.tooltipText = '[{categoryX}: bold]{valueY}[/]';
    series4.columns.template.strokeWidth = 0;
    series4.tooltip.pointerOrientation = 'vertical';
    series4.columns.template.column.cornerRadiusTopLeft = 10;
    series4.columns.template.column.cornerRadiusTopRight = 10;
    series4.columns.template.column.fillOpacity = 0.8;
    const hoverState4 = series4.columns.template.column.states.create('hover');
    hoverState4.properties.cornerRadiusTopLeft = 0;
    hoverState4.properties.cornerRadiusTopRight = 0;
    hoverState4.properties.fillOpacity = 1;

    series4.columns.template.adapter.add('fill', function(fill, target) {
  return chart3.colors.getIndex(target.dataItem.index);
});
    chart3.cursor = new am4charts.XYCursor();
    this.chart3 = chart3;

    this.expenseService.getExpenses().subscribe((data) => {
      this.expenseData = data;
      this.expenseData.map((d) => {
        this.totalExpenses += parseInt(d.amount);
      });
      this.expenseData.map((data2) => {
        return (data2.amount = parseInt(data2.amount));
      });
      this.expensesReports();
    });

    this.purchaseService.getPurchase().subscribe((data) => {
      this.purchauseData = data;
      this.purchauseData.map((d) => {
        this.totalPurchaseAmount += parseInt(d.netAmount);
      });
      this.purchauseData.map((data2) => {
        return (data2.netAmount = parseInt(data2.netAmount));
      });
      this.purchaseReports();
    });

    this.salesService.getSales().subscribe((data) => {
      this.salesDATA = data;
      this.salesDATA.map((d) => {
        this.totalSalesAmount += parseInt(d.netAmount);
      });
      this.salesDATA.map((data2) => {
        return (data2.netAmount = parseInt(data2.netAmount));
      });
      // setTimeout(a => {
      this.salesReports();
      // }, 3000);
    });
  }

  getMonth(month) {
    month = month - 1;
    if (this.months[month] != null) {
      return this.months[month];
    } else {
      throw new Error('Invalid Month No');
    }
  }

  applyFilter(event: any): void {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  expensesReports(): void {
    let added = false;
    this.expenseData.map((expenses) => {
      const datatemp = {
        id: expenses.id,
        expenseType: expenses.expenseType.expenseType,
        amount: expenses.amount,
      };
      for (const expense of this.expenseChartData) {
        if (expense.expenseType === datatemp.expenseType) {
          expense.amount += datatemp.amount;
          added = true;
          break;
        }
      }
      if (!added) {
        this.expenseChartData.push(datatemp);
      }
      added = false;
    });
    this.expenseChartData.map((data) => {
      this.chart.data.push({
        expenseType: `${data.expenseType}`,
        amount: data.amount,
      });
    });
    this.chart.data = this.chart.data;
    const c = new Date(this.year - 1, this.month + 1, this.day);
    const startYear = moment(c).format('YYYY-MM-DD');
    const endYear = moment().format('YYYY-MM-DD');
    this.expenseService
      .getExpensesReports(startYear, endYear)
      .subscribe((data) => {
        this.expenseYearData = data;
        this.expenseYearData.map((data1) => {
          if (data1.expenseType.id === 1) {
            this.salaryTotalCount += data1.amount;
          }
          this.expenseYearCount += data1.amount;
        });
        this.expenseYearData.map((a) => {
          const month1 = new Date(Date.parse(a.createdAt)).getMonth() + 1;
          if (a.expenseType.id === 1) {
            const datatemp = {
              id: a.id,
              month: this.getMonth(month1),
              expenseType: a.expenseType.expenseType,
              amount: a.amount,
            };
            for (const expense of this.salaryChartData) {
              if (expense.month === datatemp.month) {
                expense.amount += datatemp.amount;
                added = true;
                break;
              }
            }
            if (!added) {
              this.salaryChartData.push(datatemp);
            }
            added = false;
          }
          console.log(this.salaryChartData);
          this.salaryChartData.map((data) => {
            this.chart3.data.push({
              month: `${this.getMonth(month1)}`,
              salary: data.amount
            });
          });
          this.chart3.data = this.chart3.data;
          console.log(this.chart3.data);
          const month = new Date(Date.parse(a.createdAt)).getMonth() + 1;
          let added1 = false;
          for (const expense of this.chart2.data) {
            const test = this.getMonth(month);
            console.log(expense.month, month, test);
            if (expense.month === test) {
              expense.amount += a.amount;
              added1 = true;
              break;
            }
          }
          if (!added1) {
            this.chart2.data.push({
              month: this.getMonth(month),
              Expense: a.amount
            });
          }
          added1 = false;
          this.chart2.data = this.chart2.data;
          console.log(this.chart2.data);
        });
      });
  }

  purchaseReports(): void {
    const startMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endMonth = moment().endOf('month').format('YYYY-MM-DD');
    this.purchaseService
      .getPurchaseReports(startMonth, endMonth)
      .subscribe((data) => {
        this.purchaseMonthData = data;
        this.purchaseMonthData.map((data1) => {
          this.purchaseMonthCount += data1.netAmount;
        });
      });
    const c = new Date(this.year - 1, this.month + 1, this.day);
    const startYear = moment(c).format('YYYY-MM-DD');
    const endYear = moment().format('YYYY-MM-DD');
    this.purchaseService
      .getPurchaseReports(startYear, endYear)
      .subscribe((data) => {
        console.log('total yearly data', data);
        this.purchaseYearData = data;
        this.purchaseYearData.map((data2) => {
          return (data2.netAmount = parseInt(data2.netAmount));
        });
        this.purchaseYearData.map((data1) => {
          this.purchaseYearCount += data1.netAmount;
        });
        this.purchaseYearData.map((a) => {
          const month = new Date(Date.parse(a.createdAt)).getMonth() + 1;
          let added1 = false;
          for (const expense of this.chart1.data) {
            const test = this.getMonth(month);
            if (expense.month === test) {
              expense.purchase += a.netAmount;
              added1 = true;
              break;
            }
          }
          if (!added1) {
            // this.data.push([this.getMonth(month), a.netAmount, 0]);
            this.chart1.data.push({
              month: this.getMonth(month),
              sales: 0,
              purchase: a.netAmount
          });
          }
          added1 = false;
        });
        console.log('purchase chart data', this.chart1.data);
        this.chart1.data = this.chart1.data;
      });
    let added = false;
    this.purchauseData.map((purchase) => {
      const datatemp = {
        id: purchase.id,
        netAmount: purchase.netAmount,
      };
      for (const expense of this.purchauseChartData) {
        if (expense.id === datatemp.id) {
          expense.netAmount += datatemp.netAmount;
          added = true;
          break;
        }
      }
      if (!added) {
        this.purchauseChartData.push(datatemp);
      }
      added = false;
    });
    this.purchauseChartData.map((data) => {
      this.purchaseData.push([`${data.id}`, data.netAmount]);
    });
  }

  salesReports(): void {
    let added = false;
    this.salesDATA.map((sales) => {
      const datatemp = {
        id: sales.id,
        netAmount: parseInt(sales.netAmount),
      };
      for (const expense of this.salesChartData) {
        if (expense.id === datatemp.id) {
          expense.netAmount += datatemp.netAmount;
          added = true;
          break;
        }
      }
      if (!added) {
        this.salesChartData.push(datatemp);
      }
      added = false;
    });
    this.salesChartData.map((data) => {
      this.salesData.push([`${data.id}`, data.netAmount]);
    });
    const startMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endMonth = moment().endOf('month').format('YYYY-MM-DD');
    this.salesService.getSaleReports(startMonth, endMonth).subscribe((data) => {
      this.salesMonthData = data;
      this.salesMonthData.map((data2) => {
        return (data2.netAmount = parseInt(data2.netAmount));
      });
      this.salesMonthData.map((data1) => {
        this.salesMonthCount += data1.netAmount;
      });
    });
    const c = new Date(this.year - 1, this.month + 1, this.day);
    const startYear = moment(c).format('YYYY-MM-DD');
    const endYear = moment().format('YYYY-MM-DD');
    this.salesService.getSaleReports(startYear, endYear).subscribe((data) => {
      this.salesYearData = data;
      this.salesYearData.map((data2) => {
        return (data2.netAmount = parseInt(data2.netAmount));
      });
      this.salesYearData.map((data1) => {
        this.salesYearCount += data1.netAmount;
      });
      this.salesYearData.map((a) => {
        const month = new Date(Date.parse(a.createdAt)).getMonth() + 1;
        let added1 = false;
        for (const expense of this.chart1.data) {
          const test = this.getMonth(month);
          console.log(expense.month, month, test);
          if (expense.month === test) {
            expense.sales += a.netAmount;
            added1 = true;
            break;
          }
        }
        if (!added1) {
          this.chart1.data.push({
            month: this.getMonth(month),
            sales: a.netAmount,
            purchase: 0
        });
        }
        added1 = false;
      });
      this.chart1.data = this.chart1.data;
      console.log(this.chart1.data);
    });
  }}
