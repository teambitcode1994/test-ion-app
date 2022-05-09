import { Component, OnInit } from "@angular/core";
import { CalendarMode, Step } from "ionic2-calendar/calendar";

@Component({
    selector: 'full-page-calender',
    templateUrl: './full-page-calender.component.html',
    styleUrls: ['./full-page-calender.scss'],
})
  export class FullPageCalenderComponent implements OnInit {
    eventSource;
    viewTitle;
    // db = firebase.firestore();
    isToday:boolean;
    calendar = {
        mode: 'month' as CalendarMode,
        step: 30 as Step,
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };
    todoList = [
        {
          value:{
            itemPriority: 'high',
            itemName: 'naecas',
            itemDueDate: new Date().setMonth(5),
            itemCategory: 'catttt'
          }
        },
        {
          value:{
            itemPriority: 'low',
            itemName: 'kllk',
            itemDueDate: new Date().setMonth(5),
            itemCategory: 'wwww'
          }
        },
        {
          value:{
            itemPriority: 'high',
            itemName: 'dfvdv',
            itemDueDate: new Date(),
            itemCategory: 'rewe'
          }
        },
        {
          value:{
            itemPriority: 'middle',
            itemName: 'dsfss',
            itemDueDate: new Date(),
            itemCategory: 'catttt'
          }
        }
      ];
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }


    today() {
        this.calendar.currentDate = new Date();
      }
    
      onViewTitleChanged(title) {
        this.viewTitle = title;
      }
    
      onEventSelected(event){
        console.log(event);
      }
    
      onTimeSelected(event){
        console.log(event);
      }

  }