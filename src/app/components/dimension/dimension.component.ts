import { Component, OnInit } from '@angular/core';
import { Route, Router  } from '@angular/router'
import('./assets/js/breakpoints.min.js');
import('./assets/js/browser.min.js');
import('./assets/js/jquery.min.js');
import('./assets/js/main.js');
import('./assets/js/util.js');


@Component({
  selector: 'app-dimension',
  templateUrl: './dimension.component.html',
  styleUrls: ['./dimension.component.css']
})
export class DimensionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate['/home']
  }

}
